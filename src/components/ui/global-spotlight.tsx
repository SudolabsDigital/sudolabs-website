'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

export const GlobalSpotlight = ({ className }: { className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Solo activar el efecto si el dispositivo soporta hover (no es táctil/móvil)
    if (!window.matchMedia("(hover: hover)").matches) return;

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!divRef.current) return;
      
      // Cancelar frame anterior si existe
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      // Programar nueva actualización
      animationFrameId = requestAnimationFrame(() => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        divRef.current.style.setProperty('--mouse-x', `${x}px`);
        divRef.current.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={divRef}
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden",
        className
      )}
    >
      {/* Grid Pattern Fijo - Renderizado estático */}
      <div className="absolute inset-0 bg-grid-black/5 dark:bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      {/* Luz del Spotlight - Optimizado con CSS Variables */}
      <div
        className="absolute inset-0 transition-opacity duration-300 opacity-0 md:opacity-100 will-change-[background]"
        style={{
          background: `radial-gradient(
            800px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
            rgba(var(--primary-rgb), 0.15),
            transparent 80%
          )`,
        }}
      />
    </div>
  );
};