'use client';

import { Button } from "@/components/ui/button"

export function CtaSection() {
  const handleWhatsappDirect = () => {
    window.open("https://wa.me/51923384303?text=Hola%20Sudolabs,%20me%20interesa%20agendar%20una%20consultor%C3%ADa.", "_blank");
  };

  return (
    <section className="py-20 lg:py-32 container mx-auto px-6">
      <div className="bg-primary/20 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 md:p-24 text-center relative overflow-hidden shadow-2xl">
         {/* Decoraciones abstractas */}
         <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white/5 rounded-full blur-3xl"></div>
         <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white/5 rounded-full blur-3xl"></div>

         <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight">
                El Futuro es Código.
              </h2>
              <p className="text-gray-200 text-xl md:text-3xl mb-12 font-light leading-relaxed">
                ¿Vas a dejar que tu competencia lo escriba antes que tú?
              </p>
            
            <Button 
              size="lg" 
              onClick={handleWhatsappDirect}
              className="h-16 lg:h-20 px-10 lg:px-16 text-lg lg:text-xl rounded-full shadow-[0_0_30px_rgba(0,255,163,0.3)] bg-[#00FFA3] hover:bg-[#00e692] text-slate-950 hover:scale-105 transition-all font-black w-full sm:w-auto border-none"
            >
              Agendar Consultoría Gratis
            </Button>
         </div>
      </div>
    </section>
  );
}
