import { Box } from "lucide-react"
import { SolutionsGridReveal } from "./solutions-grid-reveal"
import { SOLUTIONS_DATA } from "@/core/solutions-data"

export function SolutionsGrid() {
  return (
    <section id="soluciones" className="py-24 border-t border-border bg-card/20 min-h-[800px]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* HEADER (SSR nativo ahora) */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">
            <Box className="w-4 h-4" /> Catálogo de Módulos
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Ingeniería <span className="text-primary">Modular</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Explora nuestra biblioteca de componentes listos para producción. Arquitecturas probadas que puedes ensamblar para escalar tu plataforma sin reinventar la rueda.
          </p>
        </div>

        {/* Capa de Interactividad (Cliente) */}
        <SolutionsGridReveal solutions={SOLUTIONS_DATA} />

      </div>
    </section>
  )
}
