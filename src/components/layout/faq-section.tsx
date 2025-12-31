import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FaqSection() {
  return (
    <section className="py-24 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Dudas Frecuentes antes de Invertir
          </h2>
          <p className="text-muted-foreground">
            Entendemos que contratar desarrollo de software es una decisión importante. 
            Aquí respondemos con transparencia.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg text-left">
              ¿Por qué invertir en software a medida en lugar de usar Excel o algo genérico?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              Excel es fantástico, pero no escala. Cuando tienes múltiples usuarios editando archivos, versiones conflictivas o datos dispersos, pierdes dinero. 
              Un software a medida centraliza tu información, automatiza reglas de negocio y crece contigo. 
              Lo genérico te obliga a adaptarte a la herramienta; lo hecho a medida se adapta a tu éxito.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg text-left">
              Tengo una pequeña empresa, ¿es esto para mí?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              Absolutamente. No necesitas ser una corporación para beneficiarte de la tecnología. 
              A menudo, una pequeña automatización (como un sistema de pedidos simple o una web profesional) puede 
              duplicar la productividad de un equipo pequeño. Adaptamos el presupuesto y la complejidad a tu etapa actual.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg text-left">
              ¿Qué pasa cuando terminan el proyecto? ¿Me quedo solo?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              Nunca. Creemos en relaciones a largo plazo. Ofrecemos periodos de garantía post-lanzamiento donde corregimos 
              cualquier error sin costo. Después, puedes optar por planes de mantenimiento o, si prefieres, 
              te entregamos toda la documentación y código para que tu equipo interno tome el control. Eres dueño de tu código.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg text-left">
              Tengo un sistema viejo (Legacy) que nadie quiere tocar. ¿Pueden ayudar?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              Somos especialistas en &quot;Software Rescue&quot;. Analizamos tu sistema actual, identificamos los cuellos de botella 
              y proponemos un plan de migración gradual. No siempre es necesario tirarlo todo y empezar de cero; 
              a veces una refactorización estratégica es la solución más rentable.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
