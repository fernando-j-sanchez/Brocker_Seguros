import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" })

export const metadata: Metadata = {
  title: "Protección Financiera Integral | Tu Broker de Seguros",
  description:
    "Soluciones integrales de seguros: PPR para tu retiro, Seguros de Vida y GMM, Seguros de Auto. Asegura tu futuro con nosotros.",
  generator: "Ts, Nextjs,",
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
