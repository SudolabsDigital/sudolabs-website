import React from "react";
import { cn } from "@/lib/utils";
import { BrandIcon, brandHex, brandInk, FALLBACK_BRAND, type BrandIconName } from "./index";

type ChipSize = "sm" | "md" | "lg";
type ChipShape = "rounded" | "circle";

export interface IconChipProps {
  name: BrandIconName;
  /** `sm` 32px · `md` 40px (por defecto) · `lg` 44px, el mínimo táctil. */
  size?: ChipSize;
  shape?: ChipShape;
  /** `false` lo deja decorativo: sin estados, sin transición. */
  interactive?: boolean;
  /** Se pasa tal cual a `BrandIcon`; decide cómo lo anuncia un lector. */
  label?: boolean | string;
  className?: string;
}

const CAJA: Record<ChipSize, string> = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  // 44px es el mínimo táctil de `memory/frontend/responsive_ui.md`. Se usa
  // cuando el chip ES el objetivo de toque, no por tamaño estético.
  lg: "w-11 h-11",
};

const GLIFO: Record<ChipSize, string> = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-5 h-5",
};

/**
 * Icono de marca dentro de un contenedor que se enciende con su color.
 *
 * **Compone `BrandIcon`; no redefine iconos.** `registry.tsx` sigue siendo la
 * única fuente de trazados y colores.
 *
 * En reposo es neutro y ya legible; el color de marca llega en hover o foco.
 * Nada depende solo de `hover`, que es lo que lo hace utilizable en táctil.
 *
 * **Reacciona al `group` de su contenedor**, no a su propio hover: así se
 * enciende también cuando el puntero está sobre el texto de al lado. El
 * consumidor tiene que poner `group` en el enlace o botón que lo envuelve.
 *
 * Tailwind no compila clases desde valores de runtime, así que el color entra
 * como custom properties (`--brand`, `--brand-ink`) y las clases las leen.
 */
export function IconChip({
  name,
  size = "md",
  shape = "rounded",
  interactive = true,
  label,
  className,
}: IconChipProps) {
  const hex = brandHex(name) ?? FALLBACK_BRAND;

  return (
    <span
      style={
        {
          "--brand": hex,
          "--brand-ink": brandInk(name),
        } as React.CSSProperties
      }
      className={cn(
        "inline-flex items-center justify-center shrink-0 border",
        CAJA[size],
        shape === "circle" ? "rounded-full" : "rounded-xl",
        "bg-slate-100 border-slate-200/90 text-slate-500",
        interactive && [
          "transition-colors duration-200",
          "group-hover:bg-[var(--brand)] group-hover:border-[var(--brand)] group-hover:text-[var(--brand-ink)]",
          "group-focus-visible:bg-[var(--brand)] group-focus-visible:border-[var(--brand)] group-focus-visible:text-[var(--brand-ink)]",
          // El escalado es decoración: con `prefers-reduced-motion: reduce` no
          // ocurre, y el cambio de color —que es lo que informa— se mantiene.
          "motion-safe:transition-transform motion-safe:group-hover:scale-105 motion-safe:group-active:scale-95",
        ],
        className
      )}
    >
      <BrandIcon name={name} label={label} className={GLIFO[size]} />
    </span>
  );
}

export default IconChip;
