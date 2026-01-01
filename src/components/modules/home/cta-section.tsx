'use client';

import { Button } from "@/components/ui/button"

export function CtaSection() {
  const handleWhatsappDirect = () => {
    window.open("https://wa.me/51923384303?text=Hola%20Sudolabs,%20me%20interesa%20agendar%20una%20consultor%C3%ADa.", "_blank");
  };

  return (
    <section className="py-20 lg:py-32 container mx-auto px-6">
      <div className="bg-primary rounded-[2.5rem] p-10 md:p-24 text-center relative overflow-hidden shadow-2xl">
         {/* Decoraciones abstractas */}
         <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white/5 rounded-full blur-3xl"></div>
         <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white/5 rounded-full blur-3xl"></div>

         <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-6xl font-extrabold text-primary-foreground mb-6 md:mb-8 tracking-tight">
                El Futuro es Código.
              </h2>
              <p className="text-primary-foreground/80 text-lg md:text-2xl mb-8 md:mb-12 font-light">
                ¿Vas a dejar que tu competencia lo escriba antes que tú?
              </p>
            
            <Button 
              size="lg" 
              variant="secondary" 
              onClick={handleWhatsappDirect}
              className="h-14 lg:h-16 px-8 lg:px-12 text-base lg:text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all font-bold w-full sm:w-auto"
            >
              Agendar Consultoría Gratis
            </Button>
         </div>
      </div>
    </section>
  );
}
