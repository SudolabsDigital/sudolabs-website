"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";

export interface HeroAction {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline";
  icon?: React.ReactNode;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  imageSrc: string;
  actions?: HeroAction[];
  breadcrumbs?: BreadcrumbItem[];
  align?: "center" | "left";
  size?: "full" | "compact";
}

export function PageHero({
  title,
  subtitle,
  description,
  imageSrc,
  actions = [],
  breadcrumbs = [],
  size = "full",
}: PageHeroProps) {
  const isCompact = size === "compact";

  return (
    <section
      className={cn(
        "relative w-full flex flex-col bg-transparent overflow-hidden border-b border-slate-200/90",
        isCompact ? "min-h-[450px] md:min-h-[50vh]" : "min-h-[550px] md:min-h-[65vh]"
      )}
    >
      {/* 1. Full-Width Background Image (Sólida y sin cambios) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url('${imageSrc}')` }}
        />
      </div>

      {/* 2. Content Area */}
      <div className={cn(
        "flex-1 container mx-auto px-6 lg:px-12 relative z-20 flex flex-col justify-start",
        "pt-28 md:pt-32 pb-20"
      )}>
        
        {/* Breadcrumbs (Componente de Ruta de Alto Contraste) */}
        {breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2.5 py-2 px-4 rounded-full bg-white border border-slate-300 text-xs font-bold uppercase tracking-widest shadow-md mb-8 w-fit"
          >
            <Link href="/" className="text-slate-800 hover:text-[#004481] transition-colors flex items-center">
              <Home className="w-4 h-4 text-[#004481]" />
            </Link>
            {breadcrumbs.map((item, index) => (
              <div key={index} className="flex items-center gap-2.5">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                {item.href ? (
                  <Link href={item.href} className="text-slate-800 hover:text-[#004481] transition-colors font-bold">{item.label}</Link>
                ) : (
                  <span className="text-[#004481] font-extrabold">{item.label}</span>
                )}
              </div>
            ))}
          </motion.nav>
        )}

        {/* 3. Panel de Alto Contraste para Títulos y Contenido (Responsive Mobile-First) */}
        <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-[1.8rem] md:rounded-[2.5rem] border border-slate-200/90 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Lado Izquierdo: Título y Subtítulo */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-12 lg:col-span-7"
            >
              {subtitle && (
                <span className="inline-block px-3 py-1 rounded-full bg-[#004481]/10 border border-[#004481]/20 text-[#004481] font-mono font-bold uppercase tracking-[0.25em] mb-4 text-xs">
                  {subtitle}
                </span>
              )}
              <h1 className={cn(
                "font-black text-slate-900 leading-[1.05] tracking-tighter break-words",
                isCompact ? "text-4xl md:text-5xl lg:text-6xl" : "text-5xl md:text-6xl lg:text-7xl"
              )}>
                {title}
              </h1>
            </motion.div>

            {/* Lado Derecho: Descripción y Botones */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="col-span-12 lg:col-span-5 space-y-6"
            >
              {description && (
                <p className="text-slate-700 leading-relaxed font-medium text-base md:text-lg border-l-4 border-[#004481] pl-6">
                  {description}
                </p>
              )}

              {/* Action Buttons */}
              {actions.length > 0 && (
                <div className="flex flex-wrap gap-4 pt-2">
                  {actions.map((action) => (
                    <Link
                      key={action.href}
                      href={action.href}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-xl font-bold uppercase tracking-wider shadow-md transition-colors",
                        "px-6 py-3.5 text-xs",
                        action.variant === "primary" ? "bg-[#004481] text-white hover:bg-[#003366]" :
                        "bg-slate-100 text-slate-900 border border-slate-300 hover:bg-slate-200"
                      )}
                    >
                      {action.icon}
                      {action.label}
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default PageHero;
