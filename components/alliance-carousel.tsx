"use client"

import { useState } from "react"

export function AllianceCarousel() {
  const [stopScroll, setStopScroll] = useState(false)

  // AQUÍ ESTÁ LA CORRECCIÓN: Rutas exactas a tus archivos numerados
  const images = [
    {
      src: "/images/1.jpeg",
      alt: "OptiMaxx plus - Plan personal de retiro con Allianz",
    },
    {
      src: "/images/2.jpeg",
      alt: "Allianz y Grupo Neuss - Distribuidor Autorizado",
    },
    {
      src: "/images/3.jpeg",
      alt: "Beneficios fiscales para incentivar el ahorro para el retiro",
    },
    {
      src: "/images/4.jpeg",
      alt: "OptiMaxx plus con beneficios fiscales para la jubilación",
    },
    {
      src: "/images/5.jpeg",
      alt: "OptiMaxx plus - ¿Cómo quieres disfrutar tu retiro?",
    },
  ]

  return (
    <>
      <style>{`
        .marquee-inner {
          animation: marqueeScroll linear infinite;
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div
        className="overflow-hidden w-full relative max-w-6xl mx-auto mb-12"
        onMouseEnter={() => setStopScroll(true)}
        onMouseLeave={() => setStopScroll(false)}
      >
        <div className="absolute left-0 top-0 h-full w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-muted/30 to-transparent" />
        <div
          className="marquee-inner flex w-fit"
          style={{
            animationPlayState: stopScroll ? "paused" : "running",
            animationDuration: `${images.length * 3000}ms`,
          }}
        >
          <div className="flex">
            {/* Duplicamos el array para el efecto infinito */}
            {[...images, ...images].map((image, index) => (
              <div
                key={index}
                className="w-64 md:w-80 mx-4 h-[28rem] md:h-[32rem] relative group hover:scale-[0.98] transition-all duration-300"
              >
                <img
                  // Usamos image.src directo porque ya sabemos que existe
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-muted/30 to-transparent" />
      </div>
    </>
  )
}