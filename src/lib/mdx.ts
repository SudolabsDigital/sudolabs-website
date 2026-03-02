import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogMeta, slugify } from "./mdx-utils";


export * from "./mdx-utils";

const contentDirectory = path.join(process.cwd(), "src/content");

export const getAllContent = async <T extends BlogMeta>(
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
      
      // Auto-assign image if it exists in public/assets/images/blogs/
      const imagePath = `/assets/images/blogs/${slug}.webp`;
      const publicImagePath = path.join(process.cwd(), "public", imagePath);
      const finalImage = fs.existsSync(publicImagePath) ? imagePath : data.image;

      return { ...data, slug, image: finalImage } as T;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return items;
};

export const getContentBySlug = async <T extends BlogMeta>(
  type: "blog" | "projects",
  slug: string
): Promise<{ meta: T; content: string } | null> => {
  const filePath = path.join(contentDirectory, type, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  // Auto-assign image if it exists in public/assets/images/blogs/
  const imagePath = `/assets/images/blogs/${slug}.webp`;
  const publicImagePath = path.join(process.cwd(), "public", imagePath);
  const finalImage = fs.existsSync(publicImagePath) ? imagePath : data.image;

  return {
    meta: { ...data, slug, image: finalImage } as T,
    content,
  };
};

export const getAllTags = async () => {
  const posts = await getAllContent<BlogMeta>("blog");
  const tags = new Set<string>();
  
  posts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).map((tag) => ({
    name: tag,
    slug: slugify(tag),
    count: posts.filter((p) => p.tags?.includes(tag)).length,
  }));
};

export const getAllCategories = async () => {
  const posts = await getAllContent<BlogMeta>("blog");
  const categories = new Set<string>();

  posts.forEach((post) => {
    if (post.category) categories.add(post.category);
  });

  return Array.from(categories).map((cat) => ({
    name: cat,
    slug: slugify(cat),
    count: posts.filter((p) => p.category === cat).length,
  }));
};

export const getPostsByTag = async (tagSlug: string) => {
  const posts = await getAllContent<BlogMeta>("blog");
  return posts.filter((post) => 
    post.tags?.some((t) => slugify(t) === tagSlug)
  );
};

export const getPostsBySlugs = async (slugs: string[]) => {
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
