import { getAllContent, getAllTags, getAllCategories, BlogMeta } from "@/lib/mdx";
import { BlogList } from "@/components/modules/blog/blog-list";

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
       <div className="container mx-auto px-6 max-w-6xl pt-32">
          
          {/* Header Section */}
          <div className="mb-16 md:mb-24 text-center md:text-left">
             <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
               Blog de <br className="hidden md:block" />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                 Ingeniería
               </span>
             </h1>
             <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
               Bitácora de nuestras decisiones técnicas, experimentos fallidos y victorias arquitectónicas.
             </p>
          </div>

          {/* Interactive Client Component */}
          <BlogList posts={posts} tags={tags} categories={categories} />
          
       </div>
    </div>
  );
}