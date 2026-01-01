'use client';

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { GlobalSpotlight } from "@/components/ui/global-spotlight"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Target, Eye, Shield, Sparkles, Zap, Users } from "lucide-react"
import dynamic from "next/dynamic"

const ContactModal = dynamic(() => import("@/components/features/contact-modal").then(mod => mod.ContactModal), {
  ssr: false,
})

export default function NosotrosPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background relative overflow-hidden selection:bg-primary/20">
      <GlobalSpotlight />
      <Header />

      <main className="flex-1 pt-32 pb-24 relative z-10">
        <section className="container mx-auto px-6 max-w-6xl">
          
          {/* HERO SECTION: MANIFIESTO */}
          <div className="text-center mb-24 md:mb-32">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8 text-foreground leading-[0.9]"
            >
              Ingeniería con <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Propósito.</span>
            </motion.h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              En Sudolabs, no solo escribimos código. Construimos la infraestructura digital que permite a las empresas ambiciosas escalar sin límites.
            </p>
          </div>

          {/* MISIÓN & VISIÓN: GRID EDITORIAL */}
          <div className="grid md:grid-cols-2 gap-8 mb-32">
            
            {/* MISIÓN */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 md:p-12 rounded-[2.5rem] bg-card/30 border border-border/50 hover:border-primary/30 transition-all group relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Target className="w-48 h-48 text-primary" />
               </div>
               
               <div className="relative z-10">
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6 block">Nuestra Misión</span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                    Democratizar la <br/> Alta Ingeniería
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    Queremos que empresas de cualquier tamaño accedan a tecnología de nivel enterprise. Código limpio, arquitecturas escalables y seguridad bancaria no deberían ser exclusivos de las grandes corporaciones.
                  </p>
                  <ul className="space-y-3">
                    {["Calidad sin compromisos", "Transparencia radical", "Resultados medibles"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
               </div>
            </motion.div>

            {/* VISIÓN */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 md:p-12 rounded-[2.5rem] bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all group relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Eye className="w-48 h-48 text-primary" />
               </div>

               <div className="relative z-10">
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6 block">Nuestra Visión</span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                    El Estándar de <br/> Confianza Técnica
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    Nos visualizamos como el socio técnico definitivo para la región. Cuando una empresa piensa en &quot;escalar&quot;, queremos que piense en Sudolabs como sinónimo de solidez y futuro.
                  </p>
                  <div className="pl-6 border-l-2 border-primary/30 py-2">
                     <p className="text-lg italic font-medium text-foreground/90">
                       &quot;No adivinamos el futuro. Lo programamos.&quot;
                     </p>
                  </div>
               </div>
            </motion.div>

          </div>

          {/* VALORES CORE */}
          <section className="mb-32">
            <div className="text-center mb-16">
               <h3 className="text-3xl font-bold mb-4">El Código de Conducta</h3>
               <p className="text-muted-foreground">Los principios innegociables que guían cada commit.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                 { title: "Transparencia", desc: "Sin cajas negras. Entiendes lo que pagas y cómo funciona.", icon: Shield },
                 { title: "Pragmatismo", desc: "Soluciones reales para problemas reales. Cero sobre-ingeniería.", icon: Zap },
                 { title: "Excelencia", desc: "Calidad artesanal. Si no está bien hecho, no se entrega.", icon: Sparkles },
                 { title: "Colaboración", desc: "Tu equipo y el nuestro son uno solo durante el proyecto.", icon: Users },
                 { title: "Innovación", desc: "Siempre un paso adelante en el stack tecnológico.", icon: Eye },
                 { title: "Impacto", desc: "Medimos el éxito en ROI, no en líneas de código.", icon: Target }
               ].map((v, i) => (
                 <motion.div 
                    key={v.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-8 rounded-3xl border border-border/50 bg-card/30 hover:bg-card hover:border-primary/30 transition-all group"
                 >
                    <v.icon className="w-8 h-8 text-primary/80 mb-6 group-hover:scale-110 transition-transform" />
                    <h4 className="text-xl font-bold mb-3">{v.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                 </motion.div>
               ))}
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="py-24 text-center relative overflow-hidden rounded-[3rem] bg-muted/20 border border-border/50">
             <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
             <div className="relative z-10 max-w-2xl mx-auto px-6">
               <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">¿Listo para construir el futuro?</h2>
               <p className="text-lg text-muted-foreground mb-10">
                 Buscas un equipo que entienda tu visión y tenga la capacidad técnica para ejecutarla. Ya nos encontraste.
               </p>
               <Button 
                size="lg" 
                onClick={() => setIsContactOpen(true)}
                className="rounded-full px-10 h-14 text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-all"
               >
                 Iniciar Conversación <ArrowRight className="ml-2 w-5 h-5" />
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
