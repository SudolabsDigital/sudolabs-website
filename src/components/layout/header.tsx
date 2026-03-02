'use client';

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import dynamic from "next/dynamic"
import DarkThemeToggle from "../ui/darkTheme";
import { cn } from "@/lib/utils";
import { TechButton } from "@/components/ui/design-system/tech-button";
import { HeaderNav, navItems } from "./header-nav";

const ContactModal = dynamic(() => import("@/components/features/contact-modal").then(mod => mod.ContactModal), {
  ssr: false,
})

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);

    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 300) {
      setHidden(true);
    } else {
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
            "pointer-events-auto flex items-center justify-between w-full px-6 md:px-12 transition-all duration-500 ease-in-out border-b",
            isScrolled 
              ? "h-16 md:h-16 bg-background/80 backdrop-blur-md border-border shadow-sm" 
              : "h-24 md:h-28 bg-transparent border-transparent"
          )}
        >
          {/* Contenedor central para mantener el contenido alineado a un max-width aunque el header sea w-full */}
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
            
            {/* Logo Section - Inverted for Dark Mode */}
            <Link href="/" aria-label="Ir al inicio" className="flex items-center gap-2 group mr-4">
              <div 
                className="flex items-center justify-center relative h-10 md:h-12 w-[140px] md:w-[180px] brightness-0 dark:invert filter transition-transform duration-300 group-hover:scale-105"
              >
                <Image 
                  src="/assets/logo-full.webp" 
                  alt="Sudolabs Digital" 
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 140px, 180px"
                  className="object-contain object-left"
                />
              </div>
            </Link>
            
            {/* DESKTOP NAVIGATION - Premium Shared Layout Animation */}
            <HeaderNav />

            {/* DESKTOP CTA & Theme */}
            <div className="hidden md:flex items-center ml-4 gap-4">
              <DarkThemeToggle/>
              <TechButton 
                variant="laser" 
                size="sm" 
                onClick={handleOpenContact}
              >
                Contactar
              </TechButton>
            </div>

            {/* MOBILE MENU TRIGGER - Icon Only */}
            <div className="flex md:hidden ml-auto items-center gap-2">
              <DarkThemeToggle/>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-10 h-10">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background border-l border-border">
                  <SheetHeader className="mb-8 text-left">
                    <div className="flex items-center gap-2 mb-2 relative h-10 w-[140px] brightness-0 dark:invert filter">
                        <Image 
                          src="/assets/logo-full.webp" 
                          alt="Sudolabs Digital" 
                          fill
                          sizes="140px"
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
                          className="flex items-center py-4 text-lg font-medium text-muted-foreground hover:text-foreground border-b border-border transition-colors w-full"
                        >
                          Inicio
                        </Link>
                      </li>
                      {navItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center py-4 text-lg font-medium text-muted-foreground hover:text-foreground border-b border-border transition-colors w-full"
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
                            Contactar Ahora
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
