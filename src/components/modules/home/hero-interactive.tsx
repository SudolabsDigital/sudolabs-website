'use client';

import { useState } from "react"
import { TechButton } from "@/components/ui/design-system/tech-button"
import { ArrowRight } from "lucide-react"
import dynamic from "next/dynamic"

const ContactModal = dynamic(() => import("@/components/features/contact-modal").then(mod => mod.ContactModal), {
  ssr: false,
})

export function HeroInteractive() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);

  const handleOpen = () => {
    setHasOpenedOnce(true);
    setIsContactOpen(true);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <TechButton
          variant="primary"
          size="lg"
          onClick={handleOpen}
          iconRight={<ArrowRight className="h-5 w-5" />}
          className="w-full sm:w-auto"
        >
          Iniciar Transformación
        </TechButton>

        <TechButton
          variant="outline"
          size="lg"
          href="/proyectos"
          className="w-full sm:w-auto"
        >
          Ver proyectos
        </TechButton>
      </div>

      {hasOpenedOnce && (
        <ContactModal 
          isOpen={isContactOpen} 
          onClose={() => setIsContactOpen(false)} 
        />
      )}
    </>
  )
}