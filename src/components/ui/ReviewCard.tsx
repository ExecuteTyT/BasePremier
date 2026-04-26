import { cn } from "@/lib/cn";

type Props = {
  author: string;
  text: string;
  rating?: number;
  date?: string;
  source?: "yandex";
  className?: string;
};

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={filled ? "text-fg-primary" : "text-fg-muted/20"}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function ReviewCard({
  author,
  text,
  rating = 5,
  date,
  source = "yandex",
  className,
}: Props) {
  const clampedRating = Math.min(5, Math.max(0, Math.round(rating)));

  return (
    <figure className={cn("flex flex-col gap-4 bg-bg-secondary p-6", className)}>
      {/* Stars */}
      <div
        className="flex items-center gap-0.5"
        role="img"
        aria-label={`Оценка: ${clampedRating} из 5`}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} filled={i < clampedRating} />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="flex-1 text-body text-fg-primary">«{text}»</blockquote>

      {/* Meta */}
      <figcaption className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-caption text-fg-muted">{author}</span>
          {date && <span className="font-mono text-caption text-fg-muted/60">{date}</span>}
        </div>
        {source === "yandex" && (
          <span className="flex-shrink-0 font-mono text-caption text-fg-muted/40">
            Яндекс.Карты
          </span>
        )}
      </figcaption>
    </figure>
  );
}
