"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const whatsappNumber = "5215559515885"
  const message = encodeURIComponent("Hola, me gustaría recibir información sobre sus servicios de seguros.")

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#22c55e] text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 animate-bounce"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  )
}
