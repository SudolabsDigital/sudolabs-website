'use client';

import { useRef, useState } from "react";
import { 
    motion, 
    useAnimationFrame, 
    useMotionValue, 
    useTransform 
} from "framer-motion";
import { Cloud, Database, Globe, Server, ShieldCheck, Workflow, Zap } from "lucide-react";

// Función wrap manual para evitar dependencia externa
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function TechTicker() {
  const baseX = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);
  
  useAnimationFrame((t, delta) => {
    if (!isDragging) {
      const moveBy = directionFactor.current * -0.01 * (delta / 1000) * 40; 
      baseX.set(baseX.get() + moveBy);
    }
  });

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

  return (
    <section className="py-10 border-y border-dashed border-white/10 bg-transparent backdrop-blur-sm overflow-hidden relative group cursor-grab active:cursor-grabbing">
      
      {/* Fade Gradients: Suavizan los bordes */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#020617] to-transparent"></div>
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#020617] to-transparent"></div>

      <div className="flex overflow-hidden -mx-20 select-none pointer-events-none md:pointer-events-auto md:cursor-grab md:active:cursor-grabbing">
        <motion.div 
            className="flex gap-12 pr-12 items-center"
            style={{ x }}
            onPanStart={() => setIsDragging(true)}
            onPanEnd={() => setIsDragging(false)}
            onPan={(_, info) => {
                const width = window.innerWidth;
                const sensitivity = width < 768 ? 2 : 1; 
                const moveByPercent = (info.delta.x / width) * 100 * sensitivity;
                baseX.set(baseX.get() + moveByPercent); 
            }}
        >
            {/* Repetimos la lista 4 veces para el efecto infinito */}
            {[...pillars, ...pillars, ...pillars, ...pillars].map((tech, i) => (
                <div key={i} className="flex items-center gap-12 group/item">
                    <div className="flex items-center gap-3 opacity-80 transition-all duration-500 group-hover/item:opacity-100 group-hover/item:grayscale-0">
                        <tech.icon className="w-5 h-5 text-white" strokeWidth={2} />
                        <span className="text-sm font-bold tracking-widest uppercase text-white whitespace-nowrap">
                            {tech.name}
                        </span>
                    </div>
                    {/* Separador Sutil (Un puntito) */}
                    <div className="w-1 h-1 rounded-full bg-white/20 group-hover/item:bg-primary/50 transition-colors" />
                </div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}
