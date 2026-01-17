import { Metadata } from "next";
import { ServicesContent } from "@/components/modules/servicios/services-content";

export const metadata: Metadata = {
  title: "Servicios de Desarrollo de Software | Sudolabs Perú",
  description: "Soluciones de ingeniería a medida: Desarrollo Web, Arquitectura Cloud, Automatización y Consultoría Técnica para escalar tu negocio.",
};

export default function ServiciosPage() {
  return <ServicesContent />;
}