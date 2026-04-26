import { NextImage } from "@/components/ui/NextImage";
import { cn } from "@/lib/cn";

type Props = {
  name: string;
  role: string;
  reviews: number;
  imageSrc?: string;
  isBestEmployee?: boolean;
  className?: string;
};

function reviewWord(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 19) return "отзывов";
  if (mod10 === 1) return "отзыв";
  if (mod10 >= 2 && mod10 <= 4) return "отзыва";
  return "отзывов";
}

export function BarberCard({
  name,
  role,
  reviews,
  imageSrc,
  isBestEmployee = false,
  className,
}: Props) {
  return (
    <div className={cn("group flex flex-col gap-4", className)}>
      {/* Photo */}
      <div className="relative aspect-[3/4] overflow-hidden bg-bg-secondary">
        {imageSrc ? (
          <NextImage
            src={imageSrc}
            alt={name}
            fill
            placeholder="blur"
            className="object-cover transition-transform duration-slow group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="select-none font-display text-display-lg text-fg-muted/20">
              {name[0]}
            </span>
          </div>
        )}

        {isBestEmployee && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-accent px-2 py-0.5 font-mono text-caption uppercase tracking-widest text-accent-fg">
              Лучший сотрудник
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-h4 text-fg-primary">{name}</h3>
        <p className="font-mono text-body-sm text-fg-muted">{role}</p>
        <p className="font-mono text-caption text-fg-muted">
          {reviews}&nbsp;{reviewWord(reviews)}
        </p>
      </div>
    </div>
  );
}
