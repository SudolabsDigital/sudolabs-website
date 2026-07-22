import Image from "next/image"
import { HeroInteractive } from "./hero-interactive"

export function HeroSection() {
  return (
    <section className="container mx-auto px-6 flex items-center w-full pb-8 md:pb-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center w-full">
          
          {/* COLUMNA 1: CONTENIDO */}
          <div className="max-w-2xl md:animate-in md:fade-in md:slide-in-from-bottom-4 md:duration-700">
            {/* LOGO MÓVIL */}
            <div className="lg:hidden mb-6 flex justify-start">
               <div className="relative w-[190px]">
                 <Image
                    src="/assets/logo-horizontal.webp"
                    alt="Sudolabs Perú"
                    width={190}
                    height={107}
                    priority
                    fetchPriority="high"
                    sizes="190px"
                    className="w-[190px] h-auto drop-shadow-sm"
                    style={{ height: 'auto' }}
                 />
               </div>
            </div>

          {/* H1 optimizado para SEO */}
          <h1
            id="hero-title"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-slate-900 mb-6 lg:mb-8 leading-[1.05] lg:leading-[0.95]"
          >
            Ayudamos a crecer a organizaciones y empresas
            <strong className="text-[#004481] block mt-1">desde Huancayo, para el mundo.</strong>
          </h1>

          {/* Descripción con jerarquía H2 */}
          <h2 className="text-lg md:text-xl text-slate-600 mb-8 lg:mb-12 leading-relaxed max-w-xl">
            Diseñamos e implementamos{" "}
            <strong className="text-slate-900">soluciones tecnológicas y de ingeniería</strong>{" "}
            que te permiten escalar y mejorar: software a medida, aplicaciones web
            y arquitectura robusta y segura, lista para tu próximo nivel de crecimiento.
          </h2>
            
            <div>
              <HeroInteractive />
            </div>
          </div>

          {/* COLUMNA 2: MARCA MONOLÍTICA (DESKTOP) */}
          <div className="relative flex justify-center lg:justify-end hidden lg:flex">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-gradient-to-tr from-[#004481]/15 via-[#3178c6]/10 to-transparent blur-[80px] rounded-full pointer-events-none" />
             
             <div className="animate-float relative z-10">
               <Image
                  src="/assets/logo-mark.webp"
                  alt="Sudolabs"
                  width={700}
                  height={700}
                  priority
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 440px, 100vw"
                  className="w-full max-w-[440px] h-auto drop-shadow-xl relative z-10"
                  style={{ height: 'auto' }}
               />
             </div>
          </div>

        </div>
    </section>
  );
}
