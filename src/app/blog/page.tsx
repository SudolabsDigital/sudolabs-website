import { getAllContent, getAllTags, getAllCategories, BlogMeta } from "@/lib/mdx";
import { BlogList } from "@/components/modules/blog/blog-list";
import PageHero from "@/components/ui/page-hero";
import { Suspense } from "react";

export const metadata = {
  title: "Blog de Ingeniería | Sudolabs",
  description: "Artículos técnicos sobre desarrollo de software, arquitectura cloud y optimización. Aprendizajes reales desde las trincheras.",
};

export default async function BlogIndex() {
  // Fetch data on the server
  const posts = await getAllContent<BlogMeta>("blog");
  const tags = await getAllTags();
  const categories = await getAllCategories();

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 font-sans pb-24">
       {/* Page Hero Section */}
       <PageHero 
         title="Blog de Ingeniería"
         subtitle="BITÁCORA TÉCNICA"
         description="Nuestras decisiones técnicas, experimentos fallidos y victorias arquitectónicas contadas desde las trincheras."
         imageSrc="/assets/images/blogs/bienvenidos-a-sudolabs.webp"
         size="compact"
         align="left"
         breadcrumbs={[{ label: "Blog" }]}
       />

       <div className="container mx-auto px-6 max-w-6xl pt-16">
          <Suspense fallback={<div className="h-96 flex items-center justify-center text-muted-foreground font-medium">Cargando bitácora...</div>}>
            <BlogList posts={posts} tags={tags} categories={categories} />
          </Suspense>
       </div>
    </div>
  );
}
