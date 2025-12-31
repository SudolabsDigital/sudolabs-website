import { Metadata } from "next";
import ServiciosClient from "./servicios-client";

export const metadata: Metadata = {
  title: "Servicios de Desarrollo de Software | SudolabsDigital",
  description: "Soluciones de ingeniería a medida: Desarrollo Web, Arquitectura Cloud, Automatización y Consultoría Técnica para escalar tu negocio.",
};

export default function ServiciosPage() {
  return <ServiciosClient />;
}