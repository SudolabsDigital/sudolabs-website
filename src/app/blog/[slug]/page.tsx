import { getContentBySlug, getAllContent, slugify } from "@/lib/mdx";
import { MDXContent } from "@/components/modules/blog/mdx-content";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = await getAllContent("blog");
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getContentBySlug("blog", slug);
  if (!post) return {};
  return {
    title: `${post.meta.title} | Blog Sudolabs`,
    description: post.meta.description,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getContentBySlug("blog", slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />
      <main className="flex-1 pt-32 pb-24 container mx-auto px-6 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
           <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Blog
        </Link>
        
        <header className="mb-12">
           <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <time dateTime={post.meta.date}>
                {format(new Date(post.meta.date), "d 'de' MMMM, yyyy", { locale: es })}
              </time>
              <span>•</span>
              <span>{typeof post.meta.readTime === 'string' ? post.meta.readTime : "Lectura rápida"}</span>
              
              {post.meta.tags && post.meta.tags.length > 0 && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex gap-2">
                    {post.meta.tags.map(tag => (
                      <Link 
                        key={tag} 
                        href={`/blog/tags/${slugify(tag)}`}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </>
              )}
           </div>
           
           <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-foreground">
             {post.meta.title}
           </h1>
           <p className="text-xl text-muted-foreground leading-relaxed">
             {post.meta.description}
           </p>
        </header>

        <article className="pb-16 border-b border-border/50">
           <MDXContent source={post.content} />
        </article>
      </main>
      <Footer />
    </div>
  );
}
