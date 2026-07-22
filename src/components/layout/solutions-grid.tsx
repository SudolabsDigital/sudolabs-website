import { Box } from "lucide-react"
import { SolutionsGridReveal } from "./solutions-grid-reveal"
import { SOLUTIONS_DATA } from "@/core/solutions-data"

export function SolutionsGrid() {
  return (
    <section id="soluciones" className="py-12 md:py-16 bg-transparent relative">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* HEADER (SSR nativo ahora - Tipografía Extra Gruesa de Alto Contraste) */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#004481]/10 text-[#004481] border border-[#004481]/20 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Box className="w-4 h-4 text-[#004481]" /> Catálogo de Módulos
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 mb-4 leading-tight">
            Ingeniería <span className="text-[#004481]">Modular</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-normal">
            Explora nuestra biblioteca de componentes listos para producción. Arquitecturas probadas que puedes ensamblar para escalar tu plataforma sin reinventar la rueda.
          </p>
        </div>

        {/* Capa de Interactividad (Cliente) */}
        <SolutionsGridReveal solutions={SOLUTIONS_DATA} />

      </div>
    </section>
  )
}
