'use client';

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FileText, PackageSearch, BarChart3, ShieldCheck, History, BellRing, Calendar,
  Search, Filter, FormInput, Calculator, Smartphone, WifiOff, Languages,
  GitBranch, Lock, ArrowRight, ChevronLeft, ChevronRight
} from "lucide-react"

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
        icon: FileText
      },
      {
        title: "Control de Stock e Insumos",
        pain: "¿Inventario desactualizado?",
        description: "Descuento automático de insumos basado en recetas/fórmulas en tiempo real.",
        icon: PackageSearch
      },
      {
        title: "Dashboards de Métricas (KPIs)",
        pain: "¿Datos sin visualizar?",
        description: "Gráficos dinámicos para tomar decisiones gerenciales basadas en datos reales.",
        icon: BarChart3
      },
      {
        title: "Roles y Permisos (ACL)",
        pain: "¿Acceso indebido a datos?",
        description: "Seguridad granular que restringe vistas y botones según el cargo del usuario.",
        icon: ShieldCheck
      },
      {
        title: "Logs de Auditoría",
        pain: "¿Quién borró ese archivo?",
        description: "Registro inmutable de 'quién hizo qué y cuándo' para seguridad interna.",
        icon: History
      },
      {
        title: "Notificaciones Automáticas",
        pain: "¿Olvidos y retrasos?",
        description: "Alertas por Email/WhatsApp automáticas para vencimientos y citas.",
        icon: BellRing
      },
      {
        title: "Gestión de Recursos",
        pain: "¿Conflictos de agenda?",
        description: "Algoritmos que evitan cruces de horarios en salas, equipos o personal.",
        icon: Calendar
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
        icon: Search
      },
      {
        title: "Buscadores Inteligentes",
        pain: "¿Clientes frustrados?",
        description: "Búsqueda predictiva y filtros multicriterio con resultados milimétricos.",
        icon: Filter
      },
      {
        title: "Validación en Tiempo Real",
        pain: "¿Datos erróneos?",
        description: "Formularios que corrigen al usuario mientras escribe (DNI, RUC, Email).",
        icon: FormInput
      },
      {
        title: "Cotizadores Web",
        pain: "¿Presupuestos lentos?",
        description: "Calculadoras interactivas que dan precios estimados 24/7.",
        icon: Calculator
      },
      {
        title: "Diseño Responsive",
        pain: "¿Móvil roto?",
        description: "Interfaces fluidas que funcionan perfecto en cualquier dispositivo.",
        icon: Smartphone
      },
      {
        title: "Modo Offline (PWA)",
        pain: "¿Sin internet?",
        description: "La app sigue funcionando sin señal y sincroniza al volver la conexión.",
        icon: WifiOff
      },
      {
        title: "Multi-idioma (i18n)",
        pain: "¿Solo español?",
        description: "Cambio de idioma instantáneo sin romper el diseño ni el SEO.",
        icon: Languages
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
        icon: GitBranch
      },
      {
        title: "Auditoría de Seguridad",
        pain: "¿Vulnerable?",
        description: "Detección de brechas de seguridad y plan de remediación técnica.",
        icon: Lock
      }
    ]
  }
]

export function SolutionsGrid() {
  const [activeTab, setActiveTab] = useState(solutions[0].id)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  const currentCategory = solutions.find(s => s.id === activeTab) || solutions[0]
  const cards = currentCategory.cards

  // Reset scroll when tab changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }, [activeTab])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Width of card + gap
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount 
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  }

  return (
    <section className="py-20 border-t border-white/5 bg-black/20">
      <div className="container mx-auto px-6">
        
        {/* HEADER RESTAURADO: Título + Descripción + Tabs */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10 mb-20">
          
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-8">
              Ingeniería <span className="text-[#00FFA3]">Modular</span>
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Funcionalidades listas para integrar. Elige las piezas exactas que tu negocio necesita para escalar sin fricción.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {solutions.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border
                  ${activeTab === item.id 
                    ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                    : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENIDO SCROLLABLE HORIZONTAL */}
        <div className="relative group">
          
          {/* Botones de Navegación (Aparecen al hover en desktop) */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full bg-[#020617] border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xl hover:bg-white hover:text-black hidden xl:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full bg-[#020617] border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xl hover:bg-white hover:text-black hidden xl:flex"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Área de Scroll */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 xl:mx-0 xl:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <AnimatePresence mode="popLayout">
              {cards.map((card, idx) => (
                <motion.div
                  key={`${activeTab}-${idx}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="min-w-[300px] md:min-w-[350px] snap-start h-full"
                >
                  <div className="h-full bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 group/card flex flex-col">
                    
                    {/* Header Card */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white border border-white/5 group-hover/card:scale-110 transition-transform">
                        <card.icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-4 leading-tight group-hover/card:text-[#00FFA3] transition-colors">
                      {card.title}
                    </h3>

                    {/* Pain Question (Refined Callout) */}
                    <div className="pl-4 border-l-2 border-[#00FFA3]/30 mb-6">
                      <p className="text-sm font-semibold text-gray-200 leading-snug">
                        {card.pain}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-400 leading-relaxed flex-grow">
                      {card.description}
                    </p>

                    {/* Footer */}
                    <div className="mt-6 flex items-center text-xs font-bold text-[#00FFA3] opacity-0 group-hover/card:opacity-100 transition-opacity -translate-x-2 group-hover/card:translate-x-0 duration-300">
                      Ver Solución <ArrowRight className="ml-2 w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Spacer for right padding in scroll */}
            <div className="min-w-[1px] h-1" />
          </div>
        </div>
      </div>
    </section>
  )
}