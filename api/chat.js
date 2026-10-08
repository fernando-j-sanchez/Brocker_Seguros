// Función serverless de Vercel: el "Asistente NISSI" responde con Gemini (Google AI, plan gratuito).
// La clave GEMINI_API_KEY solo existe en el servidor; nunca llega al navegador.

import { obtenerClaveGemini, modelosGemini, urlGemini, convieneProbarOtroModelo, esLimiteOSaturacion } from './_gemini.js';

const INSTRUCCIONES = `Eres "Asistente NISSI", el asistente virtual de NISSI, un broker (agente) de seguros en la Ciudad de México.
Hablas en español de México, con un tono cálido, cercano y profesional. Usa como máximo un emoji por mensaje.

OBJETIVO: resolver dudas sobre seguros y llevar a la persona a dejar sus datos o hablar con un asesor por WhatsApp.

PRODUCTOS QUE MANEJA NISSI:
1. PPR Allianz (Plan Personal de Retiro): ahorro e inversión para el retiro. Plazo mínimo de 10 años; con plazo de 10 años la aportación mínima es de $3,000 MXN mensuales. En la página hay una calculadora para proyectar el ahorro. Las aportaciones a un PPR pueden ser deducibles de impuestos dentro de los límites de la ley (el asesor confirma cada caso).
2. MetLife: Seguro de Vida (protección por fallecimiento e invalidez, suma asegurada personalizada, gastos funerarios, cobertura adicional de cáncer, más de 20 coberturas adicionales, pagos mensuales, trimestrales o anuales) y Ahorro Flexible desde $500 MXN mensuales (ahorro con protección de vida).
3. Mapfre: Autos y Flotillas para Pymes (desde 2 vehículos, coberturas Amplia, Limitada y Responsabilidad Civil, con cotizador en la página), Gastos Médicos Mayores, Seguro de Hogar, Protección Empresarial y Protección Digital 360 (ciberriesgos, reputación, restauración de sistemas y recuperación de datos).
4. Superación Plus: seguro educativo para asegurar los estudios de los hijos, desde $418 MXN mensuales.

CONTACTO: WhatsApp 55 5951 5885, correo aargeliasorseguros@yahoo.com, Ciudad de México. También pueden llenar el formulario de "Contacto" al final de la página.

REGLAS:
- Respuestas breves: máximo 3 o 4 oraciones o una lista corta.
- Nunca inventes precios, coberturas, rendimientos ni condiciones que no estén arriba. Si no sabes algo, dilo y ofrece que un asesor lo confirme.
- No prometas rendimientos garantizados; las proyecciones son solo estimaciones.
- Para cotizar, pide los datos clave (edad, tipo de seguro, número de vehículos, etc.) y sugiere dejar nombre y teléfono con el botón "Quiero que me contacten" o escribir por WhatsApp.
- No pidas datos sensibles (contraseñas, tarjetas, CURP completo).
- Si preguntan algo que no tiene que ver con seguros, responde amablemente que solo puedes ayudar con temas de seguros y ahorro.`;

const limpiarHistorial = (mensajes) => {
  if (!Array.isArray(mensajes)) return [];
  const contenido = mensajes
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .slice(-12)
    .map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content.trim().slice(0, 1000) }],
    }));
  // Gemini exige que la conversación empiece con un mensaje del usuario.
  while (contenido.length && contenido[0].role !== 'user') contenido.shift();
  return contenido;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const apiKey = obtenerClaveGemini();
  if (!apiKey) {
    return res.status(503).json({ error: 'El asistente con IA no está configurado' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const contents = limpiarHistorial(body.messages);
  if (!contents.length) {
    return res.status(400).json({ error: 'No hay mensajes' });
  }

  const peticion = JSON.stringify({
    systemInstruction: { parts: [{ text: INSTRUCCIONES }] },
    contents,
    generationConfig: { temperature: 0.6, maxOutputTokens: 2048 },
  });

  let huboLimite = false;
  try {
    for (const modelo of modelosGemini()) {
      const respuesta = await fetch(urlGemini(modelo, 'generateContent'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: peticion,
      });
      const datos = await respuesta.json().catch(() => ({}));

      if (!respuesta.ok) {
        console.error(`Error de Gemini (${modelo}):`, respuesta.status, JSON.stringify(datos).slice(0, 500));
        if (esLimiteOSaturacion(respuesta.status)) huboLimite = true;
        if (convieneProbarOtroModelo(respuesta.status, datos)) continue;
        return res.status(502).json({ error: 'El asistente no está disponible por ahora', motivo: 'configuracion' });
      }

      const texto = (datos.candidates?.[0]?.content?.parts || [])
        .filter((p) => !p.thought)
        .map((p) => p.text || '')
        .join('')
        .trim();

      if (!texto) {
        console.error(`Gemini (${modelo}) devolvió una respuesta vacía:`, JSON.stringify(datos).slice(0, 500));
        return res.status(502).json({ error: 'Respuesta vacía' });
      }
      return res.status(200).json({ reply: texto });
    }

    return res.status(503).json({
      error: huboLimite ? 'Se alcanzó el límite gratuito de Gemini' : 'Ningún modelo de Gemini está disponible',
      motivo: huboLimite ? 'limite' : 'modelos',
    });
  } catch (error) {
    console.error('Error al llamar a Gemini:', error);
    return res.status(502).json({ error: 'El asistente no está disponible por ahora' });
  }
}
