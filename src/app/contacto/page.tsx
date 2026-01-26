import { Metadata } from "next";
import ContactoClient from "./contacto-client";

export const metadata: Metadata = {
  title: "Contacto - Hablemos de tu Proyecto | Sudolabs Perú",
  description: "Cuéntanos tu idea y nosotros ponemos la ingeniería. Expertos en desarrollo a medida, automatización y consultoría técnica.",
};

export default function ContactoPage() {
  return <ContactoClient />;
}
