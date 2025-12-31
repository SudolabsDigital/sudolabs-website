'use client';

import { useRef, useState } from "react";
import { 
    motion, 
    useAnimationFrame, 
    useMotionValue, 
    useSpring, 
    useTransform, 
    useVelocity
} from "framer-motion";
import { Cloud, Code2, Database, Globe, Layers, Layout, Server, ShieldCheck, Braces } from "lucide-react";

// Función wrap manual para evitar dependencia externa
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function TechTicker() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScrollVelocity(); 
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const [isDragging, setIsDragging] = useState(false);
  
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  
  useAnimationFrame((t, delta) => {
    if (!isDragging) {
      // Velocidad ultra lenta para máxima elegancia
      const moveBy = directionFactor.current * -0.01 * (delta / 1000) * 60; 
      baseX.set(baseX.get() + moveBy);
    }
  });

  const techs = [
    { name: "Next.js 14", icon: Globe },
    { name: "React", icon: Layout },
    { name: "TypeScript", icon: Code2 },
    { name: "Tailwind", icon: Layers },
    { name: "Laravel 11", icon: Server },
    { name: "PostgreSQL", icon: Database },
    { name: "AWS", icon: Cloud },
    { name: "Security", icon: ShieldCheck },
    { name: "Algorithms", icon: Braces },
  ];

  return (
    <section className="py-24 border-y border-border/40 bg-background/50 backdrop-blur-sm overflow-hidden relative group cursor-grab active:cursor-grabbing">
      
      <div className="container mx-auto px-6 mb-12 text-center select-none pointer-events-none">
        <h3 className="text-xl font-medium text-muted-foreground tracking-tight">
          Stack de Ingeniería <span className="text-foreground font-bold">World-Class</span>
        </h3>
      </div>

      {/* Fade Gradients */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent"></div>
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent"></div>

      <div className="flex overflow-hidden -mx-20 select-none pointer-events-none md:pointer-events-auto md:cursor-grab md:active:cursor-grabbing">
        <motion.div 
            className="flex gap-16 md:gap-32 pr-16 md:pr-32"
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
            {[...techs, ...techs, ...techs, ...techs].map((tech, i) => (
                <div key={i} className="flex items-center gap-4 group/item transition-opacity duration-300 hover:opacity-100 opacity-60">
                    <tech.icon className="w-8 h-8 md:w-10 md:h-10 text-foreground/80 group-hover/item:text-primary transition-colors duration-300" strokeWidth={1.5} />
                    <span className="text-xl md:text-2xl font-bold tracking-tight text-foreground/80 group-hover/item:text-foreground transition-colors duration-300 whitespace-nowrap">
                        {tech.name}
                    </span>
                </div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}

function useScrollVelocity() {
    return { scrollY: useMotionValue(0) };
}