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
}

export type MdxMeta = BlogMeta | ProjectMeta;

export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};
