const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

const SYSTEM_PROMPT = `Eres "Asistente NISSI", un asistente virtual amable y profesional de un broker de seguros mexicano llamado NISSI. 
Tus respuestas deben ser cálidas, usar emojis y mantener un tono profesional.

INFORMACIÓN DE PRODUCTOS:
1. PPR ALLIANZ: Plan Personal de Retiro, ahorro para jubilación, plazo mínimo 10 años, aporte mínimo $3,000 mensual.
2. METLIFE: Seguro de Vida y Ahorro Flexible (desde $500 mensuales).
3. MAPFRE: Autos Flotilla, Gastos Médicos, Hogar, Empresas.
4. SUPERACIÓN PLUS (MAPFRE): Ahorro educativo para niños, desde $418 mensuales.

REGLA CRÍTICA: Si el usuario menciona "hijos", "universidad" o "educación" -> Recomienda SUPERACIÓN PLUS de MAPFRE.`;

export async function getChatResponse(messages: { role: 'user' | 'assistant', content: string }[]) {
  // Verificación de seguridad
  if (!API_KEY) {
    console.error("ERROR: No se encontró VITE_GEMINI_API_KEY. Revisa tu archivo .env.local o Vercel.");
    return "Lo siento, el sistema de chat no está configurado correctamente.";
  }

  try {
    const history = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: history,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Error en la API');
    }

    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No pude generar una respuesta.";

  } catch (error) {
    console.error('Error en Asistente NISSI:', error);
    return "¡Hola! Soy el Asistente NISSI. Estamos experimentando una alta demanda, ¿podrías intentar enviarme tu mensaje de nuevo?";
  }
}