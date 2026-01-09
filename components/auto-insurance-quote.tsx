"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Car, Check, Shield, Users } from "lucide-react"

export function AutoInsuranceQuote() {
  const [numberOfVehicles, setNumberOfVehicles] = useState("2")
  const [brand, setBrand] = useState("")
  const [model, setModel] = useState("")
  const [year, setYear] = useState("")
  const [version, setVersion] = useState("")
  const [coverage, setCoverage] = useState<string>("")
  const [showQuote, setShowQuote] = useState(false)

  const handleQuote = () => {
    if (numberOfVehicles && brand && model && year && coverage) {
      setShowQuote(true)
    }
  }

  const getCoverageDetails = () => {
    switch (coverage) {
      case "amplia":
        return {
          name: "Cobertura Amplia",
          features: [
            "Daños materiales por colisión, vuelco o caída",
            "Robo total del vehículo",
            "Responsabilidad civil por daños a terceros",
            "Gastos médicos ocupantes",
            "Asistencia vial 24/7",
            "Auto sustituto",
          ],
        }
      case "limitada":
        return {
          name: "Cobertura Limitada",
          features: [
            "Robo total del vehículo",
            "Responsabilidad civil por daños a terceros",
            "Gastos médicos ocupantes",
            "Asistencia vial 24/7",
          ],
        }
      case "rc":
        return {
          name: "Responsabilidad Civil",
          features: [
            "Responsabilidad civil por daños a terceros",
            "Gastos médicos ocupantes (básico)",
            "Asistencia legal",
          ],
        }
      default:
        return { name: "", features: [] }
    }
  }

  const coverageInfo = getCoverageDetails()

  return (
    <section id="autos" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Mapfre Flotillas
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
              Seguro de Flotilla de Autos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Protección especializada para 2 o más vehículos con tarifas preferenciales
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Datos de tu Flotilla</CardTitle>
                <CardDescription>Completa la información para generar tu cotización especializada</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="vehicles">Número de Vehículos</Label>
                  <Select value={numberOfVehicles} onValueChange={setNumberOfVehicles}>
                    <SelectTrigger id="vehicles">
                      <SelectValue placeholder="Selecciona cantidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 vehículos</SelectItem>
                      <SelectItem value="3">3 vehículos</SelectItem>
                      <SelectItem value="4">4 vehículos</SelectItem>
                      <SelectItem value="5">5 vehículos</SelectItem>
                      <SelectItem value="6-10">6-10 vehículos</SelectItem>
                      <SelectItem value="11+">11+ vehículos</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Flotillas desde 2 vehículos en adelante</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Marca (vehículo principal)</Label>
                  <Select value={brand} onValueChange={setBrand}>
                    <SelectTrigger id="brand">
                      <SelectValue placeholder="Selecciona la marca" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nissan">Nissan</SelectItem>
                      <SelectItem value="toyota">Toyota</SelectItem>
                      <SelectItem value="honda">Honda</SelectItem>
                      <SelectItem value="mazda">Mazda</SelectItem>
                      <SelectItem value="volkswagen">Volkswagen</SelectItem>
                      <SelectItem value="chevrolet">Chevrolet</SelectItem>
                      <SelectItem value="ford">Ford</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Modelo</Label>
                  <Input
                    id="model"
                    placeholder="Ej: Sentra, Corolla, Civic"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Año</Label>
                  <Select value={year} onValueChange={setYear}>
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Año del vehículo" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                        <SelectItem key={y} value={y.toString()}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="version">Versión (opcional)</Label>
                  <Input
                    id="version"
                    placeholder="Ej: Advance, Sport, EX"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Tipo de Cobertura</Label>
                  <RadioGroup value={coverage} onValueChange={setCoverage}>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="amplia" id="amplia" />
                      <Label htmlFor="amplia" className="flex-1 cursor-pointer">
                        <div>
                          <p className="font-medium text-foreground">Cobertura Amplia</p>
                          <p className="text-xs text-muted-foreground">Máxima protección para tu flotilla</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="limitada" id="limitada" />
                      <Label htmlFor="limitada" className="flex-1 cursor-pointer">
                        <div>
                          <p className="font-medium text-foreground">Cobertura Limitada</p>
                          <p className="text-xs text-muted-foreground">Robo total y daños a terceros</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="rc" id="rc" />
                      <Label htmlFor="rc" className="flex-1 cursor-pointer">
                        <div>
                          <p className="font-medium text-foreground">Responsabilidad Civil</p>
                          <p className="text-xs text-muted-foreground">Cobertura básica obligatoria</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  onClick={handleQuote}
                  className="w-full"
                  size="lg"
                  disabled={!numberOfVehicles || !brand || !model || !year || !coverage}
                >
                  Calcular Protección
                </Button>
              </CardContent>
            </Card>

            {showQuote && (
              <Card className="border-2 border-secondary/50">
                <CardHeader className="bg-secondary/5">
                  <CardTitle className="text-secondary">Tu Cotización - Flotilla</CardTitle>
                  <CardDescription>
                    {numberOfVehicles} vehículos - {brand.charAt(0).toUpperCase() + brand.slice(1)} {model} {year}{" "}
                    {version && `- ${version}`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Car className="w-5 h-5 text-secondary" />
                      <h4 className="font-semibold text-foreground">Flotilla Calculada</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Tu flotilla de <strong>{numberOfVehicles} vehículos</strong> ha sido calculada exitosamente.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-foreground">{coverageInfo.name}</h4>
                    <ul className="space-y-2">
                      {coverageInfo.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-border">
                    <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 p-6 rounded-lg border border-secondary/20">
                      <h4 className="font-semibold text-foreground mb-2">Cotización Personalizada</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        Tu flotilla está protegida. Un asesor te contactará con la cotización final personalizada según
                        el perfil de tu flotilla y las características específicas de cada vehículo.
                      </p>
                      <div className="flex items-center gap-2 text-secondary">
                        <Shield className="w-5 h-5" />
                        <span className="font-medium text-sm">Tarifas preferenciales para flotillas</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">Nota Importante</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Las cotizaciones de flotillas requieren evaluación individual de cada vehículo. Nuestro asesor
                          preparará una propuesta completa con precios y condiciones especiales para tu flotilla.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => {
                      const element = document.getElementById("contacto")
                      if (element) element.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    Solicitar Cotización Personalizada
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
