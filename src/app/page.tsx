import dynamic from "next/dynamic"
import { HeroSection } from "@/components/modules/home/hero-section"

// Componentes dinámicos "Below the Fold" para reducir TBT
const TechTicker = dynamic(() => import("@/components/layout/tech-ticker").then(mod => mod.TechTicker))
const SolutionsGrid = dynamic(() => import("@/components/layout/solutions-grid").then(mod => mod.SolutionsGrid))
const AiChatSection = dynamic(() => import("@/components/modules/home/ai-chat-section").then(mod => mod.AiChatSection))
const FaqSection = dynamic(() => import("@/components/layout/faq-section").then(mod => mod.FaqSection))
const CtaSection = dynamic(() => import("@/components/modules/home/cta-section").then(mod => mod.CtaSection))

const TubeCursorBackground = dynamic(
  () => import("@/components/ui/tube-cursor-background").then(mod => mod.TubeCursorBackground)
)

export const metadata = {
  title: {
    absolute: "Sudolabs Perú - Consultora de Software y Tecnología en Huancayo"
  },
  description: "Socios tecnológicos para empresas ambiciosas. Desarrollamos software a medida, aplicaciones web modernas y arquitectura cloud de alto rendimiento desde Huancayo para el mundo.",
}

export default function Home() {
  return (
    // FORZAMOS EL MODO OSCURO SOLO PARA EL HOME
    // Quitamos bg-background para que se vea el TubeCursorBackground
    <div className="forced-dark-mode text-foreground min-h-screen">
      <div className="relative min-h-screen overflow-x-hidden">
        <TubeCursorBackground />

        <div className="relative z-10">
          {/* ISLA INTERACTIVA 1: HERO (Carga Inmediata para LCP) */}
          <HeroSection />

          {/* ISLA INTERACTIVA 2: TICKER */}
          <TechTicker />

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