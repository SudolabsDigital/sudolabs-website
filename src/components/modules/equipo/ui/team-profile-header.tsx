import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Home } from "lucide-react";
import { TeamMeta } from "@/lib/mdx-utils";
import { BrandBackdrop } from "@/components/ui/brand-backdrop";

/**
 * Cabecera de la página de perfil.
 *
 * El retrato manda: los recortes vienen sin fondo y cortados al torso, así que
 * en vez de meterlos en una caja pequeña se dibujan a tamaño grande **emergiendo
 * desde la banda de color y apoyando en el canto inferior del panel blanco**.
 * Es lo que un recorte sin fondo permite y una foto rectangular no.
 *
 * La banda lleva el logotipo de marca centrado y a tamaño de portada: sin él
 * quedaba un rectángulo casi blanco entre el header y el panel.
 *
 * Comparte el patrón de `PageHero` —pegada al header, banda a todo el ancho y
 * migas en cápsula flotante— pero no lo reutiliza: aquel recorta
 * la imagen por el alto, y con una figura vertical eso corta la cara.
 */
export function TeamProfileHeader({ member }: { member: TeamMeta }) {
  return (
    <section className="relative w-full pt-16">
      {/* Banda de marca a todo el ancho */}
      <div className="relative w-full h-[200px] sm:h-[230px] md:h-[265px] overflow-hidden">
        <BrandBackdrop panelOverlap="bottom-12 md:bottom-16" />

        <div className="absolute top-4 inset-x-0">
          <div className="container mx-auto px-6 lg:px-12">
            <nav
              aria-label="Migas de navegación"
              className="flex items-center gap-2.5 w-fit py-2 px-4 rounded-full bg-white/95 backdrop-blur-md border border-white/60 shadow-lg text-[11px] font-bold uppercase tracking-widest"
            >
              <Link href="/" className="text-slate-800 hover:text-[#004481] transition-colors flex items-center">
                <Home className="w-3.5 h-3.5 text-[#004481]" />
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <Link href="/equipo" className="text-slate-700 hover:text-[#004481] transition-colors">
                Equipo
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-[#004481] font-extrabold">{member.title}</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Panel de identidad, montando sobre la banda */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10 -mt-12 md:-mt-16">
        <div className="rounded-[2rem] border border-slate-200/90 bg-white shadow-xl px-6 md:px-10 pb-8 md:pb-10 pt-0 md:pt-0">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-end">
            {/* Retrato: sube fuera del panel y se apoya en su borde inferior */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              {/* -mb-8/-mb-10 cancela el `pb` del panel: sin eso la figura
                  quedaba flotando 41px por encima del canto y su corte plano
                  —los retratos terminan a ras: 1006px de ancho en la última
                  fila opaca— se leía como una línea suspendida. Apoyada en el
                  borde, ese corte coincide con el canto y desaparece. */}
              <div className="relative w-[230px] h-[250px] sm:w-[270px] sm:h-[290px] lg:w-full lg:h-[330px] -mt-16 sm:-mt-20 lg:-mt-[130px] -mb-8 md:-mb-10">
                {member.image && (
                  <Image
                    src={member.image}
                    alt={member.fullName}
                    fill
                    priority
                    sizes="(max-width: 1024px) 270px, 33vw"
                    className="object-contain object-bottom drop-shadow-2xl"
                  />
                )}
              </div>
            </div>

            {/* Identidad */}
            <div className="lg:col-span-8 pt-2 lg:pb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[#004481]/10 border border-[#004481]/20 text-[#004481] font-mono font-bold uppercase tracking-[0.2em] text-[10px] mb-3">
                {member.orientation}
              </span>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-[1.1] tracking-tight">
                {member.fullName}
              </h1>
              <p className="mt-2 text-sm font-bold uppercase tracking-widest text-[#004481]">
                {member.role}
              </p>

              <p className="mt-5 text-slate-700 text-sm md:text-base leading-relaxed border-l-4 border-[#004481] pl-4">
                {member.description}
              </p>

              {member.stats && member.stats.length > 0 && (
                <dl className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5">
                  {member.stats.map((stat) => (
                    <div key={stat.label}>
                      <dt className="text-[10px] font-bold uppercase tracking-widest text-slate-500 leading-tight">
                        {stat.label}
                      </dt>
                      <dd className="mt-1 text-lg font-extrabold text-slate-900">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
