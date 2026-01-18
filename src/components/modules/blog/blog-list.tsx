"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Search, Calendar, Clock, ArrowRight, Hash, Sparkles, Filter, ChevronDown } from "lucide-react";
import { BlogMeta, slugify } from "@/lib/mdx-utils";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getDifficultyColor, getDifficultyLabel } from "@/lib/blog-ui-utils";

interface BlogListProps {
  posts: BlogMeta[];
  tags: { slug: string; name: string; count: number }[];
  categories: { slug: string; name: string; count: number }[];
}

export function BlogList({ posts, tags, categories }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = selectedTag 
        ? post.tags?.some(t => slugify(t) === selectedTag) 
        : true;

      const matchesCategory = selectedCategory
        ? post.category && slugify(post.category) === selectedCategory
        : true;

      const matchesDifficulty = selectedDifficulty
        ? post.difficulty === selectedDifficulty
        : true;
      
      return matchesSearch && matchesTag && matchesCategory && matchesDifficulty;
    });
  }, [posts, searchQuery, selectedTag, selectedCategory, selectedDifficulty]);

  const hasActiveFilters = searchQuery.length > 0 || selectedTag !== null || selectedCategory !== null || selectedDifficulty !== null;
  
  const featuredPost = posts.find(p => p.featured);
  
  const heroPost = !hasActiveFilters && featuredPost ? featuredPost : (!hasActiveFilters && posts.length > 0 ? posts[0] : null);
  
  const displayPosts = hasActiveFilters ? filteredPosts : posts.filter(p => p.slug !== heroPost?.slug);

  return (
    <div className="space-y-12 animate-in fade-in duration-700 slide-in-from-bottom-4">
      
      {/* 1. Control Bar (Categories, Search & Filters) */}
      <div className="space-y-6">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <button
               onClick={() => setSelectedCategory(null)}
               className={cn(
                  "px-4 py-2 rounded-full text-sm font-bold transition-all border",
                  selectedCategory === null 
                     ? "bg-foreground text-background border-foreground" 
                     : "bg-background text-muted-foreground border-border hover:border-foreground/50 hover:bg-muted/50"
               )}
            >
               Todo
            </button>
            {categories.map(cat => (
               <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug)}
                  className={cn(
                     "px-4 py-2 rounded-full text-sm font-bold transition-all border",
                     selectedCategory === cat.slug
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-muted-foreground border-border hover:border-foreground/50 hover:bg-muted/50"
                  )}
               >
                  {cat.name}
               </button>
            ))}
        </div>

        {/* Search & Fine Grained Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card/30 p-4 rounded-2xl border border-border/40 backdrop-blur-md shadow-sm">
            <div className="relative w-full md:w-96 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                placeholder="Buscar por título o contenido..." 
                className="pl-11 bg-background/50 border-border/50 focus:border-primary/50 transition-all rounded-xl h-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
                 {/* Difficulty Select */}
                 <div className="relative">
                    <select 
                        className="h-10 pl-9 pr-8 rounded-xl border border-border/50 bg-background/50 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium cursor-pointer hover:bg-card/50 transition-colors w-full md:w-auto"
                        value={selectedDifficulty || ""}
                        onChange={(e) => setSelectedDifficulty(e.target.value || null)}
                    >
                        <option value="">Nivel: Todos</option>
                        <option value="beginner">Principiante</option>
                        <option value="intermediate">Intermedio</option>
                        <option value="advanced">Avanzado</option>
                    </select>
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 opacity-50 pointer-events-none" />
                 </div>

                 {/* Tags Select */}
                 <div className="relative">
                    <select 
                        className="h-10 pl-9 pr-8 rounded-xl border border-border/50 bg-background/50 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium cursor-pointer hover:bg-card/50 transition-colors w-full md:w-auto max-w-[200px]"
                        value={selectedTag || ""}
                        onChange={(e) => setSelectedTag(e.target.value || null)}
                    >
                        <option value="">Tecnología: Todas</option>
                        {tags.map(tag => (
                            <option key={tag.slug} value={tag.slug}>
                                {tag.name} ({tag.count})
                            </option>
                        ))}
                    </select>
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 opacity-50 pointer-events-none" />
                 </div>
            </div>
        </div>
      </div>

      {/* 2. Hero Section */}
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
                     <div className="absolute top-6 left-6 z-20 flex gap-2 flex-wrap">
                        {heroPost.featured && (
                            <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg">
                                <Sparkles className="w-3 h-3" /> Destacado
                            </span>
                        )}
                        {heroPost.category && (
                             <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur text-foreground text-xs font-bold uppercase tracking-widest border border-border/50 shadow-sm">
                                {heroPost.category}
                            </span>
                        )}
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
                     
                     <div className="mt-auto flex items-center justify-between">
                        {heroPost.difficulty && (
                            <Badge variant="outline" className={cn("uppercase tracking-wider text-[10px] py-1", getDifficultyColor(heroPost.difficulty))}>
                                {getDifficultyLabel(heroPost.difficulty)}
                            </Badge>
                        )}
                        <span className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
                            Leer Artículo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
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
                      
                      <div className="absolute top-4 left-4 z-20">
                        {post.category && (
                             <span className="px-2 py-1 rounded-md bg-background/90 backdrop-blur text-foreground text-[10px] font-bold uppercase tracking-widest border border-border/50 shadow-sm">
                                {post.category}
                            </span>
                        )}
                      </div>

                      {/* Difficulty Badge */}
                       {post.difficulty && (
                          <div className="absolute bottom-4 right-4 z-20">
                             <Badge variant="outline" className={cn("uppercase tracking-wider text-[10px] py-0.5 bg-background/90 backdrop-blur border-border/50 shadow-sm", getDifficultyColor(post.difficulty))}>
                                {getDifficultyLabel(post.difficulty)}
                             </Badge>
                          </div>
                       )}
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
               <button onClick={() => { setSearchQuery(""); setSelectedTag(null); setSelectedCategory(null); setSelectedDifficulty(null); }} className="text-primary hover:text-primary/80 font-bold text-sm uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                  Limpiar filtros
               </button>
            </div>
         )}
      </div>
    </div>
  );
}