'use client';

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { TechTicker } from "@/components/layout/tech-ticker"
import { SolutionsGrid } from "@/components/layout/solutions-grid"
import { FaqSection } from "@/components/layout/faq-section"
import { Button } from "@/components/ui/button"
import { GlobalSpotlight } from "@/components/ui/global-spotlight"
import { ArrowRight } from "lucide-react"
import dynamic from "next/dynamic"

const ContactModal = dynamic(() => import("@/components/features/contact-modal").then(mod => mod.ContactModal), {
  ssr: false, // No necesitamos renderizar el modal en el servidor (SEO irrelevante para un modal oculto)
})

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleWhatsappDirect = () => {
    window.open("https://wa.me/51923384303?text=Hola%20Sudolabs,%20me%20interesa%20agendar%20una%20consultor%C3%ADa.", "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background selection:bg-primary/20 relative">
      {/* 1. Global Background Layer */}
      <GlobalSpotlight />

      {/* 2. Main Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header will handle its own contact modal instance, but that's fine. */}
        <Header />

        <main className="flex-1">
          {/* HERO SECTION */}
          <section className="container mx-auto px-6 pt-32 pb-32 flex flex-col items-center text-center max-w-5xl">
              
              {/* Main Headline */}
              <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-foreground mb-8 leading-[1.1]">
                Tecnología a la Medida <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-foreground to-foreground/60">
                  De tu Ambición
                </span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                Desde automatizar procesos en pequeños negocios hasta construir arquitecturas empresariales complejas. 
                Traducimos tus problemas operativos en software eficiente y rentable.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button 
                  size="lg" 
                  onClick={() => setIsContactOpen(true)}
                  className="h-12 px-8 text-base shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all"
                >
                  Hablemos de tu Proyecto
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8 text-base backdrop-blur-md bg-background/40 hover:bg-background/60">
                  Ver Cómo Trabajamos
                </Button>
              </div>
          </section>

          {/* TECH TICKER (Validation) */}
          <TechTicker />

          {/* SOLUTIONS GRID (The Core Value) */}
          <SolutionsGrid />

          {/* FAQ SECTION (Trust Building) */}
          <FaqSection />

          {/* FINAL CTA */}
          <section className="py-24 container mx-auto px-6">
            <div className="bg-primary rounded-3xl p-12 text-center md:text-left relative overflow-hidden">
               {/* Decorative background circle */}
               <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                      ¿Listo para dejar atrás los procesos manuales?
                    </h2>
                    <p className="text-primary-foreground/80 text-lg">
                      Una llamada de 30 minutos es suficiente para saber si podemos ayudarte. 
                      Sin compromiso de venta, solo consultoría honesta.
                    </p>
                  </div>
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    onClick={handleWhatsappDirect}
                    className="h-14 px-8 text-base whitespace-nowrap shadow-xl"
                  >
                    Agendar Consultoría Gratis
                  </Button>
               </div>
            </div>
          </section>
        </main>

        <Footer />
        
        <ContactModal 
          isOpen={isContactOpen} 
          onClose={() => setIsContactOpen(false)} 
        />
      </div>
    </div>
  )
}