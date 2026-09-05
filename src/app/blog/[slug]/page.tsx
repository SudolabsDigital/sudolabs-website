import { notFound } from "next/navigation";
import Link from "next/link";
import { Tag, ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { siteConfig } from "@/core/config";
import BreadcrumbSchema from "@/components/seo/breadcrumb-schema";
import { getContentBySlug, getAllContent, getHeadings } from "@/lib/mdx";
import { BlogMeta, ProjectMeta, slugify } from "@/lib/mdx-utils";
import { ProblemSolverCTA } from "@/components/modules/blog/problem-solver-cta";
import { Badge } from "@/components/ui/badge";
import { CustomComponents } from "@/components/modules/blog/mdx-components";
import { TableOfContents } from "@/components/modules/blog/table-of-contents";
import BlogJsonLd from "@/components/seo/blog-json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { BlogSidebar } from "@/components/modules/blog/ui/blog-sidebar";

export async function generateStaticParams() {
  const posts = await getAllContent<BlogMeta>("blog");
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getContentBySlug<BlogMeta>("blog", params.slug);
  if (!post) return {};
  
  // Declarar `openGraph` REEMPLAZA el del layout entero, no se fusiona. Sin
  // este respaldo, un artículo sin portada propia se queda sin ninguna imagen
  // social en vez de heredar la genérica del sitio.
  const imagenSocial = post.meta.image || siteConfig.ogImage;

  return {
    // Sin `| Blog Sudolabs`: el `template` del layout ya pone la marca, y con
    // el sufijo el título servido llegaba a 101 caracteres.
    title: post.meta.title,
    description: post.meta.description,
    alternates: { canonical: `/blog/${params.slug}` },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      url: `${siteConfig.siteUrl}/blog/${params.slug}`,
      publishedTime: post.meta.date,
      authors: [post.meta.author || siteConfig.author],
      images: [{ url: imagenSocial }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.description,
      images: [imagenSocial],
    },
  };
}

export default async function BlogPost(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getContentBySlug<BlogMeta>("blog", params.slug);

  if (!post) {
    notFound();
  }

  let relatedProject: ProjectMeta | null = null;
  if (post.meta.relatedProject) {
      const projectData = await getContentBySlug<ProjectMeta>("projects", post.meta.relatedProject);
      relatedProject = projectData ? projectData.meta : null;
  }

  const headings = getHeadings(post.content);

  return (
    <div className="min-h-screen bg-background font-sans pb-24">
      <BlogJsonLd post={post.meta} />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", item: "/" },
          { name: "Blog", item: "/blog" },
          { name: post.meta.title },
        ]}
      />
      
      {/* Dynamic Page Hero for Blog Post */}
      <PageHero 
        title={post.meta.title}
        subtitle={post.meta.category?.toUpperCase() || "ARTÍCULO TÉCNICO"}
        description={post.meta.description}
        imageSrc={post.meta.image || "/assets/images/blogs/bienvenidos-a-sudolabs.webp"}
        size="compact"
        align="left"
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: post.meta.category || "General", href: `/blog?cat=${slugify(post.meta.category || "")}` },
          { label: "Artículo" }
        ]}
      />

      {/* relative z-10: el fondo Aurora (`GlobalSpotlight`) es `fixed inset-0 z-0`,
          o sea un elemento POSICIONADO, y por orden de pintado se dibuja encima de
          todo bloque sin posicionar — incluido el fondo blanco de este <main>. Las
          barras laterales se libraban por ser `sticky`. Sin esta línea el contenido
          central se lee sobre el degradado morado. */}
      <div className="container mx-auto px-6 max-w-[1400px] pt-12 md:pt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* LEFT SIDEBAR (Sticky) */}
            <aside className="hidden lg:block lg:col-span-3 xl:col-span-2">
                <div className="sticky top-24 rounded-3xl border border-slate-200/90 bg-white shadow-sm p-6">
                    <BlogSidebar post={post.meta} relatedProject={relatedProject} />
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="lg:col-span-9 xl:col-span-7 rounded-3xl border border-slate-200/90 bg-white shadow-sm p-6 md:p-10">
                {/* Mobile Back Link */}
                <Link 
                    href="/blog" 
                    className="lg:hidden inline-flex items-center text-xs font-bold text-muted-foreground hover:text-primary transition-colors mb-8 uppercase tracking-widest"
                >
                    <ArrowLeft className="w-3 h-3 mr-2" />
                    Volver al Blog
                </Link>

                <article>
                    {/* Tags */}
                    {post.meta.tags && (
                        <div className="flex flex-wrap gap-2 mb-12">
                            {post.meta.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="px-3 py-1 text-[10px] uppercase tracking-wider font-bold bg-muted/30 text-muted-foreground border-border/50">
                                    <Tag className="w-3 h-3 mr-1.5 opacity-50" />
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}

                    <div className="max-w-none text-slate-700 text-lg leading-relaxed article-content">
                        <MDXRemote 
                            source={post.content} 
                            components={CustomComponents} 
                            options={{
                                mdxOptions: {
                                    remarkPlugins: [remarkGfm]
                                }
                            }}
                        />
                    </div>
                </article>

                <div className="mt-20 border-t border-border pt-12">
                    <ProblemSolverCTA />
                </div>
            </main>

            {/* RIGHT SIDEBAR (Sticky TOC) */}
            <aside className="hidden lg:block lg:col-span-3">
                 <div className="sticky top-24 rounded-3xl border border-slate-200/90 bg-white shadow-sm p-6">
                     <TableOfContents headings={headings} />
                 </div>
            </aside>

        </div>
      </div>
    </div>
  );
}
