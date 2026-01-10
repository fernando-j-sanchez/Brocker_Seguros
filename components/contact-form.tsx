"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()

    try {
      const { error } = await supabase.from("clientes_potenciales").insert({
        nombre: formData.name,
        telefono: formData.phone,
        correo: formData.email,
        mensaje: formData.message || null,
        servicio_interes: formData.service,
        tiene_simulacion: false,
        fuente: "formulario_contacto",
      })

      if (error) throw error

      setIsSuccess(true)
      toast({
        title: "¡Solicitud recibida exitosamente!",
        description:
          "Nuestros asesores revisarán tu información y se pondrán en contacto contigo muy pronto. ¡Gracias por tu confianza!",
        duration: 6000,
      })
      setFormData({ name: "", email: "", phone: "", service: "", message: "" })

      setTimeout(() => setIsSuccess(false), 3000)
    } catch (error) {
      console.error("[] Error saving to Supabase:", error)
      toast({
        title: "Error al enviar la solicitud",
        description: "Por favor intenta nuevamente o contáctanos directamente por WhatsApp al 55 5951 5885.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contacto" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">Contáctanos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estamos listos para ayudarte a encontrar la mejor solución de protección para ti y tu familia
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Solicita tu Asesoría Gratuita</CardTitle>
                  <CardDescription>Completa el formulario y un asesor se pondrá en contacto contigo</CardDescription>
                </CardHeader>
                <CardContent>
                  {isSuccess ? (
                    <div className="py-12 text-center">
                      <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-foreground mb-2">¡Solicitud Enviada!</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Tu información ha sido recibida exitosamente. Nuestros asesores la revisarán y se comunicarán
                        contigo a la brevedad para ofrecerte la mejor atención personalizada.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nombre Completo *</Label>
                          <Input
                            id="name"
                            required
                            placeholder="Juan Pérez"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Correo Electrónico *</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            placeholder="juan@ejemplo.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Teléfono *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            required
                            placeholder="55 1234 5678"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="service">Servicio de Interés *</Label>
                          <Select
                            value={formData.service}
                            onValueChange={(value) => setFormData({ ...formData, service: value })}
                            required
                          >
                            <SelectTrigger id="service">
                              <SelectValue placeholder="Selecciona un servicio" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ppr">PPR - Plan Personal de Retiro</SelectItem>
                              <SelectItem value="vida">Seguro de Vida</SelectItem>
                              <SelectItem value="gmm">Gastos Médicos Mayores</SelectItem>
                              <SelectItem value="auto">Seguro de Auto</SelectItem>
                              <SelectItem value="multiple">Múltiples Servicios</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Mensaje (opcional)</Label>
                        <Textarea
                          id="message"
                          placeholder="Cuéntanos más sobre tus necesidades..."
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>

                      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? (
                          "Enviando..."
                        ) : (
                          <>
                            Enviar Solicitud <Send className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Teléfono</p>
                        <p className="text-sm text-muted-foreground">55 5951 5885</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Email</p>
                        <p className="text-sm text-muted-foreground">aargeliasorseguros@yahoo.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Oficina</p>
                        <p className="text-sm text-muted-foreground">Ciudad de México, México</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary text-primary-foreground">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-lg mb-2">Horario de Atención</h4>
                  <div className="space-y-1 text-sm">
                    <p>Lunes a Viernes: 9:00 - 18:00</p>
                    <p>Sábados: 10:00 - 14:00</p>
                    <p className="pt-2 text-primary-foreground/80">WhatsApp disponible 24/7</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
