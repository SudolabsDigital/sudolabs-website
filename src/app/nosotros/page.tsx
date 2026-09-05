import { Metadata } from "next";
import NosotrosClient from "./nosotros-client";

import BreadcrumbSchema from "@/components/seo/breadcrumb-schema";
import { getAllContent } from "@/lib/mdx";
import { TeamMeta } from "@/lib/mdx-utils";

export const metadata: Metadata = {
  title: "Nosotros — Ingeniería con Propósito",
  description: "Conoce al equipo detrás de Sudolabs. Nuestra misión es democratizar la tecnología de alta calidad para empresas ambiciosas.",
  alternates: {
    canonical: "https://sudolabs.space/nosotros",
  },
};

export default async function NosotrosPage() {
  // El metadata de esta página promete «conoce al equipo» desde siempre. Los
  // datos se leen del contenido en vez de repetirlos aquí: una sola fuente.
  const team = (await getAllContent<TeamMeta>("team")).sort(
    (a, b) => (a.order ?? 99) - (b.order ?? 99)
  );

  return (
    <>
      <BreadcrumbSchema 
        items={[
          { name: "Inicio", item: "/" },
          { name: "Nosotros", item: "/nosotros" }
        ]} 
      />
      <NosotrosClient team={team} />
    </>
  );
}