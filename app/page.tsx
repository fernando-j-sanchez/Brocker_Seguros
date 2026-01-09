import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PPRSimulator } from "@/components/ppr-simulator"
import { MetLifeSection } from "@/components/metlife-section"
import { MapfreSection } from "@/components/mapfre-section"
import { AutoInsuranceQuote } from "@/components/auto-insurance-quote"
import { ContactForm } from "@/components/contact-form"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <PPRSimulator />
        <MetLifeSection />
        <MapfreSection />
        <AutoInsuranceQuote />
        <TestimonialsSection />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
