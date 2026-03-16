import { Metadata } from "next";
import { ServicesContent } from "@/components/modules/servicios/services-content";

import BreadcrumbSchema from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Servicios de Desarrollo de Software | Sudolabs Perú",
  description: "Soluciones de ingeniería a medida: Desarrollo Web, Arquitectura Cloud, Automatización y Consultoría Técnica para escalar tu negocio.",
  alternates: {
    canonical: "https://sudolabs.space/servicios",
  },
};

export default function ServiciosPage() {
  return (
    <>
      <BreadcrumbSchema 
        items={[
          { name: "Inicio", item: "/" },
          { name: "Servicios", item: "/servicios" }
        ]} 
      />
      <ServicesContent />
    </>
  );
}