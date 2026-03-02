"use client";

import { useBlogFilters } from "./hooks/use-blog-filters";
import { BlogFilters } from "./ui/blog-filters";
import { BlogCard } from "./ui/blog-card";
import { BlogHero } from "./ui/blog-hero";
import { BlogMeta } from "@/lib/mdx-utils";
import { Search } from "lucide-react";

interface BlogListProps {
  posts: BlogMeta[];
  tags: { slug: string; name: string; count: number }[];
  categories: { slug: string; name: string; count: number }[];
}

export function BlogList({ posts, tags, categories }: BlogListProps) {
  const {
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    selectedCategory,
    setSelectedCategory,
    selectedDifficulty,
    setSelectedDifficulty,
    filteredPosts,
    hasActiveFilters,
    clearFilters
  } = useBlogFilters(posts);

  // Determinar Hero Post (Destacado)
  const featuredPost = posts.find(p => p.featured);
  const heroPost = !hasActiveFilters && featuredPost ? featuredPost : (!hasActiveFilters && posts.length > 0 ? posts[0] : null);
  
  // Determinar posts del grid (excluyendo el hero si se muestra)
  const displayPosts = hasActiveFilters ? filteredPosts : filteredPosts.filter(p => p.slug !== heroPost?.slug);

  return (
    <div className="space-y-12 animate-in fade-in duration-700 slide-in-from-bottom-4">
      {/* Barra de Filtros */}
      <BlogFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
        categories={categories}
        tags={tags}
      />

      {/* Hero Post (Solo si no hay filtros activos) */}
      {heroPost && <BlogHero post={heroPost} />}

      {/* Grid de Posts */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayPosts.length > 0 ? (
          displayPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))
        ) : (
          <div className="col-span-full py-24 text-center border-2 border-dashed border-border/50 rounded-[2rem] bg-muted/5 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4 text-muted-foreground">
              <Search className="w-6 h-6" />
            </div>
            <p className="text-muted-foreground text-lg mb-2 font-medium">No encontramos resultados</p>
            <p className="text-muted-foreground/60 text-sm mb-6">Intenta con otros términos o limpia los filtros</p>
            <button 
              onClick={clearFilters} 
              className="text-primary hover:text-primary/80 font-bold text-sm uppercase tracking-widest hover:underline decoration-2 underline-offset-4"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
