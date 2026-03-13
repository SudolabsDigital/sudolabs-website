'use client';

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"
import { siteConfig } from "@/core/config"
import dynamic from "next/dynamic"
import { useState } from "react"

const ContactModal = dynamic(() => import('@/components/features/contact-modal').then(mod => mod.ContactModal), {
  ssr: false
});

const Tiktok = ({ className }: { className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <title>TikTok</title>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.76v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.03 5.84-.02 8.75-.08 3.12-2.5 5.48-5.6 5.54-3.01.06-5.65-2.16-6.07-5.12-.42-2.96 1.4-5.69 4.29-6.39 1.46-.35 3.03-.13 4.39.46v4.01c-.91-1.1-2.45-1.39-3.76-.84-1.31.55-2.09 1.98-1.89 3.4.19 1.42 1.49 2.49 2.92 2.42 1.54-.07 2.76-1.39 2.76-2.94V.02Z"/>
  </svg>
)

export function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);

  const handleLegal = (e: React.MouseEvent) => {
    e.preventDefault();
    setHasOpenedOnce(true);
    setIsContactOpen(true);
  };

  return (
    <footer className="border-t border-border bg-card/80 backdrop-blur-md py-10 relative overflow-hidden text-sm">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* COL 1: IDENTIDAD (5 columnas) */}
          <div className="md:col-span-5 space-y-6">
            <div className="dark:invert relative h-10 md:h-12 w-[140px] md:w-[180px] transition">
                <Image 
                    src="/assets/logo-full.webp" 
                    alt="Sudolabs Digital" 
                    fill
                    className="object-contain object-left"
                />
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed max-w-sm">
              Transformamos problemas complejos en software eficiente. Ingeniería de alto nivel para negocios ambiciosos que buscan escalar sin límites.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex gap-4">
                <a 
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary transition hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a 
                  href={siteConfig.social.instagram} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a 
                  href={siteConfig.social.tiktok} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition hover:scale-110"
                  aria-label="TikTok"
                >
                  <Tiktok className="w-6 h-6" />
                </a>
              </div>
              <div className="h-4 w-px bg-border hidden md:block" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                © {new Date().getFullYear()} Sudolabs Todos los derechos reservados.
              </span>
            </div>
          </div>

          {/* COL 2: MENÚ (3 columnas) */}
          <div className="md:col-span-3 md:col-start-7 space-y-4">
            <h3 className="font-bold text-foreground text-[10px] uppercase tracking-widest opacity-60">Navegación</h3>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/servicios" className="text-muted-foreground hover:text-primary transition-colors">Servicios</Link></li>
              <li><Link href="/proyectos" className="text-muted-foreground hover:text-primary transition-colors">Portafolio</Link></li>
              <li><Link href="/nosotros" className="text-muted-foreground hover:text-primary transition-colors">Nosotros</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* COL 3: CONTACTO (4 columnas) */}
          <div className="md:col-span-4 md:col-start-10 space-y-4">
            <h3 className="font-bold text-foreground text-[10px] uppercase tracking-widest opacity-60">Contacto</h3>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="/contacto" className="text-muted-foreground hover:text-primary flex items-center gap-3 transition-colors group">
                  <div className="p-1 rounded bg-secondary group-hover:bg-primary/10 transition-colors">
                    <Mail className="w-3 h-3 text-primary" />
                  </div>
                  <span className="truncate">Escribir Mensaje</span>
                </Link>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="text-muted-foreground hover:text-primary flex items-center gap-3 transition-colors">
                  <Mail className="w-4 h-4 text-primary" /> 
                  <span className="truncate">{siteConfig.contact.email}</span>
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary flex items-center gap-3 transition-colors">
                   <Phone className="w-4 h-4 text-primary" /> 
                   <span>{siteConfig.contact.phone}</span>
                </a>
              </li>
              <li className="text-muted-foreground flex items-center gap-3">
                 <MapPin className="w-4 h-4 text-primary" /> 
                 <span>{siteConfig.contact.address}</span>
              </li>
            </ul>
            
            <div className="pt-2 flex gap-4 text-[10px] opacity-60 text-muted-foreground">
                <Link href="#" onClick={handleLegal} className="hover:text-foreground hover:underline">Privacidad</Link>
                <Link href="#" onClick={handleLegal} className="hover:text-foreground hover:underline">Términos y Condiciones</Link>
            </div>
          </div>

        </div>
      </div>
      
      {hasOpenedOnce && (
        <ContactModal 
          isOpen={isContactOpen} 
          onClose={() => setIsContactOpen(false)} 
        />
      )}
    </footer>
  )
}