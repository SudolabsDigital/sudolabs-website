"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";
import { BrandBackdrop } from "@/components/ui/brand-backdrop";

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
  imageSrc?: string;
  actions?: HeroAction[];
  breadcrumbs?: BreadcrumbItem[];
  align?: "center" | "left";
  size?: "full" | "compact";
  /** `brand` sustituye la foto por la banda de marca con el logotipo centrado. */
  variant?: "image" | "brand";
}

/**
 * Cabecera de página.
 *
 * Arranca pegada al header fijo, sin hueco, y la banda de imagen ocupa **todo
 * el ancho de la ventana**, sin caja: es la única pieza del sitio que rompe el
 * `container`, y por eso funciona como entrada de página.
 *
 * Las migas van en cápsula flotando SOBRE la imagen, no en una barra propia
 * — así no gastan una fila entera —, y el panel de título y descripción monta
 * 32 px sobre la imagen: lo justo para que las dos piezas se lean como una
 * sola, sin que el panel se coma la banda.
 *
 * El panel es opaco a propósito: el fondo del sitio es una Aurora animada y el
 * texto sobre ella pierde contraste.
 */
export function PageHero({
  title,
  subtitle,
  description,
  imageSrc,
  actions = [],
  breadcrumbs = [],
  size = "full",
  variant = "image",
}: PageHeroProps) {
  const isCompact = size === "compact";

  return (
    // pt-16 = exactamente los 64px del header fijo, sin aire: la banda arranca
    // pegada a él. El motivo por el que antes había 16px de más —«al hacer
    // scroll se veía a través del header translúcido»— no lo resolvían: el
    // header es translúcido siempre, así que todo el contenido se ve pasar por
    // debajo; los 16px solo retrasaban ese efecto 16px de scroll.
    <section className="relative w-full flex flex-col bg-transparent pt-16">
      {/* Banda de imagen a sangre, a todo el ancho */}
      <div
        className={cn(
          "relative w-full bg-slate-100",
          variant === "brand" && "overflow-hidden",
          isCompact ? "h-[260px] sm:h-[320px] md:h-[380px]" : "h-[300px] sm:h-[380px] md:h-[460px]"
        )}
      >
        {variant === "brand" ? (
          // El solape del panel aquí es -mt-6/-mt-8, no el de los perfiles.
          <BrandBackdrop panelOverlap="bottom-6 md:bottom-8" />
        ) : imageSrc ? (
          <>
            <Image
              src={encodeURI(imageSrc)}
              alt={title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/35 via-transparent to-slate-900/20 pointer-events-none" />
          </>
        ) : null}

        {/* Migas en cápsula, sobre la imagen */}
        {breadcrumbs.length > 0 && (
          <div className="absolute top-4 inset-x-0">
            <div className="container mx-auto px-6 lg:px-12">
              <motion.nav
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                aria-label="Migas de navegación"
                className="flex items-center gap-2.5 w-fit py-2 px-4 rounded-full bg-white/95 backdrop-blur-md border border-white/60 shadow-lg text-[11px] font-bold uppercase tracking-widest"
              >
                <Link href="/" className="text-slate-800 hover:text-[#004481] transition-colors flex items-center">
                  <Home className="w-3.5 h-3.5 text-[#004481]" />
                </Link>
                {breadcrumbs.map((item, index) => (
                  <div key={index} className="flex items-center gap-2.5">
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                    {item.href ? (
                      <Link href={item.href} className="text-slate-700 hover:text-[#004481] transition-colors">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-[#004481] font-extrabold">{item.label}</span>
                    )}
                  </div>
                ))}
              </motion.nav>
            </div>
          </div>
        )}
      </div>

      {/* Título y descripción, montando ligeramente sobre la imagen */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10 -mt-6 md:-mt-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-[2rem] border border-slate-200/90 bg-white shadow-xl p-6 md:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-center">
            <div className="lg:col-span-7">
              {subtitle && (
                <span className="inline-block px-3 py-1 rounded-full bg-[#004481]/10 border border-[#004481]/20 text-[#004481] font-mono font-bold uppercase tracking-[0.2em] mb-3 text-[10px]">
                  {subtitle}
                </span>
              )}
              <h1
                className={cn(
                  "font-black text-slate-900 leading-[1.1] tracking-tight break-words",
                  isCompact ? "text-2xl sm:text-3xl lg:text-4xl" : "text-3xl sm:text-4xl lg:text-5xl"
                )}
              >
                {title}
              </h1>
            </div>

            <div className="lg:col-span-5 space-y-5">
              {description && (
                <p className="text-slate-700 leading-relaxed text-sm md:text-base border-l-4 border-[#004481] pl-4">
                  {description}
                </p>
              )}

              {actions.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {actions.map((action) => (
                    <Link
                      key={action.href}
                      href={action.href}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-xl font-bold uppercase tracking-wider shadow-sm transition-transform active:scale-95 px-5 py-3 text-xs",
                        action.variant === "primary"
                          ? "bg-[#004481] text-white hover:bg-[#003366]"
                          : "bg-slate-100 text-slate-900 border border-slate-300 hover:bg-slate-200"
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
