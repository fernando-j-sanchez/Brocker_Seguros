import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Calculator, TrendingUp, Heart, Car, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import { Contador, SUAVE } from './Revelar';

const coberturas = [
  { icono: TrendingUp, titulo: 'Retiro', marca: 'PPR Allianz', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/30', progreso: 78 },
  { icono: Heart, titulo: 'Vida', marca: 'MetLife', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30' },
  { icono: Car, titulo: 'Auto', marca: 'Mapfre', color: 'text-red-600 bg-red-50 dark:bg-red-900/30' }
];

const datos = [
  { valor: 10, prefijo: '+', texto: 'años de experiencia' },
  { valor: 3, texto: 'aseguradoras líderes' },
  { fijo: '$0', texto: 'costo de asesoría' },
  { fijo: '24/7', texto: 'asistencia de tu aseguradora' }
];

export const Hero = () => {
  const reducirMovimiento = useReducedMotion();

  const entrada = (retraso: number) => ({
    initial: { opacity: 0, y: reducirMovimiento ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: SUAVE, delay: retraso }
  });

  // Flotación muy lenta de las tarjetas pequeñas (se desactiva con "reducir movimiento")
  const flotar = (retraso: number) =>
    reducirMovimiento
      ? {}
      : { animate: { y: [0, -8, 0] }, transition: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: retraso } };

  return (
    <section id="inicio" className="relative isolate overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      {/* Fondo: degradados suaves y cuadrícula de puntos */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-32 w-[36rem] h-[36rem] rounded-full bg-blue-400/20 dark:bg-blue-600/15 blur-3xl" />
        <div className="absolute top-20 -right-40 w-[32rem] h-[32rem] rounded-full bg-indigo-400/20 dark:bg-indigo-600/15 blur-3xl" />
        <div className="absolute inset-0 fondo-puntos" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
          {/* Texto */}
          <div className="text-center lg:text-left">
            <motion.span
              {...entrada(0.1)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 ring-1 ring-black/5 dark:ring-white/10 shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 backdrop-blur"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Asesoría sin costo · Ciudad de México
            </motion.span>

            <motion.h1
              {...entrada(0.2)}
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-gray-900 dark:text-white"
            >
              Protegemos{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                lo que más te importa
              </span>
            </motion.h1>

            <motion.p
              {...entrada(0.3)}
              className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Más de 10 años ayudando a familias y empresas mexicanas a elegir el seguro correcto con Allianz, MetLife y Mapfre.
            </motion.p>

            <motion.div {...entrada(0.4)} className="mt-9 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#contacto"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/25 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 transition-all"
              >
                Cotiza sin costo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#allianz"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-semibold ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-blue-300 hover:text-blue-700 dark:hover:text-blue-300 transition-all"
              >
                <Calculator className="w-4 h-4" />
                Calcula tu retiro
              </a>
            </motion.div>

            {/* Aseguradoras */}
            <motion.div {...entrada(0.5)} className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Trabajamos con</p>
              <div className="mt-3 flex items-center justify-center lg:justify-start gap-8 text-2xl font-extrabold tracking-tight">
                <a href="#allianz" className="text-gray-400 hover:text-[#003781] dark:hover:text-blue-300 transition-colors">Allianz</a>
                <a href="#metlife" className="text-gray-400 hover:text-[#0090DA] dark:hover:text-sky-300 transition-colors">MetLife</a>
                <a href="#mapfre" className="text-gray-400 hover:text-[#D81E05] dark:hover:text-red-400 transition-colors lowercase">mapfre</a>
              </div>
            </motion.div>
          </div>

          {/* Composición visual */}
          <motion.div
            initial={{ opacity: 0, scale: reducirMovimiento ? 1 : 0.94, y: reducirMovimiento ? 0 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: SUAVE, delay: 0.35 }}
            className="relative max-w-md w-full mx-auto"
          >
            <div className="relative rounded-3xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl shadow-blue-900/10 ring-1 ring-black/5 dark:ring-white/10 p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Tu plan de protección</p>
                  <p className="font-bold text-gray-900 dark:text-white">Familia protegida</p>
                </div>
                <span className="ml-auto text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  Activo
                </span>
              </div>

              <ul className="mt-6 space-y-3">
                {coberturas.map((c, i) => (
                  <motion.li
                    key={c.titulo}
                    initial={{ opacity: 0, x: reducirMovimiento ? 0 : 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: SUAVE, delay: 0.7 + i * 0.12 }}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-gray-900/50"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.color}`}>
                      <c.icono className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{c.titulo}</p>
                      {c.progreso ? (
                        <div className="mt-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${c.progreso}%` }}
                            transition={{ duration: 1.4, ease: SUAVE, delay: 1.1 }}
                          />
                        </div>
                      ) : (
                        <p className="text-xs text-gray-500 dark:text-gray-400">{c.marca}</p>
                      )}
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Tarjetas flotantes */}
            <motion.div
              {...flotar(0)}
              className="absolute -left-4 sm:-left-10 -bottom-6 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black/5 dark:ring-white/10"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-bold text-gray-900 dark:text-white">Cotización rápida</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Sin compromiso</p>
              </div>
            </motion.div>
            <motion.div
              {...flotar(1.5)}
              className="absolute -right-3 sm:-right-8 -top-6 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black/5 dark:ring-white/10"
            >
              <span className="text-lg">🤝</span>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Asesoría personalizada</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Datos clave */}
        <motion.dl
          {...entrada(0.6)}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden bg-gray-200/70 dark:bg-gray-700/60 ring-1 ring-gray-200/70 dark:ring-gray-700/60"
        >
          {datos.map((d) => (
            <div key={d.texto} className="bg-white/90 dark:bg-gray-900/90 px-6 py-6 text-center">
              <dt className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                {d.fijo ?? <Contador valor={d.valor!} prefijo={d.prefijo} />}
              </dt>
              <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400">{d.texto}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
};
