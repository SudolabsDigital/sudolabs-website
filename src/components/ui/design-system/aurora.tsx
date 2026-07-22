'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

export type AuroraVariant = "ambient" | "glow";

export interface AuroraProps {
  variant?: AuroraVariant;
  className?: string;
}

/**
 * Motor de Viaje Atmosférico Reactivo al Scroll (Document Scroll Map Engine)
 * - Mapea el progreso de scroll del usuario (0% a 100% de la altura total de la página).
 * - A medida que el usuario baja, la Aurora despliega NUEVOS espectros cromáticos y NUEVAS ondas de plasma en cada sección.
 * - Rayos Solares volumétricos que evolucionan en ángulo, intensidad y tono según la profundidad de navegación.
 */
export function Aurora({ variant = "ambient", className }: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (variant !== "ambient") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let scrollY = window.scrollY;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const handleResize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      // Pausa si el documento está oculto para ahorrar recursos
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 1.4; // Velocidad estática suave y elegante
      ctx.clearRect(0, 0, width, height);

      // Calcular Progreso Total del Scroll mapeado a la capa principal del documento
      const docHeight = Math.max(
        document.body.scrollHeight, 
        document.documentElement.scrollHeight, 
        typeof window !== 'undefined' ? window.innerHeight * 2 : 2000
      );
      const scrollProgress = Math.min(Math.max(scrollY / (docHeight - height || 1), 0), 1);

      // 1. RAYOS SOLARES VOLUMÉTRICOS (AWS Solar Beams) con oscilación activa en primera impresión
      const solarGrad = ctx.createLinearGradient(
        width * (0.18 + Math.sin(time * 0.008) * 0.15 + scrollProgress * 0.4), 
        -120, 
        width * (0.82 + Math.cos(time * 0.007) * 0.15 - scrollProgress * 0.3), 
        height * 1.25
      );

      // Paleta LUMINOSA e INSTITUCIONAL SudoLabs con cambio cromático activo en reposo (Primera Impresión)
      // Azul Core (#004481: ~208°), Celeste Técnico (#3178c6: ~211°), Índigo y Morado IA (#65318d: ~274°) + Crestas de Luz Blanca
      const hueBase1 = (208 + Math.sin(time * 0.022 + scrollProgress * 3.0) * 32 + 360) % 360; 
      const hueBase2 = (274 + Math.cos(time * 0.018 + scrollProgress * 3.5) * 28 + 360) % 360; 
      const hueBase3 = (225 + Math.sin(time * 0.025 + scrollProgress * 3.2) * 35 + 360) % 360; 

      // Pulsación de destello blanco luminoso ampliado
      const whiteGlowAlpha = 0.52 + Math.sin(time * 0.015) * 0.18;
      const cWhiteStart = `rgba(255, 255, 255, ${0.58 + Math.sin(time * 0.018) * 0.20})`;

      const c1Start = `hsla(${hueBase1}, 92%, 46%, 0.48)`;
      const c1End = `hsla(${(hueBase1 + 20) % 360}, 85%, 34%, 0.32)`;

      const c2Start = `hsla(${hueBase2}, 80%, 48%, 0.44)`;
      const c2End = `hsla(${(hueBase2 - 22 + 360) % 360}, 85%, 32%, 0.30)`;

      const c3Start = `hsla(${hueBase3}, 90%, 52%, 0.42)`;
      const c3End = `hsla(${(hueBase3 + 22) % 360}, 80%, 36%, 0.32)`;

      // Gradiente Solar con Destello Blanco de Cima Ampliado
      solarGrad.addColorStop(0, `rgba(255, 255, 255, ${whiteGlowAlpha})`);
      solarGrad.addColorStop(0.20, cWhiteStart);
      solarGrad.addColorStop(0.48, `hsla(${hueBase1}, 88%, 60%, 0.42)`);
      solarGrad.addColorStop(0.78, `hsla(${hueBase3}, 82%, 45%, 0.26)`);
      solarGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = solarGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. ONDAS DE AURORA BOREAL EVOLUTIVAS CON ESPACIOS DE LUZ BLANCA
      const waveConfigs = [
        { colors: ['rgba(255, 255, 255, 0.70)', c1Start, c1End], baseRatio: 0.12 + scrollProgress * 0.35 + Math.sin(time * 0.005) * 0.04, amp: 85, speed: 0.012 },
        { colors: ['rgba(255, 255, 255, 0.60)', c2Start, c2End], baseRatio: 0.32 + scrollProgress * 0.28 + Math.cos(time * 0.006) * 0.05, amp: 98, speed: 0.009 },
        { colors: ['rgba(255, 255, 255, 0.65)', c3Start, c3End], baseRatio: 0.52 + scrollProgress * 0.22 + Math.sin(time * 0.007) * 0.04, amp: 75, speed: 0.014 },
      ];

      waveConfigs.forEach((wave, idx) => {
        ctx.beginPath();
        const baseHeight = height * wave.baseRatio;
        ctx.moveTo(0, baseHeight);

        for (let x = 0; x <= width; x += 15) {
          const waveY =
            baseHeight +
            Math.sin(x * 0.0022 + time * wave.speed + idx * 2.3 + scrollProgress * 9) * wave.amp +
            Math.cos(x * 0.0011 + time * 0.0035 + scrollProgress * 6) * 35;
          ctx.lineTo(x, waveY);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, baseHeight - 120, width, height);
        grad.addColorStop(0, wave.colors[0]);     // 0% -> BLANCO PURO LUMINOSO EN LA CRESTA
        grad.addColorStop(0.35, wave.colors[1]);  // 35% -> TONO AZUL / CYAN / MORADO
        grad.addColorStop(0.80, wave.colors[2]);  // 80% -> SOMBRA ATMOSFERICA
        grad.addColorStop(1, 'transparent');

        ctx.globalAlpha = 0.70;
        ctx.fillStyle = grad;
        ctx.filter = 'blur(32px)';
        ctx.fill();
        ctx.filter = 'none';
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant]);

  if (variant === "glow") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-1 rounded-[inherit] z-0 overflow-hidden",
          className
        )}
      >
        <div
          className="absolute inset-0 rounded-[inherit] opacity-50 dark:opacity-70 blur-md"
          style={{
            background:
              "linear-gradient(135deg, var(--color-brand-core, #004481) 0%, var(--color-ts-blue, #3178c6) 50%, var(--color-ai-purple, #65318d) 100%)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 w-screen h-screen overflow-hidden z-0 select-none",
        className
      )}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
