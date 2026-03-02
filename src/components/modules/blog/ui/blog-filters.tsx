"use client";

import { Search, Filter, ChevronDown, Hash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface BlogFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  selectedDifficulty: string | null;
  setSelectedDifficulty: (difficulty: string | null) => void;
  categories: { slug: string; name: string; count: number }[];
  tags: { slug: string; name: string; count: number }[];
}

export function BlogFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedTag,
  setSelectedTag,
  selectedDifficulty,
  setSelectedDifficulty,
  categories,
  tags
}: BlogFiltersProps) {
  return (
    <div className="space-y-6 mb-12">
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
  );
}
