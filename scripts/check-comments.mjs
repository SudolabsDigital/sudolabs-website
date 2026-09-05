#!/usr/bin/env node
/**
 * Puerta de comentarios: falla si un comentario del código fuente filtra
 * información que no debe salir en un repositorio público.
 *
 * Existe porque no hay herramienta que lo haga: los formateadores dan estilo a
 * los comentarios y los escáneres de secretos buscan credenciales, pero ninguno
 * lee la prosa. Sin una puerta que pueda romper la ejecución, "no escribir datos
 * de negocio en comentarios" se cumple a ratos y el hueco aparece donde nadie
 * mira.
 *
 * Solo mira COMENTARIOS de `src/` y de la configuración: el contenido de los
 * `.mdx` se publica a propósito y queda fuera.
 *
 *   node scripts/check-comments.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const RAIZ = process.cwd();
const OBJETIVOS = ["src", "next.config.ts"];
const EXTENSIONES = [".ts", ".tsx", ".mjs", ".css"];

/** Cada patrón con el motivo, para que el fallo diga qué arreglar. */
const PROHIBIDO = [
  [/search console/i, "métrica de tráfico"],
  [/google trends/i, "estudio de demanda"],
  [/\b(impresiones|clics|CTR|posición media)\b/i, "métrica de tráfico"],
  [/docs\//i, "referencia a documentación interna"],
  [/auditor[ií]a_seo|spec_[a-z_]+\.md|estado[_ ]de[_ ]implementaci/i, "documento interno"],
  [/\bdeuda D\d+\b/i, "registro de deuda interna"],
  // `margen` queda fuera a propósito: en este código significa margen de caja,
  // no margen comercial. Una puerta que grita en falso acaba desactivada.
  [/(facturación de la empresa|presupuesto del cliente|cliente paga)/i, "dato comercial"],
  [/(camino de conversión|tasa de conversión|embudo de venta)/i, "métrica comercial"],
  [/cuenta que no existe|apuntaba a una ruta/i, "estado histórico del proyecto"],
];

const archivos = [];
const recorrer = (ruta) => {
  const st = statSync(ruta);
  if (st.isDirectory()) {
    for (const e of readdirSync(ruta)) {
      if (e === "node_modules" || e === ".next") continue;
      recorrer(join(ruta, e));
    }
  } else if (EXTENSIONES.some((x) => ruta.endsWith(x))) {
    archivos.push(ruta);
  }
};
for (const o of OBJETIVOS) {
  try {
    recorrer(join(RAIZ, o));
  } catch {
    /* objetivo ausente: no es un fallo */
  }
}

const esComentario = (linea) => {
  const t = linea.trim();
  return t.startsWith("//") || t.startsWith("*") || t.startsWith("/*") || t.startsWith("{/*");
};

const hallazgos = [];
for (const archivo of archivos) {
  const lineas = readFileSync(archivo, "utf8").split("\n");
  lineas.forEach((linea, i) => {
    if (!esComentario(linea)) return;
    for (const [patron, motivo] of PROHIBIDO) {
      if (patron.test(linea)) {
        hallazgos.push({ archivo: relative(RAIZ, archivo), linea: i + 1, motivo, texto: linea.trim() });
        break;
      }
    }
  });
}

if (hallazgos.length === 0) {
  console.log(`comentarios: ${archivos.length} archivos revisados, 0 hallazgos`);
  process.exit(0);
}

console.error(`comentarios: ${hallazgos.length} hallazgo(s) en ${archivos.length} archivos revisados\n`);
for (const h of hallazgos) {
  console.error(`  ${h.archivo}:${h.linea}  [${h.motivo}]`);
  console.error(`    ${h.texto.slice(0, 110)}`);
}
console.error("\nEste repositorio es público. Reescribe el comentario dejando solo el motivo técnico.");
process.exit(1);
