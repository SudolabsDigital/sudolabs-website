import { Blocks, Briefcase, Zap } from "lucide-react"

export function SolutionsGrid() {
  return (
    <section className="py-24 container mx-auto px-6">
      <div className="text-center max-w-4xl mx-auto mb-20">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-white">
          Soluciones Reales para <br/>
          <span className="text-primary">Problemas Reales</span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
          Ya seas una startup buscando su primer MVP o una empresa establecida optimizando procesos, 
          diseñamos la arquitectura exacta que tu negocio necesita. Sin excesos, sin atajos.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* CARD 1: EMPRENDEDORES & PYMES */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-10 flex flex-col hover:border-secondary/50 transition-colors shadow-sm group">
          <div className="w-14 h-14 bg-secondary/10 text-white rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <Zap className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-bold mb-4 text-white">Digitalización Ágil</h3>
          <p className="text-base font-bold text-white mb-6 uppercase tracking-wider">Para PYMEs y Startups</p>
          <p className="text-lg text-gray-100 mb-8 flex-1 leading-relaxed">
            Llevamos tu negocio al mundo digital. Desde sitios web de alto impacto hasta automatización de tareas manuales (Excel, emails) que te roban tiempo.
          </p>
          <ul className="space-y-4 mb-8 text-lg text-white">
            <li className="flex items-center gap-3"><div className="w-2 h-2 bg-secondary rounded-full" /> Landing Pages de Alta Conversión</li>
            <li className="flex items-center gap-3"><div className="w-2 h-2 bg-secondary rounded-full" /> Automatización de Procesos</li>
            <li className="flex items-center gap-3"><div className="w-2 h-2 bg-secondary rounded-full" /> MVPs en semanas, no meses</li>
          </ul>
        </div>

        {/* CARD 2: EMPRESAS */}
        <div className="bg-black/40 backdrop-blur-md border border-primary/30 rounded-2xl p-6 md:p-10 flex flex-col relative shadow-lg shadow-primary/5 hover:border-primary/60 transition-colors group">
          <div className="absolute top-0 right-0 bg-white text-slate-950 text-sm font-bold px-4 py-2 rounded-bl-xl rounded-tr-xl">
            MÁS SOLICITADO
          </div>
          <div className="w-14 h-14 bg-primary/10 text-white rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <Blocks className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-bold mb-4 text-white">Sistemas a Medida</h3>
          <p className="text-base font-bold text-white mb-6 uppercase tracking-wider">Para Empresas en Crecimiento</p>
          <p className="text-lg text-gray-100 mb-8 flex-1 leading-relaxed">
            Software diseñado específicamente para tus reglas de negocio. CRMs, ERPs o plataformas de gestión que se adaptan a ti, y no al revés.
          </p>
          <ul className="space-y-4 mb-8 text-lg text-white">
            <li className="flex items-center gap-3"><div className="w-2 h-2 bg-primary rounded-full" /> Plataformas de Gestión Interna</li>
            <li className="flex items-center gap-3"><div className="w-2 h-2 bg-primary rounded-full" /> Integración de APIs (Pagos, Facturación)</li>
            <li className="flex items-center gap-3"><div className="w-2 h-2 bg-primary rounded-full" /> Migración a la Nube (AWS/Vercel)</li>
          </ul>
        </div>

        {/* CARD 3: CONSULTORÍA */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-10 flex flex-col hover:border-accent/50 transition-colors shadow-sm group">
          <div className="w-14 h-14 bg-accent/10 text-white rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <Briefcase className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-bold mb-4 text-white">Consultoría Técnica</h3>
          <p className="text-base font-bold text-white mb-6 uppercase tracking-wider">Para Equipos de TI</p>
          <p className="text-lg text-gray-100 mb-8 flex-1 leading-relaxed">
            Auditoría y rescate de proyectos. Si tienes un sistema lento, inseguro o código imposible de mantener, nosotros ponemos orden en el caos.
          </p>
          <ul className="space-y-4 mb-8 text-lg text-white">
            <li className="flex items-center gap-3"><div className="w-2 h-2 bg-accent rounded-full" /> Auditoría de Seguridad y Performance</li>
            <li className="flex items-center gap-3"><div className="w-2 h-2 bg-accent rounded-full" /> Refactorización de Código Legacy</li>
            <li className="flex items-center gap-3"><div className="w-2 h-2 bg-accent rounded-full" /> Arquitectura de Software Escalable</li>
          </ul>
        </div>
      </div>
    </section>
  )
}