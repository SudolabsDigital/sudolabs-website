import React from "react";
import { cn } from "@/lib/utils";
import { BRAND_ICONS, type BrandIconDefinition, type BrandIconName } from "./registry";

export { BRAND_ICONS, type BrandIconName };
export type { BrandIconDefinition } from "./registry";

/**
 * Color oficial de la marca, cuando lo tiene declarado.
 *
 * Tailwind no puede compilar una clase a partir de un valor de runtime, así que
 * el consumidor lo inyecta como custom property —`style={{ "--brand": hex }}`—
 * y la usa con `hover:text-[var(--brand)]`. Es lo que sustituye a los hex
 * sueltos que había repartidos por los componentes.
 */
export const brandHex = (name: BrandIconName): string | undefined => {
  const icon: BrandIconDefinition = BRAND_ICONS[name];
  return icon.hex;
};

/** Azul del sitio. Lo usa lo que no tiene color de marca propio (`email`). */
export const FALLBACK_BRAND = "#004481";

/**
 * Luminancia relativa (WCAG 2.x) de un hex `#rrggbb`.
 * Exportada porque es la regla que decide el contraste del glifo, y una regla
 * que gobierna una decisión tiene que poder comprobarse desde fuera.
 */
export function relativeLuminance(hex: string): number {
  const h = hex.replace("#", "");
  const canal = (i: number) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * canal(0) + 0.7152 * canal(2) + 0.0722 * canal(4);
}

/**
 * Color del glifo cuando el fondo es el color de la marca.
 *
 * Es una FÓRMULA y no una tabla a mano: medido sobre las 50 marcas con hex del
 * registro, 47 son oscuras y 3 son claras —`javascript` (#F7DF1E), `linux`
 * (#FCC624) y `react` (#61DAFB)—. Con una lista escrita a mano, la marca 52
 * entraría sin que nadie recalculara nada.
 */
export function brandInk(name: BrandIconName): string {
  const hex = brandHex(name) ?? FALLBACK_BRAND;
  return relativeLuminance(hex) > 0.5 ? "#151b23" : "#ffffff";
}

export interface BrandIconProps
  extends Omit<React.SVGProps<SVGSVGElement>, "name" | "children"> {
  name: BrandIconName;
  /**
   * Controla si el icono es contenido o decoración, que es lo que decide
   * cómo lo anuncia un lector de pantalla:
   * - omitido      -> decorativo (`aria-hidden`). Úsalo cuando al lado hay
   *                   un texto que ya nombra la marca.
   * - `true`       -> contenido, con el nombre de la marca del registro.
   * - `"..."`      -> contenido, con este texto. Úsalo cuando el enlace dice
   *                   algo más preciso que la marca ("Compartir en LinkedIn").
   */
  label?: boolean | string;
}

/**
 * Icono de marca sobre lienzo 24x24 que hereda el color con `currentColor`.
 *
 * Un `name` que no exista en el registro es un error de compilación, no un
 * hueco silencioso en la interfaz.
 */
export function BrandIcon({ name, label, className, ...props }: BrandIconProps) {
  // Anotado como `BrandIconDefinition` a propósito: `satisfies` conserva el
  // tipo literal de cada entrada, así que el union solo expone los campos que
  // TODAS declaran — y los opcionales (`hex`, `viewBox`) quedarían fuera.
  const icon: BrandIconDefinition = BRAND_ICONS[name];
  const accessibleName =
    typeof label === "string" ? label : label ? icon.title : undefined;

  return (
    <svg
      viewBox={icon.viewBox ?? "0 0 24 24"}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      {...(accessibleName
        ? { role: "img", "aria-label": accessibleName }
        : { "aria-hidden": true, focusable: false })}
      {...props}
    >
      {accessibleName && <title>{accessibleName}</title>}
      {icon.content}
    </svg>
  );
}

export default BrandIcon;
