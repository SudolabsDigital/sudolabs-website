import { getAllContent, ProjectMeta } from "@/lib/mdx";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { CtaCard } from "@/components/ui/design-system/cta-card";
import { ProjectCard } from "@/components/ui/design-system/project-card";
import { Aurora } from "@/components/ui/design-system/aurora";
import { LivePreviewBadge } from "@/components/ui/live-preview-badge";
import PageHero from "@/components/ui/page-hero";

import BreadcrumbSchema from "@/components/seo/breadcrumb-schema";

export const metadata = {
  title: "Portafolio y Casos de Éxito | Sudolabs Perú",
  description: "Descubre cómo transformamos negocios con software. Casos reales de automatización, gestión documental y plataformas digitales.",
  alternates: {
    canonical: "https://sudolabs.space/proyectos",
  },
};

export default async function ProyectosPage() {
  const allProjects = await getAllContent<ProjectMeta>("projects");

  const featuredProject = allProjects.find(p => p.isFeatured) || allProjects[0];
  const otherProjects = allProjects.filter(p => p.slug !== featuredProject?.slug);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background selection:bg-primary/20 relative overflow-hidden">
      <BreadcrumbSchema 
        items={[
          { name: "Inicio", item: "/" },
          { name: "Proyectos", item: "/proyectos" }
        ]} 
      />
      <PageHero 
        title="Portafolio & Casos de Éxito"
        subtitle="Nuestro Trabajo"
        description="Software de alto impacto diseñado para escalar operaciones y dominar mercados."
        imageSrc="/assets/images/Digitalización que Funciona.webp"
        size="compact"
        breadcrumbs={[{ label: "Proyectos" }]}
      />

      <div className="flex-1 pt-16 pb-24 relative z-10">

        {/* SINGLE FEATURED PROJECT (Cinematic & Balanced) */}
        {featuredProject && (
          <section className="container mx-auto px-6 mb-24">
             <div className="text-xs font-bold text-primary mb-6 uppercase tracking-[0.3em] flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Proyecto Destacado
             </div>
             
             <div className="relative rounded-[2rem] isolate">
               <Aurora variant="glow" className="-inset-3 md:-inset-4" />
               <Link href={`/proyectos/${featuredProject.slug}`} className="group block relative">
                <article className="relative rounded-[2rem] overflow-hidden border border-slate-200/90 bg-white/90 shadow-xl">
                    <div className="grid lg:grid-cols-12 items-stretch">
                        {/* Content (5 cols) */}
                        <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center order-2 lg:order-1">
                            {featuredProject.type === "producto-propio" && (
                              <span className="mb-4 w-fit px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#004481] bg-[#004481]/10 border border-[#004481]/20 rounded-full">
                                Producto Propio
                              </span>
                            )}
                            <h2 className="text-3xl md:text-4xl font-black mb-4 text-slate-900 tracking-tight">
                                {featuredProject.title}
                            </h2>
                            <p className="text-slate-600 mb-8 line-clamp-3 text-lg leading-relaxed font-normal">
                                {featuredProject.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-8">
                                {featuredProject.tags?.slice(0, 3).map((tech) => (
                                    <span key={tech} className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#004481]/10 border border-[#004481]/20 text-[#004481]">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 font-bold text-xs text-[#004481] uppercase tracking-widest">
                                    Ver Caso de Estudio <ArrowRight className="w-4 h-4" />
                                </div>
                                {featuredProject.websiteUrl && (
                                    <LivePreviewBadge url={featuredProject.websiteUrl} />
                                )}
                            </div>
                        </div>

                        {/* Image (7 cols) - Proporción balanceada */}
                        <div className="lg:col-span-7 relative h-[250px] md:h-[400px] lg:h-auto bg-slate-100 overflow-hidden order-1 lg:order-2 border-l border-slate-200/90">
                            {featuredProject.image && (
                                <Image 
                                    src={featuredProject.image} 
                                    alt={featuredProject.title}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                    className="object-cover"
                                />
                            )}
                        </div>
                    </div>
                </article>
               </Link>
             </div>
          </section>
        )}

        {/* OTHER PROJECTS GRID (Compact 3-Column) */}
        {otherProjects.length > 0 && (
            <section className="container mx-auto px-6 mb-24">
                <h3 className="text-lg font-black text-slate-900 mb-8 uppercase tracking-[0.2em]">Más Proyectos</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherProjects.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </div>
            </section>
        )}

        <section className="container mx-auto px-6 mb-24">
            <CtaCard
              tag="Siguiente Paso"
              title="¿Listo para tu propio caso de éxito?"
              description="Diseñamos sistemas que reducen costos y multiplican la productividad. Convierte tu cuello de botella en tu ventaja competitiva."
              buttonText="Quiero un proyecto similar"
              href="/contacto?subject=Interés desde el Portafolio"
              imageSrc="/assets/images/Mapeo de Procesos.webp"
            />
        </section>

      </div>
    </div>
  );
}
