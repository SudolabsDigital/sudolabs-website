'use client';

import { Button } from "@/components/ui/button"
import { ArrowRight, MessageSquare, Rocket } from "lucide-react";

export function CtaSection() {
  const handleWhatsappDirect = () => {
    window.open("https://wa.me/51923384303?text=Hola%20Sudolabs,%20me%20interesa%20agendar%20una%20consultor%C3%ADa.", "_blank");
  };

  return (
    <section id="contacto" className="py-20 lg:py-32 container mx-auto px-6">
      <div className="relative group overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04]">
         
         {/* Background Gradients (Similar to Solutions Grid but larger) */}
         <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-[#00FFA3]/5 rounded-full blur-[120px] pointer-events-none group-hover:bg-[#00FFA3]/10 transition-colors duration-700"></div>
         <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none group-hover:bg-indigo-500/10 transition-colors duration-700"></div>

         {/* Content Container */}
         <div className="relative z-10 px-8 py-20 md:p-24 text-center max-w-5xl mx-auto">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#00FFA3] text-sm font-semibold mb-8 backdrop-blur-md">
                <Rocket className="w-4 h-4" />
                <span>¿Listo para el siguiente nivel?</span>
              </div>

              <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
                El Futuro es Código. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 group-hover:to-[#00FFA3] transition-colors duration-500">
                  ¿Vas a dejar que tu competencia lo escriba?
                </span>
              </h2>
              
              <p className="text-gray-400 text-xl md:text-2xl mb-12 font-light leading-relaxed max-w-3xl mx-auto">
                No vendemos software, vendemos ventaja competitiva. Agenda una sesión estratégica y descubramos cómo escalar tu operación.
              </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg" 
                  onClick={handleWhatsappDirect}
                  className="h-16 px-10 text-lg rounded-full shadow-[0_0_40px_rgba(0,255,163,0.2)] bg-[#00FFA3] hover:bg-[#00e692] text-slate-950 hover:scale-105 transition-all font-bold w-full sm:w-auto group/btn border-none"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Agendar Consultoría Gratis
                  <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
            </div>
            
            <p className="mt-8 text-sm text-gray-500">
                Respuesta garantizada en menos de 2 horas hábiles.
            </p>
         </div>
      </div>
    </section>
  );
}