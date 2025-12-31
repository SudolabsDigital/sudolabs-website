import { Blocks, Briefcase, Zap } from "lucide-react"

export function SolutionsGrid() {
  return (
    <section className="py-24 container mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
          Soluciones Reales para <br/>
          <span className="text-primary">Problemas Reales</span>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Ya seas una startup buscando su primer MVP o una empresa establecida optimizando procesos, 
          diseñamos la arquitectura exacta que tu negocio necesita. Sin excesos, sin atajos.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* CARD 1: EMPRENDEDORES & PYMES */}
        <div className="bg-background border border-border rounded-2xl p-8 flex flex-col hover:border-secondary/50 transition-colors shadow-sm group">
          <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3">Digitalización Ágil</h3>
          <p className="text-sm font-semibold text-secondary mb-4 uppercase tracking-wider">Para PYMEs y Startups</p>
          <p className="text-muted-foreground mb-6 flex-1">
            Llevamos tu negocio al mundo digital. Desde sitios web de alto impacto hasta automatización de tareas manuales (Excel, emails) que te roban tiempo.
          </p>
          <ul className="space-y-3 mb-8 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-secondary rounded-full" /> Landing Pages de Alta Conversión</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-secondary rounded-full" /> Automatización de Procesos</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-secondary rounded-full" /> MVPs en semanas, no meses</li>
          </ul>
        </div>

        {/* CARD 2: EMPRESAS */}
        <div className="bg-background border border-primary/30 rounded-2xl p-8 flex flex-col relative shadow-lg shadow-primary/5 hover:border-primary/60 transition-colors group">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
            MÁS SOLICITADO
          </div>
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Blocks className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3">Sistemas a Medida</h3>
          <p className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider">Para Empresas en Crecimiento</p>
          <p className="text-muted-foreground mb-6 flex-1">
            Software diseñado específicamente para tus reglas de negocio. CRMs, ERPs o plataformas de gestión que se adaptan a ti, y no al revés.
          </p>
          <ul className="space-y-3 mb-8 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full" /> Plataformas de Gestión Interna</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full" /> Integración de APIs (Pagos, Facturación)</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full" /> Migración a la Nube (AWS/Vercel)</li>
          </ul>
        </div>

        {/* CARD 3: CONSULTORÍA */}
        <div className="bg-background border border-border rounded-2xl p-8 flex flex-col hover:border-accent/50 transition-colors shadow-sm group">
          <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Briefcase className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3">Consultoría Técnica</h3>
          <p className="text-sm font-semibold text-accent mb-4 uppercase tracking-wider">Para Equipos de TI</p>
          <p className="text-muted-foreground mb-6 flex-1">
            Auditoría y rescate de proyectos. Si tienes un sistema lento, inseguro o código imposible de mantener, nosotros ponemos orden en el caos.
          </p>
          <ul className="space-y-3 mb-8 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent rounded-full" /> Auditoría de Seguridad y Performance</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent rounded-full" /> Refactorización de Código Legacy</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent rounded-full" /> Arquitectura de Software Escalable</li>
          </ul>
        </div>
      </div>
    </section>
  )
}