// Diagnóstico: abre https://TU-SITIO/api/estado para ver si el asistente y Google Sheets
// están bien configurados. Solo muestra "sí/no" y mensajes de error; nunca las claves.

import { obtenerClaveGemini, modelosGemini, urlGemini, esModeloNoDisponible, esLimiteOSaturacion } from './_gemini.js';

const revisarGemini = async () => {
  const clave = obtenerClaveGemini();
  if (!clave) {
    return { ok: false, problema: 'Falta la variable GEMINI_API_KEY en Vercel (o falta hacer Redeploy después de agregarla).' };
  }

  // Prueba real (una pregunta mínima) para detectar también si se agotó el límite gratuito.
  const modelos = {};
  for (const modelo of modelosGemini()) {
    try {
      const respuesta = await fetch(urlGemini(modelo, 'generateContent'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': clave },
        body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: 'Responde solo: ok' }] }] }),
      });
      const datos = await respuesta.json().catch(() => ({}));
      if (respuesta.ok) {
        modelos[modelo] = 'funciona';
        return { ok: true, modeloEnUso: modelo, modelos };
      }
      if (esModeloNoDisponible(respuesta.status, datos)) {
        modelos[modelo] = 'ya no existe';
      } else if (esLimiteOSaturacion(respuesta.status)) {
        modelos[modelo] = respuesta.status === 429 ? 'límite gratuito agotado por ahora' : 'Google saturado';
      } else {
        return {
          ok: false,
          problema: 'Google rechazó la clave GEMINI_API_KEY. Revisa que la copiaste completa (empieza con AIza) y sin espacios.',
          detalleGoogle: datos?.error?.message || `Error ${respuesta.status}`,
        };
      }
    } catch (error) {
      return { ok: false, problema: 'No se pudo conectar con Google Gemini.', detalle: String(error) };
    }
  }

  const sinLimite = Object.values(modelos).some((m) => m.startsWith('límite'));
  return {
    ok: false,
    problema: sinLimite
      ? 'Se agotó el límite gratuito de Gemini. Se renueva solo (por minuto y por día); para no tener límites hay que activar la facturación en Google AI Studio.'
      : 'Ninguno de los modelos de Gemini está disponible para esta clave.',
    modelos,
  };
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
