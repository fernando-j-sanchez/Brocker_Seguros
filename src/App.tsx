import React from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { AllianzPPR } from './components/AllianzPPR'
import { MetLife } from './components/MetLife'
import { Mapfre } from './components/Mapfre'
import { Testimonios } from './components/Testimonios'
// IMPORTS COMENTADOS (solo el ChatBot)
import { WhatsAppButton } from './components/WhatsAppButton'  // ← ESTE SÍ
// import { ChatBot } from './components/ChatBot'  // ← ESTE NO
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
      
      {/* WhatsApp SÍ, ChatBot NO */}
      <WhatsAppButton />  {/* ← ESTO SE VE */}
      {/* <ChatBot /> */}  {/* ← ESTO NO */}
    </div>
  )
}

export default App