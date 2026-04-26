import { cn } from "@/lib/cn";
import { formatDuration, formatPrice, formatPriceFrom, formatPriceRange } from "@/lib/format";

type Props = {
  name: string;
  duration: number;
  price: number | [number, number];
  from?: boolean;
  category?: string;
  className?: string;
};

export function ServiceCard({ name, duration, price, from = false, category, className }: Props) {
  const priceStr = Array.isArray(price)
    ? formatPriceRange(price[0], price[1])
    : from
      ? formatPriceFrom(price)
      : formatPrice(price);

  return (
    <div
      className={cn(
        "group flex items-start justify-between gap-6",
        "border-t border-border-default py-5",
        "transition-[border-color] duration-base",
        "hover:border-fg-muted/30",
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        <span className="font-sans text-body text-fg-primary">{name}</span>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
          <span className="font-mono text-caption text-fg-muted">{formatDuration(duration)}</span>
          {category && (
            <span className="font-mono text-caption uppercase tracking-widest text-fg-muted">
              {category}
            </span>
          )}
        </div>
      </div>
      <span className="flex-shrink-0 font-mono text-body-sm text-fg-primary">{priceStr}</span>
    </div>
  );
}
