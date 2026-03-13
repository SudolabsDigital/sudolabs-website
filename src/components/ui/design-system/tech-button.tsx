'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'laser' | 'shimmer' | 'neo' | 'outline' | 'ghost-tech' | 'primary';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface TechButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  isMonospace?: boolean;
}

export function TechButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  isLoading = false,
  disabled = false,
  iconLeft,
  iconRight,
  className,
  type = 'button',
  isMonospace = false,
}: TechButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const btnRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!btnRef.current || variant !== 'laser') return;
    const bounds = btnRef.current.getBoundingClientRect();
    btnRef.current.style.setProperty('--mouse-x', `${e.clientX - bounds.left}px`);
    btnRef.current.style.setProperty('--mouse-y', `${e.clientY - bounds.top}px`);
  };

  const sizes = {
    sm: "h-9 px-4 text-xs",
    md: "h-11 px-6 text-sm",
    lg: "h-13 px-8 text-base",
    xl: "h-16 px-10 text-lg",
  };

  const baseStyles = cn(
    "relative inline-flex items-center justify-center font-bold transition duration-300 select-none overflow-hidden",
    disabled || isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
    isMonospace && "font-mono tracking-tighter uppercase",
    sizes[size],
    className
  );

  const variants = {
    primary: "bg-primary text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/20 active:scale-95",
    
    outline: "bg-transparent border border-border text-foreground rounded-lg hover:border-primary/50 hover:bg-primary/5 active:scale-95",
    
    'ghost-tech': "bg-transparent text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary active:scale-95",
    
    neo: cn(
      "bg-background border-2 border-foreground text-foreground rounded-none shadow-[4px_4px_0px_0px_theme(colors.primary.DEFAULT)]",
      "hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_theme(colors.primary.DEFAULT)]",
      "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
    ),

    shimmer: cn(
      "bg-slate-950 text-white rounded-xl border border-white/10",
      "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
      "hover:bg-slate-900 active:scale-95"
    ),

    laser: cn(
      "bg-card text-foreground rounded-xl p-[1px] overflow-visible group/laser",
      "hover:-translate-y-0.5 transition-transform"
    )
  };

  const innerContent = (
    <div className={cn(
      "relative z-10 flex items-center justify-center gap-2 w-full h-full",
      variant === 'laser' && "bg-card px-6 rounded-[11px]"
    )}>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {iconLeft && <span className="shrink-0">{iconLeft}</span>}
          {children}
          {iconRight && (
            <motion.span 
              className="shrink-0"
              initial={false}
              animate={isHovered ? { x: 3 } : { x: 0 }}
            >
              {iconRight}
            </motion.span>
          )}
        </>
      )}
    </div>
  );

  const mainElement = (
    <div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(baseStyles, variants[variant])}
    >
      {/* LASER SPECIFIC EFFECTS */}
      {variant === 'laser' && isHovered && (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-100 rounded-xl"
            style={{
              background: `radial-gradient(120px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), var(--color-brand-core, #3178c6) 0%, var(--color-ts-blue, #65318d) 50%, transparent 100%)`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 z-[-1] opacity-50 blur-md rounded-xl"
            style={{
              background: `radial-gradient(100px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), var(--color-brand-core, #3178c6) 0%, var(--color-ts-blue, #65318d) 50%, transparent 100%)`,
            }}
          />
        </>
      )}

      {innerContent}
    </div>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className="contents">
        {mainElement}
      </Link>
    );
  }

  return (
    <button 
      type={type} 
      onClick={disabled || isLoading ? undefined : onClick}
      className="contents"
    >
      {mainElement}
    </button>
  );
}
