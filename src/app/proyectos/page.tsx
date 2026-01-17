import { getAllContent, ProjectMeta } from "@/lib/mdx";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "Portafolio y Casos de Éxito | Sudolabs",
  description: "Descubre cómo transformamos negocios con software. Casos reales de automatización, gestión documental y plataformas digitales.",
};

export default async function ProyectosPage() {
  const allProjects = await getAllContent<ProjectMeta>("projects");
  
  const featuredProject = allProjects.find(p => p.isFeatured) || allProjects[0];
  const otherProjects = allProjects.filter(p => p.slug !== featuredProject?.slug);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background selection:bg-primary/20 relative overflow-hidden">
      
      <div className="flex-1 pt-32 pb-24 relative z-10">
        
        {/* HERO HEADER */}
        <section className="container mx-auto px-6 mb-16 md:mb-20 text-center md:text-left">
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
              Portafolio <br />
              <span className="text-primary">
                & Casos de Éxito
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Software de alto impacto diseñado para escalar operaciones y dominar mercados.
            </p>
        </section>

        {/* SINGLE FEATURED PROJECT (Cinematic & Balanced) */}
        {featuredProject && (
          <section className="container mx-auto px-6 mb-24">
             <div className="text-xs font-bold text-primary mb-6 uppercase tracking-[0.3em] flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Proyecto Destacado
             </div>
             
             <Link href={`/proyectos/${featuredProject.slug}`} className="group block">
                <article className="relative rounded-[2rem] overflow-hidden border border-border/50 bg-card/30 hover:border-primary/50 transition-all duration-500 shadow-2xl">
                    <div className="grid lg:grid-cols-12 items-stretch">
                        {/* Content (5 cols) */}
                        <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center order-2 lg:order-1">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors tracking-tight">
                                {featuredProject.title}
                            </h2>
                            <p className="text-muted-foreground mb-8 line-clamp-3 text-lg leading-relaxed">
                                {featuredProject.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-8">
                                {featuredProject.tags?.slice(0, 3).map((tech) => (
                                    <span key={tech} className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-primary/5 border border-primary/10 text-primary/80">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 font-bold text-xs text-primary uppercase tracking-widest">
                                Ver Caso de Estudio <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </div>
                        </div>

                        {/* Image (7 cols) - Proporción balanceada */}
                        <div className="lg:col-span-7 relative h-[250px] md:h-[400px] lg:h-auto bg-muted overflow-hidden order-1 lg:order-2 border-l border-border/50">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 opacity-60" />
                            {featuredProject.image && (
                                <Image 
                                    src={featuredProject.image} 
                                    alt={featuredProject.title}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            )}
                        </div>
                    </div>
                </article>
             </Link>
          </section>
        )}

        {/* OTHER PROJECTS GRID (Compact 3-Column) */}
        {otherProjects.length > 0 && (
            <section className="container mx-auto px-6 mb-24">
                <div className="h-px w-full bg-border/40 mb-16" />
                <h3 className="text-lg font-bold text-foreground mb-8 uppercase tracking-[0.2em] opacity-50">Más Proyectos</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherProjects.map((project) => (
                        <Link key={project.slug} href={`/proyectos/${project.slug}`} className="group block h-full">
                            <article className="h-full flex flex-col rounded-2xl overflow-hidden border border-border/50 bg-card/20 hover:bg-card hover:border-primary/50 transition-all shadow-sm">
                                <div className="relative aspect-[16/10] bg-muted overflow-hidden border-b border-border/50">
                                    {project.image && (
                                        <Image 
                                            src={project.image} 
                                            alt={project.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    )}
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors tracking-tight">
                                        {project.title}
                                    </h4>
                                    <p className="text-sm text-muted-foreground mb-6 line-clamp-2 flex-1 leading-relaxed">
                                        {project.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
                                        Detalles <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </section>
        )}

      </div>
    </div>
  );
}
