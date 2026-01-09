"use client"

import { useState } from "react"

export function AllianceCarousel() {
  const [stopScroll, setStopScroll] = useState(false)

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

        /* Pausar la animación si se está interactuando */
        .marquee-inner.paused {
          animation-play-state: paused;
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
        // Añadimos padding vertical (py-10) para que las imágenes tengan espacio al crecer
        // y no se corten por el overflow-hidden del contenedor principal.
        className="overflow-hidden w-full relative max-w-6xl mx-auto mb-12 py-10"
        onMouseEnter={() => setStopScroll(true)}
        onMouseLeave={() => setStopScroll(false)}
        onTouchStart={() => setStopScroll(true)}
        onTouchEnd={() => setStopScroll(false)}
      >
        <div className="absolute left-0 top-0 h-full w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-muted/30 to-transparent" />
        <div
          // Usamos una clase CSS para pausar la animación, lo que es más fluido
          className={`marquee-inner flex w-fit ${stopScroll ? "paused" : ""}`}
          style={{
            // Mantenemos la velocidad lenta de 6 segundos por imagen
            animationDuration: `${images.length * 6000}ms`,
          }}
        >
          <div className="flex items-center">
            {[...images, ...images].map((image, index) => (
              <div
                key={index}
                // --- CAMBIOS CLAVE AQUÍ ---
                // 1. hover:scale-110: Agranda la tarjeta un 10% al pasar el mouse.
                // 2. hover:z-30: Trae la tarjeta al frente de las demás.
                // 3. transition-all duration-500 ease-in-out: Suaviza mucho el efecto de crecimiento.
                // 4. group-hover:bg-white group-hover:shadow-2xl: Añade fondo y sombra solo al hacer hover para resaltar.
                className="w-64 md:w-80 mx-4 h-[28rem] md:h-[32rem] relative group hover:scale-110 hover:z-30 transition-all duration-500 ease-in-out rounded-xl group-hover:bg-white group-hover:shadow-2xl"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  // --- CAMBIOS CLAVE AQUÍ ---
                  // 1. object-cover: Por defecto, la imagen llena la tarjeta (se ve bonita pero cortada).
                  // 2. group-hover:object-contain: Al hacer hover, la imagen se ajusta para verse COMPLETA y poder leerse.
                  // 3. Quitamos el padding (p-2) para que llene el espacio.
                  className="w-full h-full object-cover group-hover:object-contain rounded-xl transition-all duration-500 ease-in-out"
                />
                {/* Degradado decorativo: Lo ocultamos al hacer hover para que no estorbe la lectura */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-xl opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-muted/30 to-transparent" />
      </div>
    </>
  )
}