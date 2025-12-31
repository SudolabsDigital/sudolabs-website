import { Metadata } from "next";
import NosotrosClient from "./nosotros-client";

export const metadata: Metadata = {
  title: "Nosotros - Ingeniería con Propósito | SudolabsDigital",
  description: "Conoce al equipo detrás de Sudolabs. Nuestra misión es democratizar la tecnología de alta calidad para empresas ambiciosas.",
};

export default function NosotrosPage() {
  return <NosotrosClient />;
}