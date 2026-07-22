'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

type AuroraVariant = "ambient" | "glow";

interface AuroraProps {
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

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 1.4; // Velocidad estática suave y elegante
      ctx.clearRect(0, 0, width, height);

      // Calcular Progreso Total del Scroll en la Página (0.0 a 1.0)
      const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, 3000);
      const scrollProgress = Math.min(Math.max(scrollY / (docHeight - height || 1), 0), 1);

      // 1. RAYOS SOLARES VOLUMÉTRICOS DE MODO CLARO (AWS Solar Beams)
      const solarGrad = ctx.createLinearGradient(
        width * (0.2 + scrollProgress * 0.4), 
        -100, 
        width * (0.8 - scrollProgress * 0.3), 
        height * 1.2
      );

      // Paleta LUMINOSA e INSTITUCIONAL SudoLabs (190° a 280°)
      // Azul Core (#004481: ~208°), Celeste Técnico (#3178c6: ~211° / #97cadb: ~195°), Índigo y Morado IA (#65318d: ~274°)
      const hueBase1 = 208 + Math.sin(time * 0.006 + scrollProgress * 2.5) * 18; // 190° a 226° (Azul Core / Celeste Sky)
      const hueBase2 = 274 + Math.sin(time * 0.007 + scrollProgress * 3.0) * 12; // 262° a 286° (Morado IA / Púrpura Innovación)
      const hueBase3 = 240 + Math.cos(time * 0.005 + scrollProgress * 2.8) * 15; // 225° a 255° (Índigo Profundo Tecnológico)

      const c1Start = `hsla(${hueBase1}, 90%, 42%, 0.44)`;
      const c1End = `hsla(${hueBase1 + 15}, 85%, 32%, 0.30)`;

      const c2Start = `hsla(${hueBase2}, 75%, 45%, 0.40)`;
      const c2End = `hsla(${hueBase2 - 20}, 80%, 30%, 0.28)`;

      const c3Start = `hsla(${hueBase3}, 85%, 48%, 0.42)`;
      const c3End = `hsla(${hueBase3 + 20}, 75%, 35%, 0.30)`;

      solarGrad.addColorStop(0, `hsla(${hueBase1}, 85%, 58%, 0.40)`);
      solarGrad.addColorStop(0.5, `hsla(${hueBase3}, 80%, 42%, 0.24)`);
      solarGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = solarGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. ONDAS DE AURORA BOREAL EVOLUTIVAS (Luz Fluida Continua)
      const waveConfigs = [
        { colors: [c1Start, c1End], baseRatio: 0.15 + scrollProgress * 0.35, amp: 78, speed: 0.008 },
        { colors: [c2Start, c2End], baseRatio: 0.35 + scrollProgress * 0.28, amp: 92, speed: 0.006 },
        { colors: [c3Start, c3End], baseRatio: 0.55 + scrollProgress * 0.22, amp: 68, speed: 0.009 },
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
        grad.addColorStop(0, wave.colors[0]);
        grad.addColorStop(0.65, wave.colors[1]);
        grad.addColorStop(1, 'transparent');

        ctx.globalAlpha = 0.65;
        ctx.fillStyle = grad;
        ctx.filter = 'blur(35px)';
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
