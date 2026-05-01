"use client";

import { motion } from "framer-motion";
import NextLink from "next/link";
import { useRef, useState } from "react";

import { CharReveal } from "@/components/motion/CharReveal";
import { BarberAvatarPlaceholder } from "@/components/ui/BarberAvatarPlaceholder";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";

const TOP_BARBERS = [
  { slug: "marat", name: "Марат", role: "Старший мастер", reviews: 300 },
  { slug: "vyacheslav", name: "Вячеслав", role: "Мужской парикмахер", reviews: 276 },
  { slug: "sayod", name: "Сайод", role: "Мужской парикмахер", reviews: 239 },
  { slug: "aleksey", name: "Алексей", role: "Мужской парикмахер", reviews: 213 },
  { slug: "timerlan", name: "Тимерлан", role: "Мужской парикмахер", reviews: 177 },
  { slug: "nikolay", name: "Николай", role: "Мужской парикмахер", reviews: 153 },
] as const;

const ease = [0.19, 1, 0.22, 1] as const;

export function BarbersPreviewSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="bg-bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-screen-xl px-6 md:px-8">
        {/* Header */}
        <div className="mb-7 flex items-end justify-between md:mb-16">
          <CharReveal
            as="h2"
            className="font-mono text-[14px] uppercase tracking-[0.2em] text-fg-muted"
          >
            10 мастеров
          </CharReveal>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
          >
            <NextLink
              href="/barbers"
              className={cn(
                "inline-flex items-center justify-center rounded-none",
                "border border-border-strong bg-transparent",
                "px-5 py-3 font-sans text-sm font-medium tracking-tight text-fg-primary",
                "transition-[background-color,border-color,color] duration-base",
                "hover:border-accent hover:bg-accent hover:text-accent-fg",
                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg-primary",
              )}
            >
              Все мастера →
            </NextLink>
          </motion.div>
        </div>

        {/* Avatar row — desktop grid, mobile scroll */}
        <div
          className={cn(
            "-mx-6 flex gap-4 overflow-x-auto px-6 pb-4",
            "snap-x snap-mandatory",
            "md:mx-0 md:grid md:grid-cols-6 md:gap-6 md:overflow-visible md:px-0 md:pb-0 md:snap-none",
          )}
        >
          {TOP_BARBERS.map((barber, i) => (
            <motion.div
              key={barber.slug}
              className="flex-shrink-0 snap-start"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: [24, -4, 0] }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
            >
              <motion.div
                animate={{ opacity: hoveredIdx !== null && hoveredIdx !== i ? 0.35 : 1 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <AvatarCard barber={barber} isHovered={hoveredIdx === i} />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.p
          className={cn(
            "mt-16 font-display italic font-normal",
            "text-[clamp(1.25rem,2.5vw,1.75rem)] leading-snug",
            "text-fg-muted max-w-xl",
          )}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
        >
          «Десять мастеров — каждый со своим почерком.»
        </motion.p>
      </div>
    </section>
  );
}

type AvatarCardProps = {
  barber: (typeof TOP_BARBERS)[number];
  isHovered: boolean;
};

function AvatarCard({ barber, isHovered }: AvatarCardProps) {
  const photoRef = useRef<HTMLDivElement>(null);

  function handleMouseEnter() {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (photoRef.current) gsap.set(photoRef.current, { willChange: "transform" });
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = photoRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    gsap.to(el, {
      rotateX: rx,
      rotateY: ry,
      scale: 1.03,
      duration: 0.35,
      ease: "power2.out",
      transformStyle: "preserve-3d",
    });
  }

  function handleMouseLeave() {
    const el = photoRef.current;
    if (!el) return;
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
      clearProps: "willChange",
    });
  }

  return (
    <NextLink href={`/barbers/${barber.slug}`} className="group flex flex-col gap-3">
      {/* Photo area */}
      <div
        ref={photoRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative overflow-hidden bg-bg-primary",
          "h-[120px] w-[90px] md:h-[160px] md:w-[120px]",
          "border transition-[border-color] duration-base ease-[var(--ease-out-quart)]",
          isHovered ? "border-accent" : "border-border-default",
        )}
        style={{ perspective: "600px", transformStyle: "preserve-3d" }}
      >
        {/* [BLOCKER] Placeholder — заменить на NextImage после получения фото (Q6/Q8) */}
        <BarberAvatarPlaceholder name={barber.name} compact />
      </div>

      {/* Name */}
      <div className="flex flex-col gap-0.5">
        <span
          className={cn(
            "font-sans text-body-sm font-medium",
            "transition-colors duration-base",
            isHovered ? "text-fg-primary" : "text-fg-muted",
          )}
        >
          {barber.name}
        </span>
        <span className="font-mono text-overline uppercase tracking-widest text-fg-muted">
          {barber.reviews}+ отзывов
        </span>
      </div>
    </NextLink>
  );
}
