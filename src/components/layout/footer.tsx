'use client';

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"
import { siteConfig } from "@/core/config"

export function Footer() {
  const handleLegal = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Documento en revisión legal.");
  };

  return (
    <footer className="border-t border-white/10 bg-[#020617]/90 backdrop-blur-md py-10 relative overflow-hidden text-sm">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* COL 1: IDENTIDAD (5 columnas) */}
          <div className="md:col-span-5 space-y-6">
            <div className="brightness-0 invert filter">
                <Image 
                    src="/assets/logo-full.webp" 
                    alt="Sudolabs Digital" 
                    width={200} 
                    height={55} 
                    className="h-10 md:h-12 w-auto"
                />
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              Transformamos problemas complejos en software eficiente. Ingeniería de alto nivel para negocios ambiciosos que buscan escalar sin límites.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex gap-4">
                <a 
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href={siteConfig.social.instagram} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
              <div className="h-4 w-px bg-white/20 hidden md:block" />
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">
                © {new Date().getFullYear()} Sudolabs Todos los derechos reservados.
              </span>
            </div>
          </div>

          {/* COL 2: MENÚ (3 columnas) */}
          <div className="md:col-span-3 md:col-start-7 space-y-4">
            <h3 className="font-bold text-white text-[10px] uppercase tracking-widest opacity-60">Navegación</h3>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/servicios" className="text-gray-400 hover:text-white transition-colors">Servicios</Link></li>
              <li><Link href="/proyectos" className="text-gray-400 hover:text-white transition-colors">Portafolio</Link></li>
              <li><Link href="/nosotros" className="text-gray-400 hover:text-white transition-colors">Nosotros</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog de Ingeniería</Link></li>
            </ul>
          </div>

          {/* COL 3: CONTACTO (4 columnas) */}
          <div className="md:col-span-4 md:col-start-10 space-y-4">
            <h3 className="font-bold text-white text-[10px] uppercase tracking-widest opacity-60">Contacto</h3>
            <ul className="space-y-3 text-xs">
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="text-gray-400 hover:text-white flex items-center gap-3 transition-colors">
                  <Mail className="w-4 h-4 text-[#00FFA3]" /> 
                  <span className="truncate">{siteConfig.contact.email}</span>
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white flex items-center gap-3 transition-colors">
                   <Phone className="w-4 h-4 text-[#00FFA3]" /> 
                   <span>{siteConfig.contact.phone}</span>
                </a>
              </li>
              <li className="text-gray-400 flex items-center gap-3">
                 <MapPin className="w-4 h-4 text-[#00FFA3]" /> 
                 <span>{siteConfig.contact.address}</span>
              </li>
            </ul>
            
            <div className="pt-2 flex gap-4 text-[10px] opacity-60 text-gray-400">
                <Link href="#" onClick={handleLegal} className="hover:text-white hover:underline">Privacidad</Link>
                <Link href="#" onClick={handleLegal} className="hover:text-white hover:underline">Términos y Condiciones</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}