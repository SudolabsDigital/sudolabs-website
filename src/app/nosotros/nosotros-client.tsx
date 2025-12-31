'use client';

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { GlobalSpotlight } from "@/components/ui/global-spotlight"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Target, Eye, Shield, Sparkles } from "lucide-react"
import dynamic from "next/dynamic"
import Image from "next/image"

const ContactModal = dynamic(() => import("@/components/features/contact-modal").then(mod => mod.ContactModal), {
  ssr: false,
})

export default function NosotrosPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background relative overflow-hidden">
      <GlobalSpotlight />
      <Header />

      <main className="flex-1 pt-32 pb-24 relative z-10">
        <section className="container mx-auto px-6 max-w-6xl">
          
          {/* HERO SECTION */}
          <div className="text-center mb-32">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-8"
            >
              Nuestra <span className="text-primary">Esencia</span>
            </motion.h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              En SudolabsDigital combinamos rigor técnico con una visión humana para construir el software que define el futuro.
            </p>
          </div>

          <div className="space-y-40 mb-32">
            
            {/* SECCIÓN MISION: DISEÑO FLOTANTE */}
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-2 rounded-lg bg-primary/10">
                      <Target className="w-5 h-5 text-primary" />
                   </div>
                   <span className="text-sm font-bold uppercase tracking-widest text-primary">Misión</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                  Democratizar el acceso a la <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">Alta Ingeniería</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Nuestra misión es permitir que empresas de cualquier escala utilicen tecnología de nivel enterprise. No construimos solo herramientas, entregamos ventajas competitivas mediante código limpio, escalable y con propósito.
                </p>
                <ul className="space-y-4">
                  {["Calidad sin compromisos", "Transparencia total", "Resultados medibles"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2 relative flex justify-center lg:justify-end"
              >
                {/* Contenedor Flotante Atmosférico */}
                <div className="relative w-full max-w-md aspect-square">
                  {/* Atmospheric Glow Back */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[100px] rounded-full opacity-60 pointer-events-none" />
                  
                  {/* Floating Image */}
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10"
                  >
                     <Image 
                       src="/assets/about/mision.svg" 
                       alt="Misión Sudolabs" 
                       width={500} 
                       height={500}
                       priority // Cargar rápido ya que es visualmente importante
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                       className="w-full h-auto drop-shadow-2xl"
                     />
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* SECCIÓN VISIÓN: DISEÑO FLOTANTE */}
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative flex justify-center lg:justify-start"
              >
                {/* Contenedor Flotante Atmosférico */}
                <div className="relative w-full max-w-md aspect-square">
                  {/* Atmospheric Glow Back - Secondary Color */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-secondary/20 blur-[100px] rounded-full opacity-60 pointer-events-none" />
                  
                  {/* Floating Image */}
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="relative z-10"
                  >
                     <Image 
                       src="/assets/about/vision.svg" 
                       alt="Visión Sudolabs" 
                       width={500} 
                       height={500}
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                       className="w-full h-auto drop-shadow-2xl"
                     />
                  </motion.div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-2 rounded-lg bg-secondary/10">
                      <Eye className="w-5 h-5 text-secondary" />
                   </div>
                   <span className="text-sm font-bold uppercase tracking-widest text-secondary">Visión</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                  Ser el estándar de <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary/50">Confianza Tecnológica</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Nos visualizamos como el epicentro de la innovación en la región, donde las ideas más audaces se convierten en realidades técnicas. Queremos ser el primer nombre que viene a la mente cuando una empresa busca escalar sin límites.
                </p>
                <div className="pl-6 border-l-2 border-secondary/30">
                   <p className="text-xl italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient">
                     "No solo predecimos el futuro de tu negocio, lo programamos con precisión."
                   </p>
                </div>
              </motion.div>
            </div>

          </div>

          {/* VALORES CORE */}
          <section className="py-24 border-t border-border/50">
            <div className="text-center mb-16">
               <h3 className="text-3xl font-bold mb-4">Nuestros Valores Core</h3>
               <p className="text-muted-foreground">Los principios que guían cada línea de código.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { title: "Transparencia", desc: "Comunicación honesta y sin sorpresas.", icon: Shield },
                 { title: "Pragmatismo", desc: "Soluciones reales para problemas reales.", icon: Target },
                 { title: "Excelencia", desc: "Calidad artesanal en cada bit.", icon: Sparkles },
                 { title: "Innovación", desc: "A la vanguardia de lo que viene.", icon: Eye }
               ].map((v, i) => (
                 <motion.div 
                    key={v.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 rounded-3xl border border-border/50 bg-card/30 hover:bg-card/60 transition-colors group"
                 >
                    <v.icon className="w-8 h-8 text-primary mb-6 group-hover:scale-110 transition-transform" />
                    <h4 className="text-xl font-bold mb-2">{v.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                 </motion.div>
               ))}
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="py-24 text-center relative overflow-hidden rounded-[3rem] bg-muted/20 border border-border/50">
             <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
             <div className="relative z-10">
               <h2 className="text-3xl md:text-5xl font-bold mb-8">¿Listo para ser parte de la historia?</h2>
               <Button 
                size="lg" 
                onClick={() => setIsContactOpen(true)}
                className="rounded-full px-12 h-16 text-lg shadow-2xl shadow-primary/20 hover:scale-105 transition-all"
               >
                 Hablemos de tu visión <ArrowRight className="ml-2" />
               </Button>
             </div>
          </section>

        </section>
      </main>

      <Footer />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} defaultSubject="Hablemos de Nosotros" />
    </div>
  )
}