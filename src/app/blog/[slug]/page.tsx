import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Calendar, Clock, ChevronLeft, Grid } from "lucide-react"
import { getContentBySlug } from "@/lib/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import { siteConfig } from "@/core/config"
import { Button } from "@/components/ui/button"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getContentBySlug("blog", slug)
  if (!post) return {}
  
  return {
    title: `${post.meta.title} | Blog de Ingeniería`,
    description: post.meta.description,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getContentBySlug("blog", slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-background relative selection:bg-gray-300 dark:selection:bg-gray-700 selection:text-foreground">
      
      {/* --- NAVEGACIÓN SUPERIOR (Sticky - Estilo Dark Glass Fijo) --- */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#020617]/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Volver al Blog */}
          <Link 
            href="/blog" 
            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Volver al Blog</span>
            <span className="sm:hidden">Blog</span>
          </Link>

          {/* Volver a Soluciones */}
          <Link 
            href="/#soluciones"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-all"
          >
            <Grid className="w-4 h-4" />
            <span className="hidden sm:inline">Explorar Soluciones</span>
            <span className="sm:hidden">Soluciones</span>
          </Link>

        </div>
      </nav>

      {/* --- CONTENIDO DEL ARTÍCULO --- */}
      <div className="container mx-auto px-6 py-12 md:py-20 max-w-4xl">
        
        {/* Header del Post (Estilos controlados por CSS global .article-header) */}
        <header className="article-header mb-12 md:mb-16 text-center">
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {post.meta.tags?.map((tag) => (
              <span key={tag} className="tag-badge px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wide">
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            {post.meta.title}
          </h1>

          <p className="text-xl max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
            {post.meta.description}
          </p>

          <div className="meta-text flex items-center justify-center gap-6 text-sm font-bold">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.meta.date}>
                {new Date(post.meta.date).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
               <Clock className="w-4 h-4" />
               <span>5 min de lectura</span>
            </div>
          </div>
        </header>

        {/* Cuerpo Markdown (Estilos controlados por CSS global .article-content) */}
        <div className="article-content prose prose-lg md:prose-xl max-w-none">
          <MDXRemote source={post.content} />
        </div>

      </div>

      {/* --- CTA FINAL (Siempre Oscuro) --- */}
      <section className="border-t border-white/10 bg-[#020617]">
        <div className="container mx-auto px-6 py-20 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6 text-white">¿Te identificas con este problema?</h2>
          <p className="text-lg text-gray-400 mb-10 font-medium">
            No tienes que resolverlo solo. Nuestros ingenieros ya tienen la arquitectura lista para implementarla en tu negocio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* ÚNICA EXCEPCIÓN: Botón CTA principal en NEÓN */}
            <a 
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hola, leí sobre "${post.meta.title}" y quiero implementarlo.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="rounded-full bg-[#00FFA3] text-black hover:bg-[#00FFA3]/90 font-bold px-8 h-14 text-lg w-full sm:w-auto shadow-lg shadow-green-500/20 border-none">
                Implementar Esto
              </Button>
            </a>
            {/* Botón Secundario (Estilo Dark Fijo) */}
            <Link href="/#soluciones">
              <Button size="lg" variant="outline" className="rounded-full border-white/20 text-white hover:bg-white hover:text-black h-14 px-8 text-lg w-full sm:w-auto font-bold transition-all">
                Explorar más Soluciones
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </article>
  )
}