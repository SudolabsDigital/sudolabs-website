'use client';

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { SolutionCategory } from "@/core/solutions-data"

interface SolutionsGridRevealProps {
  solutions: SolutionCategory[];
}

const STORAGE_KEY = "solutions_grid_state_v2";

export function SolutionsGridReveal({ solutions }: SolutionsGridRevealProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const allCards = useMemo(
    () => solutions.flatMap((category) => category.cards.map((card) => ({ ...card, categoryId: category.id, categoryLabel: category.label }))),
    [solutions]
  );

  // PERSISTENCE: recordar el filtro activo al volver desde un artículo
  useEffect(() => {
    const savedState = sessionStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.category) {
          const timer = setTimeout(() => setActiveCategory(parsed.category), 0);
          return () => clearTimeout(timer);
        }
      } catch {
        // ignore malformed state
      }
    }
  }, []);

  const handleCategoryToggle = (categoryId: string) => {
    const next = activeCategory === categoryId ? null : categoryId;
    setActiveCategory(next);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ category: next }));
  };

  const saveCurrentState = () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ category: activeCategory }));
  };

  const filteredCards = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return allCards.filter((card) => {
      const matchesCategory = !activeCategory || card.categoryId === activeCategory;
      const matchesQuery =
        query.length === 0 ||
        card.title.toLowerCase().includes(query) ||
        card.description.toLowerCase().includes(query) ||
        card.pain.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [allCards, activeCategory, searchQuery]);

  return (
    <div className="flex flex-col gap-6">

      {/* TOOLBAR: búsqueda + filtros de categoría (opcionales, no obligatorios) */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative sm:max-w-xs w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Buscar por tu problema (ej. facturas, inventario)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0">
          <button
            onClick={() => handleCategoryToggle("")}
            className={cn(
              "whitespace-nowrap px-3.5 py-2 rounded-full text-xs font-semibold transition border",
              !activeCategory
                ? "bg-primary/10 text-primary border-primary/20"
                : "bg-background text-muted-foreground border-border hover:bg-secondary"
            )}
          >
            Todos <span className="opacity-60">({allCards.length})</span>
          </button>
          {solutions.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryToggle(category.id)}
              className={cn(
                "whitespace-nowrap px-3.5 py-2 rounded-full text-xs font-semibold transition border",
                activeCategory === category.id
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-background text-muted-foreground border-border hover:bg-secondary"
              )}
            >
              {category.label} <span className="opacity-60">({category.cards.length})</span>
            </button>
          ))}
        </div>
      </div>

      {/* GRID COMPACTO: todo visible de una vez, sin scroll anidado */}
      {filteredCards.length === 0 ? (
        <div className="w-full py-16 flex flex-col items-center justify-center text-center border border-dashed border-border rounded-2xl bg-background/50">
          <Filter className="w-8 h-8 text-muted-foreground mb-3 opacity-50" />
          <h3 className="text-base font-medium text-foreground">No se encontraron módulos</h3>
          <p className="text-sm text-muted-foreground mt-1">Intenta con otros términos de búsqueda.</p>
          <button onClick={() => setSearchQuery("")} className="mt-3 text-sm text-primary hover:underline">
            Limpiar búsqueda
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          <AnimatePresence mode="popLayout">
            {filteredCards.map((card, idx) => (
              <motion.div
                key={card.slug}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, delay: idx * 0.015 }}
              >
                <Link
                  href={`/blog/${card.slug}`}
                  onClick={saveCurrentState}
                  className="flex items-start gap-3 h-full p-4 rounded-xl border border-slate-200/90 bg-white shadow-sm transition duration-300"
                >
                  <div className="w-9 h-9 shrink-0 rounded-lg bg-slate-100 flex items-center justify-center text-[#004481] border border-slate-200">
                    {card.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 leading-snug">
                      {card.pain}
                    </p>
                    <p className="text-xs text-slate-600 mt-1 truncate">{card.title}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
