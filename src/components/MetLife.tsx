import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Users, Gift, CheckCircle, TrendingUp, Baby, Phone, Star, Award, Clock, ThumbsUp } from 'lucide-react';
import { VideoPlayer } from './VideoPlayer';

export const MetLife = () => {
  const features = [
    {
      icon: Shield,
      title: "Protección integral",
      description: "Cobertura completa para situaciones inesperadas."
    },
    {
      icon: Heart,
      title: "Seguro de vida",
      description: "Garantiza el bienestar de tus seres queridos."
    },
    {
      icon: Users,
      title: "Plan familiar",
      description: "Toda tu familia bajo una sola póliza."
    },
    {
      icon: Gift,
      title: "Beneficios extra",
      description: "Programas de bienestar y descuentos exclusivos."
    }
  ];

  const products = [
    {
      name: 'Seguro de Vida',
      icon: Heart,
      description: 'Protección completa para tu familia',
      benefits: [
        'Protección por fallecimiento e invalidez',
        'Suma asegurada personalizada',
        'Pagos mensuales, trimestrales o anuales',
        'Gastos funerarios incluidos'
      ],
      extraIcons: [
        { icon: Shield, label: '24/7' },
        { icon: Star, label: 'Global' },
        { icon: Award, label: 'Respaldo' }
      ]
    },
    {
      name: 'Ahorro Flexible',
      icon: TrendingUp,
      description: 'Construye tu patrimonio',
      price: '500',
      period: 'mensuales',
      benefits: [
        'Ahorro con protección de vida',
        'Flexibilidad en montos',
        'Rendimientos competitivos',
        'Sin penalizaciones'
      ],
      extraIcons: [
        { icon: Clock, label: 'Plazos' },
        { icon: TrendingUp, label: 'Rendimiento' },
        { icon: ThumbsUp, label: 'Fácil' }
      ]
    },
  ];

  const handleContactClick = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="metlife" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        
        {/* Título Principal */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-blue-900 dark:text-white uppercase tracking-tighter">
            MetLife <span className="text-blue-500">Seguros</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">La protección que tu familia merece con respaldo internacional.</p>
        </div>

        {/* Bloque Superior: Video + Features Grid */}
        <div className="flex flex-col lg:flex-row overflow-hidden rounded-3xl shadow-2xl bg-white dark:bg-gray-800 border dark:border-gray-700 mb-12">
          
          {/* Video (50%) */}
          <div className="lg:w-1/2 bg-black relative min-h-[350px]">
            <VideoPlayer videoSrc="/videos/All2.mp4" />
            <style>{`video { width: 100%; height: 100%; object-fit: cover; }`}</style>
          </div>

          {/* Features Grid (50%) - Aquí aprovechamos el espacio al lado del video */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white dark:bg-gray-800">
            <h3 className="text-2xl font-bold mb-6 text-blue-900 dark:text-white">¿Por qué elegir MetLife?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm uppercase tracking-wide">{feature.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t dark:border-gray-700">
               <button onClick={handleContactClick} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 dark:shadow-none">
                 <Phone size={18}/> Solicitar Asesoría MetLife
               </button>
            </div>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col h-full"
            >
              <div className="p-6 flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-xl">
                    <product.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-black text-gray-800 dark:text-white uppercase text-sm tracking-tight">{product.name}</h3>
                </div>
                
                <p className="text-xs text-gray-500 mb-4">{product.description}</p>
                
                {product.price && (
                  <div className="mb-4">
                    <span className="text-2xl font-black text-blue-600">${product.price}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase ml-1">MXN / {product.period}</span>
                  </div>
                )}
                
                <ul className="space-y-2 mb-6">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="text-[11px] text-gray-600 dark:text-gray-300 flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer de la tarjeta con mini iconos */}
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t dark:border-gray-700 grid grid-cols-3 gap-1 rounded-b-2xl">
                {product.extraIcons.map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <item.icon className="w-4 h-4 text-blue-400 mb-1" />
                    <span className="text-[8px] text-gray-400 font-bold uppercase text-center">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nota de confianza */}
        <div className="p-6 bg-blue-900 text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-2xl">
                <Shield size={32} className="text-blue-300" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Respaldo Total</h4>
                <p className="text-blue-200 text-xs">Más de 150 años protegiendo lo que más importa a nivel mundial.</p>
              </div>
           </div>
           <button onClick={handleContactClick} className="px-8 py-3 bg-white text-blue-900 rounded-xl font-black text-sm uppercase hover:bg-blue-50 transition-colors shrink-0">
              Ver coberturas
           </button>
        </div>
      </div>
    </section>
  );
};