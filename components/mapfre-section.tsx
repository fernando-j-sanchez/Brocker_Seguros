"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Shield, DollarSign, FileText, Info, Building2, Home, ShieldAlert, Car } from "lucide-react"

export function MapfreSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contacto")
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="mapfre" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              <span>Mapfre</span>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground text-red-600">
              Soluciones Integrales de Protección
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Seguros médicos, empresariales y protección digital con el respaldo de Mapfre
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start">
            
            {/* --- BLOQUE VISUAL (Video de Mapfre) --- */}
            <div className="lg:col-span-5 h-[500px] md:h-[700px] relative rounded-3xl overflow-hidden shadow-2xl group border-4 border-white">
               <video 
                src="/images/All2.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 via-transparent to-transparent" />
            </div>

            {/* --- BLOQUE DE TARJETAS --- */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 hover:border-red-500/50 transition-colors">
                <CardHeader>
                  <Car className="w-10 h-10 text-red-600 mb-2" />
                  <CardTitle>Autos Flotilla</CardTitle>
                  <CardDescription>A partir de 2 unidades</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic mb-2">¡Tarifa preferencial para Pymes!</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">✓ Cobertura Amplia y RC</li>
                    <li className="flex gap-2">✓ Atención especializada</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-red-500/50 transition-colors">
                <CardHeader>
                  <FileText className="w-10 h-10 text-red-600 mb-2" />
                  <CardTitle>Gastos Médicos</CardTitle>
                  <CardDescription>Hospitales de primer nivel</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">✓ Enfermedades graves</li>
                    <li className="flex gap-2">✓ Red médica nacional</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Tarjeta de Protección Digital Ocupando 2 columnas */}
              <Card className="md:col-span-2 border-2 border-red-100 bg-red-50/30">
                <CardHeader>
                  <ShieldAlert className="w-10 h-10 text-red-600 mb-2" />
                  <CardTitle>Protección Digital 360</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                   <p className="text-sm text-muted-foreground">Recuperación de datos y manejo de crisis de reputación ante ciberataques.</p>
                   <p className="text-sm text-muted-foreground font-semibold">Cuidado total de tu empresa en la era digital.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 text-center border border-red-200">
            <h3 className="font-display font-bold text-2xl mb-4 text-slate-900">Soluciones Mapfre para tu negocio</h3>
            <Button onClick={scrollToContact} className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 h-auto text-lg">
              Solicitar Cotización
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}