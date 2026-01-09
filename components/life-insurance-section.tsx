"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Heart, Shield, DollarSign, FileText, Info, Building2 } from "lucide-react"

export function LifeInsuranceSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contacto")
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="vida-gmm" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <Heart className="w-4 h-4" />
              <span>MetLife & Mapfre</span>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
              Seguros de Vida, Gastos Médicos y Protección Empresarial
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Protección integral para ti, tu familia y tu negocio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Seguro de Vida</CardTitle>
                <CardDescription className="text-xs">MetLife</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Protección en caso de fallecimiento</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Cobertura por invalidez total y permanente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Suma asegurada personalizada según tus necesidades
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Pagos flexibles: mensual, trimestral o anual</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Gastos Médicos Mayores</CardTitle>
                <CardDescription className="text-xs">Mapfre</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Cobertura en hospitales de primer nivel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Atención ante enfermedades graves</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Cirugías y tratamientos especializados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Red médica nacional e internacional</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
                  <Building2 className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Protección de Empresas</CardTitle>
                <CardDescription className="text-xs">Mapfre</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Protección para negocios y comercios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Desde estéticas hasta grandes empresas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Cobertura de contenidos y equipo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Responsabilidad civil empresarial</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Conceptos Clave que Debes Conocer</CardTitle>
              <CardDescription>Entiende los términos importantes de tu póliza de seguros</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="prima">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-accent" />
                      <span>Prima</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Es el pago periódico (mensual, trimestral o anual) que realizas a la aseguradora para mantener
                      activa tu póliza. A cambio de este pago, la aseguradora se compromete a protegerte ante los
                      siniestros cubiertos en tu contrato.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="deducible">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Info className="w-5 h-5 text-accent" />
                      <span>Deducible</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Es la cantidad fija que tú pagas de tu bolsillo antes de que el seguro comience a cubrir los
                      gastos. Por ejemplo, si tu deducible es de $15,000 y tienes gastos médicos por $50,000, tú pagas
                      los primeros $15,000 y el seguro cubre el resto (sujeto al coaseguro si aplica).
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="coaseguro">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Info className="w-5 h-5 text-accent" />
                      <span>Coaseguro</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Es el porcentaje de los gastos que tú pagas después del deducible. Comúnmente es 10% o 20%.
                      Siguiendo el ejemplo anterior: después de tu deducible de $15,000, quedan $35,000. Si tu coaseguro
                      es del 10%, pagas $3,500 adicionales y el seguro cubre $31,500. Tu total a pagar sería $18,500.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="suma-asegurada">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-accent" />
                      <span>Suma Asegurada</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Es el monto máximo que la aseguradora pagará por concepto de reclamaciones cubiertas durante la
                      vigencia de tu póliza. En seguros de vida, es la cantidad que recibirán tus beneficiarios. En GMM,
                      es el límite anual de cobertura para gastos médicos. Es importante elegir una suma asegurada
                      adecuada a tus necesidades.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-8 md:p-12 text-center border border-accent/20">
            <h3 className="font-display font-bold text-2xl md:text-3xl mb-4 text-foreground">
              ¿Listo para proteger a tu familia y negocio?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Nuestros asesores te ayudarán a encontrar el plan perfecto según tus necesidades y presupuesto
            </p>
            <Button size="lg" onClick={scrollToContact} className="bg-accent text-accent-foreground hover:bg-accent/90">
              Solicitar Asesoría Personalizada
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
