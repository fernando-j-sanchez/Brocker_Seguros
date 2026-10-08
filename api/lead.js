// Función serverless de Vercel: reenvía cada prospecto a Google Sheets.
// La URL del Apps Script vive solo en el servidor (variable GOOGLE_SHEETS_WEBHOOK_URL),
// así nadie puede verla ni llenar la hoja desde fuera del sitio.
// (La copia en Supabase de los formularios la hace el navegador directamente.)

import { normalizarProspecto, guardarEnSheets } from './_prospectos.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Método no permitido' });
  }

  if (!(process.env.GOOGLE_SHEETS_WEBHOOK_URL || '').trim()) {
    return res.status(503).json({ ok: false, error: 'Google Sheets no está configurado' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const { prospecto, error } = normalizarProspecto(body);
  if (error) {
    return res.status(400).json({ ok: false, error });
  }

  const ok = await guardarEnSheets(prospecto);
  return ok
    ? res.status(200).json({ ok: true })
    : res.status(502).json({ ok: false, error: 'No se pudo guardar en Google Sheets' });
}
