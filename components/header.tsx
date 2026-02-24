"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Shield } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">NISSI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("ppr")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              PPR
            </button>
            <button
              onClick={() => scrollToSection("seguros-vida")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Vida y GMM
            </button>
            <button
              onClick={() => scrollToSection("autos")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Autos
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Contacto
            </button>
            <Button onClick={() => scrollToSection("contacto")} className="ml-2">
              Solicitar Asesoría
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-foreground">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("ppr")}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors text-left"
              >
                PPR
              </button>
              <button
                onClick={() => scrollToSection("seguros-vida")}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors text-left"
              >
                Vida y GMM
              </button>
              <button
                onClick={() => scrollToSection("autos")}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors text-left"
              >
                Autos
              </button>
              <button
                onClick={() => scrollToSection("contacto")}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors text-left"
              >
                Contacto
              </button>
              <Button onClick={() => scrollToSection("contacto")} className="w-full">
                Solicitar Asesoría
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
