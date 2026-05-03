"use client";

import NextLink from "next/link";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";

const LINES = [
  {
    num: "01",
    verb: "Стрижём.",
    desc: "Только мужские стрижки. Каждый мастер — профиль, не набор услуг.",
  },
  {
    num: "02",
    verb: "Ухаживаем.",
    desc: "Борода, кожа, детали. Graham Hill, Davines, Solomon's.",
  },
  {
    num: "03",
    verb: "Заботимся.",
    desc: "О вашем времени: онлайн-запись без очередей.",
  },
];

const QUESTIONS = [
  {
    id: "face",
    label: "Форма лица",
    options: ["Овальная", "Квадратная", "Круглая", "Треугольная"],
  },
  {
    id: "length",
    label: "Длина волос",
    options: ["Короткие", "Средние", "Длинные"],
  },
  {
    id: "style",
    label: "Желаемый стиль",
    options: ["Классика", "Модерн", "Текстура"],
  },
] as const;

type Answers = Partial<Record<string, string>>;

type Recommendation = {
  service: string;
  duration: string;
  price: string;
  note: string;
};

function getRecommendation(answers: Answers): Recommendation {
  const { style, length } = answers;

  if (style === "Модерн") {
    return {
      service: "Стрижка с бородой",
      duration: "1 ч 30 мин",
      price: "3 200 – 4 600 ₽",
      note: "Стрижка и моделирование бороды — одно посещение, полный образ.",
    };
  }
  if (style === "Текстура" && length === "Короткие") {
    return {
      service: "Стрижка машинкой",
      duration: "30 мин",
      price: "1 400 – 2 000 ₽",
      note: "Чистые линии, максимальная свежесть.",
    };
  }
  if (style === "Текстура") {
    return {
      service: "Мужская стрижка",
      duration: "1 ч",
      price: "1 800 – 2 700 ₽",
      note: "Работа с текстурой — специализация наших старших мастеров.",
    };
  }
  return {
    service: "Мужская стрижка",
    duration: "1 ч",
    price: "1 800 – 2 700 ₽",
    note: "Универсальный выбор для первого визита.",
  };
}

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<Recommendation | null>(null);

  const allAnswered = QUESTIONS.every((q) => Boolean(answers[q.id]));

  function handleSelect(id: string, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    if (result) setResult(null);
  }

  function handleSubmit() {
    if (!allAnswered) return;
    setResult(getRecommendation(answers));
  }

  function handleReset() {
    setResult(null);
    setAnswers({});
  }

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const rows = section.querySelectorAll<HTMLElement>(".manifesto-row");
    const footer = section.querySelector<HTMLElement>(".manifesto-footer");
    const rightCol = rightColRef.current;

    const ctx = gsap.context(() => {
      rows.forEach((row) => {
        const num = row.querySelector(".manifesto-num");
        const verb = row.querySelector(".manifesto-verb");
        const desc = row.querySelector(".manifesto-desc");
        const line = row.querySelector(".manifesto-line");

        gsap.set([num, verb, desc], { y: 32, opacity: 0 });
        gsap.set(line, { scaleX: 0, transformOrigin: "left center" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });

        tl.to(line, { scaleX: 1, duration: 0.5, ease: "power2.out" })
          .to(num, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" }, "-=0.3")
          .to(verb, { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" }, "-=0.45")
          .to(desc, { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" }, "-=0.4");
      });

      if (footer) {
        gsap.fromTo(
          footer,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footer,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (rightCol) {
        const advisorItems = rightCol.querySelectorAll<HTMLElement>(".advisor-item");

        gsap.fromTo(
          rightCol,
          { opacity: 0, x: 32 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rightCol,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );

        if (advisorItems.length) {
          gsap.fromTo(
            advisorItems,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.07,
              delay: 0.18,
              scrollTrigger: {
                trigger: rightCol,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            },
          );
        }
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-bg-secondary py-24 md:py-32">
      <div className="mx-auto w-full max-w-screen-xl px-6 md:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_1px_1fr]">
          {/* ─── Left: Manifesto ─── */}
          <div className="lg:pr-16">
            <p className="mb-16 font-mono text-[14px] uppercase tracking-[0.2em] text-fg-muted md:mb-20">
              МЫ ДЕЛАЕМ ТРИ ВЕЩИ
            </p>

            <div className="flex flex-col">
              {LINES.map(({ num, verb, desc }) => (
                <div key={num} className="manifesto-row group relative">
                  <div className="manifesto-line h-px w-full bg-border" />
                  <div className="flex flex-col gap-3 py-8 md:grid md:grid-cols-[3rem_1fr] md:items-start md:gap-x-8 md:py-10">
                    <span className="manifesto-num font-mono text-[11px] tracking-[0.18em] text-fg-muted/50 md:pt-[0.35em]">
                      {num}
                    </span>
                    <div>
                      <p
                        className={cn(
                          "manifesto-verb font-display font-normal text-fg-primary",
                          "text-[clamp(2.75rem,6.5vw,6.5rem)] lg:text-[clamp(1.875rem,3.5vw,4rem)]",
                          "tracking-[-0.04em] leading-none",
                        )}
                      >
                        {verb}
                      </p>
                      <p className="manifesto-desc mt-3 font-sans text-[0.9375rem] leading-relaxed text-fg-muted">
                        {desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="h-px w-full bg-border" />
            </div>

            <p
              className={cn(
                "mt-10 font-display italic font-normal text-fg-primary/25",
                "text-[clamp(1.5rem,3.5vw,3rem)]",
                "tracking-[-0.02em] leading-tight",
              )}
            >
              И ничего больше.
            </p>

            <div className="manifesto-footer mt-12">
              <div className="mb-6 h-px w-16 bg-fg-muted/30" />
              <NextLink
                href="/about"
                className={cn(
                  "font-sans text-body text-fg-muted",
                  "border-b border-fg-muted/30 pb-0.5",
                  "transition-[border-color,color] duration-base",
                  "hover:border-fg-primary hover:text-fg-primary",
                )}
              >
                Манифест и история →
              </NextLink>
            </div>
          </div>

          {/* ─── Vertical Divider (desktop) ─── */}
          <div className="hidden bg-border lg:block" aria-hidden="true" />

          {/* ─── Right: Haircut Advisor ─── */}
          <div
            ref={rightColRef}
            className="mt-16 border-t border-border pt-16 lg:mt-0 lg:border-none lg:pt-0 lg:pl-16"
          >
            {/* Header */}
            <p className="advisor-item font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
              ПОДБОР СТРИЖКИ
            </p>

            <h2
              className={cn(
                "advisor-item mt-4 font-display font-normal text-fg-primary",
                "text-[clamp(1.625rem,2.5vw,2.75rem)]",
                "tracking-[-0.02em] leading-tight",
              )}
            >
              Найдите свой стиль
            </h2>

            <p className="advisor-item mt-3 mb-10 font-sans text-[0.9375rem] leading-relaxed text-fg-muted">
              Три вопроса — персональная рекомендация.
            </p>

            {/* ── Form ── */}
            {result === null && (
              <>
                {QUESTIONS.map((q) => (
                  <div key={q.id} className="advisor-item mb-8">
                    <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-muted">
                      {q.label}
                    </p>
                    <div
                      className="flex flex-wrap gap-x-5 gap-y-2"
                      role="group"
                      aria-label={q.label}
                    >
                      {q.options.map((opt) => {
                        const selected = answers[q.id] === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => handleSelect(q.id, opt)}
                            className={cn(
                              "pb-0.5 font-sans text-[0.9375rem]",
                              "border-b transition-[color,border-color] duration-[200ms]",
                              selected
                                ? "border-fg-primary text-fg-primary"
                                : "border-fg-muted/20 text-fg-muted hover:border-fg-muted/60 hover:text-fg-secondary",
                            )}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div className="advisor-item mt-6">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!allAnswered}
                    className={cn(
                      "font-sans text-[0.8125rem] uppercase tracking-[0.14em]",
                      "border-b pb-0.5 transition-[color,border-color] duration-[200ms]",
                      allAnswered
                        ? "cursor-pointer border-fg-primary text-fg-primary hover:border-fg-muted hover:text-fg-muted"
                        : "cursor-not-allowed border-fg-muted/15 text-fg-muted/40",
                    )}
                  >
                    Подобрать →
                  </button>
                </div>
              </>
            )}

            {/* ── Result ── */}
            {result !== null && (
              <div>
                <div className="mb-8 h-px w-full bg-border" />

                <button
                  type="button"
                  onClick={handleReset}
                  className={cn(
                    "mb-8 block font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted/50",
                    "transition-colors duration-base hover:text-fg-muted",
                  )}
                >
                  ← Изменить ответы
                </button>

                <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-muted">
                  РЕКОМЕНДАЦИЯ
                </p>

                <p
                  className={cn(
                    "font-display font-normal text-fg-primary",
                    "text-[clamp(1.375rem,2vw,2.25rem)]",
                    "tracking-[-0.02em] leading-tight",
                  )}
                >
                  {result.service}
                </p>

                <div className="mt-4 flex items-center gap-5">
                  <span className="font-mono text-[0.875rem] tabular-nums text-fg-muted">
                    {result.duration}
                  </span>
                  <span className="h-3 w-px bg-fg-muted/30" aria-hidden="true" />
                  <span className="font-mono text-[0.875rem] tabular-nums text-fg-secondary">
                    {result.price}
                  </span>
                </div>

                <p className="mt-5 max-w-xs font-sans text-[0.9375rem] leading-relaxed text-fg-muted">
                  {result.note}
                </p>

                <div className="mt-8">
                  <a
                    href="#booking"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={cn(
                      "font-sans text-[0.8125rem] uppercase tracking-[0.14em]",
                      "border-b border-fg-primary pb-0.5 text-fg-primary",
                      "transition-[color,border-color] duration-base",
                      "hover:border-fg-muted hover:text-fg-muted",
                    )}
                  >
                    Записаться →
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
