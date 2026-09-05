import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandBackdropProps {
  /**
   * Cuánto sube el panel de contenido sobre la banda, en clases Tailwind de
   * `bottom-*`. Recorta el contenedor del logo para que se centre en la franja
   * que de verdad se ve y no quede medio tapado por el panel.
   */
  panelOverlap?: string;
}

/**
 * Fondo de marca de las cabeceras: degradado claro, halo difuso y el logotipo
 * centrado a tamaño de portada.
 *
 * Se extrajo cuando apareció el SEGUNDO caso —`PageHero` en modo marca, además
 * de `TeamProfileHeader`—, no antes. Lo único que difiere entre los dos es el
 * solape del panel, y por eso es lo único que se parametriza.
 *
 * El ancho del logo se declara sobre el LIENZO, no sobre el dibujo: el archivo
 * lleva el arte en 3483x1050 dentro de 3840x2160 —el 90,7 % del ancho pero solo
 * el 48,6 % del alto—, así que `w-[660px]` da un logo de 599x180 en pantalla.
 *
 * Oculto por debajo de `sm`: ahí la banda es corta y el contenido que monta
 * encima (retrato o panel) lo taparía.
 */
export function BrandBackdrop({ panelOverlap = "bottom-12 md:bottom-16" }: BrandBackdropProps) {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-[#004481]/15"
      />
      <div
        aria-hidden="true"
        className="absolute left-[22%] top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#3178c6]/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 hidden items-center justify-center px-6 sm:flex",
          panelOverlap
        )}
      >
        <Image
          src="/assets/logo-horizontal.webp"
          alt=""
          width={660}
          height={371}
          className="h-auto w-[380px] max-w-full md:w-[520px] lg:w-[660px]"
        />
      </div>
    </>
  );
}

export default BrandBackdrop;
