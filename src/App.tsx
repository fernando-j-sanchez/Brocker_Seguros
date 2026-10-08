import React from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { ComoFunciona } from './components/ComoFunciona'
import { AllianzPPR } from './components/AllianzPPR'
import { MetLife } from './components/MetLife'
import { Mapfre } from './components/Mapfre'
import { Testimonios } from './components/Testimonios'
import { PreguntasFrecuentes } from './components/PreguntasFrecuentes'
import { ContactoFlotante } from './components/ContactoFlotante'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main>
        <Hero />
        <ComoFunciona />
        <AllianzPPR />
        <MetLife />
        <Mapfre />
        <Testimonios />
        <PreguntasFrecuentes />
      </main>
      <Footer />

      {/* Un solo botón flotante con el asistente y WhatsApp */}
      <ContactoFlotante />
    </div>
  )
}

export default App
