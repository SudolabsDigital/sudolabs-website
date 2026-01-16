import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'src/content');

let cachedContext: string | null = null;

export function getContext() {
  if (cachedContext) {
    return cachedContext;
  }

  try {
    const blogDir = path.join(contentDir, 'blog');
    const projectsDir = path.join(contentDir, 'projects');

    let context = "Información sobre Sudolabs (Proyectos y Artículos):\n\n";

    // Helper to read directory
    const readDir = (dir: string, type: string) => {
      if (!fs.existsSync(dir)) return;
      const files = fs.readdirSync(dir);
      files.forEach((file) => {
        if (file.endsWith('.mdx') || file.endsWith('.md')) {
          const content = fs.readFileSync(path.join(dir, file), 'utf-8');
          context += `--- TIPO: ${type.toUpperCase()} | ARCHIVO: ${file} ---\n${content}\n\n`;
        }
      });
    };

    readDir(blogDir, 'Blog Post');
    readDir(projectsDir, 'Caso de Estudio/Proyecto');

    cachedContext = context;
    return context;
  } catch (error) {
    console.error("Error generating context:", error);
    return "No se pudo cargar el contexto de Sudolabs.";
  }
}
