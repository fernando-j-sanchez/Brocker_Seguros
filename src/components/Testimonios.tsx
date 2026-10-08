import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

type Aseguradora = 'Allianz' | 'MetLife' | 'Mapfre';

interface Testimonio {
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
  producto: string;
  aseguradora: Aseguradora;
}

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?w=160&h=160&fit=crop&crop=faces&auto=format&q=70`;
const retrato = (genero: 'men' | 'women', n: number) => `https://randomuser.me/api/portraits/${genero}/${n}.jpg`;

const testimonios: Testimonio[] = [
  {
    name: 'Roberto Hernández',
    role: 'Director de Operaciones',
    text: 'La flotilla de mi empresa está completamente protegida gracias a Mapfre. El ahorro con la tarifa preferencial es significativo.',
    rating: 5,
    image: unsplash('1472099645785-5658abf4ff4e'),
    producto: 'Autos Flotilla',
    aseguradora: 'Mapfre'
  },
  {
    name: 'Ana Sofía Delgado',
    role: 'Médico',
    text: 'Contraté el plan Superación Plus para mis hijos. Es la mejor inversión que he hecho para asegurar su futuro educativo.',
    rating: 5,
    image: unsplash('1438761681033-6461ffad8d80'),
    producto: 'Superación Plus',
    aseguradora: 'Mapfre'
  },
  {
    name: 'María González',
    role: 'Profesionista',
    text: 'Me ayudaron a planear mi retiro con el PPR de Allianz y ahora estoy más tranquila sobre mi futuro financiero.',
    rating: 5,
    image: unsplash('1487412720507-e7ab37603c6f'),
    producto: 'PPR',
    aseguradora: 'Allianz'
  },
  {
    name: 'Carlos Ramírez',
    role: 'Empresario',
    text: 'Contraté el seguro de gastos médicos para mi familia y la atención ha sido impecable. Los asesores son muy profesionales y siempre están disponibles.',
    rating: 4,
    image: unsplash('1500648767791-00dcc994a43e'),
    producto: 'Gastos Médicos',
    aseguradora: 'Mapfre'
  },
  {
    name: 'Laura Martínez',
    role: 'Gerente de Ventas',
    text: 'El proceso de cotización para mi auto fue rápido y transparente. Encontré la mejor cobertura al mejor precio.',
    rating: 5,
    image: unsplash('1580489944761-15a19d654956'),
    producto: 'Seguro de Auto',
    aseguradora: 'Mapfre'
  },
  {
    name: 'Jorge Mendoza',
    role: 'Ingeniero Civil',
    text: 'Mi contador me recomendó un PPR para deducir impuestos. En NISSI me explicaron todo con calma y ya llevo dos años aportando sin complicaciones.',
    rating: 5,
    image: retrato('men', 32),
    producto: 'PPR',
    aseguradora: 'Allianz'
  },
  {
    name: 'Fernanda Ruiz',
    role: 'Diseñadora Gráfica',
    text: 'Como mamá necesitaba saber que mi hija estaría protegida pasara lo que pasara. El seguro de vida me dio esa tranquilidad y el pago mensual es muy accesible.',
    rating: 5,
    image: retrato('women', 68),
    producto: 'Seguro de Vida',
    aseguradora: 'MetLife'
  },
  {
    name: 'Luis Alberto Torres',
    role: 'Dueño de Restaurante',
    text: 'Aseguramos el restaurante con Protección Empresarial. Cuando tuvimos un corto circuito en la cocina nos acompañaron en todo el proceso.',
    rating: 5,
    image: retrato('men', 46),
    producto: 'Protección Empresarial',
    aseguradora: 'Mapfre'
  },
  {
    name: 'Gabriela Castillo',
    role: 'Contadora',
    text: 'Empecé con el Ahorro Flexible con una aportación pequeña al mes. Es la primera vez que logro ahorrar de forma constante.',
    rating: 5,
    image: retrato('women', 44),
    producto: 'Ahorro Flexible',
    aseguradora: 'MetLife'
  },
  {
    name: 'Miguel Ángel Ortiz',
    role: 'Transportista',
    text: 'Tengo seis camionetas de reparto y conseguí una tarifa de flotilla mucho mejor que asegurando cada unidad por separado.',
    rating: 4,
    image: retrato('men', 75),
    producto: 'Autos Flotilla',
    aseguradora: 'Mapfre'
  },
  {
    name: 'Daniela Vázquez',
    role: 'Arquitecta',
    text: 'Aseguré mi departamento en muy poco tiempo y me resolvieron todas mis dudas por WhatsApp. Súper recomendables.',
    rating: 5,
    image: retrato('women', 26),
    producto: 'Seguro de Hogar',
    aseguradora: 'Mapfre'
  },
  {
    name: 'Ricardo Navarro',
    role: 'Profesor',
    text: 'Ojalá hubiera empezado mi plan de retiro antes. Se lo recomendé a mis hijos y ya también los están asesorando.',
    rating: 5,
    image: retrato('men', 52),
    producto: 'PPR',
    aseguradora: 'Allianz'
  },
  {
    name: 'Paola Jiménez',
    role: 'Emprendedora',
    text: 'Mi tienda en línea ahora está protegida contra ciberataques. No sabía que existía un seguro así hasta que me asesoraron.',
    rating: 5,
    image: retrato('women', 90),
    producto: 'Protección Digital 360',
    aseguradora: 'Mapfre'
  },
  {
    name: 'Andrés Salazar',
    role: 'Abogado',
    text: 'Mi esposa tuvo una cirugía de emergencia y el seguro de gastos médicos respondió sin problema. El acompañamiento del asesor fue clave.',
    rating: 5,
    image: retrato('men', 22),
    producto: 'Gastos Médicos',
    aseguradora: 'Mapfre'
  }
];

const colorAseguradora: Record<Aseguradora, string> = {
  Allianz: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  MetLife: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Mapfre: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
};

const promedio = testimonios.reduce((suma, t) => suma + t.rating, 0) / testimonios.length;
const mitad = Math.ceil(testimonios.length / 2);
const filas = [testimonios.slice(0, mitad), testimonios.slice(mitad)];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5" aria-label={`${rating} de 5 estrellas`}>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
      />
    ))}
  </div>
);

const Tarjeta = ({ t, oculto }: { t: Testimonio; oculto?: boolean }) => (
  // pr-6 en lugar de gap: así las dos copias de la fila miden exactamente lo mismo y el bucle no "salta".
  <div className="pr-6 flex-shrink-0" aria-hidden={oculto}>
    <article className="w-[300px] sm:w-[340px] h-full flex flex-col bg-white dark:bg-gray-700/60 p-6 rounded-2xl shadow-md ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <StarRating rating={t.rating} />
        <Quote className="w-7 h-7 text-blue-600/15 dark:text-blue-300/20" />
      </div>
      <p className="flex-1 text-gray-700 dark:text-gray-200 text-sm leading-relaxed">“{t.text}”</p>
      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100 dark:border-gray-600/60">
        <img
          src={t.image}
          alt={t.name}
          width={48}
          height={48}
          loading="lazy"
          className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-gray-700 shadow"
        />
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-white truncate">{t.name}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{t.role}</p>
        </div>
        <span className={`text-[10px] font-semibold px-2 py-1 rounded-full whitespace-nowrap ${colorAseguradora[t.aseguradora]}`}>
          {t.producto}
        </span>
      </div>
    </article>
  </div>
);

export const Testimonios = () => {
  return (
    <section id="testimonios" className="py-20 bg-gradient-to-b from-white to-blue-50/60 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Miles de familias mexicanas confían en nosotros para proteger su futuro.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white dark:bg-gray-700 shadow-sm ring-1 ring-black/5">
            <StarRating rating={5} />
            <span className="font-bold text-gray-900 dark:text-white">{promedio.toFixed(1)}/5</span>
            <span className="text-sm text-gray-500 dark:text-gray-300">calificación promedio</span>
          </div>
        </motion.div>
      </div>

      {/* Dos filas que se desplazan sin parar en sentidos opuestos */}
      <div className="marquee-contenedor space-y-6">
        {filas.map((fila, i) => (
          <div key={i} className="marquee-mascara overflow-hidden py-2">
            <div className={`marquee-pista flex w-max ${i === 1 ? 'marquee-reversa' : ''}`}>
              {fila.map((t) => (
                <Tarjeta key={t.name} t={t} />
              ))}
              {fila.map((t) => (
                <Tarjeta key={`${t.name}-copia`} t={t} oculto />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
