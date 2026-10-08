// Utilidades compartidas para hablar con Gemini. Los archivos que empiezan con "_"
// dentro de /api no se publican como rutas en Vercel.

export const obtenerClaveGemini = () => process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';

// Google retira modelos con el tiempo; "gemini-flash-latest" siempre apunta al Flash vigente.
// Si uno no existe, se prueba el siguiente.
export const modelosGemini = () =>
  [...new Set([process.env.GEMINI_MODEL, 'gemini-flash-latest', 'gemini-2.5-flash', 'gemini-2.0-flash'].filter(Boolean))];

export const urlGemini = (modelo, accion = '') =>
  `https://generativelanguage.googleapis.com/v1beta/models/${modelo}${accion ? `:${accion}` : ''}`;

// Un 404 (o 400 por modelo inexistente) significa "prueba con otro modelo"; cualquier otro error
// (clave inválida, cuota agotada) se repetiría igual con todos, así que se detiene.
export const esModeloNoDisponible = (status, datos) =>
  status === 404 || (status === 400 && /model|not found|not supported/i.test(JSON.stringify(datos?.error || '')));
