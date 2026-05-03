import NextLink from "next/link";

import { QuizFlow } from "@/components/sections/QuizFlow";

export function QuizSection() {
  return (
    <section className="bg-bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6 md:px-8">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
          Быстрый подбор
        </p>
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <h2
            className="font-display font-normal text-fg-primary"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Подберём услугу за 4 вопроса
          </h2>
          <NextLink
            href="/quiz"
            className="whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.12em] text-fg-muted transition-opacity hover:opacity-70"
          >
            Подобрать подробнее →
          </NextLink>
        </div>
      </div>
      <QuizFlow variant="inline" />
    </section>
  );
}
