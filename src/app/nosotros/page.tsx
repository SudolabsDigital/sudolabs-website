import { Metadata } from "next";
import NosotrosClient from "./nosotros-client";

import BreadcrumbSchema from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Nosotros - Ingeniería con Propósito | Sudolabs Perú",
  description: "Conoce al equipo detrás de Sudolabs. Nuestra misión es democratizar la tecnología de alta calidad para empresas ambiciosas.",
  alternates: {
    canonical: "https://sudolabs.space/nosotros",
  },
};

export default function NosotrosPage() {
  return (
    <>
      <BreadcrumbSchema 
        items={[
          { name: "Inicio", item: "/" },
          { name: "Nosotros", item: "/nosotros" }
        ]} 
      />
      <NosotrosClient />
    </>
  );
}