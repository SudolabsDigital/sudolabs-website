'use client';

import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone } from "lucide-react"
import { IconChip } from "@/components/ui/icons/icon-chip";
import { siteConfig, socialLinks } from "@/core/config"


/**
 * Redes del pie. GitHub estaba declarado en `siteConfig.social` desde siempre
 * pero no lo enlazaba nadie: el dato existía y no se consumía.
 */
export function Footer() {
  return (
    <footer className="border-t border-slate-200/60 bg-white/90 backdrop-blur-md py-12 relative overflow-hidden text-sm">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* COL 1: IDENTIDAD (5 columnas) */}
          <div className="md:col-span-5 space-y-6">
            <div className="relative h-10 md:h-12 w-[140px] md:w-[180px]">
                <Image 
                    src="/assets/logo-full.webp" 
                    alt="Sudolabs Digital" 
                    fill
                    className="object-contain object-left"
                />
            </div>
            <p className="text-slate-600 text-xs leading-relaxed max-w-sm">
              Transformamos problemas complejos en software eficiente. Ingeniería de alto nivel para negocios ambiciosos que buscan escalar sin límites.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    // `group` es lo que enciende el chip: reacciona al hover del
                    // enlace, no al suyo propio.
                    className="group rounded-full focus-visible:outline-none"
                  >
                    <IconChip name={social.name} label size="lg" shape="circle" />
                  </a>
                ))}
              </div>
              <div className="h-4 w-px bg-slate-200 hidden md:block" />
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">
                © {new Date().getFullYear()} Sudolabs Todos los derechos reservados.
              </span>
            </div>
          </div>

          {/* COL 2: MENÚ (3 columnas) */}
          <div className="md:col-span-3 md:col-start-7 space-y-4">
            <h3 className="font-bold text-slate-900 text-[10px] uppercase tracking-widest">Navegación</h3>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/servicios" className="text-slate-600 hover:text-[#004481] transition-colors">Servicios</Link></li>
              <li><Link href="/proyectos" className="text-slate-600 hover:text-[#004481] transition-colors">Portafolio</Link></li>
              <li><Link href="/nosotros" className="text-slate-600 hover:text-[#004481] transition-colors">Nosotros</Link></li>
              <li><Link href="/equipo" className="text-slate-600 hover:text-[#004481] transition-colors">Equipo</Link></li>
              <li><Link href="/blog" className="text-slate-600 hover:text-[#004481] transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* COL 3: CONTACTO (4 columnas) */}
          <div className="md:col-span-4 md:col-start-10 space-y-4">
            <h3 className="font-bold text-slate-900 text-[10px] uppercase tracking-widest">Contacto</h3>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="/contacto" className="text-slate-600 hover:text-[#004481] flex items-center gap-3 transition-colors">
                  <div className="p-1 rounded bg-slate-100 border border-slate-200">
                    <Mail className="w-3.5 h-3.5 text-[#004481]" />
                  </div>
                  <span className="truncate">Escribir Mensaje</span>
                </Link>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="text-slate-600 hover:text-[#004481] flex items-center gap-3 transition-colors">
                  <Mail className="w-4 h-4 text-[#004481]" /> 
                  <span className="truncate">{siteConfig.contact.email}</span>
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-[#004481] flex items-center gap-3 transition-colors">
                   <Phone className="w-4 h-4 text-[#004481]" /> 
                   <span>{siteConfig.contact.phone}</span>
                </a>
              </li>
              <li className="text-slate-600 flex items-center gap-3">
                 <MapPin className="w-4 h-4 text-[#004481]" /> 
                 <span>{siteConfig.contact.address}</span>
              </li>
            </ul>
            
            <div className="pt-2 flex gap-4 text-[10px] text-slate-500">
                <Link href="/legal/privacidad" className="hover:text-slate-900 hover:underline">Privacidad</Link>
                <Link href="/legal/terminos" className="hover:text-slate-900 hover:underline">Términos y Condiciones</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
