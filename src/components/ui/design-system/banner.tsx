import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface CTAAction {
  label: string;
  onClick?: () => void;
  href?: string;
  primary?: boolean;
}

interface BannerProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: CTAAction[];
  backgroundImageUrl?: string;
}

export function Banner({ 
  title, 
  subtitle, 
  actions, 
  backgroundImageUrl, 
  className,
  ...props 
}: BannerProps) {
  return (
    <section 
      className={cn(
        "relative flex flex-col items-center justify-center w-full text-center overflow-hidden",
        "py-20 md:py-32 px-6 rounded-[2.5rem] bg-white border border-slate-200/90 shadow-xl",
        className
      )}
      style={backgroundImageUrl ? {
        backgroundImage: `url('${backgroundImageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
      {...props}
    >
      {/* Fallback Overlay */}
      {backgroundImageUrl && (
        <div className="absolute inset-0 bg-white/85 z-0" />
      )}

      {/* Background dinamico */}
      {!backgroundImageUrl && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#004481]/5 blur-[90px] rounded-full" />
          <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[60%] bg-[#3178c6]/5 blur-[100px] rounded-full" />
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
          {title}
        </h2>
        
        <div className="h-[3px] w-24 bg-gradient-to-r from-[#004481] to-[#3178c6] mb-6 rounded-full" />
        
        {subtitle && (
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
            {subtitle}
          </p>
        )}

        {actions && actions.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className={cn(
                  "flex items-center justify-center h-14 px-8 text-base font-semibold rounded-full transition-colors w-full sm:w-auto",
                  action.primary
                    ? "bg-[#004481] text-white shadow-md border-none"
                    : "bg-white text-slate-900 border border-slate-300 shadow-sm"
                )}
              >
                {action.label}
                {action.primary && (
                  <ArrowRight className="ml-2 w-5 h-5 text-white" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}