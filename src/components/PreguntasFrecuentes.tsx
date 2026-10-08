import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Revelar } from './Revelar';

const preguntas = [
  {
    pregunta: '¿La asesoría tiene algún costo?',
    respuesta: 'No. Te asesoramos y te cotizamos sin costo y sin compromiso. Solo pagas la póliza que decidas contratar.'
  },
  {
    pregunta: '¿Qué es un PPR y por qué me conviene?',
    respuesta:
      'Un Plan Personal de Retiro es un ahorro de largo plazo para tu jubilación. Además de hacer crecer tu dinero, tus aportaciones pueden ser deducibles de impuestos dentro de los límites que marca la ley. Con Allianz el plazo mínimo es de 10 años; puedes simular tu ahorro en la calculadora de esta página.'
  },
  {
    pregunta: '¿Qué datos necesito para cotizar?',
    respuesta:
      'Depende del seguro: para vida o retiro, tu edad y cuánto quieres aportar; para gastos médicos, la edad de cada persona y el estado donde viven; para autos, marca, modelo y año. Un asesor te guía en todo.'
  },
  {
    pregunta: '¿Por qué contratar con un agente y no directo con la aseguradora?',
    respuesta:
      'Porque comparamos opciones de varias aseguradoras por ti, te explicamos las letras chiquitas y te acompañamos cuando necesitas usar tu seguro, sin que te cueste más.'
  },
  {
    pregunta: '¿Tienen seguros para empresas?',
    respuesta:
      'Sí. Manejamos flotillas desde 2 vehículos, protección empresarial, gastos médicos para colaboradores y Protección Digital 360 contra ciberriesgos.'
  },
  {
    pregunta: '¿Qué pasa si tengo un siniestro?',
    respuesta:
      'Reporta el siniestro a tu aseguradora y avísanos: te acompañamos en el proceso para que sea lo más rápido y sencillo posible.'
  }
];

export const PreguntasFrecuentes = () => {
  const [abierta, setAbierta] = useState<number | null>(0);

  return (
    <section id="preguntas" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-3xl">
        <Revelar className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Resolvemos tus dudas</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Preguntas frecuentes
          </h2>
        </Revelar>

        <div className="space-y-3">
          {preguntas.map((p, i) => {
            const estaAbierta = abierta === i;
            return (
              <Revelar key={p.pregunta} retraso={i * 0.05}>
                <div
                  className={`rounded-2xl bg-white dark:bg-gray-800 ring-1 transition-shadow ${
                    estaAbierta ? 'ring-blue-200 dark:ring-blue-800 shadow-lg shadow-blue-900/5' : 'ring-black/5 dark:ring-white/10'
                  }`}
                >
                  <button
                    onClick={() => setAbierta(estaAbierta ? null : i)}
                    aria-expanded={estaAbierta}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white">{p.pregunta}</span>
                    <motion.span
                      animate={{ rotate: estaAbierta ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        estaAbierta ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {estaAbierta && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 -mt-1 text-gray-600 dark:text-gray-300 leading-relaxed">{p.respuesta}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Revelar>
            );
          })}
        </div>
      </div>
    </section>
  );
};
