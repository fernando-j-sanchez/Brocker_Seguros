import { GoogleGenerativeAI } from '@google/generative-ai';

// Inicializar Gemini con tu API key
const genAI = new GoogleGenerativeAI('AIzaSyD6HX3pbqfyI9UxeahtDyDeeVQFzTgE4a0');

// Sistema de prompt para el chatbot
const SYSTEM_PROMPT = `Eres "Asistente NISSI", un asistente virtual amable y profesional de un broker de seguros mexicano llamado NISSI. 
Tus respuestas deben ser cálidas, usar emojis ocasionalmente y mantener un tono amigable pero profesional.

INFORMACIÓN DE PRODUCTOS:

1. PPR ALLIANZ:
   - Plan Personal de Retiro de Allianz
   - Ahorro para jubilación con rendimientos
   - Plazo mínimo 10 años, aporte mínimo $3,000 mensual
   - Beneficios fiscales
   - Ideal para: personas que quieren asegurar su futuro

2. METLIFE:
   - Seguro de Vida
   - Ahorro Flexible (desde $500 mensuales)
   - Protección para la familia
   - Beneficios: cobertura por fallecimiento, invalidez, gastos funerarios

3. MAPFRE:
   - Autos Flotilla (desde 2 unidades, tarifa empresarial)
   - Gastos Médicos Mayores
   - Seguro de Hogar
   - Protección de Empresas
   - Protección Digital 360

4. SUPERACIÓN PLUS (MAPFRE):
   - Ahorro educativo para niños
   - Aportaciones desde $418 mensuales
   - Protección de vida incluida
   - Asegura educación universitaria
   - Ideal para: padres que quieren garantizar el futuro académico de sus hijos

INSTRUCCIONES IMPORTANTES:
- Primero pregunta el nombre del usuario si no lo sabes
- Detecta QUÉ producto le interesa al usuario
- Si menciona "superación", "educación", "hijos", "colegiatura", "universidad", "estudio", "colegio" → es SUPERACIÓN PLUS de MAPFRE, NO Allianz
- Si no estás seguro, haz preguntas para clarificar
- Mantén las respuestas concisas pero amigables
- Ofrece ayuda para cotizaciones o contacto con asesores`;

export async function getChatResponse(messages: { role: 'user' | 'assistant', content: string }[]) {
  try {
    // Usar el modelo gemini-1.5-flash (rápido y gratis)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
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