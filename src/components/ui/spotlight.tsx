'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from "@/lib/utils";

export const Spotlight = ({
  className,
  fill = "white",
}: {
  className?: string;
  fill?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Hook call moved to top level
  const background = useMotionTemplate`
    radial-gradient(
      650px circle at ${mouseX}px ${mouseY}px,
      ${fill}20,
      transparent 80%
    )
  `;

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative flex border border-neutral-800 bg-neutral-900 overflow-hidden rounded-xl",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100">
        <motion.div
          className="h-full w-full"
          style={{ background }}
        />
      </div>
      <div className="relative h-full">
        {/* Placeholder for children */}
      </div>
    </div>
  );
};

export const SpotlightBackground = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const [mounted, setMounted] = useState(false);

    const backgroundStyle = useMotionTemplate`
        radial-gradient(
            600px circle at ${mouseX}px ${mouseY}px,
            var(--primary) 15%,
            transparent 80%
        )
    `;

    useEffect(() => {
        setMounted(true);
    }, []);

    function handleMouseMove({
        currentTarget,
        clientX,
        clientY,
    }: React.MouseEvent) {
        const { left, top } = (currentTarget as HTMLElement).getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    if (!mounted) return <div className={className}>{children}</div>;

    return (
        <div 
            className={cn("relative w-full overflow-hidden group", className)}
            onMouseMove={handleMouseMove}
        >
             <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-0"
                style={{
                    background: backgroundStyle,
                    opacity: 0.15 
                }}
            />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
}