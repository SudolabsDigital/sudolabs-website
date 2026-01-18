import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogMeta, ProjectMeta, BaseMdxMeta, slugify } from "./mdx-utils";


export * from "./mdx-utils";

const contentDirectory = path.join(process.cwd(), "src/content");

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

export const getAllCategories = async () => {
  const posts = await getAllContent<BlogMeta>("blog");
  const categoriesCount: Record<string, number> = {};
  const categoriesMap: Record<string, string> = {};

  posts.forEach((post) => {
    if (post.category) {
      const slug = slugify(post.category);
      categoriesCount[slug] = (categoriesCount[slug] || 0) + 1;
      // Keep the first formatted name found
      if (!categoriesMap[slug]) {
        categoriesMap[slug] = post.category;
      }
    }
  });

  return Object.entries(categoriesCount)
    .map(([slug, count]) => ({
      slug,
      name: categoriesMap[slug],
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