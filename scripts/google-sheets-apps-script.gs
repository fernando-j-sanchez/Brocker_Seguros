/**
 * NISSI - Recibe los prospectos del sitio web y los guarda en esta hoja de Google Sheets.
 * Desde Google Sheets se puede descargar todo como Excel: Archivo > Descargar > Microsoft Excel (.xlsx).
 *
 * INSTALACIÓN (una sola vez):
 * 1. Crea una hoja nueva en https://sheets.google.com (ej. "NISSI - Prospectos").
 * 2. Menú Extensiones > Apps Script. Borra lo que aparezca y pega TODO este archivo.
 * 3. (Opcional, recomendado) Escribe una palabra secreta en TOKEN, abajo.
 * 4. Guarda (icono de disco) y luego: Implementar > Nueva implementación.
 *    - Tipo: "Aplicación web"
 *    - Ejecutar como: "Yo"
 *    - Quién tiene acceso: "Cualquier persona"
 *    Autoriza los permisos que pida Google y copia la URL que termina en /exec.
 * 5. En Vercel > tu proyecto > Settings > Environment Variables agrega:
 *    - GOOGLE_SHEETS_WEBHOOK_URL = la URL /exec que copiaste
 *    - GOOGLE_SHEETS_TOKEN       = la misma palabra secreta del paso 3 (si la pusiste)
 *    y vuelve a desplegar (Deployments > Redeploy).
 *
 * Cada origen se guarda en su propia pestaña: "Contactos", "Cotizaciones Mapfre" y "Asistente".
 */

var TOKEN = ''; // Ej: 'nissi-2026-secreto'. Debe ser igual a GOOGLE_SHEETS_TOKEN en Vercel.

var PESTANAS = {
  'formulario': 'Contactos',
  'cotizador-mapfre': 'Cotizaciones Mapfre',
  'asistente': 'Asistente'
};

var COLUMNAS_BASE = ['Fecha', 'Nombre', 'Correo', 'Teléfono', 'Producto', 'Mensaje'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var datos = JSON.parse(e.postData.contents);
    if (TOKEN && datos.token !== TOKEN) {
      return responder({ ok: false, error: 'No autorizado' });
    }

    var detalles = datos.detalles || {};
    var hoja = obtenerHoja(PESTANAS[datos.origen] || 'Contactos', Object.keys(detalles));
    var encabezados = hoja.getRange(1, 1, 1, hoja.getLastColumn()).getValues()[0];

    var fila = encabezados.map(function (columna) {
      switch (columna) {
        case 'Fecha': return new Date();
        case 'Nombre': return datos.nombre || '';
        case 'Correo': return datos.email || '';
        case 'Teléfono': return datos.telefono ? "'" + datos.telefono : ''; // ' para que no lo convierta en número
        case 'Producto': return datos.producto || '';
        case 'Mensaje': return datos.mensaje || '';
        default: return detalles[columna] !== undefined ? detalles[columna] : '';
      }
    });

    hoja.appendRow(fila);
    return responder({ ok: true });
  } catch (error) {
    return responder({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

// Permite probar en el navegador que la URL funciona.
function doGet() {
  return responder({ ok: true, mensaje: 'Webhook de NISSI activo' });
}

function obtenerHoja(nombre, columnasExtra) {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = libro.getSheetByName(nombre) || libro.insertSheet(nombre);

  if (hoja.getLastRow() === 0) {
    var encabezados = COLUMNAS_BASE.concat(columnasExtra);
    hoja.appendRow(encabezados);
    hoja.setFrozenRows(1);
    hoja.getRange(1, 1, 1, encabezados.length).setFontWeight('bold').setBackground('#dbeafe');
    return hoja;
  }

  // Si llegan columnas nuevas, se agregan al final sin mover las existentes.
  var actuales = hoja.getRange(1, 1, 1, hoja.getLastColumn()).getValues()[0];
  columnasExtra.forEach(function (columna) {
    if (actuales.indexOf(columna) === -1) {
      hoja.getRange(1, hoja.getLastColumn() + 1).setValue(columna).setFontWeight('bold').setBackground('#dbeafe');
      actuales.push(columna);
    }
  });
  return hoja;
}

function responder(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto)).setMimeType(ContentService.MimeType.JSON);
}
