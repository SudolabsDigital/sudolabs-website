'use client';

import { CtaCard } from "@/components/ui/design-system/cta-card"

export function CtaSection() {
  const handleWhatsappDirect = () => {
    window.open("https://wa.me/51923384303?text=Hola%20Sudolabs,%20me%20interesa%20agendar%20una%20consultor%C3%ADa.", "_blank");
  };

  return (
    <section className="container mx-auto px-6 py-12 lg:py-16" id="contacto">
      <CtaCard
        tag="CONSULTORÍA DISPONIBLE"
        title={
          <>
            El Futuro es Código.<br />
            <span className="text-primary">¿Vas a dejar que tu competencia lo escriba?</span>
          </>
        }
        description="No vendemos software, vendemos ventaja competitiva. Agenda una sesión estratégica y descubramos cómo escalar tu operación con ingeniería de alto rendimiento."
        buttonText="Agendar Consultoría Gratis"
        onClick={handleWhatsappDirect}
        imageSrc="/assets/images/Auditoría de Seguridad Web.webp"
      />
    </section>
  );
}