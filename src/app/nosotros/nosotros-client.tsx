'use client';

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Target, Eye, Shield, Sparkles, Zap, Users, ArrowRight } from "lucide-react"
import dynamic from "next/dynamic"
import PageHero from "@/components/ui/page-hero"
import { CtaCard } from "@/components/ui/design-system/cta-card"
import { TeamMeta } from "@/lib/mdx-utils"

const ContactModal = dynamic(() => import("@/components/features/contact-modal").then(mod => mod.ContactModal), {
  ssr: false,
})

export default function NosotrosPage({ team = [] }: { team?: TeamMeta[] }) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <PageHero 
        title="Ingeniería con Propósito."
        subtitle="Manifiesto Sudolabs"
        description="En Sudolabs, no solo escribimos código. Construimos la infraestructura digital que permite a las empresas ambiciosas escalar sin límites."
        imageSrc="/assets/images/hero-nosotros.webp"
        size="compact"
        breadcrumbs={[{ label: "Nosotros" }]}
      />

      <div className="flex-1 pt-24 pb-24 relative z-10">
        <section className="container mx-auto px-6 max-w-6xl">

          {/* MISIÓN & VISIÓN: GRID EDITORIAL ORIGINAL */}
          <div className="grid md:grid-cols-2 gap-8 mb-32">
            
            {/* MISIÓN */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 md:p-12 rounded-[2.5rem] bg-white/90 border border-slate-200/90 shadow-sm transition group relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-12 opacity-5">
                  <Target className="w-48 h-48 text-[#004481]" />
               </div>
               
               <div className="relative z-10">
                  <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#004481] mb-6 block">Nuestra Misión</span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                    Democratizar la <br/> Alta Ingeniería
                  </h2>
                  <p className="text-slate-600 text-lg leading-relaxed mb-8 font-normal">
                    Queremos que empresas de cualquier tamaño accedan a tecnología de nivel enterprise. Código limpio, arquitecturas escalables y seguridad bancaria no deberían ser exclusivos de las grandes corporaciones.
                  </p>
                  <ul className="space-y-3">
                    {["Calidad sin compromisos", "Transparencia radical", "Resultados medibles"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                        <div className="h-2 w-2 rounded-full bg-[#004481]" />
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
              className="p-10 md:p-12 rounded-[2.5rem] bg-white/90 border border-slate-200/90 shadow-sm transition group relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-12 opacity-5">
                  <Eye className="w-48 h-48 text-[#004481]" />
               </div>

               <div className="relative z-10">
                  <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#004481] mb-6 block">Nuestra Visión</span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                    El Estándar de <br/> Confianza Técnica
                  </h2>
                  <p className="text-slate-600 text-lg leading-relaxed mb-8 font-normal">
                    Nos visualizamos como el socio técnico definitivo para la región. Cuando una empresa piensa en &quot;escalar&quot;, queremos que piense en Sudolabs como sinónimo de solidez y futuro.
                  </p>
                  <div className="pl-6 border-l-2 border-[#004481]/40 py-2">
                     <p className="text-lg italic font-medium text-slate-800">
                       &quot;No adivinamos el futuro. Lo programamos.&quot;
                     </p>
                  </div>
               </div>
            </motion.div>

          </div>

          {/* VALORES CORE */}
          <section className="mb-32">
            <div className="text-center mb-16">
               <h3 className="text-3xl font-extrabold text-slate-900 mb-4">El Código de Conducta</h3>
               <p className="text-slate-600 text-lg">Los principios innegociables que guían cada commit.</p>
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
                    className="p-8 rounded-3xl border border-slate-200/90 bg-white/90 shadow-sm transition group"
                 >
                    <v.icon className="w-8 h-8 text-[#004481] mb-6" />
                    <h4 className="text-xl font-bold text-slate-900 mb-3">{v.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">{v.desc}</p>
                 </motion.div>
               ))}
            </div>
          </section>

          {/* PUENTE AL EQUIPO */}
          {team.length > 0 && (
            <section className="mb-32">
              <div className="text-center mb-12">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#004481] mb-4 block">
                  Quiénes lo firmamos
                </span>
                <h3 className="text-3xl font-extrabold text-slate-900 mb-4">El equipo detrás</h3>
                <p className="text-slate-600 text-lg">
                  Nada de esto lo escribe una marca. Lo escriben dos personas con nombre.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {team.map((member) => (
                  <Link
                    key={member.slug}
                    href={`/equipo/${member.slug}`}
                    className="group flex items-center gap-5 p-5 rounded-3xl border border-slate-200/90 bg-white/90 shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className="relative h-20 w-20 shrink-0 rounded-2xl overflow-hidden bg-gradient-to-b from-slate-50 to-[#004481]/10 border border-slate-200/80">
                      {member.image && (
                        <Image
                          src={member.image}
                          alt={member.fullName}
                          fill
                          sizes="80px"
                          className="object-cover object-top"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#004481] transition-colors">
                        {member.fullName}
                      </h4>
                      <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-[#004481] leading-tight">
                        {member.role}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-10 text-center">
                <Link
                  href="/equipo"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#004481] text-white font-bold uppercase tracking-wider text-xs shadow-sm hover:bg-[#003366] transition-colors"
                >
                  Conocer al equipo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>
          )}

          {/* FINAL CTA - STANDARDIZED */}
          <div className="mt-16">
            <CtaCard
              tag="Partnership a Largo Plazo"
              title="¿Listo para construir el futuro?"
              description="Buscas un equipo que entienda tu visión y tenga la capacidad técnica para ejecutarla. Ya nos encontraste."
              buttonText="Iniciar Conversación"
              onClick={() => setIsContactOpen(true)}
              imageSrc="/assets/images/Control de Stock.webp"
            />
          </div>
        </section>
      </div>
          
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} defaultSubject="Hablemos de Nosotros" />
    </>
  )
}
