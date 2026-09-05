import { Metadata } from "next";
import ContactoClient from "./contacto-client";

import BreadcrumbSchema from "@/components/seo/breadcrumb-schema";
import ContactJsonLd from "@/components/seo/contact-json-ld";

export const metadata: Metadata = {
  title: "Contacto — Hablemos de tu Proyecto",
  description: "Cuéntanos tu idea y nosotros ponemos la ingeniería. Expertos en desarrollo a medida, automatización y consultoría técnica.",
  alternates: {
    canonical: "https://sudolabs.space/contacto",
  },
};

export default function ContactoPage() {
  return (
    <>
      <ContactJsonLd />
      <BreadcrumbSchema 
        items={[
          { name: "Inicio", item: "/" },
          { name: "Contacto", item: "/contacto" }
        ]} 
      />
      <ContactoClient />
    </>
  );
}
