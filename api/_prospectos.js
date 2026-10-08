// Guardado de prospectos compartido por /api/lead (formularios) y /api/chat (asistente).

const ORIGENES = ['formulario', 'cotizador-mapfre', 'asistente'];
const limpiar = (valor, max = 500) => String(valor ?? '').trim().slice(0, max);

/** Limpia y recorta los datos; devuelve { prospecto } o { error } si faltan datos de contacto. */
export const normalizarProspecto = (datos = {}) => {
  const prospecto = {
    origen: ORIGENES.includes(datos.origen) ? datos.origen : 'formulario',
    nombre: limpiar(datos.nombre, 120),
    email: limpiar(datos.email, 160),
    telefono: limpiar(datos.telefono, 30),
    producto: limpiar(datos.producto, 80),
    mensaje: limpiar(datos.mensaje, 2000),
    detalles: {},
  };

  if (!prospecto.nombre || (!prospecto.telefono && !prospecto.email)) {
    return { error: 'Faltan nombre y teléfono o correo' };
  }

  if (datos.detalles && typeof datos.detalles === 'object') {
    for (const [clave, valor] of Object.entries(datos.detalles).slice(0, 20)) {
      prospecto.detalles[limpiar(clave, 40)] = limpiar(valor, 200);
    }
  }
  return { prospecto };
};

/** Envía el prospecto a Google Sheets (Apps Script). Devuelve true si quedó guardado. */
export const guardarEnSheets = async (prospecto) => {
  const webhook = (process.env.GOOGLE_SHEETS_WEBHOOK_URL || '').trim();
  if (!webhook) {
    console.error('Google Sheets no está configurado (falta GOOGLE_SHEETS_WEBHOOK_URL)');
    return false;
  }
  try {
    const respuesta = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...prospecto, token: process.env.GOOGLE_SHEETS_TOKEN || '' }),
      signal: AbortSignal.timeout(20000),
    });
    const datos = await respuesta.json().catch(() => ({}));
    if (!respuesta.ok || datos.ok === false) {
      console.error('Google Sheets rechazó el registro:', respuesta.status, datos);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error al conectar con Google Sheets:', error);
    return false;
  }
};

/** Copia en Supabase (solo para guardados hechos desde el servidor, como el asistente). */
export const guardarEnSupabase = async (prospecto) => {
  const url = (process.env.VITE_SUPABASE_URL || '').trim();
  const clave = (process.env.VITE_SUPABASE_ANON_KEY || '').trim();
  if (!url || !clave) return false;
  try {
    const respuesta = await fetch(`${url}/rest/v1/contact_leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: clave,
        Authorization: `Bearer ${clave}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        nombre: prospecto.nombre,
        email: prospecto.email,
        telefono: prospecto.telefono,
        producto: prospecto.producto,
        mensaje: prospecto.mensaje,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!respuesta.ok) console.error('Supabase rechazó el registro:', respuesta.status);
    return respuesta.ok;
  } catch (error) {
    console.error('Error al conectar con Supabase:', String(error));
    return false;
  }
};
