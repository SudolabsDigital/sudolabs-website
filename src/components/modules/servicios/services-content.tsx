'use client';

import { useState } from "react"
import { motion } from "framer-motion"
import { Zap, Globe, Cpu, Code2, ShieldCheck, Rocket } from "lucide-react"
import dynamic from "next/dynamic"
import PageHero from "@/components/ui/page-hero"
import { CtaCard } from "@/components/ui/design-system/cta-card"

const ContactModal = dynamic(() => import("@/components/features/contact-modal").then(mod => mod.ContactModal), {
  ssr: false,
})

const services = [
  {
    title: "Desarrollo Web & Apps",
    description: "Aplicaciones de alto rendimiento. Desde landing pages que convierten hasta plataformas SaaS complejas.",
    icon: Globe,
    techs: ["Next.js", "React", "Node.js"],
    colSpan: "lg:col-span-2", // Destacado
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Arquitectura Cloud",
    description: "Infraestructura que escala contigo. AWS, Vercel o servidores dedicados.",
    icon: Cpu,
    techs: ["AWS", "Docker", "CI/CD"],
    colSpan: "lg:col-span-1",
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    title: "Automatización",
    description: "Elimina el trabajo manual. Conectamos tus herramientas (CRM, ERP) para que fluyan solas.",
    icon: Zap,
    techs: ["Zapier", "Python Scripts", "APIs"],
    colSpan: "lg:col-span-1",
    gradient: "from-yellow-500/20 to-orange-500/20"
  },
  {
    title: "Consultoría Técnica",
    description: "Auditoría de código, modernización de plataformas y dirección técnica (CTO as a Service).",
    icon: Code2,
    techs: ["Code Review", "Mentoring", "Strategy"],
    colSpan: "lg:col-span-2", // Destacado
    gradient: "from-green-500/20 to-emerald-500/20"
  },
  {
    title: "Seguridad",
    description: "Protección de datos y hardening de servidores.",
    icon: ShieldCheck,
    techs: ["Pen Testing", "Auditoría", "Backups"],
    colSpan: "lg:col-span-1",
    gradient: "from-red-500/20 to-rose-500/20"
  },
  {
    title: "MVP Express",
    description: "De la idea al mercado en 4 semanas. Validamos tu hipótesis rápido.",
    icon: Rocket,
    techs: ["Prototipado", "Lean Startup", "Speed"],
    colSpan: "lg:col-span-2", // Destacado
    gradient: "from-orange-500/20 to-amber-500/20"
  }
]

export function ServicesContent() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <PageHero 
        title="Capacidades Técnicas."
        subtitle="Catálogo de Servicios"
        description="Un stack completo de servicios diseñados para resolver problemas complejos. Sin relleno, solo ingeniería."
        imageSrc="/assets/images/Dashboards Ejecutivos.webp"
        size="compact"
      />
      
      <div className="pt-24 pb-24 relative z-10">
        <section className="container mx-auto px-6 max-w-7xl">

        {/* BENTO GRID DE SERVICIOS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-32">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05 }}
              className={`${service.colSpan} group relative p-8 md:p-10 rounded-[2.5rem] bg-card/30 border border-border/50 hover:border-primary/30 transition duration-500 overflow-hidden flex flex-col justify-between`}
            >
              {/* Hover Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div>
                  <div className="w-14 h-14 rounded-2xl bg-background border border-border/50 flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <service.icon className="w-7 h-7 text-foreground/80" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors">
                      {service.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {service.description}
                  </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA SECTION - STANDARDIZED */}
        <div className="mt-16">
          <CtaCard
            tag="Desafíos Especiales"
            title="¿Tu problema no está en la lista?"
            description="Los mejores proyectos suelen ser los que no encajan en ninguna categoría estándar. Nos encantan los retos raros."
            buttonText="Cuéntanos el Reto"
            onClick={() => setIsContactOpen(true)}
            imageSrc="/assets/images/Buscadores Inteligentes.webp"
          />
        </div>
      </section>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} defaultSubject="Consulta de Servicios" />
      </div>
    </>
  )
}