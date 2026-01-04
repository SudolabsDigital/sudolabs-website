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

  // Renderizamos 4 copias para asegurar cobertura
  const loops = [0, 1, 2, 3];

  return (
    <section className="py-10 border-y border-dashed border-white/10 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 relative group">
        
        {/* Fade Gradients */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#020617] to-transparent"></div>
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#020617] to-transparent"></div>

        {/* Contenedor de Scroll */}
        <div className="flex w-full overflow-hidden">
          {/* Pista Animada */}
          <div className="flex animate-infinite-scroll hover:[animation-play-state:paused] w-max">
              {loops.map((loopIndex) => (
                  <div key={loopIndex} className="flex items-center gap-12 pr-12">
                      {pillars.map((tech, i) => (
                          <div key={`${loopIndex}-${i}`} className="flex items-center gap-12 group/item">
                              <div className="flex items-center gap-3 opacity-60 transition-all duration-500 group-hover/item:opacity-100 group-hover/item:text-[#00FFA3] grayscale hover:grayscale-0">
                                  <tech.icon className="w-5 h-5" strokeWidth={2} />
                                  <span className="text-sm font-bold tracking-widest uppercase whitespace-nowrap">
                                      {tech.name}
                                  </span>
                              </div>
                              <div className="w-1 h-1 rounded-full bg-white/20" />
                          </div>
                      ))}
                  </div>
              ))}
          </div>
          {/* Copia exacta para loop sin costuras */}
          <div className="flex animate-infinite-scroll hover:[animation-play-state:paused] w-max" aria-hidden="true">
               {loops.map((loopIndex) => (
                  <div key={loopIndex} className="flex items-center gap-12 pr-12">
                      {pillars.map((tech, i) => (
                          <div key={`${loopIndex}-${i}`} className="flex items-center gap-12 group/item">
                               <div className="flex items-center gap-3 opacity-60 transition-all duration-500 group-hover/item:opacity-100 group-hover/item:text-[#00FFA3] grayscale hover:grayscale-0">
                                  <tech.icon className="w-5 h-5" strokeWidth={2} />
                                  <span className="text-sm font-bold tracking-widest uppercase whitespace-nowrap">
                                      {tech.name}
                                  </span>
                              </div>
                              <div className="w-1 h-1 rounded-full bg-white/20" />
                          </div>
                      ))}
                  </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}