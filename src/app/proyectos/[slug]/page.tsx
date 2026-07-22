import { getContentBySlug, getAllContent, getPostsBySlugs, ProjectMeta, BlogMeta } from "@/lib/mdx";
import { MDXContent } from "@/components/modules/blog/mdx-content";
import { notFound } from "next/navigation";
import { BookOpen, Briefcase, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CtaCard } from "@/components/ui/design-system/cta-card";
import { LivePreviewBadge } from "@/components/ui/live-preview-badge";
import { PageHero } from "@/components/ui/page-hero";

export async function generateStaticParams() {
  const projects = await getAllContent<ProjectMeta>("projects");
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = await getContentBySlug<ProjectMeta>("projects", params.slug);
  if (!project) return {};
  return {
    title: `${project.meta.title} | Portafolio Sudolabs`,
    description: project.meta.description,
  };
}

export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = await getContentBySlug<ProjectMeta>("projects", params.slug);

  if (!project) {
    notFound();
  }

  const manualPostSlugs = project.meta.relatedPosts || [];
  const manualPosts = manualPostSlugs.length > 0 
    ? await getPostsBySlugs(manualPostSlugs) 
    : [];

  const allBlogPosts = await getAllContent<BlogMeta>("blog");
  const linkedPosts = allBlogPosts.filter(post => post.relatedProject === params.slug);

  const uniquePostsMap = new Map();
  [...manualPosts, ...linkedPosts].forEach(post => {
      uniquePostsMap.set(post.slug, post);
  });
  const relatedPosts = Array.from(uniquePostsMap.values());

  return (
    <div className="flex flex-col bg-background font-sans selection:bg-primary/20">
      <div className="flex-1">
        
        {/* 1. HERO CON PAGEHERO ESTANDARIZADO */}
        <PageHero
          title={project.meta.title}
          subtitle="Caso de Éxito"
          description={project.meta.description}
          imageSrc={project.meta.image || "/assets/images/Digitalización que Funciona.webp"}
          size="compact"
          breadcrumbs={[
            { label: "Proyectos", href: "/proyectos" },
            { label: project.meta.title }
          ]}
        />

        <div className="container mx-auto px-6 py-16 max-w-6xl relative z-10">
           
           {/* 2. KEY STATS (KPIs en Alto Contraste) */}
           {project.meta.stats && (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 relative z-20">
                {project.meta.stats.map((stat, i) => (
                  <div key={i} className="bg-white border border-slate-200/90 p-8 rounded-3xl shadow-xl flex flex-col items-center text-center">
                      <span className="text-4xl md:text-5xl font-black text-[#004481] mb-2 block">{stat.value}</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-600">{stat.label}</span>
                  </div>
                ))}
             </div>
           )}

           {/* 3. CONTEXT & CONTENT */}
           <div className="grid lg:grid-cols-12 gap-12 mb-24">
              {/* Sidebar: Metadata */}
              <aside className="lg:col-span-4 space-y-8 order-2 lg:order-1">
                 <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md sticky top-32">
                    {(project.meta.logo || project.meta.partnerLogo) && (
                       <div className="flex items-center gap-3 mb-6">
                          {project.meta.logo && (
                             <div className="relative h-16 flex-1 rounded-xl bg-white border border-border/50 shadow-sm p-3">
                                <Image
                                   src={project.meta.logo}
                                   alt={project.meta.title}
                                   fill
                                   sizes="180px"
                                   className="object-contain"
                                />
                             </div>
                          )}
                          {project.meta.partnerLogo && (
                             <div className="relative h-16 w-16 shrink-0 rounded-xl bg-white border border-border/50 shadow-sm p-2">
                                <Image
                                   src={project.meta.partnerLogo}
                                   alt={`Institución asociada a ${project.meta.title}`}
                                   fill
                                   sizes="64px"
                                   className="object-contain"
                                />
                             </div>
                          )}
                       </div>
                    )}
                    {project.meta.type === "producto-propio" && (
                       <span className="mb-4 inline-block w-fit px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/5 border border-primary/20 rounded-full">
                          Producto Propio de Sudolabs
                       </span>
                    )}
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                       <Briefcase className="w-5 h-5 text-primary" /> Ficha Técnica
                    </h3>
                    <div className="space-y-6">
                       <div>
                          <div className="text-xs font-bold uppercase text-muted-foreground mb-1">Cliente</div>
                          <div className="font-medium text-foreground">{project.meta.client || 'Confidencial'}</div>
                       </div>
                       <div>
                          <div className="text-xs font-bold uppercase text-muted-foreground mb-1">Rol</div>
                          <div className="font-medium text-foreground">{project.meta.role || 'Desarrollo'}</div>
                       </div>
                       <div>
                          <div className="text-xs font-bold uppercase text-muted-foreground mb-1">Fecha</div>
                          <div className="font-medium text-foreground">{project.meta.date}</div>
                       </div>
                       {project.meta.tags && (
                           <div>
                              <div className="text-xs font-bold uppercase text-muted-foreground mb-2">Tech Stack</div>
                              <div className="flex flex-wrap gap-2">
                                 {project.meta.tags.map((tag) => (
                                    <span key={tag} className="text-xs bg-background border border-border px-2 py-1 rounded font-mono text-muted-foreground">{tag}</span>
                                 ))}
                              </div>
                           </div>
                       )}

                       {project.meta.websiteUrl && (
                          <div className="pt-4 border-t border-border/50">
                             <a 
                                href={project.meta.websiteUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:brightness-110 transition shadow-lg shadow-primary/20"
                             >
                                Visitar Proyecto <ExternalLink className="w-4 h-4" />
                             </a>
                             <div className="mt-3 flex justify-center">
                                <LivePreviewBadge url={project.meta.websiteUrl} />
                             </div>
                          </div>
                       )}
                    </div>
                 </div>
              </aside>

              {/* Main Content: Pitch */}
              <div className="lg:col-span-8 order-1 lg:order-2">
                 <div className="max-w-none">
                    <MDXContent source={project.content} />
                 </div>
              </div>
           </div>

           {/* 4. DNA / RELATED CONCEPTS */}
           {relatedPosts.length > 0 && (
             <section className="border-t border-border/50 pt-16">
                <div className="flex items-center gap-3 mb-8">
                   <div className="p-2 bg-primary/10 rounded-lg">
                      <BookOpen className="w-6 h-6 text-primary" />
                   </div>
                   <div>
                      <h2 className="text-2xl font-bold">Ingeniería Detrás del Proyecto</h2>
                      <p className="text-muted-foreground">Artículos técnicos sobre las soluciones aplicadas en este caso.</p>
                   </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                   {relatedPosts.map((post) => (
                      <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                         <article className="flex flex-col h-full p-6 rounded-2xl border border-border hover:border-primary/50 bg-card hover:bg-muted/50 transition">
                            <span className="text-xs font-bold text-primary mb-3 uppercase tracking-wider">Concepto Clave</span>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                               {post.title}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
                               {post.description}
                            </p>
                            <div className="flex items-center text-sm font-semibold text-foreground group-hover:translate-x-1 transition-transform">
                               Leer Artículo <ArrowRight className="w-4 h-4 ml-2" />
                            </div>
                         </article>
                      </Link>
                   ))}
                </div>
             </section>
           )}

           <div className="mt-20">
              <CtaCard
                tag="Siguiente Paso"
                title="¿Tienes un desafío similar?"
                description="Podemos replicar esta arquitectura o diseñar una nueva para tu caso específico. Habla con un arquitecto hoy mismo."
                buttonText="Agendar Evaluación"
                href={`/contacto?subject=Consulta sobre caso: ${project.meta.title}`}
                imageSrc="/assets/images/Mapeo de Procesos.webp"
              />
           </div>

        </div>
      </div>
    </div>
  );
}
