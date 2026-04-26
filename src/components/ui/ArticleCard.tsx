import NextLink from "next/link";

import { NextImage } from "@/components/ui/NextImage";
import { cn } from "@/lib/cn";

type Props = {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  coverSrc?: string;
  category?: string;
  className?: string;
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("ru-RU", { month: "long", year: "numeric" }).format(new Date(iso));
}

export function ArticleCard({
  title,
  slug,
  publishedAt,
  excerpt,
  coverSrc,
  category,
  className,
}: Props) {
  return (
    <NextLink href={`/journal/${slug}`} className={cn("group flex flex-col gap-4", className)}>
      {/* Cover */}
      <div className="relative aspect-video overflow-hidden bg-bg-secondary">
        {coverSrc && (
          <NextImage
            src={coverSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-slow group-hover:scale-105"
          />
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-2">
        {category && (
          <span className="font-mono text-caption uppercase tracking-widest text-fg-muted">
            {category}
          </span>
        )}
        <h3 className="font-display text-h4 text-fg-primary transition-colors duration-base group-hover:text-fg-muted">
          {title}
        </h3>
        {excerpt && <p className="line-clamp-2 text-body-sm text-fg-muted">{excerpt}</p>}
        <time dateTime={publishedAt} className="font-mono text-caption text-fg-muted/60">
          {formatDate(publishedAt)}
        </time>
      </div>
    </NextLink>
  );
}
