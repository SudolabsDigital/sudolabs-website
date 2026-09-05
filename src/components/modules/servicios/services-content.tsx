'use client';

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Rocket, ShoppingCart, Building2, Wrench, 
  CheckCircle2, ArrowRight, BarChart3, Users, 
  Smartphone, ShieldCheck, Clock
} from "lucide-react"
import dynamic from "next/dynamic"
import PageHero from "@/components/ui/page-hero"
import { FloatingCard } from "@/components/ui/design-system/card"
import { CtaCard } from "@/components/ui/design-system/cta-card"
import { cn } from "@/lib/utils"

const ContactModal = dynamic(() => import("@/components/features/contact-modal").then(mod => mod.ContactModal), {
  ssr: false,
})

const featuresImpact = [
  { metric: "80%", label: "del software a medida queda huérfano en su primer año. Nosotros garantizamos continuidad." },
  { metric: "15+ hrs", label: "semanales que recupera tu equipo al automatizar procesos manuales repetitivos." },
  { metric: "S/ 100", label: "al mes es suficiente para mantener tu sistema activo, seguro y con soporte continuo." },
  { metric: "1 solo", label: "partner tecnológico para todo: diseño, desarrollo, nube, SUNAT, mantenimiento." }
]

const diagLevels = [
  {
    icon: <Rocket className="w-8 h-8 text-emerald-500" />,
    title: "Emprendedor digital",
    desc: "Tengo un negocio o idea y necesito existir en internet con autoridad. Todavía no tengo sistema.",
    level: "Nivel 01 → Presencia",
    tagColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
  },
  {
    icon: <ShoppingCart className="w-8 h-8 text-violet-500" />,
    title: "Negocio en operación",
    desc: "Vendo, agendo o gestiono clientes manualmente. Quiero que mi equipo tenga autonomía digital.",
    level: "Nivel 02 → Plataformas",
    tagColor: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20"
  },
  {
    icon: <Building2 className="w-8 h-8 text-amber-500" />,
    title: "Empresa o institución",
    desc: "Operamos con Excel, papel o sistemas obsoletos. Necesitamos un sistema de gestión serio.",
    level: "Nivel 03 → Ingeniería core",
    tagColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
  },
  {
    icon: <Wrench className="w-8 h-8 text-blue-500" />,
    title: "Ya tengo un sistema",
    desc: "Tengo software, pero nadie lo mantiene, actualiza o escala. Necesito un partner que lo tome.",
    level: "Nivel 04 → Continuidad",
    tagColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
  }
]

export function ServicesContent() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <PageHero
        title="Tu equipo no debería gastar horas en tareas que un sistema hace en segundos."
        subtitle="Ingeniería de software B2B"
        description="Convertimos procesos manuales, hojas de Excel y sistemas obsoletos en infraestructura digital que opera tu negocio mientras tú te enfocas en crecer. Sin agencias que desaparecen después de entregar."
        imageSrc="/assets/images/hero-servicios.webp"
        breadcrumbs={[{ label: "Servicios" }]}
      />      

      <div className="relative z-10 bg-transparent">
        
        {/* IMPACT ROW */}
        <section className="bg-white/80 backdrop-blur-md shadow-sm">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              {featuresImpact.map((item, i) => (
                <div key={i} className="py-10 px-4 text-center md:text-left flex flex-col justify-center">
                  <div className="text-4xl md:text-5xl font-extrabold tracking-tighter text-[#004481] mb-4">{item.metric}</div>
                  <div className="text-sm text-slate-600 leading-relaxed font-medium">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DIAGNOSTICO */}
        <section className="py-16 md:py-20 container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">¿En qué etapa está tu empresa?</h2>
            <p className="text-slate-600 text-lg font-normal">Identifica tu situación actual y te mostramos exactamente qué necesitas.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {diagLevels.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/90 border border-slate-200/90 shadow-sm rounded-3xl p-8 flex flex-col"
              >
                <div className="mb-6 p-4 rounded-2xl bg-slate-100 w-fit">{item.icon}</div>
                <h4 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-8 flex-grow font-normal">{item.desc}</p>
                <div className={cn("inline-flex items-center px-4 py-1.5 rounded-full border text-xs font-bold w-fit", item.tagColor)}>
                  {item.level}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* MODELO: LOS 4 PILARES */}
        <section className="py-16 md:py-20 bg-transparent">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="mb-16 md:text-center max-w-3xl mx-auto">
              <span className="text-[#004481] font-mono font-bold uppercase tracking-widest text-xs mb-4 block">Modelo de servicios</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">Cuatro niveles de madurez digital</h2>
              <p className="text-slate-600 text-lg leading-relaxed font-normal">No vendemos proyectos cerrados. Construimos con una arquitectura que crece junto a tu empresa. Empiezas donde estás.</p>
            </div>

            <div className="space-y-12">
              
              {/* PILAR 1 */}
              <div className="bg-background border border-border rounded-[2rem] overflow-hidden shadow-sm">
                <div className="p-8 lg:p-12 lg:pb-10 flex flex-col lg:flex-row gap-8 items-start">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-2xl shrink-0">01</div>
                  <div className="flex-grow">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4">Presencia e Identidad Digital</h3>
                    <p className="text-muted-foreground leading-relaxed max-w-3xl text-lg">Para emprendedores y PYMES que necesitan existir en internet con autoridad desde el primer día. Alta velocidad de despliegue con arquitecturas base probadas en producción.</p>
                  </div>
                  <div className="shrink-0 lg:text-right w-full lg:w-auto p-6 lg:p-0 bg-secondary/30 lg:bg-transparent rounded-2xl lg:rounded-none">
                    <div className="text-xl font-bold mb-1">S/ 600 – S/ 1,200</div>
                    <div className="text-sm text-muted-foreground mb-4">Pago único · Sin mensualidad</div>
                    <div className="inline-flex items-center gap-2 text-xs font-medium bg-background lg:bg-secondary/50 border border-border px-3 py-1.5 rounded-full text-foreground/80">
                      <Clock className="w-3.5 h-3.5 text-emerald-500" /> Entrega en 5–10 días
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border border-t border-border">
                  <div className="bg-background p-8 lg:p-12">
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Qué incluye</div>
                    <ul className="space-y-4">
                      {["Landing page de captación de leads", "Sitio corporativo con SEO técnico", "Diseño responsivo (mobile-first)", "Integración Meta Pixel / GA4", "Dominio + hosting el primer año", "Preparada para escalar a CMS"].map((li, i) => (
                        <li key={i} className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> {li}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-background p-8 lg:p-12">
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Tecnología detrás</div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["Next.js", "React", "Tailwind CSS", "Vercel", "PostgreSQL"].map((t) => (
                        <span key={t} className="text-xs font-medium border border-border bg-secondary/50 px-3 py-1.5 rounded-full">{t}</span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">Usamos Next.js porque genera páginas estáticas ultrarrápidas con carga inferior a 1 segundo. Vercel garantiza disponibilidad del 99.9% sin servidores físicos.</p>
                  </div>
                  <div className="bg-background p-8 lg:p-12">
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Impacto en tu negocio</div>
                    <div className="space-y-4">
                      <div className="p-5 rounded-2xl bg-card border border-border/50 border-l-4 border-l-emerald-500">
                        <div className="font-bold text-foreground mb-1">+3x leads</div>
                        <div className="text-sm text-muted-foreground leading-relaxed">Una landing page optimizada con CTA claro convierte hasta 3 veces más que un perfil social.</div>
                      </div>
                      <div className="p-5 rounded-2xl bg-card border border-border/50 border-l-4 border-l-blue-500">
                        <div className="font-bold text-foreground mb-1">Día 1 en Google</div>
                        <div className="text-sm text-muted-foreground leading-relaxed">Estructura SEO técnica desde el inicio. Empieza a indexar desde que salimos al aire.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PILAR 2 */}
              <div className="bg-background border border-border rounded-[2rem] overflow-hidden shadow-sm">
                <div className="p-8 lg:p-12 lg:pb-10 flex flex-col lg:flex-row gap-8 items-start">
                  <div className="w-16 h-16 rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-2xl shrink-0">02</div>
                  <div className="flex-grow">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4">Plataformas y Autogestión</h3>
                    <p className="text-muted-foreground leading-relaxed max-w-3xl text-lg">Para negocios que ya venden o atienden clientes y necesitan operar sin depender de nosotros para cada cambio. Tu equipo toma el control del sistema.</p>
                  </div>
                  <div className="shrink-0 lg:text-right w-full lg:w-auto p-6 lg:p-0 bg-secondary/30 lg:bg-transparent rounded-2xl lg:rounded-none">
                    <div className="text-xl font-bold mb-1">S/ 1,500 – S/ 4,000+</div>
                    <div className="text-sm text-muted-foreground mb-4">Variable según módulos</div>
                    <div className="inline-flex items-center gap-2 text-xs font-medium bg-background lg:bg-secondary/50 border border-border px-3 py-1.5 rounded-full text-foreground/80">
                      <Clock className="w-3.5 h-3.5 text-violet-500" /> Entrega en 3–6 semanas
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border border-t border-border">
                  <div className="bg-background p-8 lg:p-12">
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Qué incluye</div>
                    <ul className="space-y-4">
                      {["Panel de administración propio", "E-commerce con pasarela de pago", "Sistema de citas / reservas", "Base de datos con roles de usuario", "Dashboard de ventas", "Notificaciones automáticas (email/WA)"].map((li, i) => (
                        <li key={i} className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" /> {li}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-background p-8 lg:p-12">
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Tecnología detrás</div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["Laravel", "Next.js", "PostgreSQL", "AWS", "Culqi API", "WhatsApp API"].map((t) => (
                        <span key={t} className="text-xs font-medium border border-border bg-secondary/50 px-3 py-1.5 rounded-full">{t}</span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">Laravel en el backend por su madurez empresarial. PostgreSQL para datos relacionales. Arquitectura AWS para que tus datos sean escalables.</p>
                  </div>
                  <div className="bg-background p-8 lg:p-12">
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Impacto en tu negocio</div>
                    <div className="space-y-4">
                      <div className="p-5 rounded-2xl bg-card border border-border/50 border-l-4 border-l-emerald-500">
                        <div className="font-bold text-foreground mb-1">−8 hrs/semana</div>
                        <div className="text-sm text-muted-foreground leading-relaxed">Eliminas la coordinación manual de pedidos, confirmaciones y catálogos.</div>
                      </div>
                      <div className="p-5 rounded-2xl bg-card border border-border/50 border-l-4 border-l-amber-500">
                        <div className="font-bold text-foreground mb-1">Tu equipo manda</div>
                        <div className="text-sm text-muted-foreground leading-relaxed">No nos necesitas para agregar un producto o servicio nuevo. Lo haces tú.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PILAR 3 */}
              <div className="bg-background border border-border rounded-[2rem] overflow-hidden shadow-sm">
                <div className="p-8 lg:p-12 lg:pb-10 flex flex-col lg:flex-row gap-8 items-start">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-2xl shrink-0">03</div>
                  <div className="flex-grow">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4">Ingeniería y Sistemas Core</h3>
                    <p className="text-muted-foreground leading-relaxed max-w-3xl text-lg">Para empresas que operan procesos críticos: control de personal, inventarios, reportes oficiales. Reemplazamos Excel con arquitectura seria.</p>
                  </div>
                  <div className="shrink-0 lg:text-right w-full lg:w-auto p-6 lg:p-0 bg-secondary/30 lg:bg-transparent rounded-2xl lg:rounded-none">
                    <div className="text-xl font-bold mb-1">S/ 5,000 – S/ 15,000+</div>
                    <div className="text-sm text-muted-foreground mb-4">Consultoría a medida</div>
                    <div className="inline-flex items-center gap-2 text-xs font-medium bg-background lg:bg-secondary/50 border border-border px-3 py-1.5 rounded-full text-foreground/80">
                      <Clock className="w-3.5 h-3.5 text-amber-500" /> 2–4 meses según alcance
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border border-t border-border">
                  <div className="bg-background p-8 lg:p-12">
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Qué incluye</div>
                    <ul className="space-y-4">
                      {["ERP modular: RRHH, inventarios", "Control de roles y jerarquías (ACL)", "Integración con SUNAT / OSE", "Auditoría de acciones (logs completos)", "Reportes oficiales en PDF", "Migración de datos desde Excel"].map((li, i) => (
                        <li key={i} className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /> {li}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-background p-8 lg:p-12">
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Tecnología detrás</div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["Laravel", "Next.js", "PostgreSQL", "AWS RDS", "SUNAT API", "PDF Engine"].map((t) => (
                        <span key={t} className="text-xs font-medium border border-border bg-secondary/50 px-3 py-1.5 rounded-full">{t}</span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">Arquitectura modular: cada área es independiente y se conecta al núcleo. Si en 2 años agregas un departamento, no se reescribe nada.</p>
                  </div>
                  <div className="bg-background p-8 lg:p-12">
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Impacto en tu negocio</div>
                    <div className="space-y-4">
                      <div className="p-5 rounded-2xl bg-card border border-border/50 border-l-4 border-l-emerald-500">
                        <div className="font-bold text-foreground mb-1">−90% errores</div>
                        <div className="text-sm text-muted-foreground leading-relaxed">Eliminas errores de traspaso manual de datos entre Excel y correos.</div>
                      </div>
                      <div className="p-5 rounded-2xl bg-card border border-border/50 border-l-4 border-l-blue-500">
                        <div className="font-bold text-foreground mb-1">Decisiones reales</div>
                        <div className="text-sm text-muted-foreground leading-relaxed">Dashboard en tiempo real con indicadores, sin esperar reportes manuales.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PILAR 4 */}
              <div className="bg-background border-2 border-primary/20 rounded-[2rem] overflow-hidden shadow-md shadow-primary/5">
                <div className="p-8 lg:p-12 lg:pb-10 flex flex-col lg:flex-row gap-8 items-start relative">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-2xl shrink-0">04</div>
                  <div className="flex-grow">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4">Evolución y Continuidad Operativa</h3>
                    <p className="text-muted-foreground leading-relaxed max-w-3xl text-lg"><strong>El seguro de vida de tu software.</strong> Garantizamos que tu sistema nunca se quede obsoleto, no se caiga y siempre tenga a alguien responsable detrás.</p>
                  </div>
                  <div className="shrink-0 lg:text-right w-full lg:w-auto p-6 lg:p-0 bg-secondary/30 lg:bg-transparent rounded-2xl lg:rounded-none">
                    <div className="text-xl font-bold mb-1">S/ 100 – S/ 1,000+</div>
                    <div className="text-sm text-muted-foreground mb-4">Mensual · Sin contrato forzoso</div>
                    <div className="inline-flex items-center gap-2 text-xs font-medium bg-background lg:bg-secondary/50 border border-primary/30 px-3 py-1.5 rounded-full text-foreground/80">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> Cobertura desde el día 1
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border border-y border-border">
                  <div className="bg-background p-8 lg:p-12">
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Qué incluye</div>
                    <ul className="space-y-4">
                      {["Monitoreo 24/7 de uptime", "Backups automáticos diarios", "Parches de seguridad", "Bolsa de horas para mejoras", "Renovación SSL y dominio", "Reunión de crecimiento"].map((li, i) => (
                        <li key={i} className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /> {li}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-background p-8 lg:p-12">
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Tecnología detrás</div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["AWS CloudWatch", "AWS S3 Backup", "Uptime Robot", "GitHub Actions", "SSL/TLS auto"].map((t) => (
                        <span key={t} className="text-xs font-medium border border-border bg-secondary/50 px-3 py-1.5 rounded-full">{t}</span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">Infraestructura gestionada en la nube: no dependes de un servidor físico. Tu base de datos tiene copia diaria en S3.</p>
                  </div>
                  <div className="bg-background p-8 lg:p-12">
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Impacto en tu negocio</div>
                    <div className="space-y-4">
                      <div className="p-5 rounded-2xl bg-card border border-border/50 border-l-4 border-l-emerald-500">
                        <div className="font-bold text-foreground mb-1">99.9% uptime</div>
                        <div className="text-sm text-muted-foreground leading-relaxed">Tu sistema disponible todo el año. Si algo falla, lo corregimos nosotros.</div>
                      </div>
                      <div className="p-5 rounded-2xl bg-card border border-border/50 border-l-4 border-l-blue-500">
                        <div className="font-bold text-foreground mb-1">Cero sorpresas</div>
                        <div className="text-sm text-muted-foreground leading-relaxed">Nadie te llama a las 2am porque el servidor se cayó. Nosotros nos encargamos.</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-foreground text-background p-8 lg:p-12 flex flex-col md:flex-row gap-8 items-center justify-between">
                  <div className="max-w-3xl">
                    <h4 className="text-xl font-bold mb-3">¿Tu software fue construido por otra agencia y te dejaron solo?</h4>
                    <p className="text-base text-background/80 leading-relaxed">Evaluamos tu código, auditamos la infraestructura y tomamos el control del mantenimiento. Si tiene solución, lo continuamos.</p>
                  </div>
                  <button onClick={() => setIsContactOpen(true)} className="shrink-0 bg-background text-foreground font-bold text-sm px-8 py-4 rounded-xl hover:scale-105 transition-transform whitespace-nowrap">
                    Auditar mi sistema →
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* MODULOS DE INGENIERIA */}
        <section className="py-24 container mx-auto px-6 max-w-7xl">
          <div className="mb-16 md:text-center max-w-3xl mx-auto">
            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">Módulos disponibles</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Construye solo lo que tu empresa necesita</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">Cada módulo es independiente y se conecta a tu sistema existente. Activas lo que necesitas hoy y agregas más después.</p>
          </div>

          <div className="space-y-20">
            {/* Categoria 1 */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/10 rounded-xl"><BarChart3 className="text-primary w-6 h-6" /></div>
                <div>
                    <h3 className="text-2xl font-bold">Datos e Inteligencia Operativa</h3>
                    <p className="text-muted-foreground">Para empresas que necesitan dejar de adivinar y decidir con datos.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FloatingCard
                  title="Dashboard BI en tiempo real"
                  description="Tus KPIs más importantes visibles en una pantalla. Ventas, stock, rendimiento, sin esperar reportes en Excel."
                  tag="Nivel 03"
                  interactive={false}
                />
                <FloatingCard
                  title="Gestión de Inventarios"
                  description="Control de stock con alertas de reposición y compatibilidad con códigos de barras."
                  tag="Nivel 03"
                  interactive={false}
                />
                <FloatingCard
                  title="Reportes en PDF Dinámicos"
                  description="Generación automática de documentos con membrete y firma digital en segundos."
                  tag="Nivel 03"
                  interactive={false}
                />
              </div>
            </div>

            {/* Categoria 2 */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/10 rounded-xl"><Users className="text-primary w-6 h-6" /></div>
                <div>
                    <h3 className="text-2xl font-bold">Gestión de Personas y Operaciones</h3>
                    <p className="text-muted-foreground">Para equipos que necesitan coordinación, control y trazabilidad.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FloatingCard
                  title="RRHH y Planillas"
                  description="Asistencia, vacaciones y cálculo de planilla integrado. Gestiona todo el ciclo del colaborador."
                  tag="Nivel 03"
                  interactive={false}
                />
                <FloatingCard
                  title="Portal de Clientes/Proveedores"
                  description="Acceso exclusivo para que clientes revisen pedidos o facturas sin hacerte llamadas."
                  tag="Nivel 02"
                  interactive={false}
                />
                <FloatingCard
                  title="Flujos de Aprobación"
                  description="Solicitudes de compra con niveles configurables y trazabilidad completa de quién autoriza qué."
                  tag="Nivel 03"
                  interactive={false}
                />
              </div>
            </div>

            {/* Categoria 3 */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/10 rounded-xl"><Smartphone className="text-primary w-6 h-6" /></div>
                <div>
                    <h3 className="text-2xl font-bold">Experiencia Digital</h3>
                    <p className="text-muted-foreground">Para negocios que quieren modernizar la atención a sus clientes.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FloatingCard
                  title="App Móvil (iOS/Android)"
                  description="Versión móvil para que tu equipo opere en campo o tus clientes tengan acceso en el bolsillo."
                  tag="Nivel 02"
                  interactive={false}
                />
                <FloatingCard
                  title="Chatbot con IA"
                  description="Atención 24/7 en WhatsApp conectada a tu base de datos para agendar citas o cotizar."
                  tag="Nivel 02"
                  interactive={false}
                />
                <FloatingCard
                  title="Facturación SUNAT"
                  description="Emisión de comprobantes integrada a tu sistema sin doble registro de datos."
                  tag="Nivel 03"
                  interactive={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ANTES / DESPUES */}
        <section className="py-24 bg-card border-y border-border/50">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="mb-16 md:text-center max-w-3xl mx-auto">
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">Casos Reales</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Lo que cambia cuando trabajas con Sudolabs</h2>
              <p className="text-muted-foreground text-lg">Situaciones comunes de los clientes que hemos acompañado.</p>
            </div>
            
            <div className="space-y-6">
              {/* Caso 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-8 items-center">
                <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-3xl h-full flex flex-col justify-center">
                  <div className="text-red-500 text-xs font-bold uppercase tracking-widest mb-4">Situación anterior</div>
                  <p className="font-medium text-foreground/80 leading-relaxed">&quot;Controlamos el inventario en 4 Excel compartidos por WhatsApp. Siempre había versiones distintas y nadie sabía cuál era el real.&quot;</p>
                </div>
                <div className="hidden lg:flex w-12 h-12 rounded-full bg-background border border-border items-center justify-center shrink-0 shadow-sm">
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-3xl h-full flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
                  <div className="text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">Después de Sudolabs</div>
                  <p className="font-medium text-foreground leading-relaxed">Un solo sistema web con historial de movimientos, alertas de stock mínimo y reporte diario automático al gerente.</p>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-6 font-bold tracking-wide flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> −12 horas semanales de coordinación manual eliminadas
                  </div>
                </div>
              </div>

              {/* Caso 2 */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-8 items-center">
                <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-3xl h-full flex flex-col justify-center">
                  <div className="text-red-500 text-xs font-bold uppercase tracking-widest mb-4">Situación anterior</div>
                  <p className="font-medium text-foreground/80 leading-relaxed">&quot;Teníamos un sistema que otra empresa nos hizo hace 3 años. Nadie lo mantiene, ya no funciona con el navegador actual y perdemos datos.&quot;</p>
                </div>
                <div className="hidden lg:flex w-12 h-12 rounded-full bg-background border border-border items-center justify-center shrink-0 shadow-sm">
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-3xl h-full flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
                  <div className="text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">Después de Sudolabs</div>
                  <p className="font-medium text-foreground leading-relaxed">Auditamos el código, migramos la infraestructura a AWS y tomamos el soporte mensual continuo.</p>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-6 font-bold tracking-wide flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Sistema rescatado sin tener que reescribir desde cero
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL STANDARDIZED */}
        <section className="pb-24 pt-24 container mx-auto px-6 max-w-7xl">
          <CtaCard
            tag="Inicia Hoy"
            title="¿Por dónde empezamos?"
            description="Cuéntanos en 2 minutos qué necesitas y te responderemos con una propuesta técnica honesta — sin presiones, sin vendedores."
            buttonText="Agendar Diagnóstico Técnico"
            onClick={() => setIsContactOpen(true)}
            imageSrc="/assets/images/Buscadores Inteligentes.webp"
          />
        </section>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} defaultSubject="Diagnóstico Técnico B2B" />
    </>
  )
}
