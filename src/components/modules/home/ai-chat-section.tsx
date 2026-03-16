import Image from 'next/image';
import { AiChatInterface } from './ai-chat-interface';

export function AiChatSection() {
  return (
    <section className="py-24 bg-background text-foreground relative overflow-hidden border-t border-border">
      
      {/* Background Glows (Auras) - SSR */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10 mx-auto max-w-[1400px]">
        {/* Header - SSR Crítico para SEO */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
            Hablemos de tu Proyecto
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            ¿Tienes una idea? Debian, nuestra Tech Lead, está lista para discutir la viabilidad técnica y darte un primer feedback.
          </p>
        </div>

        {/* MAIN CARD CONTAINER */}
        <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row h-[85vh] lg:h-[600px]">
          
          {/* LEFT PANEL: DEBIAN PROFILE (SSR) */}
          <div className="h-[25%] lg:h-full lg:w-[30%] bg-card border-b lg:border-b-0 lg:border-r border-border flex flex-col relative overflow-hidden group">
            {/* Abstract Tech Background */}
            <div className="absolute inset-0 opacity-10" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-ts-blue) 1px, transparent 0)', backgroundSize: '24px 24px' }} 
            />

            {/* Character Container */}
            <div className="relative flex-1 flex flex-col justify-end">
              <div className="absolute inset-0 w-full h-full">
                <Image 
                  src="/assets/debian.webp" 
                  alt="Debian Tech Lead" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>
              
              {/* Info Overlay */}
              <div className="relative z-10 p-6 bg-gradient-to-t from-background via-background/80 to-transparent pt-32 flex flex-col justify-end h-full">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 bg-success rounded-full animate-pulse" />
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground tracking-tight">Debian</h3>
                </div>
                <p className="text-primary text-xs lg:text-sm font-medium mb-1 lg:mb-4">Tech Lead & Solutions Architect</p>
                
                <div className="hidden lg:block text-xs text-muted-foreground leading-relaxed italic border-l-2 border-primary/30 pl-3">
                  &quot;No escribo código sin propósito. Vamos a construir algo que escale.&quot;
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: CHAT INTERFACE (Cliente) */}
          <AiChatInterface />

        </div>
      </div>
    </section>
  );
}
