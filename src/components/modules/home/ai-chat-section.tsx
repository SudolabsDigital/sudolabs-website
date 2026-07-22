import Image from 'next/image';
import { AiChatInterface } from './ai-chat-interface';

export function AiChatSection() {
  return (
    <section className="py-12 md:py-16 bg-transparent relative overflow-hidden">
      
      {/* Background Glows (Auras) - SSR */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#004481]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#3178c6]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10 mx-auto max-w-[1400px]">
        {/* Header - SSR Crítico para SEO con Tipografía Extra Gruesa de Alto Contraste */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-slate-900 leading-tight">
            Hablemos de tu Proyecto
          </h2>
          <p className="text-slate-700 max-w-2xl mx-auto text-lg md:text-xl font-normal leading-relaxed">
            ¿Tienes una idea? Debian, nuestra Tech Lead, está lista para discutir la viabilidad técnica y darte un primer feedback.
          </p>
        </div>

        {/* MAIN CARD CONTAINER */}
        <div className="rounded-2xl border border-slate-200/90 bg-white/90 shadow-xl overflow-hidden flex flex-col lg:flex-row h-[85vh] lg:h-[600px]">
          
          {/* LEFT PANEL: DEBIAN PROFILE (SSR - Reestructurado sin degradados opacos) */}
          <div className="h-auto lg:h-full lg:w-[32%] bg-slate-50/90 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col p-6 md:p-8 justify-between relative overflow-hidden">
            {/* Pattern Accent */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #004481 1px, transparent 0)', backgroundSize: '20px 20px' }} 
            />

            {/* Top Profile Card */}
            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Framed Character Avatar */}
              <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md bg-white mb-4 shrink-0">
                <Image 
                  src="/assets/debian.webp" 
                  alt="Debian Tech Lead" 
                  fill 
                  sizes="160px"
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-3 shadow-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span>Disponible para Consultas</span>
              </div>

              {/* Name & Title */}
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Debian</h3>
              <p className="text-[#004481] text-xs font-mono font-bold uppercase tracking-wider mb-4">Tech Lead &amp; Solutions Architect</p>
            </div>

            {/* Bottom Quote */}
            <div className="relative z-10 bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm mt-4 lg:mt-0">
              <p className="text-xs text-slate-600 leading-relaxed font-medium italic border-l-2 border-[#004481] pl-3">
                &quot;No escribo código sin propósito. Hablemos de tus requerimientos y diseñemos una arquitectura escalable.&quot;
              </p>
            </div>
          </div>

          {/* RIGHT PANEL: CHAT INTERFACE (Cliente) */}
          <AiChatInterface />

        </div>
      </div>
    </section>
  );
}
