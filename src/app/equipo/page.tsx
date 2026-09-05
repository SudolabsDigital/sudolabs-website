import { Metadata } from "next";
import { getAllContent } from "@/lib/mdx";
import { TeamMeta } from "@/lib/mdx-utils";
import PageHero from "@/components/ui/page-hero";
import BreadcrumbSchema from "@/components/seo/breadcrumb-schema";
import { TeamCard } from "@/components/modules/equipo/ui/team-card";
import { TeamJsonLd } from "@/components/seo/team-json-ld";
import { TrustBarSection } from "@/components/modules/home/trust-bar-section";
import { Bus, HeartPulse, GraduationCap, ShieldCheck, HardHat } from "lucide-react";

export const metadata: Metadata = {
  // El layout aplica el template `%s | Sudolabs Perú`: aquí solo la parte propia.
  title: "Equipo",
  description:
    "Las personas detrás de Sudolabs: arquitectura de software, diseño de producto y experiencia. Conoce quién construye cada sistema que entregamos.",
  alternates: {
    canonical: "https://sudolabs.space/equipo",
  },
};

/**
 * Cada rubro debe corresponder a un caso publicado en `/proyectos`.
 */
const RUBROS = [
  { label: "Transporte", Icono: Bus },
  { label: "Salud", Icono: HeartPulse },
  { label: "Educación", Icono: GraduationCap },
  { label: "Seguridad", Icono: ShieldCheck },
  { label: "Construcción", Icono: HardHat },
] as const;

/** Orden explícito por `order`; el `date` solo existe para el pipeline de MDX. */
const byOrder = (a: TeamMeta, b: TeamMeta) => (a.order ?? 99) - (b.order ?? 99);

export default async function EquipoPage() {
  const members = (await getAllContent<TeamMeta>("team")).sort(byOrder);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", item: "/" },
          { name: "Equipo", item: "/equipo" },
        ]}
      />
      <TeamJsonLd members={members} />

      <div className="min-h-screen bg-transparent font-sans pb-24">
        <PageHero
          title="Las personas detrás del código."
          subtitle="Equipo Sudolabs"
          description="Somos un equipo pequeño y deliberadamente completo: el ciclo entero, desde entender el problema hasta sostener el sistema en producción, sin intermediarios."
          variant="brand"
          size="compact"
          breadcrumbs={[{ label: "Equipo" }]}
        />

        {/* Rubros con experiencia real, y los logos justo debajo como prueba.
            Va en su propio `relative z-10` porque el carrusel trae su propio
            contenedor y anidarlo en el de las tarjetas duplicaría el padding. */}
        <div className="relative z-10 pt-12">
          <div className="container mx-auto px-6 max-w-6xl">
            <p className="text-center text-xs md:text-sm font-extrabold uppercase tracking-[0.25em] md:tracking-[0.35em] text-slate-700">
              Experiencia en estos rubros
            </p>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-2.5 md:gap-3">
              {RUBROS.map(({ label, Icono }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-4 py-2 shadow-sm"
                >
                  <Icono className="w-4 h-4 text-[#004481]" aria-hidden="true" />
                  <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-800">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Panel opaco bajo el carrusel: los logos son imágenes con fondo
              transparente, así que estar por encima de la Aurora no basta —el
              degradado se ve DETRÁS de ellos y los apaga. En la portada no pasa
              porque ahí el carrusel cae sobre la zona clara del fondo. */}
          <div className="container mx-auto px-6 max-w-6xl mt-8 md:mt-10">
            <div className="rounded-3xl border border-slate-200/90 bg-white/95 shadow-sm py-2">
              <TrustBarSection title={null} />
            </div>
          </div>
        </div>

        {/* relative z-10: mismo motivo que en blog, proyectos y los perfiles.
            La Aurora (`GlobalSpotlight`) es `fixed inset-0 z-0` —posicionada—
            y se pinta encima de cualquier bloque sin posicionar, incluido el
            `bg-white` de las tarjetas. */}
        <div className="container mx-auto px-6 max-w-6xl pt-12 relative z-10">
          {/* Todas las tarjetas iguales: nadie va destacado sobre el otro. */}
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {members.map((member, i) => (
              <TeamCard key={member.slug} member={member} priority={i < 2} />
            ))}
          </div>

          {/* Cómo se reparte el trabajo */}
          <section className="mt-24 p-8 md:p-12 rounded-[2.5rem] bg-white/90 border border-slate-200/90 shadow-sm">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#004481] mb-5 block">
              Cómo trabajamos
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-5 leading-tight">
              Dos perfiles que cubren el ciclo entero
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
              El trabajo empieza antes del código —entender el proceso real, mapear los flujos,
              prototipar lo que todavía se puede cambiar barato— y termina después del despliegue,
              cuando hay que sostener el sistema en producción. Nos repartimos ese recorrido de
              punta a punta: no hay una fase que quede en tierra de nadie ni un proveedor externo
              al que trasladarle la parte incómoda.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
