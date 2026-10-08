// Función serverless de Vercel: el "Asistente NISSI" responde con Gemini (Google AI, plan gratuito).
// La clave GEMINI_API_KEY solo existe en el servidor; nunca llega al navegador.

import {
  obtenerClaveGemini,
  modelosGemini,
  urlGemini,
  convieneProbarOtroModelo,
  esLimiteOSaturacion,
  esTiempoAgotado,
  TIEMPO_POR_MODELO_MS,
  TIEMPO_TOTAL_MS,
} from './_gemini.js';
import { normalizarProspecto, guardarEnSheets, guardarEnSupabase } from './_prospectos.js';

const INSTRUCCIONES = `Eres "Asistente NISSI", el asistente virtual de NISSI, un broker (agente) de seguros en la Ciudad de México.
Hablas en español de México, con un tono cálido, cercano y profesional. Usa como máximo un emoji por mensaje.

OBJETIVO: resolver dudas sobre seguros y, cuando la persona quiera cotizar o que la contacten, registrar sus datos para que un asesor le dé seguimiento.

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
- Para cotizar, pide aquí mismo en el chat: nombre, teléfono a 10 dígitos (o al menos correo) y los datos clave del seguro (edades, ciudad o código postal, número de vehículos, etc.). No le pidas que mande sus datos por WhatsApp; WhatsApp es solo una alternativa si prefiere hablar con un asesor.
- REGISTRO DE DATOS: en cuanto tengas el nombre y un teléfono o correo, usa la herramienta registrar_prospecto con un resumen de lo que necesita. Si solo dio correo, puedes registrarlo y después pedir amablemente su teléfono.
- Solo di que sus datos quedaron registrados si registrar_prospecto respondió ok: true. Si respondió ok: false, explica lo que falta o invita a escribir por WhatsApp al 55 5951 5885. Nunca digas que registraste algo sin haber usado la herramienta.
- No pidas datos sensibles (contraseñas, tarjetas, CURP completo).
- Si preguntan algo que no tiene que ver con seguros, responde amablemente que solo puedes ayudar con temas de seguros y ahorro.`;

const HERRAMIENTAS = [
  {
    functionDeclarations: [
      {
        name: 'registrar_prospecto',
        description:
          'Guarda los datos de contacto del cliente para que un asesor de NISSI lo contacte. Úsala en cuanto el cliente haya dado su nombre y un teléfono o correo.',
        parameters: {
          type: 'OBJECT',
          properties: {
            nombre: { type: 'STRING', description: 'Nombre del cliente' },
            telefono: { type: 'STRING', description: 'Teléfono del cliente, si lo dio' },
            email: { type: 'STRING', description: 'Correo del cliente, si lo dio' },
            producto: { type: 'STRING', description: 'Seguro que le interesa, por ejemplo "Gastos Médicos Mayores"' },
            resumen: {
              type: 'STRING',
              description: 'Resumen breve de lo que necesita: para quién es, edades, ciudad o código postal y cualquier detalle útil',
            },
          },
          required: ['nombre', 'producto', 'resumen'],
        },
      },
    ],
  },
];

const textoDe = (contenido) =>
  (contenido?.parts || [])
    .filter((p) => !p.thought)
    .map((p) => p.text || '')
    .join('')
    .trim();

/** Ejecuta registrar_prospecto: guarda en Google Sheets (y Supabase) y devuelve lo que verá la IA. */
const registrarProspecto = async (args = {}, conversacion) => {
  const transcripcion = conversacion
    .map((c) => `${c.role === 'user' ? 'Cliente' : 'Asistente'}: ${textoDe(c)}`)
    .join('\n')
    .slice(-1500);

  const { prospecto, error } = normalizarProspecto({
    origen: 'asistente',
    nombre: args.nombre,
    telefono: args.telefono,
    email: args.email,
    producto: args.producto || 'Asistente NISSI',
    mensaje: transcripcion,
    detalles: { Resumen: args.resumen || '' },
  });
  if (error) {
    return { ok: false, respuestaIA: { ok: false, error: 'Falta el nombre o un teléfono o correo del cliente; pídeselo.' } };
  }

  const [enSheets, enSupabase] = await Promise.all([guardarEnSheets(prospecto), guardarEnSupabase(prospecto)]);
  const ok = enSheets || enSupabase;
  return {
    ok,
    nombre: prospecto.nombre,
    respuestaIA: ok
      ? { ok: true }
      : { ok: false, error: 'No se pudieron guardar los datos. Invita al cliente a escribir por WhatsApp al 55 5951 5885.' },
  };
};

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

  const inicio = Date.now();
  const restante = () => TIEMPO_TOTAL_MS - (Date.now() - inicio);
  const pedir = (modelo, conversacion) =>
    fetch(urlGemini(modelo, 'generateContent'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: INSTRUCCIONES }] },
        contents: conversacion,
        tools: HERRAMIENTAS,
        generationConfig: { temperature: 0.6, maxOutputTokens: 2048 },
      }),
      signal: AbortSignal.timeout(Math.min(TIEMPO_POR_MODELO_MS, restante())),
    }).then(async (r) => ({ respuesta: r, datos: await r.json().catch(() => ({})) }));

  // Si la IA ya registró los datos pero luego falla, se confirma con este texto para no perder la venta.
  const confirmacion = (nombre) => ({
    reply: `¡Gracias, ${nombre.split(' ')[0]}! ✅ Registramos tus datos y un asesor de NISSI te contactará muy pronto.`,
    registrado: true,
  });

  let huboLimite = false;
  let registro = null; // se guarda una sola vez por petición

  for (const modelo of modelosGemini()) {
    if (restante() < 3000) break;

    let resultado;
    try {
      resultado = await pedir(modelo, contents);
    } catch (error) {
      // Google tardó demasiado o falló la conexión: se intenta con el siguiente modelo.
      console.error(`Gemini (${modelo}) ${esTiempoAgotado(error) ? 'tardó demasiado' : 'falló'}:`, String(error));
      huboLimite = true;
      continue;
    }

    let { respuesta, datos } = resultado;
    if (!respuesta.ok) {
      console.error(`Error de Gemini (${modelo}):`, respuesta.status, JSON.stringify(datos).slice(0, 500));
      if (esLimiteOSaturacion(respuesta.status)) huboLimite = true;
      if (convieneProbarOtroModelo(respuesta.status, datos)) continue;
      return res.status(502).json({ error: 'El asistente no está disponible por ahora', motivo: 'configuracion' });
    }

    let contenido = datos.candidates?.[0]?.content;
    const llamada = contenido?.parts?.find((p) => p.functionCall)?.functionCall;

    if (llamada?.name === 'registrar_prospecto') {
      registro ??= await registrarProspecto(llamada.args, contents);

      // Se devuelve el resultado a la IA para que redacte la respuesta final.
      const conversacion = [
        ...contents,
        contenido,
        { role: 'user', parts: [{ functionResponse: { name: 'registrar_prospecto', response: registro.respuestaIA } }] },
      ];
      try {
        if (restante() < 2000) throw new Error('Sin tiempo para la respuesta final');
        ({ respuesta, datos } = await pedir(modelo, conversacion));
        contenido = respuesta.ok ? datos.candidates?.[0]?.content : null;
      } catch (error) {
        console.error(`Gemini (${modelo}) falló después de registrar:`, String(error));
        contenido = null;
      }
      if (!textoDe(contenido)) {
        if (registro.ok) return res.status(200).json(confirmacion(registro.nombre));
        continue;
      }
    }

    const texto = textoDe(contenido);
    if (!texto) {
      // Pasa cuando Google bloquea la respuesta o se queda sin espacio; se prueba otro modelo.
      console.error(`Gemini (${modelo}) devolvió una respuesta vacía:`, JSON.stringify(datos).slice(0, 500));
      continue;
    }
    return res.status(200).json({ reply: texto, registrado: Boolean(registro?.ok) });
  }

  if (registro?.ok) return res.status(200).json(confirmacion(registro.nombre));
  return res.status(503).json({
    error: huboLimite ? 'Gemini está saturado o se alcanzó el límite gratuito' : 'Ningún modelo de Gemini está disponible',
    motivo: huboLimite ? 'limite' : 'modelos',
  });
}
