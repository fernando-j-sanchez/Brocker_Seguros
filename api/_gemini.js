// Utilidades compartidas para hablar con Gemini. Los archivos que empiezan con "_"
// dentro de /api no se publican como rutas en Vercel.

export const obtenerClaveGemini = () => process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';

// Google retira modelos con el tiempo; los alias "-latest" siempre apuntan al modelo vigente.
// Cada modelo tiene su propio límite gratuito, así que si uno está saturado se prueba el siguiente.
export const modelosGemini = () =>
  [...new Set([
    process.env.GEMINI_MODEL,
    'gemini-flash-latest',
    'gemini-flash-lite-latest',
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-2.0-flash',
  ].filter(Boolean))];

export const urlGemini = (modelo, accion = '') =>
  `https://generativelanguage.googleapis.com/v1beta/models/${modelo}${accion ? `:${accion}` : ''}`;

// 404 / 400 por modelo inexistente: ese modelo ya no existe.
export const esModeloNoDisponible = (status, datos) =>
  status === 404 || (status === 400 && /model|not found|not supported/i.test(JSON.stringify(datos?.error || '')));

// 429 = se agotó el límite gratuito de ese modelo; 500/503 = Google saturado.
export const esLimiteOSaturacion = (status) => status === 429 || status === 500 || status === 503;

// Vale la pena intentar con otro modelo. Una clave inválida (400/403) fallaría igual con todos.
export const convieneProbarOtroModelo = (status, datos) =>
  esModeloNoDisponible(status, datos) || esLimiteOSaturacion(status);

// Tiempos máximos: si Google no contesta a tiempo se pasa al siguiente modelo,
// y la respuesta completa nunca tarda más que TIEMPO_TOTAL_MS.
export const TIEMPO_POR_MODELO_MS = 12000;
export const TIEMPO_TOTAL_MS = 25000;

export const esTiempoAgotado = (error) => error?.name === 'TimeoutError' || error?.name === 'AbortError';
