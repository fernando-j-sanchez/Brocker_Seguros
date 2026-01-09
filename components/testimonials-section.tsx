import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "María González",
    role: "Profesionista",
    content:
      "Excelente servicio. Me ayudaron a planear mi retiro con el PPR de Allianz y ahora estoy más tranquila sobre mi futuro financiero.",
    rating: 5,
  },
  {
    name: "Carlos Ramírez",
    role: "Empresario",
    content:
      "Contraté el seguro de GMM para mi familia y la atención ha sido impecable. Los asesores son muy profesionales y siempre disponibles.",
    rating: 5,
  },
  {
    name: "Laura Martínez",
    role: "Gerente de Ventas",
    content:
      "El proceso de cotización para mi auto fue rápido y transparente. Encontré la mejor cobertura al mejor precio.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Miles de familias mexicanas confían en nosotros para proteger su futuro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
