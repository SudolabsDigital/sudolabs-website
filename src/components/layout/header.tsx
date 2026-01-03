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

const ContactModal = dynamic(() => import("@/components/features/contact-modal").then(mod => mod.ContactModal), {
  ssr: false,
})

const navItems = [
  { name: "Servicios", href: "/servicios" },
  { name: "Proyectos", href: "/proyectos" },
  { name: "Nosotros", href: "/nosotros" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide if scrolling down more than 150px and moving down
    if (latest > previous && latest > 150) {
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
        className="fixed top-0 inset-x-0 z-[100] flex justify-center p-4 md:p-6 pointer-events-none"
      >
        <header className="pointer-events-auto flex items-center justify-between w-full max-w-4xl h-16 md:h-20 px-4 rounded-full border border-white/10 bg-[#020617]/70 backdrop-blur-md shadow-lg transition-all duration-300">
          
          {/* Logo Section - Inverted for Dark Mode */}
          <Link href="/" className="flex items-center gap-2 group mr-4">
            <div 
              className="flex items-center justify-center relative h-10 md:h-12 w-[140px] md:w-[180px] brightness-0 invert filter"
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
          
          {/* DESKTOP NAVIGATION - Glass Pills */}
          <nav 
            className="hidden md:flex items-center gap-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-5 py-2 text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full shadow-sm transition-all hover:scale-105"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* DESKTOP CTA */}
          <div className="hidden md:flex items-center ml-4">
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleOpenContact}
              className="rounded-full px-6 h-10 bg-white text-[#020617] hover:bg-gray-200 border border-white/10 shadow-lg transition-all hover:scale-105 active:scale-95 text-sm font-bold"
            >
              Contactar
            </Button>
          </div>

          <div className="max-md:hidden">
            <DarkThemeToggle/>
          </div>

          {/* MOBILE MENU TRIGGER - Icon Only */}
          <div className="flex md:hidden ml-auto">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="w-10 h-10 text-white hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#020617] border-l border-white/10 text-white">
                <SheetHeader className="mb-8 text-left">
                  <div className="flex items-center gap-2 mb-2 relative h-10 w-[140px] brightness-0 invert filter">
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
                
                              <div className="flex flex-col gap-4">
                                <Link
                                  href="/"
                                  onClick={() => setIsOpen(false)}
                                  className="flex items-center py-4 text-lg font-medium text-gray-300 hover:text-white border-b border-white/10 transition-colors"
                                >
                                  Inicio
                                </Link>
                                {navItems.map((item) => (                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center py-4 text-lg font-medium text-gray-300 hover:text-white border-b border-white/10 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  <div className="mt-6">
                      <Button 
                        onClick={() => {
                          setIsOpen(false);
                          handleOpenContact();
                        }}
                        className="w-full h-12 text-base rounded-full bg-white text-black hover:bg-gray-200 font-bold"
                      >
                          Contactar Ahora
                      </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
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