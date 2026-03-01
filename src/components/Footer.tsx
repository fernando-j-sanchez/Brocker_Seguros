import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Facebook, Instagram, Linkedin, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Footer = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    producto: 'allianz',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // 1. Guardar en Supabase
      const { data, error } = await supabase
        .from('contact_leads')
        .insert([
          {
            nombre: formData.nombre,
            email: formData.email,
            telefono: formData.telefono,
            producto: formData.producto,
            mensaje: formData.mensaje
          }
        ]);
      
      if (error) {
        console.error('❌ Error de Supabase:', error);
        setErrorMessage(`Error: ${error.message}`);
      } else {
        console.log('✅ Guardado en Supabase:', data);
        setShowSuccess(true);
        
        // Limpiar formulario
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          producto: 'allianz',
          mensaje: ''
        });
        
        // Ocultar mensaje de éxito después de 3 segundos
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (err) {
      console.error('💥 Error inesperado:', err);
      setErrorMessage('Error de conexión. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const socialVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: (i: number) => ({
      scale: 1,
      rotate: 0,
      transition: { 
        delay: 0.5 + i * 0.1,
        type: "spring",
        stiffness: 200
      }
    }),
    hover: { 
      scale: 1.2,
      rotate: 5,
      transition: { type: "spring", stiffness: 400 }
    }
  };

  return (
    <footer id="contacto" className="bg-gray-900 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{ 
              y: [null, -100],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <motion.div 
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="text-2xl font-bold mb-6"
              whileInView={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 0.5 }}
            >
              Contacto
            </motion.h3>
            <div className="space-y-4">
              {[
                { icon: Phone, text: '5559515885' },
                { icon: Mail, text: 'aargeliasorseguros@yahoo.com' },
                { icon: MapPin, text: 'Ciudad de México' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-3 group"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                  >
                    <item.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </motion.div>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Redes Sociales */}
            <motion.div 
              className="mt-8"
              variants={itemVariants}
            >
              <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61588330452594', color: 'bg-blue-600' },
                  { icon: Instagram, href: 'https://www.instagram.com/NISSI_seguros?igsh=ODJwcnYzNGl3ZXNk', color: 'bg-pink-600' },
                  { icon: Linkedin, href: '#', color: 'bg-blue-700' }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    custom={i}
                    variants={socialVariants}
                    whileHover="hover"
                    className={`${social.color} p-3 rounded-full hover:opacity-90 transition-opacity`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="text-2xl font-bold mb-6"
              whileInView={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 0.5 }}
            >
              Envíanos tu solicitud
            </motion.h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    required
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </motion.div>
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </motion.div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    required
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </motion.div>
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <select
                    value={formData.producto}
                    onChange={(e) => setFormData({...formData, producto: e.target.value})}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="allianz">Allianz PPR</option>
                    <option value="metlife">MetLife</option>
                    <option value="mapfre">Mapfre</option>
                  </select>
                </motion.div>
              </div>

              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <textarea
                  placeholder="Mensaje"
                  value={formData.mensaje}
                  onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                  required
                  rows={4}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </motion.div>

              {/* Mensaje de error si existe */}
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm"
                >
                  {errorMessage}
                </motion.div>
              )}

              <motion.button
                type="submit"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <motion.div 
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      Enviar Solicitud
                    </>
                  )}
                </span>
                
                {/* Animación de envío */}
                {!isSubmitting && (
                  <motion.div 
                    className="absolute inset-0 bg-white/20"
                    animate={{ 
                      x: ['-100%', '100%'],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.button>
            </form>

            {/* Mensaje de éxito */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-3 bg-green-500/20 border border-green-500 rounded-lg flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-500">¡Solicitud enviada con éxito!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div 
          className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm"
          variants={itemVariants}
        >
          <p>&copy; {new Date().getFullYear()} NISSI. Todos los derechos reservados.</p>
        </motion.div>
      </motion.div>
    </footer>
  );
};