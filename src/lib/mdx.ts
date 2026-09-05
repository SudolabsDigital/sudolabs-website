import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogMeta, slugify } from "./mdx-utils";

/** Tipos de contenido que viven en `src/content`. */
export type ContentType = "blog" | "projects" | "legal" | "team";


export * from "./mdx-utils";

const contentDirectory = path.join(process.cwd(), "src/content");

// Busca `{basename}.svg` o `{basename}.webp` (en ese orden) dentro de
// public/assets/projects/{slug}/ y devuelve la ruta pública si existe.
const findProjectAsset = (slug: string, basename: string): string | undefined => {
  for (const ext of ["svg", "webp"]) {
    const publicPath = `/assets/projects/${slug}/${basename}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", publicPath))) {
      return publicPath;
    }
  }
  return undefined;
};

// Ver la nota en la llamada: solo `blog` hereda portada por convención de nombre.
const resolveImage = (type: ContentType, slug: string, declared?: string): string | undefined => {
  if (type !== "blog") return declared;
  const imagePath = `/assets/images/blogs/${slug}.webp`;
  return fs.existsSync(path.join(process.cwd(), "public", imagePath)) ? imagePath : declared;
};

export const getAllContent = async <T extends BlogMeta>(
  type: ContentType
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
      
      // Auto-asigna la portada desde la carpeta de blogs. Restringido a `blog`
      // a propósito: antes se aplicaba a CUALQUIER tipo, así que un archivo
      // suelto en `images/blogs/` con el mismo slug secuestraba la imagen de un
      // proyecto o de un perfil sin dar ningún error. Verificado antes de
      // acotarlo: projects y legal declaran todos su `image`, y no hay ninguna
      // colisión de nombres, así que el cambio no altera nada existente.
      const finalImage = resolveImage(type, slug, data.image);

      // Auto-assign client/product logo if it exists in public/assets/projects/{slug}/
      const finalLogo = type === "projects" ? findProjectAsset(slug, "logo") ?? data.logo : data.logo;

      // Auto-assign an associated/partner logo (e.g. parent institution) if present
      const finalPartnerLogo = type === "projects" ? findProjectAsset(slug, "partner-logo") ?? data.partnerLogo : data.partnerLogo;

      return { ...data, slug, image: finalImage, logo: finalLogo, partnerLogo: finalPartnerLogo } as unknown as T;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return items;
};

export const getContentBySlug = async <T extends BlogMeta>(
  type: ContentType,
  slug: string
): Promise<{ meta: T; content: string } | null> => {
  const filePath = path.join(contentDirectory, type, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  const finalImage = resolveImage(type, slug, data.image);

  // Auto-assign client/product logo if it exists in public/assets/projects/{slug}/
  const finalLogo = type === "projects" ? findProjectAsset(slug, "logo") ?? data.logo : data.logo;

  // Auto-assign an associated/partner logo (e.g. parent institution) if present
  const finalPartnerLogo = type === "projects" ? findProjectAsset(slug, "partner-logo") ?? data.partnerLogo : data.partnerLogo;

  return {
    meta: { ...data, slug, image: finalImage, logo: finalLogo, partnerLogo: finalPartnerLogo } as unknown as T,
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
