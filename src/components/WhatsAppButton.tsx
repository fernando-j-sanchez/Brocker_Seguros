import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const messages = [
  '¿Necesitas ayuda con tu seguro? 🏥',
  'Cotiza tu PPR ahora 📈',
  'Protege a tu familia 👨‍👩‍👧‍👦',
  'Asesoría personalizada 👋',
  '¿Hablamos por WhatsApp? 💬',
  'Te ayudamos a elegir 🤝',
  'Cotización sin compromiso ✅'
];

export const WhatsAppButton = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Mostrar mensaje automático cada 30 segundos
    const messageInterval = setInterval(() => {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 5000);
    }, 30000);
    
    return () => clearInterval(messageInterval);
  }, []);

  const phoneNumber = '5559515885';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent('¡Hola! 👋 Me podrías dar mayor información sobre los productos que manejan, por favor :3')}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Nube de mensaje automática */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="relative bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-2xl shadow-xl max-w-[250px]"
          >
            {/* Botón cerrar */}
            <button 
              onClick={() => setShowMessage(false)}
              className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg"
            >
              <X className="w-3 h-3 text-gray-600" />
            </button>

            {/* Mensaje */}
            <p className="text-sm font-medium">{messages[currentMessage]}</p>
            
            {/* Triángulo */}
            <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-4 h-4 bg-green-600" />
            
            {/* Animación de onda */}
            <motion.div 
              className="absolute inset-0 rounded-2xl border-2 border-white/30"
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón WhatsApp con rebote permanente */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0],
          boxShadow: [
            '0 10px 25px -5px rgba(0,0,0,0.1)',
            '0 20px 35px -5px rgba(37,211,102,0.4)',
            '0 10px 25px -5px rgba(0,0,0,0.1)'
          ]
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          times: [0, 0.2, 0.8, 1]
        }}
        className="block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-lg cursor-pointer transition-colors relative group"
      >
        <MessageCircle className="w-6 h-6" />
        
        {/* Indicador de "online" */}
        <motion.div 
          className="absolute -top-1 -right-1 w-4 h-4 bg-green-300 rounded-full border-2 border-white"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        
        {/* Anillo pulsante */}
        <motion.div 
          className="absolute inset-0 rounded-full border-2 border-white/50"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.a>
    </div>
  );
};