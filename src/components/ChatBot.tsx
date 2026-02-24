import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot, Sparkles, Heart, ChevronUp } from 'lucide-react';

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
    // Aquí iría la llamada a la base de datos
    console.log('📝 Guardando en base de datos:', data);
    // Simulación de guardado
    return true;
  };

  const generateResponse = (userInput: string) => {
    setIsTyping(true);
    
    setTimeout(async () => {
      let response = '';
      const input = userInput.toLowerCase();
      
      if (step === 0) {
        // Paso 1: Nombre
        setFormData({ ...formData, nombre: userInput });
        response = `¡Mucho gusto, ${userInput}! 😊 ¿Cómo puedo ayudarte el día de hoy?`;
        setStep(1);
      } 
      else if (step === 1) {
        // Paso 2: Identificar interés
        if (input.includes('ppr') || input.includes('allianz') || input.includes('retiro')) {
          setFormData({ ...formData, interes: 'Allianz' });
          response = `¡Excelente decisión! 💪 El PPR de Allianz es una de las mejores opciones para tu retiro. ¿Te gustaría conocer más detalles o prefieres que te ayude con una cotización personalizada?`;
          setStep(2);
        }
        else if (input.includes('metlife') || input.includes('vida') || input.includes('familia')) {
          setFormData({ ...formData, interes: 'MetLife' });
          response = `Proteger a tu familia es lo más importante ❤️ Con MetLife tienes excelentes opciones. Para darte información más precisa, ¿podrías compartirme tu correo y teléfono?`;
          setStep(4);
        }
        else if (input.includes('mapfre') || input.includes('auto') || input.includes('hogar') || input.includes('empresa')) {
          setFormData({ ...formData, interes: 'Mapfre' });
          response = `¡Mapfre tiene una protección increíble! 🚗 🏠 Para recomendarte la mejor cobertura, ¿me podrías dar tu correo y teléfono?`;
          setStep(4);
        }
        else {
          response = '¿Podrías ser más específico? Puedo ayudarte con información sobre Allianz (PPR), MetLife (Vida) o Mapfre (Autos, Hogar, Empresas). ¿Cuál te interesa?';
        }
      }
      else if (step === 2) {
        // Paso 3: PPR - ofrecer cotización
        if (input.includes('si') || input.includes('cotiz') || input.includes('información')) {
          response = `¡Perfecto! 🎯 Para hacerte una cotización personalizada de tu PPR, necesito algunos datos:\n\n• Tu edad actual\n• Plazo de ahorro que te interesa\n• Aporte mensual que deseas\n\n¿Me compartes tu edad?`;
          setStep(3);
        } else {
          response = '¿Te gustaría obtener atención personalizada con un asesor especializado en PPR? Puedo conectarte por WhatsApp.';
          setStep(5);
        }
      }
      else if (step === 3) {
        // Paso 4: Recibir edad para PPR
        const edad = parseInt(input);
        if (!isNaN(edad) && edad >= 18 && edad <= 70) {
          setFormData({ ...formData, edad });
          response = `Gracias. ¿Qué plazo de ahorro te interesa? (mínimo 10 años)`;
          setStep(31);
        } else {
          response = 'Por favor, ingresa una edad válida (entre 18 y 70 años)';
        }
      }
      else if (step === 31) {
        // Paso 5: Recibir plazo
        const plazo = parseInt(input);
        if (!isNaN(plazo) && plazo >= 10 && plazo <= 40) {
          setFormData({ ...formData, plazo });
          response = `¿Qué aporte mensual te gustaría realizar? (mínimo $3,000)`;
          setStep(32);
        } else {
          response = 'El plazo debe ser entre 10 y 40 años. ¿Cuántos años deseas ahorrar?';
        }
      }
      else if (step === 32) {
        // Paso 6: Recibir aporte
        const aporte = parseInt(input.replace(/[^0-9]/g, ''));
        if (!isNaN(aporte) && aporte >= 3000) {
          setFormData({ ...formData, aporte });
          
          // Guardar en base de datos
          await saveToDatabase({ ...formData, edad: formData.edad!, plazo: formData.plazo!, aporte });
          
          response = `¡Excelente! 🎉 Con esos datos, he generado una proyección preliminar. ¿Te gustaría que un asesor especializado te contacte para mostrarte opciones personalizadas y resolver todas tus dudas?`;
          setStep(6);
        } else {
          response = 'El aporte mensual mínimo es de $3,000. ¿Qué cantidad deseas ahorrar?';
        }
      }
      else if (step === 4) {
        // Paso: Pedir correo para MetLife/Mapfre
        if (input.includes('@') && input.includes('.')) {
          setFormData({ ...formData, email: input });
          response = 'Gracias. Ahora, ¿me podrías dar tu teléfono? 📱';
          setStep(41);
        } else {
          response = '¿Podrías verificar que el correo sea válido? Debe tener @ y .com';
        }
      }
      else if (step === 41) {
        // Paso: Recibir teléfono
        const telefono = input.replace(/\D/g, '');
        if (telefono.length >= 10) {
          setFormData({ ...formData, telefono: input });
          
          // Guardar en base de datos
          await saveToDatabase({ ...formData, telefono: input });
          
          response = `¡Gracias por tus datos! 📋 Un especialista en ${formData.interes} se pondrá en contacto contigo muy pronto. Mientras tanto, ¿te gustaría hablar ya con un asesor por WhatsApp?`;
          setStep(6);
        } else {
          response = 'El teléfono debe tener al menos 10 dígitos. ¿Puedes verificarlo?';
        }
      }
      else if (step === 5) {
        // Paso: Ofrecer WhatsApp
        if (input.includes('si') || input.includes('whats') || input.includes('sí')) {
          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent('¡Hola! Me interesa conocer sobre los PPR y hablar con un asesor.')}`;
          window.open(whatsappUrl, '_blank');
          response = '¡Listo! Te he redirigido a WhatsApp 🚀 Un asesor especializado en PPR te atenderá en segundos.';
        } else {
          response = 'No te preocupes. ¿Hay algo más en lo que pueda ayudarte?';
        }
        setStep(7);
      }
      else if (step === 6) {
        // Paso: Redirigir a WhatsApp
        if (input.includes('si') || input.includes('whats') || input.includes('sí')) {
          const interes = formData.interes || 'seguros';
          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(`¡Hola! Me interesa conocer más sobre ${interes}. Me contacté por el chat de NISSI.`)}`;
          window.open(whatsappUrl, '_blank');
          response = '¡Perfecto! Te he redirigido a WhatsApp. Un asesor te atenderá en segundos.';
        } else {
          response = 'Entendido. Un asesor se pondrá en contacto contigo pronto. ¿Hay algo más en lo que pueda ayudarte?';
        }
        setStep(7);
      }
      else if (step === 7) {
        // Paso final
        if (input.includes('si') || input.includes('ayudar')) {
          response = 'Claro, dime ¿qué más necesitas saber?';
          setStep(1);
        } else {
          response = '¡Gracias por contactarnos! Que tengas un excelente día 🌟';
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

      {/* Ventana del chat - Rectangular */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: -20 }}
            className="fixed bottom-24 left-6 z-50 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Header con gradiente */}
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
                    <span>Online • Respuesta inmediata</span>
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
                  
                  {/* Animación de envío */}
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