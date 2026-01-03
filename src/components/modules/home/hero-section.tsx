import Image from "next/image"
import { HeroInteractive } from "./hero-interactive"

export function HeroSection() {
  return (
    <section className="container mx-auto px-6 flex items-start min-h-[82vh] pt-20 pb-12 md:pt-28 lg:pt-28 lg:pb-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center w-full">
          
          {/* COLUMNA 1: CONTENIDO */}
          <div className="max-w-2xl md:animate-in md:fade-in md:slide-in-from-bottom-4 md:duration-700">
            {/* LOGO MÓVIL */}
            <div className="lg:hidden mb-6 flex justify-start">
               <Image
                  src="/assets/logo-full.webp"
                  alt="Sudolabs Digital Logo"
                  width={250}
                  height={80}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 180px, 0px"
                  className="w-[180px] h-auto drop-shadow-lg"
                  style={{ height: 'auto' }}
               />
            </div>

          {/* H1 optimizado para SEO */}
          <h1
            id="hero-title"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white mb-6 lg:mb-8 leading-[1.05] lg:leading-[0.95]"
          >
            Consultora de software en
            <strong> Huancayo.</strong>
          </h1>

          {/* Descripción con jerarquía H2 */}
          <h2 className="text-lg md:text-xl text-gray-300 mb-8 lg:mb-12 leading-relaxed max-w-xl">
            Diseñamos y desarrollamos{" "}
            <strong>sitios web, aplicaciones web y sistemas de software a medida</strong>.
            Creamos soluciones digitales robustas, seguras y escalables que impulsan
            el crecimiento de tu negocio.
          </h2>
            
            <div>
              <HeroInteractive />
            </div>
          </div>

          {/* COLUMNA 2: MARCA MONOLÍTICA (DESKTOP) */}
          <div className="relative flex justify-center lg:justify-end hidden lg:flex">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
             
             <div className="animate-float">
               <Image
                  src="/assets/logo-full.webp"
                  alt="Sudolabs Digital Logo"
                  width={800}
                  height={300}
                  loading="eager"
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="w-full max-w-[600px] h-auto drop-shadow-2xl relative z-10"
                  style={{ height: 'auto' }}
               />
             </div>
          </div>

        </div>
    </section>
  );
}
