'use client';

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

// Carga lazy del modal (ahorra JS inicial)
const ContactModal = dynamic(() => import("@/components/features/contact-modal").then(mod => mod.ContactModal), {
  ssr: false,
})

export function HeroSection() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <section className="container mx-auto px-6 flex items-start min-h-[82vh] pt-20 pb-12 md:pt-28 lg:pt-28 lg:pb-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center w-full">
            
            {/* COLUMNA 1: CONTENIDO */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              {/* LOGO MÓVIL */}
              <div className="lg:hidden mb-6 flex justify-start">
                 <Image
                    src="/assets/logo-full.svg"
                    alt="Sudolabs Digital Logo"
                    width={250}
                    height={80}
                    priority
                    sizes="(max-width: 768px) 180px, 0px" // Solo baja en móvil
                    className="w-[180px] h-auto drop-shadow-lg"
                 />
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-foreground mb-6 lg:mb-8 leading-[1.05] lg:leading-[0.95]">
                Ingeniería de <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/50">
                  Alto Calibre.
                </span>
              </h1>
              
              <p className="text-lg md:text-2xl text-muted-foreground mb-8 lg:mb-12 leading-relaxed max-w-lg">
                No hacemos solo apps, construimos activos digitales. Sistemas robustos diseñados para escalar tu negocio.
              </p>
              
              <div>
                <Button 
                  size="lg" 
                  onClick={() => setIsContactOpen(true)}
                  className="h-14 lg:h-16 px-8 lg:px-12 text-base lg:text-lg rounded-full shadow-2xl shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto"
                >
                  Iniciar Transformación
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </div>
            </motion.div>

            {/* COLUMNA 2: MARCA MONOLÍTICA (DESKTOP) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end hidden lg:flex"
            >
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
               
               <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
               >
                 <Image
                    src="/assets/logo-full.svg"
                    alt="Sudolabs Digital Logo"
                    width={800}
                    height={300}
                    priority
                    sizes="(min-width: 1024px) 600px, 0px" // Solo baja en desktop
                    className="w-full max-w-[600px] h-auto drop-shadow-2xl relative z-10"
                 />
               </motion.div>
            </motion.div>

          </div>
      </section>

      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </>
  );
}
