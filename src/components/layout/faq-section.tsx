'use client';

import React from 'react';
import { FaqAccordion } from "@/components/ui/design-system/faq"
import Image from "next/image"

export function FaqSection() {
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
    <section className="py-12 md:py-16 bg-transparent relative overflow-hidden">
      {/* Subtle background glows */}
      <div className="absolute top-0 right-0 w-[50vw] h-full bg-[#3178c6]/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-[#004481]/5 rounded-full blur-[90px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12">
          
          {/* Left Column: Image & Intro */}
          <div className="w-full lg:w-5/12 flex flex-col pt-2">
            <p className="text-[#004481] text-xs font-bold tracking-widest uppercase mb-2">
              Preguntas Frecuentes
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-slate-900 leading-[1.1]">
              ¿Dudas antes de <br />
              <span className="text-[#004481]">invertir?</span>
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-6 max-w-sm">
              Entendemos que contratar desarrollo de software es una decisión técnica y financiera importante. Respondemos con transparencia.
            </p>
            
            {/* Visual Element Container */}
            <div className="relative w-full aspect-[4/3] max-w-sm rounded-[1.5rem] overflow-hidden border-2 border-slate-200/90 bg-slate-100 shadow-xl">
              <Image
                  className="object-cover"
                  src="/assets/images/planetafaq.webp"
                  alt="Planeta abstracto - Preguntas Frecuentes"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
              />
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