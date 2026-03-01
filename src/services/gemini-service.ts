import { GoogleGenerativeAI } from '@google/generative-ai';

// Inicializar Gemini con tu API key
const genAI = new GoogleGenerativeAI('AIzaSyD6HX3pbqfyI9UxeahtDyDeeVQFzTgE4a0');

// Sistema de prompt para el chatbot
const SYSTEM_PROMPT = `Eres "Asistente NISSI", un asistente virtual amable y profesional de un broker de seguros mexicano llamado NISSI. 
Tus respuestas deben ser cálidas, usar emojis ocasionalmente y mantener un tono amigable pero profesional.

INFORMACIÓN DE PRODUCTOS:
1. PPR ALLIANZ: Plan Personal de Retiro, ahorro para jubilación, plazo mínimo 10 años, aporte mínimo $3,000 mensual
2. METLIFE: Seguro de Vida y Ahorro Flexible (desde $500 mensuales)
3. MAPFRE: Autos Flotilla, Gastos Médicos, Hogar, Empresas, Protección Digital 360
4. SUPERACIÓN PLUS (MAPFRE): Ahorro educativo para niños, desde $418 mensuales, asegura educación universitaria

IMPORTANTE: Si el usuario menciona "superación", "educación", "hijos", "colegiatura" → es SUPERACIÓN PLUS de MAPFRE`;

export async function getChatResponse(messages: { role: 'user' | 'assistant', content: string }[]) {
  try {
    // Usar gemini-pro que es más estable
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.7,
      },
    });

    // Construir el prompt completo
    let prompt = SYSTEM_PROMPT + "\n\nHISTORIAL DE LA CONVERSACIÓN:\n";
    
    messages.forEach(msg => {
      prompt += `${msg.role === 'user' ? 'Usuario' : 'Asistente'}: ${msg.content}\n`;
    });
    
    prompt += "Asistente:";

    // Generar respuesta
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
    
  } catch (error) {
    console.error('Error con Gemini:', error);
    return 'Lo siento, tuve un problema técnico. ¿Podrías repetir tu mensaje?';
  }
}