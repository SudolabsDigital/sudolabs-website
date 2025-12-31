'use client';

import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { ProjectType } from "./featured-card" // Importamos la interfaz compartida

interface ProjectCardProps {
  project: ProjectType;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative rounded-3xl overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
      <div className="aspect-[16/10] relative overflow-hidden bg-muted">
        <Image 
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
        {/* Status Badge */}
        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold border border-border shadow-sm uppercase">
          {project.status === 'in_progress' ? 'En Desarrollo' : project.status === 'prototype' ? 'Prototipo' : 'Implementado'}
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-xl font-bold text-foreground mb-1">{project.title}</h4>
            <span className="text-sm text-primary font-medium">{project.subtitle}</span>
          </div>
          {/* Link Icon / Action */}
          <div className="p-2 rounded-full bg-secondary/10 text-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed flex-grow">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground border border-border px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}