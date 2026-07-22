'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'laser' | 'shimmer' | 'neo' | 'aurora' | 'ghost-tech';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface TechButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
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
  fullWidth = false,
  iconLeft,
  iconRight,
  className,
  type = 'button',
  isMonospace = false,
}: TechButtonProps) {

  // Tamaños y padding estandarizados
  const sizes: Record<ButtonSize, string> = {
    sm: "h-9 px-4 text-xs font-semibold gap-1.5",
    md: "h-11 px-5 text-sm font-bold gap-2",
    lg: "h-13 px-7 text-base font-bold gap-2.5",
    xl: "h-16 px-9 text-lg font-extrabold gap-3",
  };

  // Variantes de diseño en Modo Claro Único
  const variants: Record<string, string> = {
    primary: "bg-[#004481] text-white hover:bg-[#003666] border border-[#004481] shadow-sm rounded-xl",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200/80 border border-slate-200 shadow-sm rounded-xl",
    outline: "bg-white text-slate-900 hover:bg-slate-50 border border-slate-300 shadow-sm rounded-xl",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100/80 rounded-xl",
    accent: "bg-[#65318d] text-white hover:bg-[#522575] border border-[#65318d] shadow-sm rounded-xl",
    
    // Alias retrocompatibles
    'ghost-tech': "bg-transparent text-slate-700 hover:bg-slate-100/80 rounded-xl",
    neo: "bg-white border-2 border-slate-900 text-slate-900 rounded-xl shadow-[3px_3px_0px_0px_#004481]",
    shimmer: "bg-[#004481] text-white hover:bg-[#003666] border border-[#004481] shadow-sm rounded-xl",
    laser: "bg-white text-slate-900 hover:bg-slate-50 border border-slate-300 shadow-sm rounded-xl",
    aurora: "bg-[#004481] text-white hover:bg-[#003666] border border-[#004481] shadow-sm rounded-xl"
  };

  const baseStyles = cn(
    "relative inline-flex items-center justify-center font-bold transition duration-200 select-none overflow-hidden cursor-pointer",
    fullWidth ? "w-full" : "w-auto",
    (disabled || isLoading) && "opacity-60 pointer-events-none cursor-not-allowed",
    isMonospace && "font-mono tracking-wider uppercase",
    sizes[size],
    variants[variant] || variants.primary,
    className
  );

  const innerContent = (
    <span className="relative z-10 flex items-center justify-center gap-2">
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0 text-current" />
      ) : (
        <>
          {iconLeft && <span className="shrink-0">{iconLeft}</span>}
          <span>{children}</span>
          {iconRight && <span className="shrink-0">{iconRight}</span>}
        </>
      )}
    </span>
  );

  if (href && !disabled && !isLoading) {
    return (
      <Link href={href} className={baseStyles} onClick={onClick}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button 
      type={type} 
      onClick={disabled || isLoading ? undefined : onClick}
      className={baseStyles}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
    >
      {innerContent}
    </button>
  );
}
