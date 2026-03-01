const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// Usamos v1beta que es más flexible con los modelos nuevos
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

const SYSTEM_PROMPT = `Eres "Asistente NISSI", un asistente virtual amable y profesional de un broker de seguros mexicano llamado NISSI. 
Tus respuestas deben ser cálidas, usar emojis y mantener un tono profesional.

PRODUCTOS:
1. PPR ALLIANZ: Retiro, min 10 años, $3,000 mensual.
2. METLIFE: Vida y Ahorro desde $500.
3. MAPFRE: Autos, Gastos Médicos, Hogar.
4. SUPERACIÓN PLUS (MAPFRE): Educación hijos, desde $418 mensual.`;

export async function getChatResponse(messages: { role: 'user' | 'assistant', content: string }[]) {
  if (!API_KEY) return "Error: Configura la API Key.";
  console.log("¿La API KEY existe?", !!API_KEY);
  try {
    // Convertimos el historial al formato exacto de Gemini
    const contents = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Agregamos el SYSTEM_PROMPT al inicio del historial para que no se pierda
    const finalContents = [
      {
        role: 'user',
        parts: [{ text: `Actúa bajo estas instrucciones: ${SYSTEM_PROMPT}` }]
      },
      {
        role: 'model',
        parts: [{ text: "Entendido, soy el Asistente NISSI. ¿En qué puedo ayudarte hoy?" }]
      },
      ...contents
    ];

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: finalContents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("🚨 Error detallado:", data);
      return `Error de conexión con NISSI (${response.status}).`;
    }

    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Lo siento, no pude procesar eso.";

  } catch (error) {
    console.error('❌ Error en el servicio:', error);
    return "Tuve un detalle técnico. ¿Podrías repetir tu duda?";
  }
}