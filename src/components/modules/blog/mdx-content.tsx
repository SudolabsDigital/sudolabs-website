import { MDXRemote } from 'next-mdx-remote/rsc'
import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import rehypePrettyCode from 'rehype-pretty-code';

const components: MDXComponents = {
  a: (props) => (
    <Link 
      href={props.href as string} 
      className="text-primary font-medium underline decoration-primary/30 underline-offset-4 hover:decoration-primary transition-colors" 
      {...props} 
    />
  ),
  img: (props) => (
    <div className="my-10">
       <Image 
         src={props.src as string} 
         alt={props.alt as string} 
         width={800} 
         height={450}
         className="rounded-2xl border border-border shadow-sm w-full h-auto"
       />
       {props.title && <p className="text-center text-sm text-muted-foreground mt-3 italic">{props.title}</p>}
    </div>
  ),
  h1: (props) => <h1 className="text-3xl md:text-4xl font-extrabold mt-12 mb-6 tracking-tight text-foreground" {...props} />,
  h2: (props) => <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-5 text-foreground tracking-tight border-b border-border/40 pb-2" {...props} />,
  h3: (props) => <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-foreground tracking-tight" {...props} />,
  h4: (props) => <h4 className="text-lg font-semibold mt-6 mb-3 text-foreground" {...props} />,
  p: (props) => <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground text-lg" {...props} />,
  strong: (props) => <strong className="font-bold text-foreground" {...props} />,
  em: (props) => <em className="italic text-foreground/80" {...props} />,
  ul: (props) => <ul className="my-6 ml-6 list-disc marker:text-primary [&>li]:mt-2 text-muted-foreground text-lg" {...props} />,
  ol: (props) => <ol className="my-6 ml-6 list-decimal marker:text-primary marker:font-bold [&>li]:mt-2 text-muted-foreground text-lg" {...props} />,
  li: (props) => <li className="pl-2" {...props} />,
  blockquote: (props) => (
    <blockquote className="mt-8 mb-8 border-l-4 border-primary pl-6 italic text-muted-foreground bg-muted/30 py-4 pr-4 rounded-r-lg" {...props} />
  ),
  hr: (props) => <hr className="my-12 border-border" {...props} />,
  table: (props) => (
    <div className="my-8 w-full overflow-y-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-muted text-foreground font-semibold" {...props} />,
  tbody: (props) => <tbody className="divide-y divide-border" {...props} />,
  tr: (props) => <tr className="hover:bg-muted/50 transition-colors" {...props} />,
  th: (props) => <th className="px-4 py-3 text-left font-medium" {...props} />,
  td: (props) => <td className="px-4 py-3 align-top text-muted-foreground" {...props} />,
  // Code block inline
  code: (props) => <code className="bg-primary/10 px-[0.3rem] py-[0.1rem] rounded text-sm font-mono text-primary font-semibold" {...props} />,
  pre: (props) => (
    <pre className="my-8 overflow-x-auto rounded-xl border border-border bg-[#0d1117] p-4 shadow-lg" {...props} />
  ),
}

export function MDXContent({ source }: { source: string }) {
  return (
    <div className="max-w-none font-sans">
      <MDXRemote 
        source={source} 
        components={components}
        options={{
          mdxOptions: {
            rehypePlugins: [
              [
                rehypePrettyCode, 
                {
                  theme: 'github-dark',
                  keepBackground: false,
                  defaultLang: 'plaintext',
                }
              ]
            ]
          }
        }}
      />
    </div>
  )
}
