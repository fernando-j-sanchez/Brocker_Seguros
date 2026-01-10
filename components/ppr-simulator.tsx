"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, Line } from "recharts"
import { Calculator, TrendingUp, Send, CheckCircle2 } from "lucide-react"
import { AllianceCarousel } from "@/components/alliance-carousel"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ProjectionRow {
  year: number
  age: number
  aportaciones: number
  rendimientos: number
  saldoTotal: number
}

export function PPRSimulator() {
  const [monthlyAmount, setMonthlyAmount] = useState("5000")
  const [currentAge, setCurrentAge] = useState("30")
  const [retirementAge, setRetirementAge] = useState<"60" | "65">("65")
  const [initialAmount, setInitialAmount] = useState("0")
  const [showResults, setShowResults] = useState(false)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [clientInfo, setClientInfo] = useState({ name: "", email: "", phone: "" })
  const [isSending, setIsSending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const annualInterestRate = 0.13

  const projectionData = useMemo(() => {
    if (!showResults) return []

    const monthly = Number.parseFloat(monthlyAmount) || 0
    const current = Number.parseInt(currentAge) || 0
    const retirement = Number.parseInt(retirementAge) || 65
    const initial = Number.parseFloat(initialAmount) || 0

    const years = retirement - current
    const data: ProjectionRow[] = []

    let saldo = initial
    let totalAportaciones = initial

    for (let i = 1; i <= years; i++) {
      const aportacionAnual = monthly * 12
      totalAportaciones += aportacionAnual
      saldo = (saldo + aportacionAnual) * (1 + annualInterestRate)
      const rendimientos = saldo - totalAportaciones

      data.push({
        year: i,
        age: current + i,
        aportaciones: totalAportaciones,
        rendimientos: rendimientos,
        saldoTotal: saldo,
      })
    }

    return data
  }, [monthlyAmount, currentAge, retirementAge, initialAmount, showResults])

  const handleCalculate = () => {
    setShowResults(true)
  }

  const handleSendSimulation = async () => {
    if (!clientInfo.name || !clientInfo.email || !clientInfo.phone) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos.",
        variant: "destructive",
      })
      return
    }

    setIsSending(true)
    const finalProjection = projectionData[projectionData.length - 1]

    const supabase = createClient()

    try {
      const { error } = await supabase.from("clientes_potenciales").insert({
        nombre: clientInfo.name,
        telefono: clientInfo.phone,
        correo: clientInfo.email,
        mensaje: `Simulación PPR: ${clientInfo.name} está interesado en un plan de retiro`,
        servicio_interes: "ppr",
        tiene_simulacion: true,
        monto_mensual: Number.parseFloat(monthlyAmount),
        edad_actual: Number.parseInt(currentAge),
        edad_retiro: Number.parseInt(retirementAge),
        monto_inicial: Number.parseFloat(initialAmount),
        proyeccion_final: finalProjection.saldoTotal,
        total_aportaciones: finalProjection.aportaciones,
        total_rendimientos: finalProjection.rendimientos,
        rendimiento_anual: 13.0,
        fuente: "simulador_ppr",
      })

      if (error) throw error

      setIsSuccess(true)
      toast({
        title: "¡Simulación enviada exitosamente!",
        description:
          "Tu proyección ha sido guardada. Un asesor especializado revisará tu simulación y se comunicará contigo pronto para ofrecerte la mejor propuesta personalizada.",
        duration: 6000,
      })

      setTimeout(() => {
        setIsDialogOpen(false)
        setIsSuccess(false)
        setClientInfo({ name: "", email: "", phone: "" })
      }, 2000)
    } catch (error) {
      console.error("[] Error saving simulation to Supabase:", error)
      toast({
        title: "Error al enviar la simulación",
        description: "Por favor intenta nuevamente o contáctanos por WhatsApp al 55 5951 5885.",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const chartData = projectionData.map((row) => ({
    age: row.age,
    Aportaciones: Math.round(row.aportaciones),
    Rendimientos: Math.round(row.rendimientos),
    Total: Math.round(row.saldoTotal),
  }))

  const finalProjection = projectionData[projectionData.length - 1]

  return (
    <section id="ppr" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              Allianz PPR
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
              Simulador de Plan Personal de Retiro
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre el poder del interés compuesto y proyecta tu patrimonio para el retiro
            </p>
          </div>

          <AllianceCarousel />

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                Datos de tu Plan
              </CardTitle>
              <CardDescription>
                Ingresa tus datos para calcular tu proyección de ahorro con interés compuesto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="monthly">Ahorro Mensual</Label>
                  <Input
                    id="monthly"
                    type="number"
                    placeholder="5000"
                    value={monthlyAmount}
                    onChange={(e) => setMonthlyAmount(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Cantidad que ahorrarás cada mes</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="current-age">Edad Actual</Label>
                  <Input
                    id="current-age"
                    type="number"
                    placeholder="30"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Tu edad en años cumplidos</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retirement-age">Edad de Retiro</Label>
                  <Select value={retirementAge} onValueChange={(value: "60" | "65") => setRetirementAge(value)}>
                    <SelectTrigger id="retirement-age">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60">60 años</SelectItem>
                      <SelectItem value="65">65 años</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Edad en la que planeas retirarte</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="initial">Monto Inicial (opcional)</Label>
                  <Input
                    id="initial"
                    type="number"
                    placeholder="0"
                    value={initialAmount}
                    onChange={(e) => setInitialAmount(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Ahorro inicial si ya tienes</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Nota:</strong> Este simulador utiliza una tasa de rendimiento
                  anual promedio del <strong className="text-primary">13%</strong> con interés compuesto. Los resultados
                  son una proyección estimada.
                </p>
              </div>

              <Button onClick={handleCalculate} className="w-full mt-6" size="lg">
                Calcular Proyección
              </Button>
            </CardContent>
          </Card>

          {showResults && projectionData.length > 0 && (
            <>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Tu Proyección de Retiro</CardTitle>
                  <CardDescription>Al llegar a los {retirementAge} años, así se vería tu patrimonio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
                      <p className="text-sm text-muted-foreground mb-1">Total Aportado</p>
                      <p className="text-2xl font-bold text-foreground">
                        {formatCurrency(finalProjection.aportaciones)}
                      </p>
                    </div>
                    <div className="p-6 rounded-lg bg-accent/5 border border-accent/20">
                      <p className="text-sm text-muted-foreground mb-1">Rendimientos Generados</p>
                      <p className="text-2xl font-bold text-accent">{formatCurrency(finalProjection.rendimientos)}</p>
                    </div>
                    <div className="p-6 rounded-lg bg-secondary/5 border border-secondary/20">
                      <p className="text-sm text-muted-foreground mb-1">Saldo Total</p>
                      <p className="text-2xl font-bold text-secondary">{formatCurrency(finalProjection.saldoTotal)}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-semibold mb-4 text-foreground">
                      Comparación: Ahorro bajo el colchón vs. Inversión con Interés Compuesto
                    </h4>
                    <ResponsiveContainer width="100%" height={350}>
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorAportaciones" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                          </linearGradient>
                          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                          </linearGradient>
                          <linearGradient id="colorRendimientos" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeWidth={1} />
                        <XAxis
                          dataKey="age"
                          label={{ value: "Edad", position: "insideBottom", offset: -5 }}
                          className="text-xs"
                          stroke="#6b7280"
                        />
                        <YAxis
                          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                          label={{ value: "Monto (MXN)", angle: -90, position: "insideLeft" }}
                          className="text-xs"
                          stroke="#6b7280"
                        />
                        <Tooltip
                          formatter={(value: number) => formatCurrency(value)}
                          contentStyle={{
                            backgroundColor: "white",
                            border: "2px solid #e5e7eb",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                          }}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="Aportaciones"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          fill="url(#colorAportaciones)"
                          name="Solo Aportaciones"
                        />
                        <Area
                          type="monotone"
                          dataKey="Rendimientos"
                          stroke="#f59e0b"
                          strokeWidth={3}
                          fill="url(#colorRendimientos)"
                          name="Rendimientos"
                          stackId="1"
                        />
                        <Line
                          type="monotone"
                          dataKey="Total"
                          stroke="#10b981"
                          strokeWidth={4}
                          dot={{ fill: "#10b981", r: 5, strokeWidth: 2, stroke: "#fff" }}
                          activeDot={{ r: 7, strokeWidth: 2, stroke: "#fff" }}
                          name="Total Acumulado"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="overflow-x-auto">
                    <h4 className="font-semibold mb-4 text-foreground">Tabla de Proyección Año por Año</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Año</TableHead>
                          <TableHead>Edad</TableHead>
                          <TableHead className="text-right">Capital Aportado</TableHead>
                          <TableHead className="text-right">Rendimientos</TableHead>
                          <TableHead className="text-right">Saldo Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projectionData.map((row) => (
                          <TableRow key={row.year}>
                            <TableCell className="font-medium">{row.year}</TableCell>
                            <TableCell>{row.age}</TableCell>
                            <TableCell className="text-right">{formatCurrency(row.aportaciones)}</TableCell>
                            <TableCell className="text-right text-accent">{formatCurrency(row.rendimientos)}</TableCell>
                            <TableCell className="text-right font-semibold">{formatCurrency(row.saldoTotal)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center flex gap-4 justify-center flex-wrap">
                <Button
                  size="lg"
                  onClick={() => {
                    const element = document.getElementById("contacto")
                    if (element) element.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Quiero Empezar Mi Plan de Retiro
                </Button>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="outline">
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Simulación a mi Asesor
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Enviar Simulación</DialogTitle>
                      <DialogDescription>
                        Proporciona tus datos para que un asesor revise tu simulación y te contacte con una propuesta
                        personalizada.
                      </DialogDescription>
                    </DialogHeader>
                    {isSuccess ? (
                      <div className="py-8 text-center">
                        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-foreground mb-2">¡Simulación Guardada!</h3>
                        <p className="text-sm text-muted-foreground">Tu asesor la revisará pronto.</p>
                      </div>
                    ) : (
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="client-name">Nombre Completo *</Label>
                          <Input
                            id="client-name"
                            placeholder="Juan Pérez"
                            value={clientInfo.name}
                            onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="client-email">Correo Electrónico *</Label>
                          <Input
                            id="client-email"
                            type="email"
                            placeholder="juan@ejemplo.com"
                            value={clientInfo.email}
                            onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="client-phone">Teléfono *</Label>
                          <Input
                            id="client-phone"
                            type="tel"
                            placeholder="55 1234 5678"
                            value={clientInfo.phone}
                            onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                          />
                        </div>
                        <Button onClick={handleSendSimulation} className="w-full" disabled={isSending}>
                          {isSending ? "Enviando..." : "Enviar Simulación"}
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
