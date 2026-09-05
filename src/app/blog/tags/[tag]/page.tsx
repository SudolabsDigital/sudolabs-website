import { getPostsByTag, getAllTags } from "@/lib/mdx";
import Link from "next/link";
import { ArrowLeft, Tag as TagIcon } from "lucide-react";
import { notFound } from "next/navigation";
import BreadcrumbSchema from "@/components/seo/breadcrumb-schema";

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    tag: tag.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const tags = await getAllTags();
  const currentTag = tags.find(t => t.slug === tag);
  
  if (!currentTag) return {};
  
  return {
    title: `Artículos sobre ${currentTag.name}`,
    // Con la cifra real: 55 descripciones idénticas salvo el nombre de la
    // etiqueta compiten entre sí. El recuento las distingue y además informa.
    description:
      currentTag.count === 1
        ? `El artículo de Sudolabs Perú sobre ${currentTag.name}: ingeniería de software aplicada a casos reales.`
        : `Los ${currentTag.count} artículos de Sudolabs Perú sobre ${currentTag.name}: ingeniería de software aplicada a casos reales.`,
    alternates: { canonical: `/blog/tags/${tag}` },
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);
  const tags = await getAllTags();
  const currentTag = tags.find(t => t.slug === tag);

  if (!currentTag) {
    if (posts.length === 0) return notFound();
  }

  const tagName = currentTag ? currentTag.name : tag;

  return (
    <main className="flex-1 pt-32 pb-24 container mx-auto px-6 max-w-5xl">
        <BreadcrumbSchema
          items={[
            { name: "Inicio", item: "/" },
            { name: "Blog", item: "/blog" },
            { name: tagName },
          ]}
        />
        <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
           <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Todos los Artículos
        </Link>

        <div className="mb-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
           <div>
             <div className="flex items-center gap-3 mb-4 text-primary">
                <TagIcon className="w-6 h-6" />
                <span className="text-sm font-bold uppercase tracking-widest">Tema</span>
             </div>
             <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
               {tagName}
             </h1>
             <p className="text-xl text-muted-foreground mt-4">
               {posts.length} {posts.length === 1 ? 'artículo disponible' : 'artículos disponibles'}
             </p>
           </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
           {posts.map((post) => {
             const formattedDate = new Intl.DateTimeFormat('es-ES', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
             }).format(new Date(post.date));

             return (
               <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <article className="h-full flex flex-col p-8 rounded-3xl border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition shadow-sm hover:shadow-md">
                     <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
                        <time dateTime={post.date}>
                          {formattedDate}
                        </time>
                        <span>•</span>
                        <span>{typeof post.readTime === 'string' ? post.readTime : "Lectura rápida"}</span>
                     </div>
                     <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                       {post.title}
                     </h2>
                     <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                       {post.description}
                     </p>
                     <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                       Leer artículo <span className="group-hover:translate-x-1 transition-transform">→</span>
                     </div>
                  </article>
               </Link>
             );
           })}
        </div>
    </main>
  );
}
