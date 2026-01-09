import { Shield, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-foreground" />
                </div>
                <span className="font-display font-bold text-xl">Protección Integral</span>
              </div>
              <p className="text-sm text-background/70 leading-relaxed max-w-md">
                Tu broker de confianza especializado en soluciones de seguros y planes de retiro. Protegemos tu futuro y
                el de tu familia.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>
                  <a href="#ppr" className="hover:text-background transition-colors">
                    PPR Allianz
                  </a>
                </li>
                <li>
                  <a href="#seguros-vida" className="hover:text-background transition-colors">
                    Seguros de Vida
                  </a>
                </li>
                <li>
                  <a href="#seguros-vida" className="hover:text-background transition-colors">
                    Gastos Médicos
                  </a>
                </li>
                <li>
                  <a href="#autos" className="hover:text-background transition-colors">
                    Seguros de Auto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Aviso de Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Términos y Condiciones
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Política de Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-background/20 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-background/70">
                © {currentYear} Protección Integral. Todos los derechos reservados.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
