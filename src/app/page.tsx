import dynamic from "next/dynamic"
import { HeroSection } from "@/components/modules/home/hero-section"

// Componentes dinámicos "Below the Fold" para reducir TBT
const TechTicker = dynamic(() => import("@/components/layout/tech-ticker").then(mod => mod.TechTicker))
const SolutionsGrid = dynamic(() => import("@/components/layout/solutions-grid").then(mod => mod.SolutionsGrid))
import { AiChatSectionWrapper as AiChatSection } from "@/components/modules/home/ai-chat-section-wrapper"
const FaqSection = dynamic(() => import("@/components/layout/faq-section").then(mod => mod.FaqSection))
const CtaSection = dynamic(() => import("@/components/modules/home/cta-section").then(mod => mod.CtaSection))

export const metadata = {
  title: {
    absolute: "Sudolabs Perú - Consultora de Software y Tecnología en Huancayo"
  },
  description: "Socios tecnológicos para empresas ambiciosas. Desarrollamos software a medida, aplicaciones web modernas y arquitectura cloud de alto rendimiento desde Huancayo para el mundo.",
}

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300 relative selection:bg-primary/20">
      
      {/* FONDO SUTIL (Blanco Limpio en Light Mode) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Orbes Suaves que respiran en las esquinas, manteniendo el centro limpio */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-accent/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 min-h-screen overflow-x-hidden">
        <div className="relative z-10">
          
          {/* PRIMERA IMPRESIÓN INMERSIVA (100vh) */}
          <div className="flex flex-col min-h-[100svh] pt-24 md:pt-28">
            {/* ISLA INTERACTIVA 1: HERO (Carga Inmediata para LCP) */}
            <div className="flex-1 flex flex-col justify-center">
              <HeroSection />
            </div>

            {/* ISLA INTERACTIVA 2: TICKER (Footer de la primera impresión) */}
            <div className="mt-auto">
              <TechTicker />
            </div>
          </div>

          {/* SECCIÓN ESTÁTICA */}
          <SolutionsGrid />

          {/* Debian AI Chat */}
          <AiChatSection />

          {/* SECCIÓN ESTÁTICA */}
          <FaqSection />

          {/* ISLA INTERACTIVA 3: CTA FINAL */}
          <CtaSection />
        </div>
      </div>
    </div>
  )
}