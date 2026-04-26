"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

const REVIEWS = [
  {
    text: "Долго не мог найти барбера под себя — обошёл несколько заведений в Казани. В BASE Premier с первого визита понял: это то, что нужно. Марат работает методично, без спешки. Результат — именно то, что хотел.",
    date: "Сентябрь 2025",
  },
  {
    text: "Был на стрижке с бородой. Час двадцать — и оба ушли с правильными пропорциями. Атмосфера в зале особенная: тихо, без лишних разговоров, всё по делу.",
    date: "Август 2025",
  },
  {
    text: "Сделал маникюр и стрижку одновременно — в четыре руки. За час сделали всё. Такого сервиса в Казани раньше не встречал.",
    date: "Октябрь 2025",
  },
  {
    text: "Интерьер сам по себе впечатляет. Пришёл к Сайоду — доволен результатом и отношением. Буду возвращаться регулярно.",
    date: "Ноябрь 2025",
  },
  {
    text: "Приятно, что мастер сам предложил, что подойдёт под форму лица, а не стриг «как попросили». Результат держится больше трёх недель.",
    date: "Декабрь 2025",
  },
] as const;

const INTERVAL_MS = 7000;
const ease = [0.19, 1, 0.22, 1] as const;

export function ReviewsSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const isPaused = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setIndex(next);
  }, []);

  const prev = useCallback(() => {
    goTo((index - 1 + REVIEWS.length) % REVIEWS.length, -1);
  }, [index, goTo]);

  const next = useCallback(() => {
    goTo((index + 1) % REVIEWS.length, 1);
  }, [index, goTo]);

  // Auto-advance
  useEffect(() => {
    const tick = () => {
      if (!isPaused.current) next();
    };
    timerRef.current = setTimeout(tick, INTERVAL_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
  };

  return (
    <section className="bg-bg-primary py-24 md:py-32">
      <div className="mx-auto max-w-screen-xl px-6 md:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 md:mb-16">
          <h2 className="font-mono text-[14px] uppercase tracking-[0.2em] text-fg-muted">Отзывы</h2>
          <div className="flex items-center gap-2">
            <span className="text-fg-primary" aria-label="5 звёзд из 5">
              ★★★★★
            </span>
            <a
              href="https://yandex.ru/maps/org/base_premier"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "font-mono text-[14px] text-fg-muted",
                "border-b border-fg-muted/30 pb-px",
                "transition-[border-color,color] duration-base",
                "hover:border-fg-primary hover:text-fg-primary",
              )}
            >
              5.0 на Яндекс.Картах · 394 отзыва
            </a>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => {
            isPaused.current = true;
          }}
          onMouseLeave={() => {
            isPaused.current = false;
          }}
          onTouchStart={() => {
            isPaused.current = true;
          }}
          onTouchEnd={() => {
            isPaused.current = false;
          }}
        >
          {/* Card */}
          <div className="overflow-hidden bg-bg-secondary p-8 md:p-16">
            <AnimatePresence mode="wait" custom={direction}>
              {(() => {
                const review = REVIEWS[index];
                if (!review) return null;
                return (
                  <motion.div
                    key={index}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease }}
                    className="flex flex-col gap-8"
                  >
                    <blockquote>
                      <p
                        className={cn(
                          "font-display italic font-normal leading-snug text-fg-primary",
                          "text-[clamp(1.125rem,2.5vw,1.5rem)]",
                          "max-w-[48rem]",
                        )}
                      >
                        «{review.text}»
                      </p>
                    </blockquote>
                    <footer className="font-mono text-[12px] uppercase tracking-widest text-fg-muted">
                      Клиент BASE Premier · {review.date}
                    </footer>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>

          {/* Arrow buttons (desktop) */}
          <div className="mt-6 hidden items-center justify-between md:flex">
            <div className="flex gap-3">
              <button
                onClick={prev}
                aria-label="Предыдущий отзыв"
                className={cn(
                  "flex h-10 w-10 items-center justify-center",
                  "border border-border-default text-fg-muted",
                  "transition-[border-color,color] duration-base",
                  "hover:border-fg-muted/40 hover:text-fg-primary",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg-primary",
                )}
              >
                ←
              </button>
              <button
                onClick={next}
                aria-label="Следующий отзыв"
                className={cn(
                  "flex h-10 w-10 items-center justify-center",
                  "border border-border-default text-fg-muted",
                  "transition-[border-color,color] duration-base",
                  "hover:border-fg-muted/40 hover:text-fg-primary",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg-primary",
                )}
              >
                →
              </button>
            </div>

            {/* Dots */}
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Переключение отзывов"
            >
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Отзыв ${i + 1}`}
                  onClick={() => goTo(i, i > index ? 1 : -1)}
                  className={cn(
                    "h-1 rounded-none transition-[width,background-color] duration-base",
                    i === index ? "w-6 bg-fg-primary" : "w-2 bg-fg-muted/30 hover:bg-fg-muted/60",
                  )}
                />
              ))}
            </div>
          </div>

          {/* Mobile dots */}
          <div className="mt-6 flex items-center justify-center gap-2 md:hidden">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                aria-label={`Отзыв ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i, i > index ? 1 : -1)}
                className={cn(
                  "h-1 rounded-none transition-[width,background-color] duration-base",
                  i === index ? "w-6 bg-fg-primary" : "w-2 bg-fg-muted/30",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
