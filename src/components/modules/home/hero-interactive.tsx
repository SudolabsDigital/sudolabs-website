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

  return (
    <>
      <Button 
        size="lg" 
        onClick={() => setIsContactOpen(true)}
        className="h-14 lg:h-16 px-8 lg:px-12 text-base lg:text-lg rounded-full shadow-2xl shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto"
      >
        Iniciar Transformación
        <ArrowRight className="ml-3 h-5 w-5" />
      </Button>

      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </>
  )
}