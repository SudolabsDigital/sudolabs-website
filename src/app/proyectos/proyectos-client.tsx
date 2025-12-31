'use client';

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { GlobalSpotlight } from "@/components/ui/global-spotlight"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
import { FeaturedProjectCard, ProjectType } from "@/components/modules/projects/featured-card"
import { ProjectCard } from "@/components/modules/projects/lab-card"

const ContactModal = dynamic(() => import("@/components/features/contact-modal").then(mod => mod.ContactModal), {
  ssr: false,
})

// --- DATA LAYER (MOCK DATABASE) ---
const PROJECTS_DATA: ProjectType[] = [
  {
    id: "oficri-pnp",
    title: "Sistema de Gestión Forense",
    subtitle: "OFICRI PNP",
    client: "OFICRI PNP Huancayo",
    description: "Una reingeniería completa del flujo de trabajo criminalístico. Transformamos procesos manuales y burocráticos en una plataforma digital segura, reduciendo el tiempo de emisión de dictámenes en un 60%.",
    image: "/assets/projects/oficri/login.png",
    tags: ["Node.js", "React", "MySQL", "Knex.js", "Handlebars"],
    type: "case_study",
    status: "implemented",
    isFeatured: true,
    features: [
      { title: "Seguridad", desc: "Firma digital y trazabilidad completa de evidencias." },
      { title: "Workflow", desc: "Asignación inteligente de casos a peritos." }
    ]
  },
  {
    id: "estilo-barbaro",
    title: "Sistema de Gestión Barbería",
    subtitle: "Estilo Bárbaro",
    client: "Barbería Local",
    description: "Plataforma integral para la gestión de citas, control financiero y CRM de clientes. Incluye agenda en tiempo real, notificaciones automáticas y control de comisiones.",
    image: "/assets/projects/estilo-barbaro/portada.png",
    tags: ["Node.js", "React", "PostgreSQL", "WhatsApp API"],
    type: "lab",
    status: "in_progress"
  }
];

export default function ProyectosPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  // Logic Layer: Filter data based on flags
  const featuredProject = PROJECTS_DATA.find(p => p.isFeatured);
  const labProjects = PROJECTS_DATA.filter(p => p.type === 'lab');

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background selection:bg-primary/20 relative overflow-hidden">
      <GlobalSpotlight />
      <Header />

      <main className="flex-1 pt-32 pb-24 relative z-10">
        
        {/* HERO HEADER */}
        <section className="container mx-auto px-6 mb-24 md:mb-32">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
             className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
              Portafolio <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-foreground to-foreground/60">
                & Experimentos
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Explorando los límites entre la utilidad corporativa y la experiencia de usuario. Software que se siente tan bien como funciona.
            </p>
          </motion.div>
        </section>

        {/* SECTION 1: FEATURED PROJECT (Dynamic) */}
        {featuredProject && (
          <section className="container mx-auto px-6">
             <FeaturedProjectCard project={featuredProject} />
          </section>
        )}

        {/* SECTION 2: EN DESARROLLO (Dynamic Grid) */}
        <section className="container mx-auto px-6 mb-24">
           <div className="flex items-end justify-between mb-12">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-2">En Desarrollo</h3>
                <p className="text-muted-foreground">Proyectos activos en fase de construcción.</p>
              </div>
              <Sparkles className="text-primary w-6 h-6" />
           </div>

           <div className="grid md:grid-cols-2 gap-8">
              {labProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
           </div>
        </section>

        {/* CTA SECTION */}
        <section className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-background to-primary/5 border border-border/50 rounded-3xl p-12 text-center relative overflow-hidden">
            <h2 className="text-3xl font-bold mb-6">Tu proyecto podría estar aquí</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Desde MVPs rápidos hasta sistemas de misión crítica. Si tienes una idea ambiciosa, tenemos el equipo para ejecutarla.
            </p>
            <Button 
              size="lg" 
              onClick={() => setIsContactOpen(true)}
              className="rounded-full px-8 h-12 shadow-xl shadow-primary/20"
            >
              Iniciar un Proyecto <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </section>

      </main>

      <Footer />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} defaultSubject="Desarrollo a Medida" />
    </div>
  )
}