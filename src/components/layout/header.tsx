'use client';

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const navItems = [
  { name: "Servicios", href: "/servicios" },
  { name: "Proyectos", href: "/proyectos" },
  { name: "Nosotros", href: "/nosotros" },
]

export function Header() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed top-0 inset-x-0 z-[100] flex justify-center p-4 md:p-6 pointer-events-none">
      <header className="pointer-events-auto flex items-center justify-between w-full max-w-4xl h-14 px-4 rounded-full border border-border/40 bg-background/60 backdrop-blur-xl shadow-2xl shadow-primary/5">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group ml-2">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center"
          >
            <Image 
              src="/assets/logo-full.svg" 
              alt="Sudolabs Digital" 
              width={160} 
              height={40} 
              priority
              className="h-8 w-auto"
            />
          </motion.div>
        </Link>
        
        {/* DESKTOP NAVIGATION */}
        <nav 
          className="hidden md:flex items-center gap-1"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {navItems.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onMouseEnter={() => setHoveredIndex(index)}
            >
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 z-[-1] rounded-full bg-muted/80"
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.4,
                    }}
                  />
                )}
              </AnimatePresence>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* DESKTOP CTA */}
        <div className="hidden md:flex items-center">
          <Button 
            variant="default" 
            size="sm" 
            className="rounded-full px-5 h-9 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/10 transition-all hover:scale-105 active:scale-95"
          >
            Contactar
          </Button>
        </div>

        {/* MOBILE MENU TRIGGER */}
        <div className="flex md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="mb-8 text-left">
                 <div className="flex items-center gap-2 mb-2">
                    <Image 
                      src="/assets/logo-full.svg" 
                      alt="Sudolabs Digital" 
                      width={140} 
                      height={35} 
                      className="h-8 w-auto"
                    />
                 </div>
                <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center py-4 text-lg font-medium text-muted-foreground hover:text-foreground border-b border-border/40 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="mt-6">
                    <Button className="w-full h-12 text-base rounded-full shadow-lg shadow-primary/20">
                        Contactar Ahora
                    </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  )
}
