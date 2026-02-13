"use client"

import { useState } from "react"

export function AllianceCarousel() {
  const items = [
    {
      type: "image",
      src: "/images/Rosa.jpeg",
      alt: "Seguro de Vida Rosa",
    },
    {
      type: "video",
      src: "/images/All1.mp4",
      alt: "Allianz Video Institucional 1",
    },
    {
      type: "video",
      src: "/images/All2.mp4",
      alt: "Allianz Video Institucional 2",
    },
  ]

  return (
    <div className="py-12 px-4">
      <h1 className="text-3xl font-semibold text-center mx-auto text-slate-900">
        Nuestras Soluciones de Protección
      </h1>
      <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto mb-10">
        Una colección visual de nuestros trabajos recientes, enfocados en tu seguridad y tranquilidad.
      </p>

      {/* Contenedor del Acordeón */}
      <div className="flex flex-col md:flex-row items-center gap-2 h-[500px] md:h-[450px] w-full max-w-5xl mt-10 mx-auto">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative group flex-grow transition-all w-full md:w-56 rounded-lg overflow-hidden h-full duration-500 hover:md:w-full shadow-md"
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                className="h-full w-full object-cover object-center"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover object-center"
              />
            )}
            
            {/* Overlay sutil para mejorar el aspecto visual */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        ))}
      </div>
    </div>
  )
}