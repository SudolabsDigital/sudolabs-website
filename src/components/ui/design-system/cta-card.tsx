import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { TechButton } from './tech-button';

interface CtaCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  description: string;
  tag?: string;
  buttonText: string;
  href?: string;
  imageSrc?: string;
  onClick?: () => void;
}

export function CtaCard({
  title,
  description,
  tag,
  buttonText,
  href,
  imageSrc,
  onClick,
  className,
  ...props
}: CtaCardProps) {
  const Content = (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full h-full relative z-20 p-8 md:p-12">
      {/* Left Column: Text Content */}
      <div className="flex-1 text-left">
        {tag && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#004481]/10 text-[#004481] border border-[#004481]/20 text-xs font-bold uppercase tracking-wider mb-6 w-fit shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#004481]" /> {tag}
          </div>
        )}
        <h2 className="font-extrabold text-slate-900 tracking-tighter leading-[1.1] mb-6 text-3xl md:text-5xl lg:text-6xl">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl mb-8 font-normal">
          {description}
        </p>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <TechButton
            variant="primary"
            size="xl"
            onClick={onClick}
            iconRight={<ArrowRight className="w-6 h-6" />}
            className="w-full sm:w-auto shadow-lg"
          >
            {buttonText}
          </TechButton>
          <p className="text-xs text-slate-500 font-mono font-medium">
            Respuesta en &lt; 2 horas
          </p>
        </div>
      </div>

      {/* Right Column: Optional Side Image Graphic */}
      {imageSrc && (
        <div className="shrink-0 w-full lg:w-1/3 aspect-[4/3] relative rounded-2xl overflow-hidden border-2 border-slate-200/90 bg-slate-100 shadow-md">
          <Image 
            src={encodeURI(imageSrc)}
            alt={typeof title === 'string' ? title : "Call to action image"}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        </div>
      )}
    </div>
  );

  const containerClasses = cn(
    "relative rounded-[2rem] isolate group/cta block",
    className
  );

  const InnerWrapper = (
    <div className="relative z-10 w-full h-full rounded-[1.9rem] bg-white/90 border border-slate-200/90 shadow-xl flex items-center overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-full bg-[#004481]/5 blur-[90px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4 z-0" />
      {Content}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={containerClasses} onClick={onClick}>
        {InnerWrapper}
      </Link>
    );
  }

  return (
    <div className={containerClasses} {...props}>
      {InnerWrapper}
    </div>
  );
}