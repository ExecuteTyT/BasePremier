import { PortableText, type PortableTextBlock } from "@portabletext/react";
import type { ReactNode } from "react";

const components = {
  block: {
    normal: ({ children }: { children?: ReactNode }) => (
      <p className="font-sans text-[1.125rem] leading-[1.7] text-fg-muted">{children}</p>
    ),
    h2: ({ children }: { children?: ReactNode }) => (
      <h2 className="mt-6 font-display font-normal text-[1.375rem] leading-tight text-fg-primary">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: ReactNode }) => (
      <h3 className="mt-8 font-display font-normal text-[1.25rem] leading-tight text-fg-primary">
        {children}
      </h3>
    ),
    blockquote: ({ children }: { children?: ReactNode }) => (
      <blockquote className="border-l-2 border-accent pl-6 font-sans italic text-fg-muted">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: ReactNode }) => (
      <strong className="font-normal text-fg-primary">{children}</strong>
    ),
    em: ({ children }: { children?: ReactNode }) => (
      <em className="italic text-fg-muted">{children}</em>
    ),
  },
};

export function PortableTextContent({ content }: { content: PortableTextBlock[] }) {
  return (
    <div className="space-y-6">
      <PortableText value={content} components={components} />
    </div>
  );
}
