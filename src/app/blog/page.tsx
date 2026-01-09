import { getAllContent, getAllTags } from "@/lib/mdx";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const metadata = {
  title: "Blog de Ingeniería | Sudolabs",
  description: "Artículos técnicos sobre desarrollo de software, arquitectura cloud y optimización.",
};

export default async function BlogIndex() {
  const posts = await getAllContent("blog");
  const tags = await getAllTags();

  return (
    <div className="flex-1 pt-32 pb-24 container mx-auto px-6 max-w-5xl">
        <div className="mb-8">
           <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
             Blog de <span className="text-primary">Ingeniería</span>
           </h1>
           <p className="text-xl text-muted-foreground max-w-2xl">
             Compartimos lo que aprendemos construyendo software de verdad. Sin relleno, solo código y arquitectura.
           </p>
        </div>

        {/* Popular Tags Section */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-16 items-center">
              <span className="text-sm font-semibold text-muted-foreground mr-2">Temas populares:</span>
              {tags.slice(0, 6).map(tag => (
                  <Link 
                      key={tag.slug} 
                      href={`/blog/tags/${tag.slug}`}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors border border-border"
                  >
                      {tag.name}
                  </Link>
              ))}
          </div>
        )}

        <div className="grid gap-10 md:grid-cols-2">
           {posts.length > 0 ? posts.map((post) => (
             <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className="h-full flex flex-col p-8 rounded-3xl border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all shadow-sm hover:shadow-md">
                   <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
                      <time dateTime={post.date}>
                        {format(new Date(post.date), "d 'de' MMMM, yyyy", { locale: es })}
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
                   {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-2 mb-6">
                        {post.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-muted text-muted-foreground">
                            #{tag}
                          </span>
                        ))}
                      </div>
                   )}
                   <div className="flex items-center gap-2 text-sm font-semibold text-primary mt-auto">
                     Leer artículo <span className="group-hover:translate-x-1 transition-transform">→</span>
                   </div>
                </article>
             </Link>
           )) : (
             <div className="col-span-full py-12 text-center border border-dashed border-border rounded-3xl">
                <p className="text-muted-foreground">Pronto publicaremos nuestro primer artículo.</p>
             </div>
           )}
        </div>
    </div>
  );
}
