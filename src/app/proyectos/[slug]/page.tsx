import { getContentBySlug, getAllContent, getPostsBySlugs } from "@/lib/mdx";
import { MDXContent } from "@/components/modules/blog/mdx-content";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export async function generateStaticParams() {
  const projects = await getAllContent("projects");
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getContentBySlug("projects", slug);
  if (!project) return {};
  return {
    title: `${typeof project.meta.title === 'string' ? project.meta.title : 'Proyecto'} | Portafolio Sudolabs`,
    description: typeof project.meta.description === 'string' ? project.meta.description : '',
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getContentBySlug("projects", slug);

  if (!project) {
    notFound();
  }

  // Type Guard for Related Posts
  const relatedPostSlugs = (Array.isArray(project.meta.relatedPosts) && project.meta.relatedPosts.every(s => typeof s === 'string'))
    ? project.meta.relatedPosts as string[]
    : [];

  const relatedPosts = relatedPostSlugs.length > 0 
    ? await getPostsBySlugs(relatedPostSlugs) 
    : [];

  // Type Guards for Project Meta
  const projectTitle = typeof project.meta.title === 'string' ? project.meta.title : 'Proyecto';
  const projectDesc = typeof project.meta.description === 'string' ? project.meta.description : '';
  const projectImage = typeof project.meta.image === 'string' ? project.meta.image : '';
  const projectClient = typeof project.meta.client === 'string' ? project.meta.client : 'Confidencial';
  const projectRole = typeof project.meta.role === 'string' ? project.meta.role : 'Desarrollo';
  const projectDate = typeof project.meta.date === 'string' ? project.meta.date : '';
  const projectTags = Array.isArray(project.meta.tags) ? project.meta.tags as string[] : [];

  return (
    <div className="flex flex-col bg-background font-sans selection:bg-primary/20">
      <main className="flex-1">
        
        {/* 1. IMMERSIVE HERO */}
        <div className="relative h-[60vh] md:h-[70vh] w-full bg-muted overflow-hidden flex items-end">
           {/* Background Image */}
           {projectImage && (
              <Image 
                src={projectImage} 
                alt={projectTitle} 
                fill 
                className="object-cover brightness-[0.3]"
                priority
              />
           )}
           
           <div className="container mx-auto px-6 relative z-10 pb-16 md:pb-24">
              <Link href="/proyectos" className="inline-flex items-center text-sm text-white/70 hover:text-white mb-6 transition-colors backdrop-blur-md bg-black/20 px-3 py-1 rounded-full border border-white/10">
                 <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Portafolio
              </Link>
              <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-4 leading-tight max-w-5xl">
                {projectTitle}
              </h1>
              <p className="text-lg md:text-2xl text-white/80 max-w-2xl leading-relaxed">
                {projectDesc}
              </p>
           </div>
        </div>

        <div className="container mx-auto px-6 py-16 max-w-6xl">
           
           {/* 2. KEY STATS (KPIs) - CORREGIDO AQUÍ */}
           {Array.isArray(project.meta.stats) && (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 -mt-24 relative z-20">
                {(project.meta.stats as { label: string, value: string }[]).map((stat, i) => (
                  <div key={i} className="bg-card border border-border/50 p-8 rounded-3xl shadow-xl shadow-black/5 flex flex-col items-center text-center backdrop-blur-sm">
                      <span className="text-4xl md:text-5xl font-extrabold text-primary mb-2 block">{stat.value}</span>
                      <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                  </div>
                ))}
             </div>
           )}

           {/* 3. CONTEXT & CONTENT */}
           <div className="grid lg:grid-cols-12 gap-12 mb-24">
              {/* Sidebar: Metadata */}
              <aside className="lg:col-span-4 space-y-8 order-2 lg:order-1">
                 <div className="p-8 rounded-3xl bg-muted/30 border border-border/50 sticky top-32">
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                       <Briefcase className="w-5 h-5 text-primary" /> Ficha Técnica
                    </h3>
                    <div className="space-y-6">
                       <div>
                          <div className="text-xs font-bold uppercase text-muted-foreground mb-1">Cliente</div>
                          <div className="font-medium text-foreground">{projectClient}</div>
                       </div>
                       <div>
                          <div className="text-xs font-bold uppercase text-muted-foreground mb-1">Rol</div>
                          <div className="font-medium text-foreground">{projectRole}</div>
                       </div>
                       <div>
                          <div className="text-xs font-bold uppercase text-muted-foreground mb-1">Fecha</div>
                          <div className="font-medium text-foreground">{projectDate}</div>
                       </div>
                       <div>
                          <div className="text-xs font-bold uppercase text-muted-foreground mb-2">Tech Stack</div>
                          <div className="flex flex-wrap gap-2">
                             {projectTags.map((tag) => (
                                <span key={tag} className="text-xs bg-background border border-border px-2 py-1 rounded font-mono text-muted-foreground">{tag}</span>
                             ))}
                          </div>
                       </div>
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
                         <article className="flex flex-col h-full p-6 rounded-2xl border border-border hover:border-primary/50 bg-card hover:bg-muted/50 transition-all">
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

        </div>
      </main>
    </div>
  );
}