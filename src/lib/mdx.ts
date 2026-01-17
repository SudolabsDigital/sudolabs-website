import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content");

export interface BaseMdxMeta {
  title: string;
  description: string;
  date: string;
  slug: string;
  image?: string; // Renamed from coverImage to match existing content
}

export interface BlogMeta extends BaseMdxMeta {
  tags?: string[];
  author?: string;
  readTime?: string; // Renamed from readingTime to match content
}

export interface ProjectStat {
  label: string;
  value: string;
}

export interface ProjectMeta extends BaseMdxMeta {
  client?: string;
  industry?: string;
  tags?: string[]; // Kept as 'tags' to match content (represents technologies)
  technologies?: string[]; // Alias or alternative if needed future-wise
  websiteUrl?: string;
  isFeatured?: boolean;
  role?: string; // Added found field
  stats?: ProjectStat[]; // Added found field
  relatedPosts?: string[]; // Added found field
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

export const getContentBySlug = async <T extends BaseMdxMeta>(
  type: "blog" | "projects",
  slug: string
): Promise<{ meta: T; content: string } | null> => {
  const filePath = path.join(contentDirectory, type, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return {
    meta: { ...data, slug } as T,
    content,
  };
};

export const getAllContent = async <T extends BaseMdxMeta>(
  type: "blog" | "projects"
): Promise<T[]> => {
  const dirPath = path.join(contentDirectory, type);
  if (!fs.existsSync(dirPath)) return [];

  const files = fs.readdirSync(dirPath);
  const items = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const filePath = path.join(dirPath, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);
      return { ...data, slug } as T;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return items;
};

export const getPostsByTag = async (tagSlug: string): Promise<BlogMeta[]> => {
  const allPosts = await getAllContent<BlogMeta>("blog");
  return allPosts.filter((post) => {
    if (!post.tags) return false;
    const slugifiedTags = post.tags.map((t) => slugify(t));
    return slugifiedTags.includes(tagSlug);
  });
};

export const getAllTags = async () => {
  const posts = await getAllContent<BlogMeta>("blog");
  const tagsCount: Record<string, number> = {};
  const tagsMap: Record<string, string> = {};

  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        const slug = slugify(tag);
        tagsCount[slug] = (tagsCount[slug] || 0) + 1;
        tagsMap[slug] = tag;
      });
    }
  });

  return Object.entries(tagsCount)
    .map(([slug, count]) => ({
      slug,
      name: tagsMap[slug],
      count,
    }))
    .sort((a, b) => b.count - a.count);
};

export const getPostsBySlugs = async (slugs: string[]): Promise<BlogMeta[]> => {
  const allPosts = await getAllContent<BlogMeta>("blog");
  return allPosts.filter((post) => slugs.includes(post.slug));
};

export const getHeadings = (source: string) => {
  const headingLines = source.split("\n").filter((line) => {
    return line.match(/^###?\s/);
  });

  return headingLines.map((raw) => {
    const text = raw.replace(/^###?\s/, "");
    const level = raw.startsWith("###") ? 3 : 2;
    const id = slugify(text);

    return { text, level, id };
  });
};
