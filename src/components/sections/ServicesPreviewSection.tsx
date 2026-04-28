"use client";

import { motion } from "framer-motion";
import NextLink from "next/link";

import { CharReveal } from "@/components/motion/CharReveal";
import { cn } from "@/lib/cn";
import { formatPriceFrom } from "@/lib/format";

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

export function ServicesPreviewSection() {
  return (
    <section className="bg-bg-primary py-24 md:py-32">
      <div className="mx-auto max-w-screen-xl px-6 md:px-8">
        {/* Header row */}
        <div className="mb-12 flex items-end justify-between md:mb-16">
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
        <div
          className={cn(
            "-mx-6 flex gap-4 overflow-x-auto px-6 pb-4",
            "snap-x snap-mandatory",
            "md:mx-0 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0 md:pb-0 md:snap-none",
          )}
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={card.index}
              className="w-[240px] flex-shrink-0 snap-start md:w-auto"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.1 }}
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
  return (
    <NextLink
      href={href}
      className={cn(
        "group flex h-[320px] flex-col justify-between p-8 md:h-[360px]",
        "bg-bg-secondary",
        "border border-border-default",
        "transition-[border-color,box-shadow] duration-slow ease-[var(--ease-out-quart)]",
        "hover:border-accent hover:shadow-[0_32px_64px_rgba(27,42,78,0.2)]",
      )}
    >
      {/* Top */}
      <div className="flex flex-col gap-4">
        <span
          className={cn(
            "font-display italic font-normal leading-none select-none",
            "text-[3.5rem] text-fg-primary/20",
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
            "font-sans text-body-sm text-fg-muted",
            "-translate-x-2 opacity-0",
            "transition-[opacity,transform] duration-base",
            "group-hover:translate-x-0 group-hover:opacity-100",
          )}
          aria-hidden="true"
        >
          →
        </span>
      </div>
    </NextLink>
  );
}
