import { MDXRemote } from 'next-mdx-remote/rsc'
import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import remarkGfm from 'remark-gfm';

const components: MDXComponents = {
  a: (props) => (
    <Link 
      href={props.href as string} 
      className="text-[#004481] font-bold underline decoration-[#004481]/30 underline-offset-4 hover:decoration-[#004481] transition-colors" 
      {...props} 
    />
  ),
  img: (props) => (
    <div className="my-10 relative">
       <Image 
         src={props.src as string} 
         alt={props.alt as string} 
         width={1200} 
         height={675}
         className="rounded-2xl border border-slate-200/90 shadow-md w-full h-auto"
         style={{ objectFit: 'contain' }}
       />
       {props.title && <p className="text-center text-sm text-slate-500 mt-3 italic">{props.title}</p>}
    </div>
  ),
  h1: (props) => <h1 className="text-3xl md:text-4xl font-black mt-12 mb-6 tracking-tight text-slate-900" {...props} />,
  h2: (props) => <h2 className="text-2xl md:text-3xl font-extrabold mt-12 mb-5 text-slate-900 tracking-tight border-b border-slate-200/80 pb-2" {...props} />,
  h3: (props) => <h3 className="text-xl md:text-2xl font-bold mt-8 mb-4 text-slate-900 tracking-tight" {...props} />,
  h4: (props) => <h4 className="text-lg font-bold mt-6 mb-3 text-slate-900" {...props} />,
  p: (props) => <p className="leading-relaxed [&:not(:first-child)]:mt-6 text-slate-700 text-lg font-normal" {...props} />,
  strong: (props) => <strong className="font-bold text-slate-900" {...props} />,
  em: (props) => <em className="italic text-slate-800" {...props} />,
  ul: (props) => <ul className="my-6 ml-6 list-disc marker:text-[#004481] [&>li]:mt-2 text-slate-700 text-lg" {...props} />,
  ol: (props) => <ol className="my-6 ml-6 list-decimal marker:text-[#004481] marker:font-bold [&>li]:mt-2 text-slate-700 text-lg" {...props} />,
  li: (props) => <li className="pl-2" {...props} />,
  blockquote: (props) => (
    <blockquote className="mt-8 mb-8 border-l-4 border-[#004481] pl-6 italic text-slate-700 bg-slate-50 border border-slate-200/80 py-4 pr-4 rounded-r-xl shadow-sm" {...props} />
  ),
  hr: (props) => <hr className="my-12 border-slate-200" {...props} />,
  table: (props) => (
    <div className="my-8 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-slate-100 text-slate-900 font-bold" {...props} />,
  tbody: (props) => <tbody className="divide-y divide-slate-200" {...props} />,
  tr: (props) => <tr className="hover:bg-slate-50 transition-colors" {...props} />,
  th: (props) => <th className="px-4 py-3 text-left font-bold" {...props} />,
  td: (props) => <td className="px-4 py-3 align-top text-slate-700" {...props} />,
  // Code block inline
  code: (props) => <code className="bg-[#004481]/10 px-2 py-0.5 rounded text-sm font-mono text-[#004481] font-bold" {...props} />,
  pre: (props) => (
    <pre className="my-8 overflow-x-auto rounded-xl border border-slate-200 bg-[#0d1117] p-4 shadow-lg text-slate-100" {...props} />
  ),
}

export function MDXContent({ source }: { source: string }) {
  return (
    // `article-content` aquí y no en el consumidor: la regla de medida de
    // lectura es `.article-content > :is(p, ul, ...)`, y este div es el padre
    // directo de los elementos MDX. Ponerla fuera no aplicaría nada.
    <div className="max-w-none font-sans article-content">
      <MDXRemote 
        source={source} 
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm]
          }
        }}
      />
    </div>
  )
}
