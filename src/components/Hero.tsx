import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Heart, Home, Car, ArrowRight } from 'lucide-react';

export const Hero = () => {
  const services = [
    { 
      icon: TrendingUp, 
      title: 'PPR Allianz', 
      color: 'bg-blue-50 dark:bg-blue-900/20', 
      textColor: 'text-blue-600',
      href: '#allianz',
      delay: 0.4 
    },
    { 
      icon: Heart, 
      title: 'Vida MetLife', 
      color: 'bg-green-50 dark:bg-green-900/20', 
      textColor: 'text-green-600',
      href: '#metlife',
      delay: 0.5 
    },
    { 
      icon: Home, 
      title: 'Hogar Mapfre', 
      color: 'bg-red-50 dark:bg-red-900/20', 
      textColor: 'text-red-600',
      href: '#mapfre',
      delay: 0.6 
    },
    { 
      icon: Car, 
      title: 'Autos', 
      color: 'bg-purple-50 dark:bg-purple-900/20', 
      textColor: 'text-purple-600',
      href: '#mapfre', // Autos lleva a Mapfre
      delay: 0.7 
    }
  ];

  // Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 200, delay: 0.2 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.1, type: "spring", stiffness: 100 }
    }),
    hover: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 400 }
    },
    tap: { scale: 0.95 }
  };

  // Estado para el color del texto "lo que más te importa"
  const [hoverColor, setHoverColor] = React.useState('text-blue-600');

  return (
    <section className="pt-24 pb-16 px-4 relative overflow-hidden">
      {/* Elementos decorativos flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              scale: 0 
            }}
            animate={{ 
              y: [null, -100],
              scale: [0, 1, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <motion.div 
        className="container mx-auto text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span
          variants={badgeVariants}
          className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-6"
        >
          NISSI - Tu broker de seguros de confianza
        </motion.span>
        
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Protegemos{' '}
          <motion.span 
            className={hoverColor}
            animate={{ color: hoverColor }}
            transition={{ duration: 0.5 }}
          >
            lo que más te importa
          </motion.span>
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Más de 10 años protegiendo a familias mexicanas con las mejores aseguradoras del mercado
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {/* Botones principales con hover que cambian el color del texto */}
          {[
            { text: 'PPR Allianz', color: 'blue', href: '#allianz' },
            { text: 'MetLife', color: 'green', href: '#metlife' },
            { text: 'Mapfre', color: 'red', href: '#mapfre' }
          ].map((item, i) => (
            <motion.a
              key={item.text}
              href={item.href}
              custom={i}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onHoverStart={() => setHoverColor(`text-${item.color}-600`)}
              onHoverEnd={() => setHoverColor('text-blue-600')}
              className={`px-6 py-3 bg-${item.color}-600 text-white rounded-lg hover:bg-${item.color}-700 transition-colors font-medium relative overflow-hidden group cursor-pointer`}
            >
              <span className="relative z-10">{item.text}</span>
              <motion.div 
                className={`absolute inset-0 bg-${item.color}-400`}
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          {services.map((service) => (
            <motion.a
              key={service.title}
              href={service.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: service.delay }}
              whileHover={{ 
                y: -5,
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)"
              }}
              onHoverStart={() => setHoverColor(service.textColor)}
              onHoverEnd={() => setHoverColor('text-blue-600')}
              className={`${service.color} p-4 rounded-xl text-center cursor-pointer relative overflow-hidden group`}
            >
              <motion.div 
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <service.icon className={`w-8 h-8 mx-auto mb-2 ${service.textColor} group-hover:scale-110 transition-transform`} />
              <span className={`text-sm font-medium ${service.textColor}`}>{service.title}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.a
            href="#contacto"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium group"
            whileHover={{ x: 10 }}
          >
            <span>Habla con un asesor</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};