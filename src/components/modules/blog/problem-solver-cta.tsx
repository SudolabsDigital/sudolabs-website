import Link from "next/link";
import { ArrowRight, Terminal, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProblemSolverCTA() {
  return (
    <section className="my-16 relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 p-8 md:p-12">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start text-center md:text-left">
        
        {/* Icon / Visual Anchor */}
        <div className="shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-background border border-border shadow-sm flex items-center justify-center text-primary">
            <Terminal className="w-8 h-8" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            ¿Te identificas con este problema?
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            No tienes que resolverlo solo. Nuestros ingenieros ya tienen la arquitectura lista para implementarla en tu negocio.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
            <Button asChild size="lg" className="font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
              <Link href="/contacto">
                <Zap className="w-4 h-4 mr-2 fill-current" /> Implementar Esto
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="bg-background/50 backdrop-blur border-primary/20 hover:bg-background/80">
              <Link href="/servicios">
                Explorar más Soluciones <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
