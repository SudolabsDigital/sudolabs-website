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

export type MdxMeta = BlogMeta | ProjectMeta;

export { slugify };
