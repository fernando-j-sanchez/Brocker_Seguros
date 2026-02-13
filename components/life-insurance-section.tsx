"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Shield, Building2 } from "lucide-react"

export function LifeInsuranceSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contacto")
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="allianz" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* --- BLOQUE VISUAL (Video Allianz) --- */}
            <div className="w-full lg:w-1/2 h-[500px] relative rounded-[2rem] overflow-hidden shadow-2xl">
              <video 
                src="/images/All1.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-blue-900/20" />
            </div>

            {/* --- TEXTO Y BENEFICIOS --- */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold uppercase tracking-widest">
                <Building2 className="w-4 h-4" />
                <span>Allianz Expertise</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Protección y Ahorro con Respaldo Global
              </h2>
              <p className="text-lg text-slate-600">
                En FRAMS te ofrecemos las mejores estrategias de Allianz para asegurar tu futuro financiero y el de tu familia.
              </p>
              
              <div className="grid gap-4">
                {[
                  "Seguros de Vida de alta gama",
                  "Planes Personales de Retiro (PPR)",
                  "Estrategias fiscales para el ahorro",
                  "Atención VIP y asesoría continua"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-700">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" onClick={scrollToContact} className="bg-blue-800 hover:bg-blue-900 text-white px-10">
                Ver Planes de Allianz
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}