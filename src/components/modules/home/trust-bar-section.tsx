import Link from "next/link";
import Image from "next/image";
import { getAllContent } from "@/lib/mdx";
import { ProjectMeta } from "@/lib/mdx-utils";

interface TrustLogo {
  key: string;
  slug: string;
  title: string;
  src: string;
}

export async function TrustBarSection() {
  const projects = await getAllContent<ProjectMeta>("projects");

  const primary: TrustLogo[] = [];
  const partners: TrustLogo[] = [];

  projects.forEach((project) => {
    if (project.logo) {
      primary.push({ key: `${project.slug}-logo`, slug: project.slug, title: project.title, src: project.logo });
    }
    if (project.partnerLogo) {
      partners.push({ key: `${project.slug}-partner`, slug: project.slug, title: project.title, src: project.partnerLogo });
    }
  });

  // Los logos asociados (ej. institución matriz) van al final del recorrido,
  // nunca justo al lado del logo principal del mismo proyecto.
  const logos = [...primary, ...partners];

  if (logos.length === 0) return null;

  // Velocidad constante en px/s (no proporcional a la cantidad de items):
  // el ancho aproximado de cada logo (144px + 64px de gap) define cuánto
  // recorrido hay que animar para mantener siempre el mismo ritmo, pausado.
  const ITEM_WIDTH_PX = 240;
  const SPEED_PX_PER_SECOND = 35;
  const loops = [0, 1, 2, 3];
  const oneLapSeconds = (logos.length * ITEM_WIDTH_PX) / SPEED_PX_PER_SECOND;
  const durationSeconds = Math.max(24, loops.length * oneLapSeconds);

  const renderTrack = (ariaHidden: boolean) => (
    <div
      className="flex hover:[animation-play-state:paused] w-max"
      style={{ animation: `infinite-scroll ${durationSeconds}s linear infinite` }}
      aria-hidden={ariaHidden}
    >
      {loops.map((loopIndex) => (
        <div key={loopIndex} className="flex items-center gap-16 md:gap-20 pr-16 md:pr-20">
          {logos.map((logo) => (
            <Link
              key={`${loopIndex}-${logo.key}`}
              href={`/proyectos/${logo.slug}`}
              aria-label={logo.title}
              tabIndex={ariaHidden ? -1 : 0}
              className="relative h-12 w-36 md:h-16 md:w-48 shrink-0 opacity-90 hover:opacity-100 transition duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.title}
                fill
                sizes="200px"
                className="object-contain"
              />
            </Link>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-6 md:py-8 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 mb-4 md:mb-6">
        <p className="text-center text-xs md:text-sm font-extrabold uppercase tracking-[0.25em] md:tracking-[0.35em] text-slate-700">
          Con la confianza de clientes y productos propios
        </p>
      </div>
      <div
        className="container mx-auto px-6 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <div className="flex w-full">
          {renderTrack(false)}
          {renderTrack(true)}
        </div>
      </div>
    </section>
  );
}
