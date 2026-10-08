// Función serverless de Vercel: reenvía cada prospecto a Google Sheets.
// La URL del Apps Script vive solo en el servidor (variable GOOGLE_SHEETS_WEBHOOK_URL),
// así nadie puede verla ni llenar la hoja desde fuera del sitio.

const ORIGENES = ['formulario', 'cotizador-mapfre', 'asistente'];
const limpiar = (valor, max = 500) => String(valor ?? '').trim().slice(0, max);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Método no permitido' });
  }

  const webhook = (process.env.GOOGLE_SHEETS_WEBHOOK_URL || '').trim();
  if (!webhook) {
    return res.status(503).json({ ok: false, error: 'Google Sheets no está configurado' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const lead = {
    origen: ORIGENES.includes(body.origen) ? body.origen : 'formulario',
    nombre: limpiar(body.nombre, 120),
    email: limpiar(body.email, 160),
    telefono: limpiar(body.telefono, 30),
    producto: limpiar(body.producto, 80),
    mensaje: limpiar(body.mensaje, 2000),
    detalles: {},
  };

  if (!lead.nombre || (!lead.telefono && !lead.email)) {
    return res.status(400).json({ ok: false, error: 'Faltan nombre y teléfono o correo' });
  }

  if (body.detalles && typeof body.detalles === 'object') {
    for (const [clave, valor] of Object.entries(body.detalles).slice(0, 20)) {
      lead.detalles[limpiar(clave, 40)] = limpiar(valor, 200);
    }
  }

  try {
    const respuesta = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...lead, token: process.env.GOOGLE_SHEETS_TOKEN || '' }),
    });
    const datos = await respuesta.json().catch(() => ({}));
    if (!respuesta.ok || datos.ok === false) {
      console.error('Google Sheets rechazó el registro:', respuesta.status, datos);
      return res.status(502).json({ ok: false, error: 'No se pudo guardar en Google Sheets' });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Error al conectar con Google Sheets:', error);
    return res.status(502).json({ ok: false, error: 'No se pudo conectar con Google Sheets' });
  }
}
