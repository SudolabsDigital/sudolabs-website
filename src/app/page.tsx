import dynamic from "next/dynamic"
import { TechTicker } from "@/components/layout/tech-ticker"
import { SolutionsGrid } from "@/components/layout/solutions-grid"
import { FaqSection } from "@/components/layout/faq-section"
import { HeroSection } from "@/components/modules/home/hero-section"
import { CtaSection } from "@/components/modules/home/cta-section"

const TubeCursorBackground = dynamic(
  () => import("@/components/ui/tube-cursor-background").then(mod => mod.TubeCursorBackground)
)

export const metadata = {
  title: "Sudolabs Digital | Ingeniería de Software de Alto Calibre",
  description: "Consultora de software especializada en Next.js, Cloud Architecture y Transformación Digital. Convertimos complejidad operativa en ventajas competitivas.",
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden forced-dark-mode bg-[#020617] lg:bg-transparent">
      <TubeCursorBackground />

      {/* Para responsive */}
      <div className="fixed top-0 left-0 w-[300px] h-[300px] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none lg:hidden z-0" />
      <div className="fixed bottom-0 right-0 w-[300px] h-[300px] bg-[#00FFA3]/10 blur-[100px] rounded-full pointer-events-none lg:hidden z-0" />
      
      <div className="relative z-10">
        {/* ISLA INTERACTIVA 1: HERO */}
        <HeroSection />

        {/* ISLA INTERACTIVA 2: TICKER */}
        <TechTicker />

        {/* SECCIÓN ESTÁTICA (Server Component) */}
        <SolutionsGrid />

        {/* SECCIÓN ESTÁTICA (Server Component) */}
        <FaqSection />

        {/* ISLA INTERACTIVA 3: CTA FINAL */}
        <CtaSection />
      </div>
    </main>
  )
}