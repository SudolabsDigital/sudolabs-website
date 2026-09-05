import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { siteConfig } from "@/core/config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convierte texto libre en slug de URL.
 *
 * El `normalize("NFD")` separa cada letra acentuada en letra + diacrítico, y la
 * línea siguiente borra solo el diacrítico. Sin ese paso, `[^\w\-]` —donde `\w`
 * es `[A-Za-z0-9_]`— eliminaba la vocal entera: «Automatización» daba
 * `automatizacin` y «Consultoría» daba `consultora`, que no parece un error sino
 * otra palabra.
 *
 * La misma función genera los identificadores de encabezado de los artículos, así
 * que el índice del artículo y sus anclas se mantienen coherentes entre sí.
 */
export const slugify = (text: string) => {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export function absoluteUrl(path: string) {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
