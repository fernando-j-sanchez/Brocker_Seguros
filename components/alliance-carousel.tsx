"use client"

import { useState, useRef } from "react"

export function AllianceCarousel() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const items = [
    {
      type: "image",
      src: "/images/Rosa.jpeg",
      alt: "Seguro de Vida Rosa",
    },
    {
      type: "video",
      src: "/images/All1.mp4",
      alt: "Allianz Video 1",
    },
    {
      type: "video",
      src: "/images/All2.mp4",
      alt: "Allianz Video 2",
    },
  ]

  return (
    <div className="py-12 px-4 bg-white">
      <h1 className="text-3xl font-bold text-center mx-auto text-slate-900 uppercase tracking-wider">
        FRAMS
      </h1>
      <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto mb-10">
        Protección integral a tu medida. Calidad y confianza en cada detalle.
      </p>

      {/* Contenedor responsivo: 
          - En móvil: Columna (flex-col) con altura automática.
          - En PC: Fila (flex-row) con altura fija.
      */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-6xl mx-auto h-auto md:h-[500px]">
        {items.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`
              relative overflow-hidden rounded-2xl transition-all duration-700 ease-in-out shadow-xl
              w-full md:flex-grow
              ${hoveredIndex === index ? "h-[400px] md:h-full md:flex-[3]" : "h-[150px] md:h-full md:flex-[1]"}
            `}
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  hoveredIndex === index ? "md:object-contain bg-black" : "object-cover"
                }`}
                autoPlay
                loop
                playsInline
                // Aquí activamos el sonido solo si el mouse está encima
                muted={hoveredIndex !== index}
              />
            ) : (
              <img
                src={item.src}
                alt={item.alt}
                className={`w-full h-full transition-all duration-700 ${
                  hoveredIndex === index ? "md:object-contain bg-gray-50" : "object-cover"
                }`}
              />
            )}

            {/* Texto que aparece solo al expandirse */}
            <div className={`absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-500 ${
              hoveredIndex === index ? "opacity-100" : "opacity-0"
            }`}>
              <p className="text-white font-medium text-lg">{item.alt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}