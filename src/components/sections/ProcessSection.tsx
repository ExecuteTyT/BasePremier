"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import { CharReveal } from "@/components/motion/CharReveal";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";

const STEPS = [
  {
    index: "01",
    title: "Час, а не 30 минут",
    body: "Большинство барбершопов выделяют 30 минут на стрижку. Мы — час. В этот час входит детокс кожи головы, мытьё, стрижка по структуре волос, моделирование, укладка и завершающее парфюмирование. В среднем — в два раза больше работы.",
  },
  {
    index: "02",
    title: "Профессиональная косметика, а не один шампунь",
    body: "В нашем зале на полках — Graham Hill, Davines, The London Grooming Co и Solomon's. Шампунь для тонких волос, шампунь для жирной кожи головы, тоник с никотиновой кислотой, восемь видов укладочных средств. Под вашу структуру волос мы подбираем средство, а не используем универсальное.",
  },
  {
    index: "03",
    title: "Десять мастеров, не один универсал",
    body: "В нашем зале десять мастеров. Каждый — со своим почерком и любимыми техниками. Если ваша задача — fade с короткими висками и длинной макушкой, к Сайоду вы попадёте быстрее, чем к универсальному мастеру в массмаркете. Мы не назначаем мастера автоматически — вы выбираете.",
  },
  {
    index: "04",
    title: "Тишина, а не open space",
    body: "В нашем зале — пять рабочих мест и десять минут между визитами. Вы не сидите рядом с другим клиентом «локоть в локоть», вас не отвлекает разговор соседа, и мастер не торопится — он работает с вашими волосами, а не «успевает до следующего».",
  },
] as const;

const ease = [0.19, 1, 0.22, 1] as const;

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    // Set section height so the sticky inner div has enough room to scroll
    const setHeight = () => {
      const scrollDist = cards.scrollWidth - window.innerWidth;
      section.style.height = `calc(100vh + ${scrollDist}px)`;
    };
    setHeight();

    const ctx = gsap.context(() => {
      // No pin: true — CSS sticky handles the "stuck" visual, GSAP just drives x
      gsap.to(cards, {
        x: () => -(cards.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${cards.scrollWidth - window.innerWidth}`,
          scrub: 1,
          invalidateOnRefresh: true,
          onRefresh: setHeight,
        },
      });
    }, section);

    return () => {
      ctx.revert();
      section.style.height = "";
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-bg-primary py-24 md:py-0">
      {/* Mobile: vertical list */}
      <div className="mx-auto max-w-screen-xl px-6 md:hidden">
        <h2 className="mb-7 font-mono text-[14px] uppercase tracking-[0.2em] text-fg-muted">
          Процесс
        </h2>
        <div className="flex flex-col gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
            >
              <StepCard step={step} />
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease, delay: STEPS.length * 0.08 }}
          >
            <CtaCard />
          </motion.div>
        </div>
      </div>

      {/* Desktop: sticky wrapper + GSAP horizontal scroll */}
      <div className="sticky top-0 hidden h-screen overflow-hidden md:flex md:flex-col md:justify-center">
        {/* Eyebrow */}
        <div className="px-7 pb-6">
          <CharReveal
            as="h2"
            className="font-mono text-[14px] uppercase tracking-[0.2em] text-fg-muted"
          >
            Процесс
          </CharReveal>
        </div>

        {/* Scrolling cards row */}
        <div ref={cardsRef} className="flex items-stretch gap-6 pl-7">
          {STEPS.map((step) => (
            <div key={step.index} className="w-[min(880px,85vw)] flex-shrink-0">
              <StepCard step={step} desktop />
            </div>
          ))}
          <div className="w-[min(560px,70vw)] flex-shrink-0">
            <CtaCard desktop />
          </div>
          {/* Right padding sentinel */}
          <div className="w-7 flex-shrink-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

type StepCardProps = {
  step: (typeof STEPS)[number];
  desktop?: boolean;
};

function CtaCard({ desktop = false }: { desktop?: boolean }) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between bg-accent",
        desktop ? "h-[min(600px,55vh)] p-16" : "p-8",
      )}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-fg/50">
        Убедились?
      </p>
      <div className="flex flex-col gap-6">
        <p
          className={cn(
            "font-display font-normal leading-tight text-accent-fg",
            desktop ? "text-[clamp(2.5rem,4vw,4rem)]" : "text-[2rem]",
          )}
        >
          Запишитесь онлайн — займёт меньше минуты
        </p>
        <button
          data-yclients-open
          className={cn(
            "self-start border border-accent-fg/40 px-7 py-3",
            "font-mono text-[13px] uppercase tracking-[0.12em] text-accent-fg",
            "transition-[background-color,border-color] duration-base",
            "hover:border-accent-fg hover:bg-accent-fg/10",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-fg",
          )}
        >
          Записаться
        </button>
      </div>
    </div>
  );
}

function StepCard({ step, desktop = false }: StepCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 bg-bg-secondary",
        desktop ? "h-[min(600px,55vh)] p-16 justify-between" : "p-8",
      )}
    >
      {/* Index — decorative only, hidden from assistive technology */}
      <span
        aria-hidden="true"
        className={cn(
          "font-display italic font-normal leading-none select-none text-fg-primary/35",
          desktop ? "text-[9rem]" : "text-[5rem]",
        )}
      >
        {step.index}
      </span>

      {/* Text block */}
      <div className="flex flex-col gap-4 max-w-[640px]">
        <h3
          className={cn(
            "font-sans font-medium uppercase tracking-[0.05em] text-fg-primary",
            desktop ? "text-[1.5rem]" : "text-[1.125rem]",
          )}
        >
          {step.title}
        </h3>
        <p
          className={cn(
            "font-sans leading-relaxed text-fg-muted",
            desktop ? "text-[1.125rem]" : "text-body",
          )}
        >
          {step.body}
        </p>
      </div>
    </div>
  );
}
