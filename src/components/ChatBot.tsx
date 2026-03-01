import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot, Sparkles } from 'lucide-react';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface FormData {
  nombre: string;
  edad?: number;
  email: string;
  telefono: string;
  interes: string;
  plazo?: number;
  aporte?: number;
}

// =============================================
// SISTEMA DE INTENTS CON SINÓNIMOS Y PREDICCIÓN
// =============================================
const intents = [
  {
    id: 'SALUDO',
    keywords: ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'qué tal', 'que onda', 'saludos', 'hey', 'hi', 'hello'],
    synonyms: {
      'hola': ['buenas', 'que tal', 'como estas', 'saludos'],
      'buenos días': ['buen dia', 'buendia', 'bd']
    },
    handler: () => ({
      response: '¡Hola! 👋 Soy el asistente virtual de NISSI. ¿Cómo te llamas?',
      nextStep: 0
    })
  },
  {
    id: 'PPR_ALLIANZ',
    keywords: ['ppr', 'allianz', 'retiro', 'jubilación', 'jubilarme', 'pension', 'plan de retiro', 'ahorro para retiro', 'futuro', 'vejez'],
    synonyms: {
      'ppr': ['plan personal de retiro', 'plan de ahorro', 'pension', 'retiro'],
      'allianz': ['allians', 'alianz', 'la alemana', 'allianz mexico'],
      'retiro': ['jubilarme', 'dejar de trabajar', 'no trabajar', 'descansar']
    },
    handler: (nombre?: string) => ({
      response: `¡Excelente decisión, ${nombre || 'amigo'}! 💪 El PPR de Allianz es una de las mejores opciones para tu retiro. ¿Te gustaría conocer más detalles o prefieres que te ayude con una cotización personalizada?`,
      nextStep: 2
    })
  },
  {
    id: 'VIDA_METLIFE',
    keywords: ['metlife', 'vida', 'seguro de vida', 'familia', 'protección familiar', 'seres queridos', 'fallecimiento', 'morir', 'herederos'],
    synonyms: {
      'metlife': ['met life', 'met', 'metlife seguros', 'met life mexico'],
      'vida': ['vivir', 'existencia', 'seguro de vida', 'proteccion de vida'],
      'familia': ['familiares', 'hijos', 'esposa', 'esposo', 'seres queridos']
    },
    handler: (nombre?: string) => ({
      response: `Proteger a tu familia es lo más importante ❤️ Con MetLife tienes excelentes opciones, ${nombre || 'amigo'}. Para darte información más precisa, ¿podrías compartirme tu correo y teléfono?`,
      nextStep: 4
    })
  },
  {
    id: 'AUTOS_MAPFRE',
    keywords: ['auto', 'carro', 'coche', 'vehículo', 'flotilla', 'automóvil', 'camioneta', 'mapfre auto', 'seguro de auto'],
    synonyms: {
      'auto': ['carro', 'coche', 'vehículo', 'automóvil', 'camioneta', 'pickup'],
      'flotilla': ['flotilla de autos', 'varios autos', 'autos de empresa', 'vehiculos empresa']
    },
    handler: (nombre?: string) => ({
      response: `¡Mapfre tiene una protección increíble para autos! 🚗 ¿Me podrías dar más detalles, ${nombre || 'amigo'}? Por ejemplo, ¿es para uso personal o para flotilla empresarial?`,
      nextStep: 5
    })
  },
  {
    id: 'HOGAR_MAPFRE',
    keywords: ['hogar', 'casa', 'departamento', 'vivienda', 'seguro de hogar', 'casa habitación', 'protección hogar'],
    synonyms: {
      'hogar': ['casa', 'departamento', 'vivienda', 'domicilio', 'residencia'],
      'casa': ['mi casa', 'nuestra casa', 'propiedad']
    },
    handler: (nombre?: string) => ({
      response: `Proteger tu hogar es fundamental 🏠 Con Mapfre puedes estar tranquilo, ${nombre || 'amigo'}. ¿Qué tipo de cobertura te interesa más?`,
      nextStep: 5
    })
  },
  {
    id: 'SUPERACION_PLUS',
    keywords: ['superación plus', 'superacion plus', 'superación+', 'superacion+', 'educación', 'educativo', 'hijos', 'colegiatura', 'universidad', 'estudio', 'colegio', 'escuela'],
    synonyms: {
      'superación': ['superacion plus', 'superación plus', 'plan educativo', 'ahorro educativo', 'futuro hijos'],
      'educación': ['estudio', 'colegiatura', 'universidad', 'colegio', 'escuela', 'kinder', 'preparatoria'],
      'hijos': ['niños', 'bebé', 'hijo', 'hija', 'pequeños']
    },
    handler: (nombre?: string) => ({
      response: `¡Excelente elección! 🎓 El plan **Superación Plus** de Mapfre está diseñado especialmente para asegurar la educación de tus hijos. Con aportaciones desde $418 mensuales, garantizas su futuro académico. ¿Me permites algunos datos para darte una cotización personalizada?`,
      nextStep: 5
    })
  },
  {
    id: 'EMPRESARIAL_MAPFRE',
    keywords: ['empresa', 'negocio', 'comercio', 'pyme', 'empresarial', 'local', 'tienda', 'estética', 'oficina'],
    synonyms: {
      'empresa': ['negocio', 'comercio', 'pyme', 'local', 'tienda', 'empresarial'],
      'estética': ['salon de belleza', 'spa', 'peluqueria', 'barberia']
    },
    handler: (nombre?: string) => ({
      response: `Entendido, protección para tu negocio 🏢 Mapfre tiene soluciones empresariales muy completas, ${nombre || 'amigo'}. ¿Me compartes tu correo y teléfono para que un asesor especializado te contacte?`,
      nextStep: 4
    })
  },
  {
    id: 'CONTACTO',
    keywords: ['contacto', 'asesor', 'hablar con alguien', 'whatsapp', 'llamar', 'teléfono', 'comunicar', 'ayuda humana'],
    synonyms: {
      'contacto': ['asesor', 'agente', 'representante', 'humano', 'persona'],
      'whatsapp': ['wa', 'whats', 'wp', 'whatsap']
    },
    handler: (nombre?: string) => ({
      response: `¡Claro, ${nombre || 'amigo'}! Un asesor se pondrá en contacto contigo muy pronto. Mientras tanto, ¿hay algo específico en lo que pueda ayudarte?`,
      nextStep: 7
    })
  },
  {
    id: 'DESPEDIDA',
    keywords: ['gracias', 'bye', 'adios', 'hasta luego', 'nos vemos', 'cuidate', 'saludos'],
    synonyms: {
      'gracias': ['thank you', 'thanks', 'gracias totales', 'muy amable'],
      'adios': ['bye', 'chao', 'nos vemos', 'hasta luego', 'cuidate']
    },
    handler: () => ({
      response: '¡Gracias a ti por contactarnos! 😊 Que tengas un excelente día. Recuerda que estoy aquí para ayudarte cuando lo necesites.',
      nextStep: 8
    })
  }
];

// =============================================
// FUNCIÓN DE PREDICCIÓN DE INTENCIÓN
// =============================================
const detectarIntencion = (mensaje: string): any => {
  const mensajeLower = mensaje.toLowerCase().trim();
  
  // Si el mensaje está vacío o es muy corto
  if (mensajeLower.length < 2) return null;
  
  // 1. Buscar coincidencia exacta con keywords
  for (const intent of intents) {
    for (const keyword of intent.keywords) {
      if (mensajeLower.includes(keyword)) {
        return intent;
      }
    }
  }
  
  // 2. Buscar con sinónimos
  for (const intent of intents) {
    for (const [palabra, sinonimos] of Object.entries(intent.synonyms)) {
      if (mensajeLower.includes(palabra)) {
        return intent;
      }
      for (const sinonimo of sinonimos) {
        if (mensajeLower.includes(sinonimo)) {
          return intent;
        }
      }
    }
  }
  
  // 3. Fuzzy matching (coincidencia aproximada) para palabras cortas
  for (const intent of intents) {
    for (const keyword of intent.keywords) {
      if (keyword.length > 3) { // Solo para palabras con más de 3 letras
        // Si el mensaje contiene al menos el 70% de las letras de la keyword
        let coincidencias = 0;
        for (let i = 0; i < keyword.length; i++) {
          if (mensajeLower.includes(keyword[i])) {
            coincidencias++;
          }
        }
        if (coincidencias / keyword.length > 0.7) {
          return intent;
        }
      }
    }
  }
  
  return null;
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: '¡Hola! 👋 Soy el asistente virtual de NISSI. ¿Cómo te llamas?', 
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    interes: ''
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const phoneNumber = '5559515885';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const saveToDatabase = async (data: FormData) => {
    console.log('📝 Guardando en base de datos:', data);
    return true;
  };

  const generateResponse = (userInput: string) => {
    setIsTyping(true);
    
    setTimeout(async () => {
      let response = '';
      const input = userInput.trim();
      
      // PASO 0: Recibir nombre
      if (step === 0) {
        setFormData({ ...formData, nombre: input });
        response = `¡Mucho gusto, ${input}! 😊 ¿Cómo puedo ayudarte el día de hoy? Puedo darte información sobre:\n\n• PPR Allianz (Plan de Retiro)\n• MetLife (Seguro de Vida)\n• Mapfre (Autos, Hogar, Empresas)\n• Superación Plus (Ahorro educativo)`;
        setStep(1);
      } 
      // PASO 1: Detectar intención principal
      else if (step === 1) {
        const intent = detectarIntencion(input);
        
        if (intent) {
          const result = intent.handler(formData.nombre);
          setFormData({ ...formData, interes: intent.id });
          response = result.response;
          setStep(result.nextStep);
        } else {
          response = 'Disculpa, no estoy seguro de haber entendido bien 😅 ¿Podrías ser más específico? Puedo ayudarte con:\n\n• **PPR Allianz** (para tu retiro)\n• **MetLife** (seguro de vida)\n• **Mapfre** (autos, hogar, empresas)\n• **Superación Plus** (ahorro educativo para hijos)';
        }
      }
      // PASO 2: PPR - ofrecer cotización
      else if (step === 2) {
        if (input.toLowerCase().includes('si') || input.toLowerCase().includes('cotiz') || input.toLowerCase().includes('información')) {
          response = `¡Perfecto! 🎯 Para hacerte una cotización personalizada de tu PPR, necesito algunos datos:\n\n• Tu edad actual\n• Plazo de ahorro que te interesa (mínimo 10 años)\n• Aporte mensual que deseas\n\n¿Me compartes tu edad?`;
          setStep(3);
        } else {
          response = `¿Te gustaría obtener atención personalizada con un asesor especializado en PPR? Puedo conectarte por WhatsApp.`;
          setStep(6);
        }
      }
      // PASO 3: Recibir edad para PPR
      else if (step === 3) {
        const edad = parseInt(input.replace(/[^0-9]/g, ''));
        if (!isNaN(edad) && edad >= 18 && edad <= 70) {
          setFormData({ ...formData, edad });
          response = `Gracias. ¿Qué plazo de ahorro te interesa? Recuerda que el mínimo son 10 años.`;
          setStep(31);
        } else {
          response = 'Por favor, ingresa una edad válida (entre 18 y 70 años)';
        }
      }
      // PASO 31: Recibir plazo
      else if (step === 31) {
        const plazo = parseInt(input.replace(/[^0-9]/g, ''));
        if (!isNaN(plazo) && plazo >= 10 && plazo <= 40) {
          setFormData({ ...formData, plazo });
          response = `¿Qué aporte mensual te gustaría realizar? ${plazo === 10 ? 'Para un plazo de 10 años, el mínimo es $3,000. ' : ''}`;
          setStep(32);
        } else {
          response = 'El plazo debe ser entre 10 y 40 años. ¿Cuántos años deseas ahorrar?';
        }
      }
      // PASO 32: Recibir aporte
      else if (step === 32) {
        const aporte = parseInt(input.replace(/[^0-9]/g, ''));
        const edadValida = formData.edad || 0;
        const plazoValido = formData.plazo || 10;
        
        // Validación especial para plazo de 10 años
        if (plazoValido === 10 && aporte < 3000) {
          response = 'Para un plazo de 10 años, el aporte mínimo es de $3,000. ¿Podrías ajustar esa cantidad?';
        } else if (!isNaN(aporte) && aporte >= 1000) {
          setFormData({ ...formData, aporte });
          
          await saveToDatabase({ ...formData, edad: edadValida, plazo: plazoValido, aporte });
          
          response = `¡Excelente! 🎉 Con esos datos, he generado una proyección preliminar. ¿Te gustaría que un asesor especializado te contacte para mostrarte opciones personalizadas y resolver todas tus dudas?`;
          setStep(6);
        } else {
          response = 'El aporte mensual mínimo es de $1,000. ¿Qué cantidad deseas ahorrar?';
        }
      }
      // PASO 4: Pedir correo para MetLife/Mapfre general
      else if (step === 4) {
        if (input.includes('@') && input.includes('.')) {
          setFormData({ ...formData, email: input });
          response = 'Gracias. Ahora, ¿me podrías dar tu teléfono? 📱';
          setStep(41);
        } else {
          response = '¿Podrías verificar que el correo sea válido? Debe tener @ y .com';
        }
      }
      // PASO 41: Recibir teléfono
      else if (step === 41) {
        const telefono = input.replace(/\D/g, '');
        if (telefono.length >= 10) {
          setFormData({ ...formData, telefono: input });
          
          await saveToDatabase({ ...formData, telefono: input });
          
          const productoNombre = 
            formData.interes === 'VIDA_METLIFE' ? 'MetLife' :
            formData.interes === 'AUTOS_MAPFRE' ? 'Autos Mapfre' :
            formData.interes === 'HOGAR_MAPFRE' ? 'Hogar Mapfre' :
            formData.interes === 'SUPERACION_PLUS' ? 'Superación Plus' :
            formData.interes === 'EMPRESARIAL_MAPFRE' ? 'Empresarial Mapfre' : 'seguros';
          
          response = `¡Gracias por tus datos! 📋 Un especialista en ${productoNombre} se pondrá en contacto contigo muy pronto. Mientras tanto, ¿te gustaría hablar ya con un asesor por WhatsApp?`;
          setStep(6);
        } else {
          response = 'El teléfono debe tener al menos 10 dígitos. ¿Puedes verificarlo?';
        }
      }
      // PASO 5: Para productos específicos de Mapfre que requieren más info
      else if (step === 5) {
        response = `Para darte la mejor información sobre ${formData.interes === 'SUPERACION_PLUS' ? 'Superación Plus' : 'este producto'}, ¿me podrías compartir tu correo y teléfono? Así un asesor especializado puede contactarte con una cotización personalizada.`;
        setStep(4);
      }
      // PASO 6: Ofrecer WhatsApp
      else if (step === 6) {
        if (input.toLowerCase().includes('si') || input.toLowerCase().includes('whats') || input.toLowerCase().includes('sí')) {
          const interes = formData.interes || 'seguros';
          const productoTexto = 
            interes === 'PPR_ALLIANZ' ? 'PPR Allianz' :
            interes === 'VIDA_METLIFE' ? 'MetLife' :
            interes === 'AUTOS_MAPFRE' ? 'Autos Mapfre' :
            interes === 'HOGAR_MAPFRE' ? 'Hogar Mapfre' :
            interes === 'SUPERACION_PLUS' ? 'Superación Plus' :
            interes === 'EMPRESARIAL_MAPFRE' ? 'Empresarial Mapfre' : 'seguros';
          
          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(`¡Hola! Me interesa conocer más sobre ${productoTexto}. Me contacté por el chat de NISSI.`)}`;
          window.open(whatsappUrl, '_blank');
          response = `¡Perfecto! Te he redirigido a WhatsApp 🚀 Un asesor especializado en ${productoTexto} te atenderá en segundos.`;
        } else {
          response = `Entendido. Un asesor se pondrá en contacto contigo pronto. ¿Hay algo más en lo que pueda ayudarte, ${formData.nombre || 'amigo'}?`;
        }
        setStep(7);
      }
      // PASO 7: Final o seguir ayudando
      else if (step === 7) {
        if (input.toLowerCase().includes('si') || input.toLowerCase().includes('ayudar') || input.toLowerCase().includes('otro')) {
          response = 'Claro, dime ¿qué más necesitas saber? Puedo ayudarte con Allianz, MetLife, Mapfre o Superación Plus.';
          setStep(1);
        } else {
          response = `¡Gracias por contactarnos, ${formData.nombre || 'amigo'}! Que tengas un excelente día 🌟`;
          setStep(8);
        }
      }
      // PASO 8: Despedida
      else if (step === 8) {
        const intent = detectarIntencion(input);
        if (intent && intent.id !== 'DESPEDIDA') {
          const result = intent.handler(formData.nombre);
          response = result.response;
          setStep(result.nextStep);
        } else {
          response = '¿En qué más puedo ayudarte?';
          setStep(1);
        }
      }

      setMessages(prev => [...prev, { text: response, isUser: false, timestamp: new Date() }]);
      setIsTyping(false);
      setInputValue('');
    }, 800);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isTyping) return;

    setMessages([...messages, { text: inputValue, isUser: true, timestamp: new Date() }]);
    generateResponse(inputValue);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Botón del chat rectangular */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all flex items-center gap-2"
        whileHover={{ scale: 1.05, x: 5 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            '0 10px 25px -5px rgba(37,99,235,0.3)',
            '0 20px 35px -5px rgba(37,99,235,0.5)',
            '0 10px 25px -5px rgba(37,99,235,0.3)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-medium">Chat NISSI</span>
        <motion.div 
          className="w-2 h-2 bg-green-400 rounded-full"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.button>

      {/* Ventana del chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: -20 }}
            className="fixed bottom-24 left-6 z-50 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <motion.div 
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 flex justify-between items-center"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Bot className="w-6 h-6" />
                </motion.div>
                <div>
                  <span className="font-semibold text-lg">Asistente NISSI</span>
                  <div className="flex items-center gap-1 text-xs text-blue-100">
                    <Sparkles className="w-3 h-3" />
                    <span>Online • Entiendo sinónimos</span>
                  </div>
                </div>
              </div>
              <motion.button 
                onClick={() => setIsOpen(false)} 
                className="hover:bg-blue-700 p-1 rounded-full"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx} 
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${msg.isUser ? 'flex-row-reverse' : ''}`}>
                    <motion.div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.isUser ? 'bg-green-600' : 'bg-blue-600'
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {msg.isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                    </motion.div>
                    <div>
                      <motion.div 
                        className={`p-3 rounded-2xl ${
                          msg.isUser 
                            ? 'bg-green-600 text-white rounded-tr-none' 
                            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-tl-none shadow-sm'
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        {msg.text.split('\n').map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            {i < msg.text.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </motion.div>
                      <p className="text-xs text-gray-500 mt-1 px-2">
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white dark:bg-gray-700 p-3 rounded-2xl rounded-tl-none shadow-sm">
                      <motion.div 
                        className="flex gap-1"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <span className="w-2 h-2 bg-gray-400 rounded-full" />
                        <span className="w-2 h-2 bg-gray-400 rounded-full" />
                        <span className="w-2 h-2 bg-gray-400 rounded-full" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <motion.div 
              className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 p-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  disabled={isTyping}
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={isTyping}
                  className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  
                  <motion.div 
                    className="absolute inset-0 bg-white/20"
                    animate={{ 
                      x: ['-100%', '100%'],
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.button>
              </div>
              
              <motion.p 
                className="text-xs text-gray-500 mt-2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                🔒 Tus datos están seguros con nosotros
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};