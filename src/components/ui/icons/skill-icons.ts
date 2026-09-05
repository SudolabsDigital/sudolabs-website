import type { BrandIconName } from "./registry";

/**
 * Traduce el texto libre de una competencia al icono de su marca.
 *
 * Las competencias se escriben en el MDX como las escribiría una persona
 * —«Next.js 15/16», «PostgreSQL + PostGIS», «Node.js / Express»—, así que el
 * mapa trabaja sobre texto normalizado en vez de exigir un identificador.
 *
 * Lo que NO es una marca —Scrum, Wireframes, Pentesting, Domain-Driven Design—
 * devuelve `undefined` a propósito y se muestra solo como texto. Inventarle un
 * logo a una metodología es peor que no ponerle ninguno.
 */
const SKILL_BRANDS: Record<string, BrandIconName> = {
  // Frontend
  "next.js": "nextjs",
  nextjs: "nextjs",
  react: "react",
  "react 18": "react",
  vite: "vite",
  typescript: "typescript",
  javascript: "javascript",
  tailwindcss: "tailwindcss",
  "tailwind css": "tailwindcss",
  tailwind: "tailwindcss",
  "framer motion": "framermotion",
  "tanstack query": "tanstackquery",
  "react query": "tanstackquery",
  swr: "swr",
  "three.js": "threejs",
  threejs: "threejs",
  leaflet: "leaflet",
  zod: "zod",

  // Backend
  laravel: "laravel",
  "node.js": "nodejs",
  nodejs: "nodejs",
  "node.js / express": "nodejs",
  express: "nodejs",
  php: "php",
  django: "django",
  fastapi: "fastapi",
  jwt: "expressjwt",
  "json web tokens": "expressjwt",

  // Datos
  postgresql: "postgresql",
  "postgresql + postgis": "postgresql",
  postgis: "postgresql",
  mysql: "mysql",
  sqlite: "sqlite",
  "google cloud sql": "googlecloud",

  // Cloud y DevOps
  docker: "docker",
  nginx: "nginx",
  "github actions": "githubactions",
  git: "git",
  vercel: "vercel",
  cloudflare: "cloudflare",
  aws: "amazonaws",
  "amazon web services": "amazonaws",
  "google cloud": "googlecloud",
  "cloud storage": "googlecloud",
  firebase: "firebase",
  "firebase hosting": "firebase",

  // IA y automatización
  "google gemini": "googlegemini",
  "google gemini sdk": "googlegemini",
  gemini: "googlegemini",
  puppeteer: "puppeteer",

  // Lenguajes y plataformas
  python: "python",
  java: "java",
  kotlin: "kotlin",
  linux: "linux",
  "kali linux": "kalilinux",

  // Calidad
  jest: "jest",

  // Diseño y gestión
  figma: "figma",
  miro: "miro",
  trello: "trello",

  // Marketing
  "meta ads": "meta",
  meta: "meta",
  "google analytics": "googleanalytics",
};

/**
 * Términos que contienen el nombre de una marca pero NO son esa marca.
 * Sin esto, la coincidencia parcial le pone a «React Hook Form» el logo de
 * React, que afirma algo falso: son proyectos distintos.
 */
const NOT_A_BRAND = new Set([
  "react hook form",
  "maplibre gl",
  "indexeddb",
  "eloquent spatial",
  "intervention image",
]);

/** Claves ordenadas de más larga a más corta: «kali linux» gana a «linux». */
const KEYS_BY_LENGTH = Object.keys(SKILL_BRANDS).sort((a, b) => b.length - a.length);

/**
 * Quita versiones y adornos para que «Next.js 15/16» y «Next.js» coincidan:
 * números de versión, `v4`, paréntesis y espacios sobrantes.
 */
const normalize = (skill: string): string =>
  skill
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/\bv?\d+(\.\d+)*(\/\d+(\.\d+)*)*\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export function brandForSkill(skill: string): BrandIconName | undefined {
  const text = normalize(skill);
  if (NOT_A_BRAND.has(text)) return undefined;
  if (SKILL_BRANDS[text]) return SKILL_BRANDS[text];
  // Coincidencia parcial por la clave más larga, para entradas compuestas
  // como «Node.js / Express» o «AWS EC2/RDS/S3».
  return KEYS_BY_LENGTH.find((key) => text.includes(key))
    ? SKILL_BRANDS[KEYS_BY_LENGTH.find((key) => text.includes(key))!]
    : undefined;
}
