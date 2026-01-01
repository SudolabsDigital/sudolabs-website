import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { TechTicker } from "@/components/layout/tech-ticker"
import { SolutionsGrid } from "@/components/layout/solutions-grid"
import { FaqSection } from "@/components/layout/faq-section"
import { GlobalSpotlight } from "@/components/ui/global-spotlight"
import { HeroSection } from "@/components/modules/home/hero-section"
import { CtaSection } from "@/components/modules/home/cta-section"

export const metadata = {
  title: "Sudolabs Digital | Ingeniería de Software de Alto Calibre",
  description: "Consultora de software especializada en Next.js, Cloud Architecture y Transformación Digital. Convertimos complejidad operativa en ventajas competitivas.",
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background selection:bg-primary/20 relative">
      <GlobalSpotlight />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1">
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
        </main>

        <Footer />
      </div>
    </div>
  )
}