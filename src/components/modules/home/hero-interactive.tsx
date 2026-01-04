'use client';

import { useState } from "react"
import { Button } from "@/components/ui/button"
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
      <Button 
        size="lg" 
        onClick={handleOpen}
        className="h-14 lg:h-16 px-8 lg:px-12 text-base lg:text-lg rounded-full shadow-[0_0_20px_rgba(0,255,163,0.4)] bg-[#00FFA3] hover:bg-[#00FFA3]/90 text-black hover:scale-[1.05] transition-all duration-300 w-full sm:w-auto border border-[#00FFA3]/30 font-bold"
      >
        Iniciar Transformación
        <ArrowRight className="ml-3 h-5 w-5" />
      </Button>

      {hasOpenedOnce && (
        <ContactModal 
          isOpen={isContactOpen} 
          onClose={() => setIsContactOpen(false)} 
        />
      )}
    </>
  )
}