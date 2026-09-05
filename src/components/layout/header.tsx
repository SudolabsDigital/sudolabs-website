'use client';

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import dynamic from "next/dynamic"
import { cn } from "@/lib/utils";
import { TechButton } from "@/components/ui/design-system/tech-button";
import { HeaderNav, navItems } from "./header-nav";
import { socialLinks } from "@/core/config";
import { IconChip } from "@/components/ui/icons/icon-chip";

import { usePathname } from "next/navigation";

const ContactModal = dynamic(() => import("@/components/features/contact-modal").then(mod => mod.ContactModal), {
  ssr: false,
})

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(!isHome);
  const [hidden, setHidden] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const { scrollY } = useScroll();

  React.useEffect(() => {
    setIsScrolled(!isHome || (typeof window !== 'undefined' && window.scrollY > 50));
  }, [pathname, isHome]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!isHome) {
      if (!isScrolled) setIsScrolled(true);
    } else {
      // Histéresis para isScrolled en la página de inicio
      if (latest > 50 && !isScrolled) {
        setIsScrolled(true);
      } else if (latest < 15 && isScrolled) {
        setIsScrolled(false);
      }
    }

    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    // Umbral de movimiento mínimo (12px hacia abajo / 8px hacia arriba) para alternar visibilidad
    if (diff > 12 && latest > 280 && !hidden) {
      setHidden(true);
    } else if (diff < -8 && hidden) {
      setHidden(false);
    }
  });

  const handleOpenContact = () => {
    setHasOpenedOnce(true);
    setIsContactOpen(true);
  };

  return (
    <>
      <motion.div 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 inset-x-0 z-[100] w-full pointer-events-none"
      >
        <header 
          className={cn(
            "pointer-events-auto flex items-center justify-between w-full px-6 md:px-12 transition duration-500 ease-in-out border-b",
            isScrolled 
              ? "h-16 md:h-16 bg-white/90 backdrop-blur-md border-slate-200/90 shadow-sm" 
              : "h-20 md:h-24 bg-transparent border-transparent shadow-none"
          )}
        >
          {/* Contenedor central para mantener el contenido alineado a un max-width aunque el header sea w-full */}
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
            
            {/* Logo Section - Agrandado para máxima visibilidad */}
            <Link href="/" aria-label="Ir al inicio" className="flex items-center gap-2 group mr-4 cursor-pointer">
              <div className="flex items-center justify-center relative h-12 md:h-14 w-[220px] md:w-[280px] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/assets/logo-horizontal.webp"
                  alt="Sudolabs Perú"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 220px, 280px"
                  className="object-contain object-left"
                />
              </div>
            </Link>
            
            {/* DESKTOP NAVIGATION - Premium Shared Layout Animation */}
            <HeaderNav />

            {/* DESKTOP: redes + CTA */}
            <div className="hidden md:flex items-center ml-4 gap-4">
              {/* Las redes solo desde `xl`. Medido: a 1024 px quedan 173 px para
                  esta zona y el botón ya ocupa 150 con su margen; los cuatro
                  chips más el separador piden ~177 y no entran. A 1280 hay 429. */}
              <div className="hidden xl:flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    className="group rounded-full focus-visible:outline-none"
                  >
                    <IconChip name={social.name} label={social.label} size="sm" shape="circle" />
                  </a>
                ))}
              </div>

              <div className="hidden xl:block h-6 w-px bg-slate-200" />

              {/* «Contactar» no dice qué pasa al pulsarlo. El modal pide objetivo,
                  correo y alcance/presupuesto/plazos: eso es una solicitud de
                  propuesta, y así se nombra. No promete una cita, que es lo que
                  haría «Agendar diagnóstico» sin que exista agenda detrás. */}
              <TechButton 
                variant="primary" 
                size="sm" 
                onClick={handleOpenContact}
              >
                Solicitar propuesta
              </TechButton>
            </div>

            {/* MOBILE MENU TRIGGER - Icon Only */}
            <div className="flex md:hidden ml-auto items-center gap-2">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-10 h-10 text-slate-800 hover:bg-slate-100 cursor-pointer">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white border-l border-slate-200">
                  <SheetHeader className="mb-8 text-left">
                    <div className="flex items-center gap-2 mb-2 relative h-9 w-[160px]">
                        <Image
                          src="/assets/logo-horizontal.webp"
                          alt="Sudolabs Perú"
                          fill
                          sizes="160px"
                          className="object-contain object-left"
                        />
                    </div>
                    <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
                    <SheetDescription className="sr-only">
                      Accede a nuestras secciones de servicios, proyectos y contacto.
                    </SheetDescription>
                  </SheetHeader>
                  
                  <nav aria-label="Navegación móvil" className="flex flex-col gap-4">
                    <ul className="flex flex-col gap-4 list-none p-0 m-0">
                      <li>
                        <Link
                          href="/"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center py-4 text-lg font-bold text-slate-800 hover:text-[#004481] border-b border-slate-200 transition-colors w-full"
                        >
                          Inicio
                        </Link>
                      </li>
                      {navItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center py-4 text-lg font-bold text-slate-800 hover:text-[#004481] border-b border-slate-200 transition-colors w-full"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6">
                        <TechButton 
                          onClick={() => {
                            setIsOpen(false);
                            handleOpenContact();
                          }}
                          className="w-full"
                          variant="primary"
                          size="lg"
                        >
                            Solicitar propuesta
                        </TechButton>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>
      </motion.div>

      {hasOpenedOnce && (
        <ContactModal 
          isOpen={isContactOpen} 
          onClose={() => setIsContactOpen(false)} 
        />
      )}
    </>
  )
}
