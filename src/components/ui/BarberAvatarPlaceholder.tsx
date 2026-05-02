/**
 * BarberAvatarPlaceholder
 *
 * Брендированная заглушка до поступления реальных фотографий мастеров.
 *
 * ⚠️  [КРИТИЧЕСКИЙ БЛОКЕР] — Требуется фотосессия мастеров.
 *     Вопрос Q6 и Q8 в CLAUDE.md §9 (открытые вопросы к заказчику).
 *     Этот компонент должен быть заменён на <NextImage> после получения фото.
 *     Инициирует фото-сессию: Айрат → фотограф, см. ROADMAP BAR-XX.
 *
 * Дизайн-решения:
 *  - 2-буквенные инициалы (МА, ВЯ, СА…) — уникальны для всех 10 мастеров
 *  - Fraunces display font, opacity 30% — editorial, не-заглушечный вид
 *  - Тонкая вертикальная navy-линия слева — брендовый акцент
 *  - «ФОТО» бейдж снизу-справа — маркирует статус ожидания
 */

import { cn } from "@/lib/cn";

type Props = {
  name: string;
  className?: string;
  /** compact: для маленьких аватаров (≤120px высоты) — уменьшает инициалы */
  compact?: boolean;
};

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  const first = words[0];
  const second = words[1];
  if (first && second) {
    return ((first[0] ?? "") + (second[0] ?? "")).toUpperCase();
  }
  // Одно слово: первые 2 символа (Марат → МА, Джим → ДЖ)
  return name.slice(0, 2).toUpperCase();
}

export function BarberAvatarPlaceholder({ name, className, compact = false }: Props) {
  const initials = getInitials(name);

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center bg-bg-secondary",
        className,
      )}
      role="img"
      aria-label={`Фото ${name} — ожидается`}
    >
      {/* Navy accent — левая грань */}
      <div className="absolute left-0 top-0 h-full w-px bg-accent/25" aria-hidden="true" />

      {/* Инициалы — editorial placeholder */}
      <span
        className={cn(
          "select-none font-display font-normal leading-none tracking-tight text-fg-muted/30",
          compact ? "text-3xl" : "text-5xl md:text-6xl",
        )}
        aria-hidden="true"
      >
        {initials}
      </span>

      {/* Маркер ожидания фото — убрать этот элемент при подключении реального фото */}
      {/* [BLOCKER] Удалить после получения фото от заказчика (Q6/Q8) */}
      <div
        className="absolute bottom-2 right-2"
        aria-hidden="true"
        title={`Фотография ${name} ожидается`}
      >
        <span
          className={cn(
            "border border-border-default bg-bg-primary/70 px-1.5 py-px",
            "font-mono uppercase tracking-widest text-fg-subtle backdrop-blur-sm",
            compact ? "text-[9px]" : "text-[10px]",
          )}
        >
          ФОТО
        </span>
      </div>
    </div>
  );
}
