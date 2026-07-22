"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
    <section className="relative w-full flex flex-col bg-transparent overflow-hidden pt-24 md:pt-28 pb-12">
      <div className="container mx-auto px-6 lg:px-12 relative z-20 flex flex-col">
        
        {/* 1. Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-2.5 py-2 px-4 rounded-full bg-white border border-slate-300 text-xs font-bold uppercase tracking-widest shadow-sm mb-6 w-fit"
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

        {/* 2. Banner de Imagen Cinematográfica (100% Visibilidad de Imagen Sin Superposición) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={cn(
            "relative w-full rounded-[2rem] overflow-hidden border border-slate-200/90 shadow-xl bg-slate-100 mb-6",
            isCompact ? "h-[220px] sm:h-[300px] md:h-[360px]" : "h-[280px] sm:h-[380px] md:h-[450px]"
          )}
        >
          <Image
            src={encodeURI(imageSrc)}
            alt={title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center"
          />
          {/* Sombra sutil de degradado inferior para acabado de marco */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* 3. Panel de Datos Estructurados (Ubicado debajo de la imagen con máximo contraste) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="bg-white/95 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-[2rem] border border-slate-200/90 shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            
            {/* Título & Subtítulo */}
            <div className="col-span-12 lg:col-span-7">
              {subtitle && (
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#004481]/10 border border-[#004481]/20 text-[#004481] font-mono font-bold uppercase tracking-[0.2em] mb-3 text-xs shadow-sm">
                  {subtitle}
                </span>
              )}
              <h1 className={cn(
                "font-black text-slate-900 leading-[1.08] tracking-tight break-words",
                isCompact ? "text-3xl sm:text-4xl lg:text-5xl" : "text-4xl sm:text-5xl lg:text-6xl"
              )}>
                {title}
              </h1>
            </div>

            {/* Descripción & Botones de Acción */}
            <div className="col-span-12 lg:col-span-5 space-y-6">
              {description && (
                <p className="text-slate-700 leading-relaxed font-normal text-base md:text-lg border-l-4 border-[#004481] pl-5">
                  {description}
                </p>
              )}

              {actions.length > 0 && (
                <div className="flex flex-wrap gap-3 pt-1">
                  {actions.map((action) => (
                    <Link
                      key={action.href}
                      href={action.href}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-xl font-bold uppercase tracking-wider shadow-sm transition-transform active:scale-95",
                        "px-5 py-3 text-xs",
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
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default PageHero;
