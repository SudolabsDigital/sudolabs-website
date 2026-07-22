'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const navItems = [
  { name: "Servicios", href: "/servicios" },
  { name: "Proyectos", href: "/proyectos" },
  { name: "Nosotros", href: "/nosotros" },
  { name: "Blog", href: "/blog" },
];

export function HeaderNav() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav 
      aria-label="Navegación principal" 
      className="hidden md:block"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <ul className="flex items-center gap-1 m-0 p-0 list-none relative">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          
          return (
            <li 
              key={item.name}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
            >
              <Link
                href={item.href}
                className={cn(
                  "relative z-10 block px-5 py-2.5 text-sm font-bold transition-colors duration-200 cursor-pointer",
                  isActive ? "text-[#004481] font-extrabold" : "text-slate-900 hover:text-[#004481]"
                )}
              >
                {item.name}
                
                {/* Active Indicator (Magnetic Dot) */}
                {isActive && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-[#004481] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>

              {/* Hover Pill Background - Shared Layout Animation */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="headerHoverPill"
                    className="absolute inset-0 z-0 bg-[#004481]/5 rounded-full border border-[#004481]/15"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
