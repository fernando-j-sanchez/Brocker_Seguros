"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

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
      src: "/images/All2.mp4", 
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
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight uppercase">FRAMS</h2>
        <p className="text-slate-500 mt-4 text-lg">Tu seguridad es nuestra prioridad.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sections.map((item) => (
          <div 
            key={item.id}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100"
            onMouseEnter={() => setActiveVideo(item.id)}
            onMouseLeave={() => setActiveVideo(null)}
          >
            <div className="relative h-[400px] w-full bg-white overflow-hidden flex items-center justify-center">
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
                  // CAMBIO DEFINITIVO: object-none mantiene el tamaño real de la imagen Rosa
                  className="object-none" 
                />
              )}
              
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full shadow-sm border border-slate-200">
                <span className="text-[10px] font-bold uppercase text-slate-700 tracking-widest">{item.brand}</span>
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-semibold text-slate-800">{item.title}</h3>
              <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                {item.description}
              </p>
              
              {/* Enlace directo al ID de contacto para asegurar el salto */}
              <Button asChild className="mt-6 w-full py-6 bg-slate-900 text-white rounded-xl font-medium transition-all hover:bg-blue-900">
                <a href="#contacto">
                  Saber más
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}