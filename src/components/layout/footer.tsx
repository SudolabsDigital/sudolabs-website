'use client';

import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const handlePendingLink = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("🚀 Estamos preparando nuestras redes sociales. ¡Pronto estarán activas!");
  };

  return (
    <footer className="border-t border-border/40 bg-background relative overflow-hidden">
      {/* Decorative gradient top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* COLUMNA 1: IDENTIDAD */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Image 
                src="/assets/logo-full.svg" 
                alt="Sudolabs Digital" 
                width={140} 
                height={35} 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Transformamos problemas operativos complejos en software eficiente. Ingeniería de alto nivel para negocios ambiciosos.
            </p>
            <div className="flex gap-4">
              <Link href="#" onClick={handlePendingLink} className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" onClick={handlePendingLink} className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" onClick={handlePendingLink} className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* COLUMNA 2: NAVEGACIÓN */}
          <div>
            <h3 className="font-bold text-foreground mb-6">Explorar</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/servicios" className="text-muted-foreground hover:text-primary transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/proyectos" className="text-muted-foreground hover:text-primary transition-colors">
                  Portafolio
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-muted-foreground hover:text-primary transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-muted-foreground hover:text-primary transition-colors">
                  Volver Arriba
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMNA 3: LEGAL */}
          <div>
            <h3 className="font-bold text-foreground mb-6">Legal</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="#" onClick={(e) => { e.preventDefault(); alert("Documento en revisión legal."); }} className="text-muted-foreground hover:text-primary transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="#" onClick={(e) => { e.preventDefault(); alert("Documento en revisión legal."); }} className="text-muted-foreground hover:text-primary transition-colors">
                  Términos de Servicio
                </Link>
              </li>
              <li>
                <Link href="#" onClick={(e) => { e.preventDefault(); alert("Documento en revisión legal."); }} className="text-muted-foreground hover:text-primary transition-colors">
                  Libro de Reclamaciones
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMNA 4: CONTACTO */}
          <div>
            <h3 className="font-bold text-foreground mb-6">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <a href="mailto:jososo1396@gmail.com" className="hover:text-foreground transition-colors break-all">
                  jososo1396@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <a href="https://wa.me/51923384303" target="_blank" className="hover:text-foreground transition-colors">
                  +51 923 384 303
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>
                  Huancayo, Perú <br />
                  <span className="text-xs opacity-70">Disponibilidad Global Remota</span>
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} SudolabsDigital. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Sistemas Operativos</span>
          </div>
        </div>
      </div>
    </footer>
  )
}