'use client';

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter } from "lucide-react"
import { FloatingCard } from "@/components/ui/design-system/card"
import { SolutionCategory } from "@/core/solutions-data"

interface SolutionsGridRevealProps {
  solutions: SolutionCategory[];
}

export function SolutionsGridReveal({ solutions }: SolutionsGridRevealProps) {
  const [activeTab, setActiveTab] = useState(solutions[0].id)
  const [searchQuery, setSearchQuery] = useState("")

  // PERSISTENCE LOGIC
  const STORAGE_KEY = "solutions_grid_state";

  useEffect(() => {
    const savedState = sessionStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.tab) {
          const timer = setTimeout(() => setActiveTab(parsed.tab), 0);
          return () => clearTimeout(timer);
        }
      } catch (e) {
        console.error("Error parsing state", e);
      }
    }
  }, [STORAGE_KEY, solutions]);

  const handleTabChange = (newTabId: string) => {
    setActiveTab(newTabId);
    setSearchQuery(""); // Clear search when changing tabs
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ tab: newTabId }));
  };

  const saveCurrentState = () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ tab: activeTab }));
  };

  // FILTER LOGIC
  const filteredCards = useMemo(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      return solutions.flatMap(s => s.cards).filter(card => 
        card.title.toLowerCase().includes(query) || 
        card.description.toLowerCase().includes(query) ||
        card.pain.toLowerCase().includes(query)
      );
    }
    return solutions.find(s => s.id === activeTab)?.cards || [];
  }, [activeTab, searchQuery, solutions]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
      
      {/* SIDEBAR */}
      <aside className="w-full lg:w-64 xl:w-72 shrink-0 flex flex-col gap-6">
        
        {/* Buscador */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar módulos (ej. SEO, Seguridad)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition placeholder:text-muted-foreground" 
          />
          {searchQuery && (
             <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                {filteredCards.length} res
             </div>
          )}
        </div>

        {/* Navegación de Categorías */}
        <div className="hidden lg:block space-y-1">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
            Categorías
          </h3>
          <nav className="flex flex-col gap-1">
            {solutions.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.id)}
                className={`
                  w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition duration-200 flex justify-between items-center
                  ${activeTab === cat.id && !searchQuery
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground border border-transparent"
                  }
                `}
              >
                {cat.label}
                <span className="text-[10px] bg-background border border-border px-1.5 py-0.5 rounded text-muted-foreground">
                  {cat.cards.length}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile/Tablet Tabs */}
        <div className="block lg:hidden overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0">
           <nav className="flex gap-2">
             {solutions.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleTabChange(cat.id)}
                  className={`
                    whitespace-nowrap px-4 py-2.5 rounded-md text-sm font-medium transition border
                    ${activeTab === cat.id && !searchQuery
                      ? "bg-primary/10 text-primary border-primary/20" 
                      : "bg-background text-muted-foreground border-border hover:bg-secondary"
                    }
                  `}
                >
                  {cat.label}
                </button>
             ))}
           </nav>
        </div>
      </aside>

      {/* CONTENIDO (GRID) */}
      <main className="flex-1 min-w-0">
        {filteredCards.length === 0 ? (
          <div className="w-full py-20 flex flex-col items-center justify-center text-center border border-dashed border-border rounded-2xl bg-background/50">
             <Filter className="w-10 h-10 text-muted-foreground mb-4 opacity-50" />
             <h3 className="text-lg font-medium text-foreground">No se encontraron módulos</h3>
             <p className="text-sm text-muted-foreground mt-1">Intenta con otros términos de búsqueda.</p>
             <button onClick={() => setSearchQuery("")} className="mt-4 text-sm text-primary hover:underline">
                Limpiar búsqueda
             </button>
          </div>
        ) : (
          <div 
            className="relative max-h-[550px] overflow-y-auto pb-24 pt-12 px-12 -mx-12 -mt-12 scrollbar-hide"
            style={{
              maskImage: filteredCards.length > 2 ? 'linear-gradient(to bottom, black 80%, transparent 100%)' : 'none',
              WebkitMaskImage: filteredCards.length > 2 ? 'linear-gradient(to bottom, black 80%, transparent 100%)' : 'none',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none'
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {filteredCards.map((card, idx) => (
                  <motion.div
                    key={card.slug}
                    layout
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                  >
                    <FloatingCard
                      title={card.title}
                      description={card.description}
                      icon={card.icon}
                      tag={card.pain}
                      href={`/blog/${card.slug}`}
                      onCardClick={saveCurrentState}
                      className="h-full"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}