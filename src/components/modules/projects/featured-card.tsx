'use client';

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Layers, ShieldCheck, ArrowRight } from "lucide-react"

// Definimos la interfaz aquí o en un archivo types.ts global
export interface ProjectType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  client: string;
  tags: string[];
  image: string;
  link?: string;
  features?: { title: string; desc: string }[];
  isFeatured?: boolean;
  type: 'case_study' | 'lab';
  status: 'implemented' | 'in_progress' | 'prototype';
}

interface FeaturedProjectProps {
  project: ProjectType;
}

export function FeaturedProjectCard({ project }: FeaturedProjectProps) {
  return (
    <div className="grid lg:grid-cols-12 gap-12 items-center mb-32 md:mb-40">
      {/* Content Side */}
      <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col gap-4 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Proyecto Destacado</span>
            <div className="h-px w-full bg-border" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            {project.title} <span className="text-muted-foreground block text-2xl md:text-3xl mt-2">{project.client}</span>
          </h2>
          
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            {project.description}
          </p>

          {/* Renderizado dinámico de características si existen */}
          {project.features && (
            <div className="grid grid-cols-2 gap-6 mb-10">
              {project.features.map((feature, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-foreground font-semibold">
                    <Layers className="w-5 h-5 text-primary" />
                    {feature.title}
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-md bg-secondary/20 text-secondary-foreground text-xs font-medium border border-secondary/20">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Image Side */}
      <div className="lg:col-span-7 order-1 lg:order-2 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-2xl overflow-hidden border border-border/50 bg-card shadow-2xl shadow-primary/5 group"
        >
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
          <Image 
            src={project.image}
            alt={project.title}
            width={1200}
            height={800}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
        {/* Decorative background element */}
        <div className="absolute -inset-4 bg-primary/20 blur-3xl -z-10 opacity-30" />
      </div>
    </div>
  );
}