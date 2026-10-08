// Diagnóstico: abre https://TU-SITIO/api/estado para ver si el asistente y Google Sheets
// están bien configurados. Solo muestra "sí/no" y mensajes de error; nunca las claves.

import { obtenerClaveGemini, modelosGemini, urlGemini, esModeloNoDisponible } from './_gemini.js';

const revisarGemini = async () => {
  const clave = obtenerClaveGemini();
  if (!clave) {
    return { ok: false, problema: 'Falta la variable GEMINI_API_KEY en Vercel (o falta hacer Redeploy después de agregarla).' };
  }

  const probados = [];
  for (const modelo of modelosGemini()) {
    try {
      const respuesta = await fetch(urlGemini(modelo), { headers: { 'x-goog-api-key': clave } });
      const datos = await respuesta.json().catch(() => ({}));
      if (respuesta.ok) return { ok: true, modelo, modelosProbados: [...probados, modelo] };
      probados.push(`${modelo} (${respuesta.status})`);
      if (!esModeloNoDisponible(respuesta.status, datos)) {
        return {
          ok: false,
          problema: respuesta.status === 400 || respuesta.status === 403
            ? 'Google rechazó la clave GEMINI_API_KEY. Revisa que la copiaste completa (empieza con AIza) y sin espacios.'
            : `Google respondió con error ${respuesta.status}.`,
          detalleGoogle: datos?.error?.message || null,
        };
      }
    } catch (error) {
      return { ok: false, problema: 'No se pudo conectar con Google Gemini.', detalle: String(error) };
    }
  }
  return { ok: false, problema: 'Ninguno de los modelos de Gemini está disponible para esta clave.', modelosProbados: probados };
};

const revisarSheets = async () => {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) {
    return { ok: false, problema: 'Falta la variable GOOGLE_SHEETS_WEBHOOK_URL en Vercel (o falta hacer Redeploy después de agregarla).' };
  }
  if (!/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(url.trim())) {
    return { ok: false, problema: 'La URL no tiene el formato esperado. Debe ser la "URL de App web" y terminar en /exec (no el "ID de implementación").' };
  }
  try {
    const respuesta = await fetch(url.trim());
    const texto = await respuesta.text();
    let datos = null;
    try {
      datos = JSON.parse(texto);
    } catch {
      // Google respondió con una página HTML (pantalla de inicio de sesión o de error)
    }
    if (datos?.ok) return { ok: true };
    return {
      ok: false,
      problema: 'Google Sheets no respondió como se esperaba. Revisa que en "Implementar" elegiste "Quién tiene acceso: Cualquier persona" y que pegaste el código completo.',
      estadoHttp: respuesta.status,
    };
  } catch (error) {
    return { ok: false, problema: 'No se pudo conectar con Google Sheets.', detalle: String(error) };
  }
};

export default async function handler(req, res) {
  const [gemini, googleSheets] = await Promise.all([revisarGemini(), revisarSheets()]);
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({
    asistenteIA: gemini,
    googleSheets,
    supabase: {
      configurado: Boolean(process.env.VITE_SUPABASE_URL && process.env.VITE_SUPABASE_ANON_KEY),
    },
    avisos: process.env.VITE_GEMINI_API_KEY
      ? ['Existe la variable vieja VITE_GEMINI_API_KEY. Bórrala en Vercel y usa solo GEMINI_API_KEY.']
      : [],
  });
}
