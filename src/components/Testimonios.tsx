import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonios = [
  {
    name: 'Roberto Hernandez',
    role: 'Director de Operaciones',
    text: 'La flotilla de mi empresa está completamente protegida gracias a Mapfre. El ahorro con la tarifa preferencial es significativo.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  },
  {
    name: 'Ana Sofía Delgado',
    role: 'Médico',
    text: 'Contraté el plan Superaciñon Plus de Mapre para mis hijos. Es la mejor inversión que he hecho para asegurar su futuro educativo.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  },
  {
    name: 'Maria González',
    role: 'Profesionista',
    text: 'Excelente servicio. Me ayudaron a planear mi retiro con el PPR de Allianz y ahora estoy más tranquila sobre mi futuro financiero.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop'
  },
  {
    name: 'Carlos Ramírez',
    role: 'Empresario',
    text: 'Contraté el seguro de GMM para mi familia y la atención ha sido impecable. Los asesores son muy profesionales y siempre disponibles.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
  },
  {
    name: 'Laura Martínez',
    role: 'Gerente de Ventas',
    text: 'El proceso de cotización para mi auto fue rápido y transparente. Encontré la mejor cobertura al mejor precio.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXVqZXJ8ZW58MHx8MHx8fDA%3D'
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <motion.div 
      className="flex space-x-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 * i, type: "spring", stiffness: 300 }}
        >
          <Star
            className={`w-4 h-4 ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export const Testimonios = () => {
  return (
    <section id="testimonios" className="py-16 px-4 bg-white dark:bg-gray-800 overflow-hidden relative">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400/10"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              rotate: 0
            }}
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            <Quote className="w-12 h-12" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-3xl font-bold mb-4"
            whileInView={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 0.5 }}
          >
            Lo que dicen nuestros clientes
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Miles de familias mexicanas confían en nosotros para proteger su futuro.
          </motion.p>
        </motion.div>

        <div className="relative">
          <motion.div 
            className="flex overflow-hidden space-x-6 group"
            whileHover={{ cursor: "grab" }}
          >
            <motion.div
              animate={{ x: [0, -1920] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
              className="flex space-x-6 group-hover:[animation-play-state:paused]"
            >
              {[...testimonios, ...testimonios].map((testimonio, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-80 bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)"
                  }}
                >
                  <motion.div 
                    className="flex items-center space-x-4 mb-4"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <motion.img
                      src={testimonio.image}
                      alt={testimonio.name}
                      className="w-12 h-12 rounded-full object-cover"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    />
                    <div>
                      <h4 className="font-semibold">{testimonio.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonio.role}</p>
                    </div>
                  </motion.div>
                  <StarRating rating={testimonio.rating} />
                  <motion.p 
                    className="mt-3 text-gray-700 dark:text-gray-300 text-sm"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    "{testimonio.text}"
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};