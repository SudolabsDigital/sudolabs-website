import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowLeft, Calendar, Clock, Tag, ArrowUpRight } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

import { getContentBySlug, getAllContent, getHeadings } from "@/lib/mdx";
import { BlogMeta, ProjectMeta } from "@/lib/mdx-utils";
import { ProblemSolverCTA } from "@/components/modules/blog/problem-solver-cta";
import { Badge } from "@/components/ui/badge";
import { CustomComponents } from "@/components/modules/blog/mdx-components";
import { TableOfContents } from "@/components/modules/blog/table-of-contents";
import { Button } from "@/components/ui/button";
import { ShareButtons } from "@/components/modules/blog/share-buttons";
import BlogJsonLd from "@/components/seo/blog-json-ld";
import { cn } from "@/lib/utils";
import { getDifficultyColor, getDifficultyLabel } from "@/lib/blog-ui-utils";

export async function generateStaticParams() {
  const posts = await getAllContent<BlogMeta>("blog");
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getContentBySlug<BlogMeta>("blog", params.slug);
  if (!post) return {};
  
  return {
    title: `${post.meta.title} | Blog Sudolabs`,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
      authors: [post.meta.author || "Sudolabs Team"],
      images: post.meta.image ? [{ url: post.meta.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.meta.title} | Blog Sudolabs`,
      description: post.meta.description,
      images: post.meta.image ? [post.meta.image] : undefined,
    },
  };
}

export default async function BlogPost(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getContentBySlug<BlogMeta>("blog", params.slug);

  if (!post) {
    notFound();
  }

  let relatedProject = null;
  if (post.meta.relatedProject) {
      const projectData = await getContentBySlug<ProjectMeta>("projects", post.meta.relatedProject);
      relatedProject = projectData?.meta;
  }

  const headings = getHeadings(post.content);

  return (
    <div className="min-h-screen bg-background font-sans pb-24">
      <BlogJsonLd post={post.meta} />
      <div className="container mx-auto px-6 max-w-[1400px] pt-32">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* LEFT SIDEBAR (Navigation & Share) */}
            <aside className="hidden lg:block lg:col-span-2 relative">
                <div className="sticky top-32 flex flex-col gap-8">
                    <Link 
                        href="/blog" 
                        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Volver
                    </Link>

                    <div className="space-y-4">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Compartir</span>
                        <ShareButtons title={post.meta.title} slug={post.meta.slug} />
                    </div>

                    {/* Related Project Card in Sidebar */}
                    {relatedProject && (
                        <div className="mt-8 pt-8 border-t border-border">
                             <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 block">Caso de Estudio</span>
                             <Link href={`/proyectos/${relatedProject.slug}`} className="block group">
                                <div className="rounded-xl overflow-hidden border border-border/50 bg-card hover:border-primary/50 transition-all">
                                    {relatedProject.image && (
                                        <div className="h-24 w-full bg-cover bg-center" style={{ backgroundImage: `url(${relatedProject.image})` }} />
                                    )}
                                    <div className="p-4">
                                        <h4 className="font-bold text-sm leading-tight mb-2 group-hover:text-primary transition-colors">{relatedProject.title}</h4>
                                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                                            Ver proyecto <ArrowUpRight className="w-3 h-3" />
                                        </div>
                                    </div>
                                </div>
                             </Link>
                        </div>
                    )}
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="lg:col-span-7">
                {/* Mobile Back Link */}
                <Link 
                    href="/blog" 
                    className="lg:hidden inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al Blog
                </Link>

                <article>
                    <header className="mb-12">
                        {/* Categories & Difficulty */}
                        <div className="flex flex-wrap gap-3 mb-6">
                            {post.meta.category && (
                                <Badge variant="secondary" className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border-primary/20">
                                    {post.meta.category}
                                </Badge>
                            )}
                            {post.meta.difficulty && (
                                <Badge variant="outline" className={cn("px-3 py-1 text-xs font-bold uppercase tracking-wider", getDifficultyColor(post.meta.difficulty))}>
                                    {getDifficultyLabel(post.meta.difficulty)}
                                </Badge>
                            )}
                        </div>

                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-8 leading-tight">
                            {post.meta.title}
                        </h1>

                        <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground mb-8 pb-8 border-b border-border/50">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" /> 
                                {format(new Date(post.meta.date), "d 'de' MMMM, yyyy", { locale: es })}
                            </span>
                            {post.meta.readTime && (
                                <>
                                <span className="hidden md:inline">•</span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" /> 
                                    {post.meta.readTime}
                                </span>
                                </>
                            )}
                            {post.meta.author && (
                                <>
                                <span className="hidden md:inline">•</span>
                                <span className="font-medium text-foreground">
                                    Por {post.meta.author}
                                </span>
                                </>
                            )}
                        </div>

                        {post.meta.tags && (
                            <div className="flex flex-wrap gap-2">
                                {post.meta.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="px-3 py-1 text-xs uppercase tracking-wider font-bold bg-muted/50 text-muted-foreground hover:bg-muted">
                                    <Tag className="w-3 h-3 mr-1.5 opacity-50" />
                                    {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </header>

                    <div className="max-w-none text-foreground text-lg leading-relaxed">
                        <MDXRemote 
                            source={post.content} 
                            components={CustomComponents} 
                            options={{
                                mdxOptions: {
                                    remarkPlugins: [remarkGfm],
                                    rehypePlugins: [
                                        [
                                            rehypePrettyCode,
                                            {
                                                theme: "github-dark",
                                                keepBackground: false,
                                                defaultLang: "plaintext",
                                            }
                                        ]
                                    ]
                                }
                            }}
                        />
                    </div>
                </article>

                <div className="mt-20 border-t border-border pt-12">
                    <ProblemSolverCTA />
                </div>
            </main>

            {/* RIGHT SIDEBAR (TOC) */}
            <aside className="hidden lg:block lg:col-span-3 relative">
                 <div className="sticky top-32">
                     <TableOfContents headings={headings} />
                 </div>
            </aside>

        </div>
      </div>
    </div>
  );
}