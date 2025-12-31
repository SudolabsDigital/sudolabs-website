import { Metadata } from "next";
import ProyectosClient from "./proyectos-client";

export const metadata: Metadata = {
  title: "Portafolio y Casos de Éxito | SudolabsDigital",
  description: "Descubre cómo transformamos negocios con software. Casos reales de automatización, gestión documental y plataformas digitales.",
};

export default function ProyectosPage() {
  return <ProyectosClient />;
}