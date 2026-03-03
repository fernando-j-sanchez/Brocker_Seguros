import React from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { AllianzPPR } from './components/AllianzPPR'
import { MetLife } from './components/MetLife'
import { Mapfre } from './components/Mapfre'
import { Testimonios } from './components/Testimonios'
import { WhatsAppButton } from './components/WhatsAppButton'
//import { ChatBot } from './components/ChatBot'
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
      <WhatsAppButton />
      <ChatBot />
    </div>
  )
}

export default App