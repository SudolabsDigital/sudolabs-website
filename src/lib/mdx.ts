import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content");

export type MdxMeta = {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags?: string[];
  [key: string]: string | string[] | boolean | number | undefined | unknown;
};

export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

export const getContentBySlug = async (type: "blog" | "projects", slug: string) => {
  const filePath = path.join(contentDirectory, type, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return {
    meta: { ...data, slug } as MdxMeta,
    content,
  };
};

export const getAllContent = async (type: "blog" | "projects") => {
  const dirPath = path.join(contentDirectory, type);
  if (!fs.existsSync(dirPath)) return [];

  const files = fs.readdirSync(dirPath);
  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const filePath = path.join(dirPath, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);
      return { ...data, slug } as MdxMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
};

export const getPostsByTag = async (tagSlug: string) => {
  const allPosts = await getAllContent("blog");
  return allPosts.filter((post) => {
    if (!post.tags) return false;
    const slugifiedTags = post.tags.map((t) => slugify(t));
    return slugifiedTags.includes(tagSlug);
  });
};

export const getAllTags = async () => {
  const posts = await getAllContent("blog");
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

export const getPostsBySlugs = async (slugs: string[]) => {
  const allPosts = await getAllContent("blog");
  return allPosts.filter((post) => slugs.includes(post.slug));
};
