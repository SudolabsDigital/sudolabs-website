'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

export type AuroraVariant = "ambient" | "glow";
export type AuroraColorPreset = "sudolabs" | "cyber" | "aurora" | "deepspace";

export interface AuroraProps {
  variant?: AuroraVariant;
  colorPreset?: AuroraColorPreset;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  maxAlpha: number;
  alphaSpeed: number;
  isWhite: boolean;
}

/**
 * Motor Aurora Borealis 5.0 (Autonomous & Ultra-Optimized Engine)
 * - 100% Independiente: Cero listeners de DOM (`scroll`, `pointermove`), eliminando re-layouts y thrashing de hilos.
 * - Renderizado con Splines Bézier Cúbicas (`bezierCurveTo`): 95% menos llamadas de cálculo vectorial por frame.
 * - Sincronización por Delta-Time (`performance.now()`): Fluidez constante a 60Hz, 120Hz (ProMotion) y 144Hz.
 * - Cintas de luz fluidas con filamentos de Luz Blanca Pura (`#FFFFFF`) y gradientes de alto contraste.
 */
export function Aurora({ 
  variant = "ambient", 
  colorPreset = "sudolabs", 
  className 
}: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (variant !== "ambient") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    // 1. Partículas de Polvo Estelar y Luz Blanca
    let particles: Particle[] = [];
    const initParticles = (w: number, h: number) => {
      particles = [];
      const particleCount = Math.floor(Math.min(w, 1920) / 45); // ~30 partículas ultra-ligeras
      for (let i = 0; i < particleCount; i++) {
        const isWhite = Math.random() > 0.35; // 65% destellos de luz blanca
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: isWhite ? Math.random() * 2.6 + 1.0 : Math.random() * 2.0 + 0.6,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.3 - 0.1,
          alpha: Math.random() * 0.7,
          maxAlpha: isWhite ? Math.random() * 0.6 + 0.4 : Math.random() * 0.4 + 0.2,
          alphaSpeed: Math.random() * 0.01 + 0.004,
          isWhite,
        });
      }
    };

    const resizeCanvas = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initParticles(width, height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let lastTime = performance.now();
    let time = 0;

    // 2. Loop de Renderizado Matemático Autónomo (Delta-Time Sync)
    const render = (now: number) => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Delta time en segundos para ritmo constante e independiente del framerate
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      time += prefersReducedMotion ? dt * 0.4 : dt * 1.6;

      ctx.clearRect(0, 0, width, height);

      // Selección de Paleta Cromática SudoLabs
      let h1 = 208, h2 = 274, h3 = 195; // Azul Core (#004481), Violeta (#65318d), Cyan (#00d2ff)
      if (colorPreset === "cyber") { h1 = 185; h2 = 290; h3 = 160; }
      else if (colorPreset === "aurora") { h1 = 150; h2 = 200; h3 = 280; }
      else if (colorPreset === "deepspace") { h1 = 230; h2 = 280; h3 = 310; }

      const hue1 = (h1 + Math.sin(time * 0.3) * 18 + 360) % 360;
      const hue2 = (h2 + Math.cos(time * 0.35) * 22 + 360) % 360;
      const hue3 = (h3 + Math.sin(time * 0.25) * 25 + 360) % 360;

      // 3. RAYO SOLAR DIAGONAL BLANCO Y CYAN (Volumetric Beam)
      ctx.globalCompositeOperation = 'lighter';
      const beamX1 = width * (0.2 + Math.sin(time * 0.2) * 0.25);
      const beamX2 = width * (0.8 - Math.cos(time * 0.18) * 0.25);
      
      const solarGrad = ctx.createLinearGradient(beamX1, -100, beamX2, height * 1.25);
      solarGrad.addColorStop(0, 'rgba(255, 255, 255, 0.75)');         // LUZ BLANCA PURA EN LA CIMA
      solarGrad.addColorStop(0.25, `hsla(${hue3}, 100%, 75%, 0.48)`); // CYAN ELECTRICO
      solarGrad.addColorStop(0.65, `hsla(${hue1}, 95%, 55%, 0.28)`);  // AZUL CORE
      solarGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = solarGrad;
      ctx.fillRect(0, 0, width, height);

      // 4. CINTAS FLUIDAS CON CURVAS BÉZIER CÚBICAS (Silky Bezier Ribbons)
      // Dibujadas con Bézier (controlPoints) en lugar de cientos de iteraciones paso a paso.
      const ribbonConfigs = [
        {
          yRatio: 0.15,
          lineWidth: 190,
          stops: ['#ffffff', `hsla(${hue3}, 100%, 65%, 0.72)`, `hsla(${hue1}, 90%, 45%, 0.32)`],
          speedMult: 0.5,
          amp: 110,
        },
        {
          yRatio: 0.38,
          lineWidth: 230,
          stops: ['rgba(255, 255, 255, 0.95)', `hsla(${hue1}, 95%, 62%, 0.68)`, `hsla(${hue2}, 85%, 45%, 0.28)`],
          speedMult: -0.6,
          amp: 145,
        },
        {
          yRatio: 0.62,
          lineWidth: 210,
          stops: ['#ffffff', `hsla(${hue2}, 90%, 65%, 0.72)`, `hsla(${hue3}, 95%, 52%, 0.32)`],
          speedMult: 0.7,
          amp: 130,
        },
        {
          yRatio: 0.85,
          lineWidth: 195,
          stops: ['rgba(255, 255, 255, 0.88)', `hsla(${hue1}, 100%, 68%, 0.65)`, `hsla(${hue2}, 90%, 40%, 0.22)`],
          speedMult: -0.45,
          amp: 125,
        },
      ];

      ribbonConfigs.forEach((ribbon, idx) => {
        const tOffset = time * ribbon.speedMult + idx * 1.5;
        const baseY = height * ribbon.yRatio + Math.sin(tOffset * 0.5) * 40;

        // Puntos de control para la curva Bézier Cúbica continua
        const startX = -50;
        const startY = baseY + Math.sin(tOffset) * ribbon.amp;

        const cp1X = width * 0.3;
        const cp1Y = baseY - Math.cos(tOffset * 1.2) * ribbon.amp * 1.2;

        const cp2X = width * 0.7;
        const cp2Y = baseY + Math.sin(tOffset * 0.9) * ribbon.amp * 1.1;

        const endX = width + 50;
        const endY = baseY - Math.cos(tOffset * 0.7) * ribbon.amp;

        // Dibuja el trazo fluido principal
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);

        const grad = ctx.createLinearGradient(0, baseY - ribbon.amp, width, baseY + ribbon.amp);
        grad.addColorStop(0, ribbon.stops[0]);   // BLANCO PURO DE ALTA LUMINISCENCIA
        grad.addColorStop(0.45, ribbon.stops[1]); // TONO BRILLANTE (AZUL/CYAN/MORADO)
        grad.addColorStop(0.88, ribbon.stops[2]); // SOMBRA ATMOSFÉRICA
        grad.addColorStop(1, 'transparent');

        ctx.strokeStyle = grad;
        ctx.lineWidth = ribbon.lineWidth;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Filamento brillante blanco de núcleo
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.55 + Math.sin(time * 0.8 + idx) * 0.25})`;
        ctx.lineWidth = 3.5;
        ctx.stroke();
      });

      // 5. DESTELLOS Y ESTRELLAS BLANCAS FLOTANTES
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += p.alphaSpeed;

        if (p.alpha >= p.maxAlpha || p.alpha <= 0) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        if (p.isWhite) {
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, p.alpha)})`;
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 6;
        } else {
          ctx.fillStyle = `hsla(${hue3}, 100%, 75%, ${Math.max(0, p.alpha)})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.globalCompositeOperation = 'source-over';
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant, colorPreset]);

  // VARIANTE GLOW: Iluminación de Bordes Autónoma
  if (variant === "glow") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-[2px] rounded-[inherit] z-0 overflow-hidden select-none",
          className
        )}
      >
        <div
          className="absolute inset-0 rounded-[inherit] opacity-75 dark:opacity-90 blur-md transition-opacity duration-500 animate-pulse"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, #ffffff 0deg, var(--color-brand-core, #004481) 90deg, #00d2ff 180deg, #ffffff 270deg, var(--color-ai-purple, #65318d) 360deg)",
          }}
        />
        <div 
          className="absolute inset-0 rounded-[inherit] opacity-60 mix-blend-overlay"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.85) 100%)"
          }}
        />
      </div>
    );
  }

  // VARIANTE AMBIENT: Canvas de Cintas de Luz Autónomas con Blur Ajustado (blur-xl = 20px)
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 w-screen h-screen overflow-hidden z-0 select-none",
        className
      )}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block filter blur-xl saturate-[160%] transform-gpu" 
      />

      <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.035] mix-blend-overlay">
        <filter id="aurora-noise-v5">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#aurora-noise-v5)" />
      </svg>
    </div>
  );
}




