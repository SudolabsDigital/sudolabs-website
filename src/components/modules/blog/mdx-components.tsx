import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  id?: string;
  children?: React.ReactNode;
}

// Simple slugify for client-side ID generation
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

const Heading = ({ as: Component, className, children, ...props }: HeadingProps & { as: 'h1' | 'h2' | 'h3' | 'h4' }) => {
  // Generate ID from children if it's a string, otherwise use provided ID or undefined
  const id = typeof children === 'string' ? slugify(children) : props.id;
  
  return (
    <Component
      id={id}
      className={cn(className)}
      {...props}
    >
      <a href={`#${id}`} className="no-underline hover:underline decoration-primary/30 underline-offset-4 text-inherit">
          {children}
      </a>
    </Component>
  );
};

export const CustomComponents = {
  h1: (props: HeadingProps) => (
    <Heading as="h1" className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <Heading as="h2" className="mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <Heading as="h3" className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h4: (props: HeadingProps) => (
    <Heading as="h4" className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight" {...props} />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn(
        "mt-6 border-l-4 border-primary pl-6 italic text-muted-foreground bg-muted/30 py-4 rounded-r-lg",
        className
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <div className="my-8 rounded-md border bg-muted/50 p-2 shadow-sm">
        <img
            className={cn("rounded-md border border-border/50 w-full", className)}
            alt={alt}
            {...props}
        />
        {alt && (
            <figcaption className="text-center text-sm text-muted-foreground mt-2 italic">
                {alt}
            </figcaption>
        )}
    </div>
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto rounded-lg border shadow-sm">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("m-0 border-t p-0 even:bg-muted", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <div className="relative my-6 rounded-lg border bg-slate-950 p-4 overflow-x-auto shadow-xl dark:border-slate-800">
        <div className="absolute top-3 right-4 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <pre
        className={cn(
            "mt-4 mb-0 overflow-x-auto text-sm leading-relaxed text-slate-50 font-mono",
            className
        )}
        {...props}
        />
    </div>
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
      const isExternal = href?.startsWith("http");
      if (isExternal) {
          return (
              <a 
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors", className)}
                {...props}
              />
          )
      }
      return (
          <Link
            href={href || "#"}
            className={cn("font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors", className)}
            {...props}
          />
      )
  }
};