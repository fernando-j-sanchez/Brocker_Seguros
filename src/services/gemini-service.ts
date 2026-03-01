const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// CAMBIA ESTA LÍNEA - usa gemini-pro
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

const SYSTEM_PROMPT = `Eres "Asistente NISSI", un asistente virtual amable y profesional de un broker de seguros mexicano llamado NISSI. 
Tus respuestas deben ser cálidas, usar emojis y mantener un tono profesional.

PRODUCTOS:
1. PPR ALLIANZ: Retiro, min 10 años, $3,000 mensual.
2. METLIFE: Vida y Ahorro desde $500.
3. MAPFRE: Autos, Gastos Médicos, Hogar.
4. SUPERACIÓN PLUS (MAPFRE): Educación hijos, desde $418 mensual.`;

export async function getChatResponse(messages: { role: 'user' | 'assistant', content: string }[]) {
  if (!API_KEY) return "Error: Configura la API Key en Vercel.";

  try {
    const contents = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const requestBody = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents: contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    };

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    console.log('✅ Respuesta de Gemini:', data); // Para debug

    if (!response.ok) {
      console.error("🚨 Error completo:", data);
      return `Error ${response.status}: ${data.error?.message || 'Desconocido'}`;
    }

    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No pude generar respuesta.";

  } catch (error) {
    console.error('❌ Error:', error);
    return "Hola, soy NISSI. Tuve un detalle técnico, ¿podrías repetir tu duda?";
  }
}