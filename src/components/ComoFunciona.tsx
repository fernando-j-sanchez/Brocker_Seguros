import React from 'react';
import { MessageSquareText, Scale, ShieldCheck } from 'lucide-react';
import { Revelar } from './Revelar';

const pasos = [
  {
    icono: MessageSquareText,
    titulo: 'Cuéntanos qué necesitas',
    texto: 'Escríbenos por el asistente, WhatsApp o el formulario. Solo te pedimos lo básico para entender tu caso.'
  },
  {
    icono: Scale,
    titulo: 'Comparamos por ti',
    texto: 'Revisamos opciones de Allianz, MetLife y Mapfre y te explicamos las coberturas en palabras sencillas.'
  },
  {
    icono: ShieldCheck,
    titulo: 'Quedas protegido',
    texto: 'Te acompañamos en la contratación y estamos contigo cuando necesites usar tu seguro.'
  }
];

export const ComoFunciona = () => (
  <section id="como-funciona" className="py-20 px-4 bg-white dark:bg-gray-900">
    <div className="container mx-auto max-w-6xl">
      <Revelar className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Así de fácil</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          ¿Cómo funciona?
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Contratar un seguro no tiene por qué ser complicado. Nosotros hacemos la parte difícil.
        </p>
      </Revelar>

      <ol className="relative grid md:grid-cols-3 gap-6 md:gap-8">
        {/* Línea que une los pasos en escritorio */}
        <div aria-hidden="true" className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-800 to-transparent" />
        {pasos.map((p, i) => (
          <Revelar key={p.titulo} retraso={i * 0.12}>
            <li className="relative h-full text-center px-6 pt-2 pb-8 rounded-3xl hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
              <div className="relative mx-auto w-20 h-20 rounded-3xl bg-white dark:bg-gray-800 shadow-lg shadow-blue-900/5 ring-1 ring-black/5 dark:ring-white/10 flex items-center justify-center">
                <p.icono className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-sm font-bold flex items-center justify-center shadow">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">{p.titulo}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">{p.texto}</p>
            </li>
          </Revelar>
        ))}
      </ol>
    </div>
  </section>
);
