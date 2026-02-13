"use client"

import { useState } from "react"

export function InsuranceServices() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null)

  const sections = [
    {
      id: 1,
      brand: "Allianz",
      type: "video",
      src: "/images/All1.mp4",
      title: "Excelencia con Allianz",
      description: "Planes de ahorro y retiro con respaldo internacional."
    },
    {
      id: 2,
      brand: "MetLife",
      type: "video",
      src: "/images/All2.mp4", // Mencionaste que All2 va aquí
      title: "Protección MetLife",
      description: "Seguros de vida diseñados para tu tranquilidad y la de los tuyos."
    },
    {
      id: 3,
      brand: "Mapfre",
      type: "image",
      src: "/images/Rosa.jpeg",
      title: "Soluciones Mapfre",
      description: "Cuidado integral y asistencia personalizada en todo momento."
    }
  ]

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Nuestros Aliados</h2>
        <p className="text-slate-500 mt-4 text-lg">En FRAMS trabajamos con los mejores para tu seguridad.</p>
      </div>

      {/* Grid Responsivo: 1 columna en móvil, 3 en escritorio */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sections.map((item) => (
          <div 
            key={item.id}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:-translate-y-2"
            onMouseEnter={() => setActiveVideo(item.id)}
            onMouseLeave={() => setActiveVideo(null)}
          >
            {/* Contenedor de Media */}
            <div className="relative h-[450px] w-full overflow-hidden">
              {item.type === "video" ? (
                <video
                  src={item.src}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  playsInline
                  muted={activeVideo !== item.id}
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              
              {/* Badge de la Marca */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full shadow-sm">
                <span className="text-xs font-bold uppercase text-slate-700">{item.brand}</span>
              </div>
            </div>

            {/* Información Personalizada */}
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-slate-800">{item.title}</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                {item.description}
              </p>
              <button className="mt-6 w-full py-3 bg-slate-900 text-white rounded-xl font-medium transition-colors hover:bg-slate-700">
                Saber más
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}