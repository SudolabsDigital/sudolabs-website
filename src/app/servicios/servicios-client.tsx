'use client';

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { GlobalSpotlight } from "@/components/ui/global-spotlight"
import { motion } from "framer-motion"
import { Zap, ArrowRight, Globe, Cpu, Code2, ShieldCheck, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"

const ContactModal = dynamic(() => import("@/components/features/contact-modal").then(mod => mod.ContactModal), {
  ssr: false,
})

const services = [
  {
    title: "Desarrollo Web & Apps",
    description: "Aplicaciones modernas, rápidas y escalables construidas con Next.js y React.",
    icon: Globe,
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    title: "Arquitectura de Software",
    description: "Diseño de sistemas robustos preparados para el crecimiento y alta disponibilidad.",
    icon: Cpu,
    color: "bg-purple-500/10 text-purple-500"
  },
  {
    title: "Automatización de Procesos",
    description: "Eliminamos tareas manuales repetitivas mediante integraciones y scripts inteligentes.",
    icon: Zap,
    color: "bg-yellow-500/10 text-yellow-500"
  },
  {
    title: "Consultoría Técnica",
    description: "Auditamos tu stack tecnológico y te ayudamos a tomar las mejores decisiones.",
    icon: Code2,
    color: "bg-green-500/10 text-green-500"
  },
  {
    title: "Seguridad & Optimización",
    description: "Protegemos tus datos y mejoramos el rendimiento de tus plataformas existentes.",
    icon: ShieldCheck,
    color: "bg-red-500/10 text-red-500"
  },
  {
    title: "MVP para Startups",
    description: "Lanzamos tu producto al mercado en tiempo récord sin sacrificar calidad.",
    icon: Rocket,
    color: "bg-orange-500/10 text-orange-500"
  }
]

export default function ServiciosPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background relative overflow-hidden">
      <GlobalSpotlight />
      <Header />

      <main className="flex-1 pt-32 pb-24 relative z-10">
        <section className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
            >
              Soluciones <span className="text-primary">Ingenieriles</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              No solo escribimos código, resolvemos problemas de negocio con tecnología de vanguardia.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA SECTION */}
          <div className="bg-primary/5 border border-primary/10 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="text-3xl font-bold mb-6 relative z-10">¿No estás seguro de qué necesitas?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 relative z-10">
              A veces el problema no es técnico, sino de estrategia. Hablemos para entender tu situación actual.
            </p>
            <Button 
              size="lg" 
              onClick={() => setIsContactOpen(true)}
              className="rounded-full px-8 h-12 relative z-10 shadow-xl shadow-primary/20"
            >
              Agendar Diagnóstico Gratuito <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

        </section>
      </main>

      <Footer />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} defaultSubject="Consultoría Técnica" />
    </div>
  )
}