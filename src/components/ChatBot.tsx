import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot, Sparkles } from 'lucide-react';
import { getChatResponse } from '../services/gemini-service';
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant',
      content: '¡Hola! 👋 Soy el asistente virtual de NISSI. ¿Cómo te llamas?', 
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    
    // Agregar mensaje del usuario
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: userMessage, 
      timestamp: new Date() 
    }]);
    
    setIsLoading(true);

    try {
      // Detectar si es el primer mensaje para guardar nombre
      if (messages.length === 1 && !userName) {
        setUserName(userMessage);
      }

      // Preparar historial para OpenAI
      const historyForAI = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      // Obtener respuesta de OpenAI
      const aiResponse = await getChatResponse([
        ...historyForAI,
        { role: 'user', content: userMessage }
      ]);

      // Agregar respuesta del asistente
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: aiResponse || 'Lo siento, no pude procesar tu mensaje.', 
        timestamp: new Date() 
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Lo siento, tuve un problema. ¿Podrías intentar de nuevo?', 
        timestamp: new Date() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Botón del chat */}
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
                    <span>Online • IA avanzada</span>
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
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <motion.div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === 'user' ? 'bg-green-600' : 'bg-blue-600'
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                    </motion.div>
                    <div>
                      <motion.div 
                        className={`p-3 rounded-2xl ${
                          msg.role === 'user' 
                            ? 'bg-green-600 text-white rounded-tr-none' 
                            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-tl-none shadow-sm'
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        {msg.content}
                      </motion.div>
                      <p className="text-xs text-gray-500 mt-1 px-2">
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
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
                  disabled={isLoading}
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
              
              <motion.p 
                className="text-xs text-gray-500 mt-2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                🔒 Chat con IA • Tus datos están seguros
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};