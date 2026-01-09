"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Heart, Shield } from "lucide-react"

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            Asesoría profesional disponible ahora
          </div>

          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-balance mb-6 text-foreground">
            Asegura tu futuro financiero con confianza
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground text-balance mb-8 leading-relaxed">
            Soluciones integrales de seguros para proteger lo que más valoras: tu retiro, tu salud y tu patrimonio
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" className="w-full sm:w-auto" onClick={() => scrollToSection("ppr")}>
              Simula tu Retiro <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-transparent"
              onClick={() => scrollToSection("contacto")}
            >
              Hablar con un Asesor
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => scrollToSection("ppr")}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-card-foreground">PPR Allianz</h3>
              <p className="text-sm text-muted-foreground">Planea tu retiro con rendimientos del 13% anual</p>
            </div>

            <div
              className="p-6 rounded-xl bg-card border border-border hover:border-accent/50 transition-colors cursor-pointer"
              onClick={() => scrollToSection("metlife")}
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 mx-auto">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-card-foreground">Vida MetLife</h3>
              <p className="text-sm text-muted-foreground">Protege a tu familia desde $280 MXN mensuales</p>
            </div>

            <div
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => scrollToSection("mapfre")}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-card-foreground">Soluciones Mapfre</h3>
              <p className="text-sm text-muted-foreground">GMM, Autos, Empresas y Ciberriesgos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
