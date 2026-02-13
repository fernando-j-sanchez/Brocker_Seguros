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
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
              Soluciones Integrales de Protección
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Seguros médicos, empresariales, autos y protección digital para personas y negocios
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Car className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Autos Flotilla (Pyme)</CardTitle>
                <CardDescription>Precio especial para empresas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm font-bold text-primary mb-1">
                    ¡Precio de flotilla a partir de solo 2 unidades!
                  </p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Tarifa preferencial para empresas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Coberturas amplia, limitada y RC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Atención especializada para flotas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Gastos Médicos Mayores</CardTitle>
                <CardDescription>Protección de salud completa</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Cobertura en hospitales de primer nivel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Atención ante enfermedades graves</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Cirugías y tratamientos especializados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Red médica nacional e internacional</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Home className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Seguro de Hogar</CardTitle>
                <CardDescription>Tu casa siempre protegida</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Protección contra incendios y robos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Daños por fenómenos naturales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Cobertura de contenidos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Responsabilidad civil</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Protección de Empresas</CardTitle>
                <CardDescription>Desde estéticas hasta grandes negocios</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Protección para negocios y comercios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Desde estéticas hasta grandes empresas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Cobertura de contenidos y equipo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Responsabilidad civil empresarial</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary hover:border-primary/70 transition-colors bg-primary/5 md:col-span-2">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-2">
                  <ShieldAlert className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Protección Digital 360</CardTitle>
                <CardDescription>Ciberriesgos para tu negocio en la era digital</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-semibold text-sm">Protección de Reputación</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Manejo de crisis de comunicación y minimización de publicidad negativa
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <ShieldAlert className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-semibold text-sm">Restauración de Sistema</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Limpieza y desinfección de equipos afectados por virus
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-semibold text-sm">Recuperación de Datos</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Rescate de información ante fallos lógicos, electrónicos o mecánicos
                    </p>
                  </div>
                </div>
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
                      <DollarSign className="w-5 h-5 text-primary" />
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
                      <Info className="w-5 h-5 text-primary" />
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
                      <Info className="w-5 h-5 text-primary" />
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
                      <Shield className="w-5 h-5 text-primary" />
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

          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 md:p-12 text-center border border-primary/20">
            <h3 className="font-display font-bold text-2xl md:text-3xl mb-4 text-foreground">
              Soluciones Mapfre para personas y negocios
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Nuestros asesores especializados te ayudarán a encontrar la mejor protección para ti y tu empresa
            </p>
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Solicitar Asesoría Personalizada
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
