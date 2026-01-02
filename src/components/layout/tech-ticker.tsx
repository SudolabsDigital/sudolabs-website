'use client';

import { Cloud, Database, Globe, Server, ShieldCheck, Workflow, Zap } from "lucide-react";

export function TechTicker() {
  // Lista depurada: Solo pilares arquitectónicos
  const pillars = [
    { name: "Next.js 16", icon: Globe },
    { name: "Arquitectura Cloud", icon: Cloud },
    { name: "Laravel 11", icon: Server },
    { name: "PostgreSQL", icon: Database },
    { name: "Integración Continua", icon: Workflow },
    { name: "Alto Rendimiento", icon: Zap },
    { name: "Seguridad Integrada", icon: ShieldCheck },
  ];

  // Duplicamos la lista suficientes veces para cubrir pantallas grandes sin saltos
  const repeatedPillars = [...pillars, ...pillars, ...pillars, ...pillars];

  return (
    <section className="py-10 border-y border-dashed border-white/10 bg-transparent overflow-hidden relative group">
      
      {/* Fade Gradients */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#020617] to-transparent"></div>
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#020617] to-transparent"></div>

      {/* Contenedor de Scroll */}
      <div className="flex overflow-hidden w-full mask-linear-fade">
        {/* Pista Animada para CSS Puro */}
        <div className="flex gap-12 pr-12 items-center animate-infinite-scroll w-max will-change-transform">
            {repeatedPillars.map((tech, i) => (
                <div key={i} className="flex items-center gap-12 group/item">
                    <div className="flex items-center gap-3 opacity-80 transition-all duration-500 group-hover/item:opacity-100 group-hover/item:grayscale-0">
                        <tech.icon className="w-5 h-5 text-white" strokeWidth={2} />
                        <span className="text-sm font-bold tracking-widest uppercase text-white whitespace-nowrap">
                            {tech.name}
                        </span>
                    </div>
                    {/* Separador Sutil */}
                    <div className="w-1 h-1 rounded-full bg-white/20 group-hover/item:bg-primary/50 transition-colors" />
                </div>
            ))}
        </div>
        
        {/* Segunda pista para loop */}
        <div className="flex gap-12 pr-12 items-center animate-infinite-scroll w-max will-change-transform" aria-hidden="true">
            {repeatedPillars.map((tech, i) => (
                <div key={`clone-${i}`} className="flex items-center gap-12 group/item">
                    <div className="flex items-center gap-3 opacity-80 transition-all duration-500 group-hover/item:opacity-100 group-hover/item:grayscale-0">
                        <tech.icon className="w-5 h-5 text-white" strokeWidth={2} />
                        <span className="text-sm font-bold tracking-widest uppercase text-white whitespace-nowrap">
                            {tech.name}
                        </span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-white/20 group-hover/item:bg-primary/50 transition-colors" />
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}