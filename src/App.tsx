import React from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { AllianzPPR } from './components/AllianzPPR'
import { MetLife } from './components/MetLife'
import { Mapfre } from './components/Mapfre'
import { Testimonios } from './components/Testimonios'
import { WhatsAppButton } from './components/WhatsAppButton'
import { AsistenteNissi } from './components/AsistenteNissi'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main>
        <Hero />
        <AllianzPPR />
        <MetLife />
        <Mapfre />
        <Testimonios />
      </main>
      <Footer />

      {/* Botones flotantes: asistente a la izquierda, WhatsApp a la derecha */}
      <AsistenteNissi />
      <WhatsAppButton />
    </div>
  )
}

export default App
