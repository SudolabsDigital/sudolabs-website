'use client';

import React, { useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from "@/lib/utils";

export const GlobalSpotlight = ({ className }: { className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Definimos el gradiente fuera del render condicional
  const backgroundStyle = useMotionTemplate`
    radial-gradient(
      800px circle at ${mouseX}px ${mouseY}px,
      rgba(var(--primary-rgb), 0.15),
      transparent 80%
    )
  `;

  useEffect(() => {
    const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className={cn("pointer-events-none fixed inset-0 z-0 overflow-hidden", className)}>
      {/* Grid Pattern Fijo */}
      <div className="absolute inset-0 bg-grid-black/5 dark:bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      {/* Luz del Spotlight */}
      <motion.div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: backgroundStyle,
        }}
      />
    </div>
  );
};
