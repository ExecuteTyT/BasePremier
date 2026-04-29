"use client";

import { motion } from "framer-motion";
import NextLink from "next/link";

import { cn } from "@/lib/cn";
import { formatDuration, formatPriceFrom, formatPriceRange } from "@/lib/format";

const ease = [0.19, 1, 0.22, 1] as const;

const FEATURED = [
  { name: "Мужская стрижка", duration: 60, price: [1800, 2700] as [number, number] },
  { name: "Стрижка с бородой", duration: 90, price: [3200, 4600] as [number, number] },
  { name: "Моделирование бороды", duration: 30, price: [1400, 1900] as [number, number] },
  { name: "Детская стрижка", duration: 60, price: [1600, 2400] as [number, number] },
  { name: "Мужской маникюр", duration: 60, price: 1900 as number },
  { name: "Стрижка + маникюр", duration: 120, price: [3100, 4000] as [number, number] },
];

function priceLabel(price: number | [number, number]): string {
  return Array.isArray(price) ? formatPriceRange(price[0], price[1]) : formatPriceFrom(price);
}

export function PricingTeaserSection() {
  return (
    <section className="bg-bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-screen-xl px-6 md:px-8">
        {/* Header */}
        <div className="mb-7 flex items-end justify-between md:mb-16">
          <motion.h2
            className="font-mono text-[14px] uppercase tracking-[0.2em] text-fg-muted"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease }}
          >
            Прайс
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
          >
            <NextLink
              href="/services"
              className={cn(
                "inline-flex items-center justify-center",
                "border border-border-strong bg-transparent",
                "px-5 py-3 font-sans text-sm font-medium tracking-tight text-fg-primary",
                "transition-[background-color,border-color,color] duration-base",
                "hover:border-accent hover:bg-accent hover:text-accent-fg",
                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg-primary",
              )}
            >
              Все 27 услуг →
            </NextLink>
          </motion.div>
        </div>

        {/* Table */}
        <div role="list" className="flex flex-col divide-y divide-border-default">
          {FEATURED.map((item, i) => (
            <motion.div
              key={item.name}
              role="listitem"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.5, ease, delay: i * 0.05 }}
              className="flex min-h-[52px] items-center justify-between gap-4 py-3"
            >
              <span className="font-display font-normal text-[1rem] leading-snug text-fg-primary md:text-[1.125rem]">
                {item.name}
              </span>
              <div className="flex shrink-0 items-center gap-4 md:gap-8">
                <span className="hidden font-mono text-[0.8125rem] text-fg-muted md:block">
                  {formatDuration(item.duration)}
                </span>
                <span className="font-mono text-[0.9375rem] text-fg-primary md:text-[1rem]">
                  {priceLabel(item.price)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          className="mt-8 font-mono text-[12px] uppercase tracking-[0.15em] text-fg-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
        >
          Средний чек — 2 400 ₽ · Ежедневно 10:00–21:00
        </motion.p>
      </div>
    </section>
  );
}
