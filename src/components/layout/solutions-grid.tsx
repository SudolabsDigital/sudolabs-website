'use client';

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FileText, PackageSearch, BarChart3, ShieldCheck, History, BellRing, Calendar,
  Search, Filter, FormInput, Calculator, Smartphone, WifiOff, Languages,
  GitBranch, Lock, Box
} from "lucide-react"
import { FloatingCard } from "@/components/ui/design-system/card"

// DATA STRUCTURE
const solutions = [
  {
    id: "medida",
    label: "Software a Medida",
    cards: [
      {
        title: "Generación Automática de Documentos",
        pain: "¿Tu equipo pierde tiempo copiando datos?",
        description: "Generación instantánea de PDFs/Excel con formato oficial listos para firmar.",
        icon: <FileText className="w-5 h-5" />,
        slug: "generacion-automatica-documentos"
      },
      {
        title: "Control de Stock e Insumos",
        pain: "¿Inventario desactualizado?",
        description: "Descuento automático de insumos basado en recetas/fórmulas en tiempo real.",
        icon: <PackageSearch className="w-5 h-5" />,
        slug: "control-stock-insumos"
      },
      {
        title: "Dashboards de Métricas (KPIs)",
        pain: "¿Datos sin visualizar?",
        description: "Gráficos dinámicos para tomar decisiones gerenciales basadas en datos reales.",
        icon: <BarChart3 className="w-5 h-5" />,
        slug: "dashboards-metricas"
      },
      {
        title: "Roles y Permisos (ACL)",
        pain: "¿Acceso indebido a datos?",
        description: "Seguridad granular que restringe vistas y botones según el cargo del usuario.",
        icon: <ShieldCheck className="w-5 h-5" />,
        slug: "roles-permisos-acl"
      },
      {
        title: "Logs de Auditoría",
        pain: "¿Quién borró ese archivo?",
        description: "Registro inmutable de 'quién hizo qué y cuándo' para seguridad interna.",
        icon: <History className="w-5 h-5" />,
        slug: "trazabilidad-logs-auditoria"
      },
      {
        title: "Notificaciones Automáticas",
        pain: "¿Olvidos y retrasos?",
        description: "Alertas por Email/WhatsApp automáticas para vencimientos y citas.",
        icon: <BellRing className="w-5 h-5" />,
        slug: "alertas-notificaciones"
      },
      {
        title: "Gestión de Recursos",
        pain: "¿Conflictos de agenda?",
        description: "Algoritmos que evitan cruces de horarios en salas, equipos o personal.",
        icon: <Calendar className="w-5 h-5" />,
        slug: "gestion-calendarios"
      }
    ]
  },
  {
    id: "web",
    label: "Web & Apps",
    cards: [
      {
        title: "SEO Técnico Avanzado",
        pain: "¿Invisible en Google?",
        description: "SSR y metadatos dinámicos para indexación perfecta en buscadores.",
        icon: <Search className="w-5 h-5" />,
        slug: "seo-tecnico-avanzado"
      },
      {
        title: "Buscadores Inteligentes",
        pain: "¿Clientes frustrados?",
        description: "Búsqueda predictiva y filtros multicriterio con resultados milimétricos.",
        icon: <Filter className="w-5 h-5" />,
        slug: "buscadores-inteligentes"
      },
      {
        title: "Validación en Tiempo Real",
        pain: "¿Datos erróneos?",
        description: "Formularios que corrigen al usuario mientras escribe (DNI, RUC, Email).",
        icon: <FormInput className="w-5 h-5" />,
        slug: "validacion-formularios"
      },
      {
        title: "Cotizadores Web",
        pain: "¿Presupuestos lentos?",
        description: "Calculadoras interactivas que dan precios estimados 24/7.",
        icon: <Calculator className="w-5 h-5" />,
        slug: "cotizadores-web"
      },
      {
        title: "Diseño Responsive",
        pain: "¿Móvil roto?",
        description: "Interfaces fluidas que funcionan perfecto en cualquier dispositivo.",
        icon: <Smartphone className="w-5 h-5" />,
        slug: "diseno-responsive"
      },
      {
        title: "Modo Offline (PWA)",
        pain: "¿Sin internet?",
        description: "La app sigue funcionando sin señal y sincroniza al volver la conexión.",
        icon: <WifiOff className="w-5 h-5" />,
        slug: "modo-offline-pwa"
      },
      {
        title: "Multi-idioma (i18n)",
        pain: "¿Solo español?",
        description: "Cambio de idioma instantáneo sin romper el diseño ni el SEO.",
        icon: <Languages className="w-5 h-5" />,
        slug: "soporte-multi-idioma"
      }
    ]
  },
  {
    id: "consultoria",
    label: "Consultoría",
    cards: [
      {
        title: "Mapeo de Procesos",
        pain: "¿Caos operativo?",
        description: "Diagramas As-Is/To-Be para detectar cuellos de botella y optimizar flujos.",
        icon: <GitBranch className="w-5 h-5" />,
        slug: "mapeo-procesos"
      },
      {
        title: "Auditoría de Seguridad",
        pain: "¿Vulnerable?",
        description: "Detección de brechas de seguridad y plan de remediación técnica.",
        icon: <Lock className="w-5 h-5" />,
        slug: "auditoria-seguridad"
      }
    ]
  }
]

export function SolutionsGrid() {
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
  }, [STORAGE_KEY]);

  const handleTabChange = (newTabId: string) => {
    setActiveTab(newTabId);
    setSearchQuery(""); // Clear search when changing tabs
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ tab: newTabId }));
  };

  const saveCurrentState = () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ tab: activeTab }));
  };

  // FILTER LOGIC: Si hay búsqueda, busca en todo el catálogo. Si no, muestra la tab activa.
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
  }, [activeTab, searchQuery]);

  return (
    <section id="soluciones" className="py-24 border-t border-border bg-card/20">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* HEADER */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">
            <Box className="w-4 h-4" /> Catálogo de Módulos
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Ingeniería <span className="text-primary">Modular</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Explora nuestra biblioteca de componentes listos para producción. Arquitecturas probadas que puedes ensamblar para escalar tu plataforma sin reinventar la rueda.
          </p>
        </div>

        {/* MAIN LAYOUT: Sidebar (Master) + Grid (Detail) */}
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

            {/* Mobile/Tablet Tabs (Ocultos en lg) */}
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
                className="relative max-h-[420px] overflow-y-auto pr-2 pb-16"
                style={{
                  maskImage: filteredCards.length > 2 ? 'linear-gradient(to bottom, black 65%, transparent 100%)' : 'none',
                  WebkitMaskImage: filteredCards.length > 2 ? 'linear-gradient(to bottom, black 65%, transparent 100%)' : 'none',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'var(--border) transparent'
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
      </div>
    </section>
  )
}