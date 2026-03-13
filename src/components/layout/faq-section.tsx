'use client';

import React, { useState, useRef } from 'react';
import { FaqAccordion } from "@/components/ui/design-system/faq"
import Image from "next/image"

export function FaqSection() {
  const [visible, setVisible] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!divRef.current) return;
    const bounds = divRef.current.getBoundingClientRect();
    divRef.current.style.setProperty('--mouse-x', `${e.clientX - bounds.left}px`);
    divRef.current.style.setProperty('--mouse-y', `${e.clientY - bounds.top}px`);
  };

  const faqItems = [
    {
      question: "Tengo una pequeña empresa, ¿es esto para mí?",
      answer: "Absolutamente. No necesitas ser una corporación para beneficiarte de la tecnología de alto nivel. A menudo, una pequeña automatización (como un sistema de pedidos, control de inventario o una web profesional rápida) puede duplicar la productividad de un equipo pequeño. Adaptamos la arquitectura y el presupuesto a tu etapa actual."
    },
    {
      question: "¿Por qué invertir en software a medida en lugar de usar algo genérico?",
      answer: "Lo genérico es fantástico para empezar, pero no escala bien con procesos únicos. Cuando tienes múltiples usuarios editando archivos, versiones conflictivas o datos dispersos, pierdes dinero y tiempo. Un software a medida centraliza tu información, automatiza tus reglas de negocio exactas y crece a tu ritmo, adaptándose a tu éxito sin obligarte a cambiar tu forma de trabajar."
    },
    {
      question: "¿Qué pasa cuando terminan el proyecto? ¿Me quedo solo?",
      answer: "Nunca. Creemos en relaciones a largo plazo como socios tecnológicos. Ofrecemos periodos de garantía post-lanzamiento donde corregimos cualquier error sin costo. Después, puedes optar por nuestros planes de mantenimiento continuo o, si prefieres, te entregamos toda la documentación para que tu equipo interno tome el control. Eres 100% dueño de tu código."
    },
    {
      question: "\"Tengo un sistema antiguo que limita mi crecimiento. ¿Pueden ayudar?\"",
      answer: "Sí, somos especialistas en \"Software Rescue\". Analizamos tu arquitectura actual, identificamos los cuellos de botella y proponemos un plan de migración o refactorización gradual. No siempre es necesario tirarlo todo y empezar de cero; a veces una optimización estratégica es la solución más rentable para volver a ser competitivos."
    }
  ];

  return (
    <section className="py-16 bg-card/20 border-y border-border relative overflow-hidden">
      {/* Subtle background glows */}
      <div className="absolute top-0 right-0 w-[50vw] h-full bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12">
          
          {/* Left Column: Image & Intro */}
          <div className="w-full lg:w-5/12 flex flex-col pt-2">
            <p className="text-primary text-xs font-bold tracking-widest uppercase mb-2">
              Preguntas Frecuentes
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-foreground leading-[1.1]">
              ¿Dudas antes de <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">invertir?</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-6 max-w-sm">
              Entendemos que contratar desarrollo de software es una decisión técnica y financiera importante. Respondemos con transparencia.
            </p>
            
            {/* Visual Element with Spotlight Effect */}
            <div
              ref={divRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setVisible(true)}
              onMouseLeave={() => setVisible(false)}
              className="relative w-full aspect-[4/3] max-w-sm rounded-[1.5rem] p-[2px] overflow-visible group/image transition duration-300"
            >
              {/* Spotlight Effect (Laser and Shadow) */}
              {visible && (
                <>
                  <div
                    className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-100 rounded-[1.5rem]"
                    style={{
                      background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), #3178c6 0%, #65318d 20%, transparent 40%)`,
                    }}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 z-[-1] transition-opacity duration-300 opacity-60 blur-xl rounded-[1.5rem]"
                    style={{
                      background: `radial-gradient(300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), #3178c6 0%, #65318d 40%, transparent 70%)`,
                    }}
                  />
                </>
              )}

              {/* Inner Image Container */}
              <div className="relative z-10 w-full h-full rounded-[1.4rem] overflow-hidden border border-border bg-card shadow-xl">
                <Image
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    src="/assets/images/planetafaq.webp"
                    alt="Planeta abstracto - Preguntas Frecuentes"
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Accordion */}
          <div className="w-full lg:w-7/12">
            <FaqAccordion items={faqItems} />
          </div>

        </div>
      </div>
    </section>
  )
}