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

export default function PageHero({
  title,
  subtitle,
  description,
  imageSrc,
  actions = [],
  breadcrumbs = [],
  align = "left",
  size = "full",
}: PageHeroProps) {
  const isCompact = size === "compact";

  return (
    <section
      className={cn(
        "relative w-full flex flex-col bg-black overflow-hidden",
        // Usamos min-h para que crezca si el contenido lo requiere, pero tenga un piso visual
        isCompact ? "min-h-[450px] md:min-h-[50vh]" : "min-h-[600px] md:min-h-[70vh]"
      )}
    >
      {/* 1. Inmersive Background - Absolute inset-0 will always follow the container's height */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center grayscale opacity-60 contrast-110 brightness-[0.45] z-0 transition-transform duration-[20s] hover:scale-105"
          style={{ backgroundImage: `url('${imageSrc}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001b48] via-[#001b48]/60 to-transparent z-10" />
      </div>

      {/* 2. Content Area */}
      <div className={cn(
        "flex-1 container mx-auto px-6 lg:px-12 relative z-20 flex flex-col justify-start",
        // pt-28/pt-32 para inmediatez con el header. pb-20 para respiro si el contenido crece.
        "pt-28 md:pt-32 pb-20"
      )}>
        
        {/* Breadcrumbs - Inicio Inmediato */}
        {breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest shadow-sm mb-8 w-fit"
          >
            <Link href="/" className="text-white/90 hover:text-[--accent] transition-colors">
              <Home className="w-3.5 h-3.5 mb-0.5" />
            </Link>
            {breadcrumbs.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <ChevronRight className="w-3 h-3 text-white/40" />
                {item.href ? (
                  <Link href={item.href} className="text-white/90 hover:text-[--accent] transition-colors">{item.label}</Link>
                ) : (
                  <span className="text-[--accent]">{item.label}</span>
                )}
              </div>
            ))}
          </motion.nav>
        )}

        {/* 3. Asymmetric Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Lado Izquierdo: 50% (Título) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-12 lg:col-span-6"
          >
            {subtitle && (
              <span className="text-[--accent] font-bold uppercase tracking-[0.3em] block mb-4 text-[10px] md:text-xs">
                {subtitle}
              </span>
            )}
            <h1 className={cn(
              "font-black text-white leading-[1.05] tracking-tighter drop-shadow-xl break-words",
              // Títulos imponentes pero seguros (max 7xl en desktop)
              isCompact ? "text-4xl md:text-5xl lg:text-6xl" : "text-5xl md:text-6xl lg:text-7xl"
            )}>
              {title}
            </h1>
          </motion.div>

          {/* Espacio Vacío: 25% (Respiro Visual) */}
          <div className="hidden lg:block lg:col-span-3" />

          {/* Lado Derecho: 25% (Descripción y Acciones) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-12 lg:col-span-3 space-y-8"
          >
            {description && (
              <p className="text-white/80 leading-relaxed font-medium text-sm md:text-base border-l-2 border-[--accent]/30 pl-6">
                {description}
              </p>
            )}

            {/* Action Buttons */}
            {actions.length > 0 && (
              <div className="flex flex-wrap gap-4 pt-4">
                {actions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 shadow-lg",
                      "px-6 py-3 text-[10px] md:text-xs",
                      action.variant === "primary" ? "bg-[--primary] text-white border border-primary/50" :
                      "bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20"
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
    </section>
  );
}
