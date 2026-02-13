"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Shield } from "lucide-react"

export function MetLifeSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contacto")
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="metlife" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Encabezado de Sección */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <Heart className="w-4 h-4" />
              <span>MetLife</span>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
              Seguros de Vida y Protección Familiar
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Protege a los que más amas con las soluciones de vida de MetLife
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start">
            
            {/* --- BLOQUE VISUAL (Imagen Rosa) --- */}
            <div className="lg:col-span-5 h-full min-h-[400px] md:min-h-[600px] relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
               <img 
                src="/images/Rosa.jpeg" 
                alt="Protección MetLife" 
                className="absolute inset-0 w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* --- BLOQUE DE INFORMACIÓN (Tarjetas) --- */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 hover:border-accent/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
                    <Heart className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>Seguro de Vida</CardTitle>
                  <CardDescription>Protección completa para tu familia</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Protección en caso de fallecimiento</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Cobertura por invalidez total</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Gastos funerarios incluidos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">+20 coberturas adaptables</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent/50 transition-colors bg-accent/5">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
                    <Heart className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>Ahorro Flexible</CardTitle>
                  <CardDescription>Construye tu patrimonio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <p className="text-sm text-muted-foreground mb-1">Aportaciones desde</p>
                    <p className="text-3xl font-bold text-accent">$500 MXN</p>
                    <p className="text-xs text-muted-foreground">mensuales</p>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Rendimientos competitivos</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent/50 transition-colors bg-accent/5 md:col-span-2">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
                    <Heart className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>Pequeños Gigantes</CardTitle>
                  <CardDescription>El futuro de tus hijos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="mb-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
                      <p className="text-sm text-muted-foreground mb-1">Empieza desde</p>
                      <p className="text-3xl font-bold text-accent">$418 MXN</p>
                    </div>
                    <ul className="space-y-3 font-medium">
                      <li className="flex items-start gap-2 italic">Asegura su educación y futuro financiero</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Final */}
          <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-8 md:p-12 text-center border border-accent/20">
            <h3 className="font-display font-bold text-2xl md:text-3xl mb-4 text-foreground">
              Protege a tu familia con MetLife
            </h3>
            <Button size="lg" onClick={scrollToContact} className="bg-accent text-accent-foreground hover:bg-accent/90">
              Solicitar Asesoría Personalizada
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}