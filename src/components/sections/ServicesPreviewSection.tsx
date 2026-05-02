"use client";

import { motion, useReducedMotion } from "framer-motion";
import NextLink from "next/link";
import { useRef } from "react";

import { CharReveal } from "@/components/motion/CharReveal";
import { cn } from "@/lib/cn";
import { formatPriceFrom } from "@/lib/format";
import { gsap } from "@/lib/gsap";

const CARDS = [
  {
    index: "01",
    title: "Парикмахерский зал",
    description: "Стрижки, моделирование бороды, окантовка и детокс кожи головы — 18 услуг",
    from: 600,
    href: "/services",
  },
  {
    index: "02",
    title: "Бритьё",
    description: "Гладкое бритьё лица или бритьё головы опасной бритвой с горячим компрессом",
    from: 1800,
    href: "/services",
  },
  {
    index: "03",
    title: "Уход за лицом",
    description: "Премиальный уход London Grooming, детокс Graham Hill, скраб и чёрная маска",
    from: 600,
    href: "/services",
  },
  {
    index: "04",
    title: "Ногтевой сервис",
    description: "Мужской маникюр, педикюр гигиенический, массаж рук и стоп",
    from: 500,
    href: "/services",
  },
] as const;

const ease = [0.19, 1, 0.22, 1] as const;
const clipEase = [0.76, 0, 0.24, 1] as const;

export function ServicesPreviewSection() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-bg-primary py-24 md:py-32">
      <div className="mx-auto max-w-screen-xl px-6 md:px-8">
        {/* Header row */}
        <div className="mb-7 flex items-end justify-between md:mb-16">
          <CharReveal
            as="h2"
            className="font-mono text-[14px] uppercase tracking-[0.2em] text-fg-muted"
          >
            Услуги
          </CharReveal>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
          >
            <NextLink
              href="/services"
              className={cn(
                "inline-flex items-center justify-center rounded-none",
                "border border-border-strong bg-transparent",
                "px-5 py-3 font-sans text-sm font-medium tracking-tight text-fg-primary",
                "transition-[background-color,border-color,color] duration-base",
                "hover:border-accent hover:bg-accent hover:text-accent-fg",
                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg-primary",
              )}
            >
              Все услуги →
            </NextLink>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.index}
              className="w-full"
              style={{ perspective: "800px" }}
              initial={reduced ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              whileInView={reduced ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: reduced ? 0.3 : 0.85, ease: clipEase, delay: i * 0.12 }}
            >
              <ServiceCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

type CardProps = {
  index: string;
  title: string;
  description: string;
  from: number;
  href: string;
};

function ServiceCard({ index, title, description, from, href }: CardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  function handleMouseEnter() {
    if (cardRef.current) gsap.set(cardRef.current, { willChange: "transform" });
  }

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    gsap.to(card, {
      rotateX: rx,
      rotateY: ry,
      duration: 0.4,
      ease: "power2.out",
      transformStyle: "preserve-3d",
    });
    if (overlayRef.current) {
      overlayRef.current.style.setProperty(
        "--mx",
        `${((e.clientX - rect.left) / rect.width) * 100}%`,
      );
      overlayRef.current.style.setProperty(
        "--my",
        `${((e.clientY - rect.top) / rect.height) * 100}%`,
      );
    }
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
      clearProps: "willChange",
    });
  }

  return (
    <NextLink
      ref={cardRef}
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative flex min-h-[280px] flex-col justify-between p-6 md:h-[360px] md:p-8",
        "bg-bg-secondary",
        "border border-border-default",
        "transition-[border-color,box-shadow] duration-slow ease-[var(--ease-out-quart)]",
        "hover:border-accent hover:shadow-[0_32px_64px_rgba(27,42,78,0.2)]",
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Specular highlight follows cursor */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(245,245,242,0.06), transparent 70%)",
        }}
      />

      {/* Top */}
      <div className="flex flex-col gap-4">
        <span
          className={cn(
            "font-display italic font-normal leading-none select-none",
            "text-[2.75rem] text-fg-primary/20 md:text-[3.5rem]",
            "transition-[color] duration-base group-hover:text-accent/30",
          )}
        >
          {index}
        </span>
        <div className="flex flex-col gap-2">
          <h3 className="font-sans text-[1rem] font-medium uppercase tracking-wide text-fg-primary">
            {title}
          </h3>
          <p className="font-sans text-body-sm leading-relaxed text-fg-muted">{description}</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex items-end justify-between">
        <span className="font-mono text-caption text-fg-muted">{formatPriceFrom(from)}</span>
        <span
          className={cn(
            "font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted",
            "-translate-x-2 opacity-0",
            "transition-[opacity,transform] duration-base",
            "group-hover:translate-x-0 group-hover:opacity-100",
          )}
          aria-hidden="true"
        >
          Записаться →
        </span>
      </div>
    </NextLink>
  );
}
