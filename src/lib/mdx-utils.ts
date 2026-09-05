import { slugify } from "./utils";

export interface BaseMdxMeta {
  title: string;
  description: string;
  date: string;
  slug: string;
  image?: string;
}

export interface BlogMeta extends BaseMdxMeta {
  tags?: string[];
  author?: string;
  readTime?: string;
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  featured?: boolean;
  relatedProject?: string;
}

export interface ProjectStat {
  label: string;
  value: string;
}

export interface ProjectMeta extends BaseMdxMeta {
  client?: string;
  industry?: string;
  tags?: string[];
  technologies?: string[];
  websiteUrl?: string;
  isFeatured?: boolean;
  role?: string;
  stats?: ProjectStat[];
  relatedPosts?: string[];
  logo?: string;
  partnerLogo?: string;
  type?: 'cliente' | 'producto-propio';
}

/** Un grupo de competencias del perfil, tal como se agrupan en su CV. */
export interface SkillGroup {
  label: string;
  items: string[];
}

/** Participación de una persona en un proyecto del portafolio. */
export interface TeamProject {
  /** Slug de `src/content/projects`, para poder enlazar al caso de estudio. */
  slug?: string;
  name: string;
  /** Rol concreto de ESTA persona en ESTE proyecto. */
  role: string;
}

export interface TeamMeta extends BaseMdxMeta {
  /** Nombre completo. `title` lleva el nombre corto que se muestra. */
  fullName: string;
  /** Cargo dentro de Sudolabs. */
  role: string;
  /** Frontend · Backend · Fullstack · Diseño: hacia dónde tira el perfil. */
  orientation: string;
  /** Por qué esa orientación. Sale de su CV, no se inventa. */
  focus: string;
  career?: string;
  university?: string;
  /** Orden de aparición en el listado. Menor primero. */
  order?: number;
  /** Si es el perfil destacado del subhero. */
  featured?: boolean;
  location?: string;
  languages?: string[];
  skills?: SkillGroup[];
  projects?: TeamProject[];
  stats?: ProjectStat[];
  links?: {
    github?: string;
    linkedin?: string;
    email?: string;
    website?: string;
  };
}

export type MdxMeta = BlogMeta | ProjectMeta | TeamMeta;

export { slugify };
