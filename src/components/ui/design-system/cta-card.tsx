'use client';

import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { TechButton } from './tech-button';

interface CtaCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  description: string;
  tag?: string;
  buttonText: string;
  href?: string;
  onClick?: () => void;
}

export function CtaCard({
  title,
  description,
  tag,
  buttonText,
  href,
  onClick,
  className,
  ...props
}: CtaCardProps) {
  const [visible, setVisible] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!divRef.current) return;
    const bounds = divRef.current.getBoundingClientRect();
    divRef.current.style.setProperty('--mouse-x', `${e.clientX - bounds.left}px`);
    divRef.current.style.setProperty('--mouse-y', `${e.clientY - bounds.top}px`);
  };

  const Content = (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 w-full h-full">
      {/* Left Column: Text Content */}
      <div className="flex-1 text-left">
        {tag && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3 h-3" /> {tag}
          </div>
        )}
        <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tighter leading-[1.1] mb-6">
          {title}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
          {description}
        </p>
      </div>

      {/* Right Column: Action Zone */}
      <div className="shrink-0 flex flex-col items-center lg:items-end gap-4 w-full lg:w-auto">
        <TechButton
          variant="primary"
          size="xl"
          onClick={onClick}
          iconRight={<ArrowRight className="w-6 h-6" />}
          className="w-full lg:w-auto"
        >
          {buttonText}
        </TechButton>
        <p className="text-sm text-muted-foreground font-medium italic opacity-70">
          Respuesta garantizada en menos de 2h
        </p>
      </div>
    </div>
  );

  const containerClasses = cn(
    "relative rounded-[2rem] p-[2px] overflow-visible group/cta transition duration-500",
    className
  );

  const InnerWrapper = (
    <>
      {/* Spotlight Effect (Laser and Shadow) */}
      {visible && (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-100 rounded-[2rem]"
            style={{
              background: `radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), #3178c6 0%, #65318d 30%, transparent 60%)`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 z-[-1] transition-opacity duration-300 opacity-70 blur-2xl rounded-[2rem]"
            style={{
              background: `radial-gradient(500px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), #3178c6 0%, #65318d 40%, transparent 70%)`,
            }}
          />
        </>
      )}

      {/* Main Surface */}
      <div className="relative z-10 w-full h-full rounded-[1.9rem] p-8 md:p-12 lg:p-16 bg-card border border-border/50 shadow-2xl flex items-center overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-[40%] h-full bg-primary/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />
        
        {Content}
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        // @ts-expect-error ref mismatch with Link component
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className={containerClasses}
        onClick={onClick}
      >
        {InnerWrapper}
      </Link>
    );
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={containerClasses}
      {...props}
    >
      {InnerWrapper}
    </div>
  );
}