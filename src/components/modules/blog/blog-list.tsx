"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Search, Calendar, Clock, ArrowRight, Hash, Sparkles } from "lucide-react";
import { BlogMeta } from "@/lib/mdx";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface BlogListProps {
  posts: BlogMeta[];
  tags: { slug: string; name: string; count: number }[];
}

export function BlogList({ posts, tags }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter logic
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const slugify = (text: string) => text.toLowerCase().trim().replace(/\s+/g, "-");
      
      const matchesTag = selectedTag 
        ? post.tags?.some(t => slugify(t) === selectedTag) 
        : true;
      
      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  // View logic: If filters are active, show all results. If not, separate Hero from Grid.
  const hasActiveFilters = searchQuery.length > 0 || selectedTag !== null;
  const heroPost = !hasActiveFilters && posts.length > 0 ? posts[0] : null;
  const displayPosts = hasActiveFilters ? filteredPosts : posts.slice(1);

  return (
    <div className="space-y-12 animate-in fade-in duration-700 slide-in-from-bottom-4">
      
      {/* 1. Control Bar (Search & Filter) */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-card/30 p-6 rounded-3xl border border-border/40 backdrop-blur-md shadow-sm">
         <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
               placeholder="Buscar artículos..." 
               className="pl-11 bg-background/50 border-border/50 focus:border-primary/50 transition-all rounded-xl h-12"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
            />
         </div>
         
         <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            <button
               onClick={() => setSelectedTag(null)}
               className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                  selectedTag === null 
                     ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" 
                     : "bg-background/50 text-muted-foreground border-border hover:border-primary/50 hover:bg-card"
               )}
            >
               Todos
            </button>
            {tags.slice(0, 5).map(tag => (
               <button
                  key={tag.slug}
                  onClick={() => setSelectedTag(selectedTag === tag.slug ? null : tag.slug)}
                  className={cn(
                     "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                     selectedTag === tag.slug
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                        : "bg-background/50 text-muted-foreground border-border hover:border-primary/50 hover:bg-card"
                  )}
               >
                  {tag.name}
               </button>
            ))}
         </div>
      </div>

      {/* 2. Hero Section (Conditional) */}
      {heroPost && (
         <section className="relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000" />
             <Link href={`/blog/${heroPost.slug}`} className="relative block rounded-[2rem] overflow-hidden border border-border/50 bg-card/40 hover:bg-card/60 transition-all duration-500">
               <div className="grid lg:grid-cols-12 gap-0 lg:gap-8">
                  <div className="lg:col-span-7 h-72 lg:h-auto min-h-[350px] relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 lg:bg-gradient-to-r" />
                     {heroPost.image ? (
                        <div className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" 
                             style={{ backgroundImage: `url(${heroPost.image})` }} />
                     ) : (
                        <div className="w-full h-full bg-muted/20 flex items-center justify-center">
                            <Hash className="w-32 h-32 text-foreground/5" />
                        </div>
                     )}
                     <div className="absolute top-6 left-6 z-20">
                         <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg">
                             <Sparkles className="w-3 h-3" /> Nuevo
                         </span>
                     </div>
                  </div>
                  
                  <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center">
                     <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground mb-6 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {format(new Date(heroPost.date), "MMM d, yyyy", { locale: es })}</span>
                        {heroPost.readTime && <span className="flex items-center gap-1.5">• <Clock className="w-3.5 h-3.5" /> {heroPost.readTime}</span>}
                     </div>
                     
                     <h2 className="text-3xl lg:text-4xl font-extrabold mb-6 leading-tight group-hover:text-primary transition-colors">
                        {heroPost.title}
                     </h2>
                     
                     <p className="text-muted-foreground text-lg mb-8 line-clamp-3 leading-relaxed">
                        {heroPost.description}
                     </p>
                     
                     <div className="mt-auto flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
                        Leer Artículo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                     </div>
                  </div>
               </div>
            </Link>
         </section>
      )}

      {/* 3. Grid Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
         {displayPosts.length > 0 ? (
            displayPosts.map((post) => (
               <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col h-full rounded-3xl border border-border/50 bg-card/20 hover:bg-card/40 hover:border-primary/30 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-primary/5">
                  <div className="h-52 bg-muted/50 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                      {post.image ? (
                        <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${post.image})` }} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground/10 bg-gradient-to-br from-muted/50 to-background">
                           <Hash className="w-16 h-16" />
                        </div>
                      )}
                      
                      {/* Floating Tags */}
                      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                        {post.tags?.slice(0, 2).map(tag => (
                           <span key={tag} className="px-2 py-1 rounded-md text-[10px] font-bold bg-background/80 backdrop-blur text-foreground border border-border/50 shadow-sm uppercase tracking-wider">
                              {tag}
                           </span>
                        ))}
                      </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-1">
                     <h3 className="text-xl font-bold mb-3 leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                     </h3>
                     <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                        {post.description}
                     </p>
                     
                     <div className="flex items-center justify-between text-xs font-medium text-muted-foreground mt-auto pt-6 border-t border-border/30">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {format(new Date(post.date), "d MMM", { locale: es })}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {post.readTime || '5 min'}</span>
                     </div>
                  </div>
               </Link>
            ))
         ) : (
            <div className="col-span-full py-24 text-center border-2 border-dashed border-border/50 rounded-[2rem] bg-muted/5 flex flex-col items-center justify-center">
               <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4 text-muted-foreground">
                   <Search className="w-6 h-6" />
               </div>
               <p className="text-muted-foreground text-lg mb-2 font-medium">No encontramos resultados</p>
               <p className="text-muted-foreground/60 text-sm mb-6">Intenta con otros términos o limpia los filtros</p>
               <button onClick={() => { setSearchQuery(""); setSelectedTag(null); }} className="text-primary hover:text-primary/80 font-bold text-sm uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                  Limpiar filtros
               </button>
            </div>
         )}
      </div>
    </div>
  );
}
