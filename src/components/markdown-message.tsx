import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  OlHTMLAttributes,
} from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-3 last:mb-0 leading-relaxed" {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-5 ml-1 mb-3 space-y-1" {...props} />
  ),
  ol: (props: OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-5 ml-1 mb-3 space-y-1" {...props} />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed ml-1" {...props} />
  ),
  strong: (props: HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold" {...props} />
  ),
  em: (props: HTMLAttributes<HTMLElement>) => (
    <em className="italic" {...props} />
  ),
  a: ({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground underline-animate hover:text-black"
      {...props}
    />
  ),
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code className="bg-accent px-1 py-0.5 text-sm" {...props} />
  ),
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-accent p-3 overflow-x-auto text-sm mb-3" {...props} />
  ),
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="font-semibold mb-2" {...props} />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-semibold mb-2" {...props} />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-semibold mb-2" {...props} />
  ),
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-2 border-border pl-3 text-muted-foreground mb-3"
      {...props}
    />
  ),
  hr: (props: HTMLAttributes<HTMLHRElement>) => (
    <hr className="border-border my-3" {...props} />
  ),
  table: (props: HTMLAttributes<HTMLTableElement>) => (
    <div className="mb-3 overflow-x-auto" data-lenis-prevent>
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="border-b border-border" {...props} />
  ),
  th: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-2 py-1 text-left font-semibold align-top" {...props} />
  ),
  td: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-2 py-1 align-top leading-snug" {...props} />
  ),
};

export function MarkdownMessage({ content }: { content: string }) {
  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
