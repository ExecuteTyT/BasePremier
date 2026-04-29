"use client";

import { AnimatePresence, motion } from "framer-motion";
import NextLink from "next/link";
import { useMemo, useState } from "react";

import { BARBERS, Barber, BarberTag } from "@/data/barbers";
import { cn } from "@/lib/cn";
import { reviewWord } from "@/lib/format";

const ease = [0.19, 1, 0.22, 1] as const;

type TabId = "all" | BarberTag;

const TABS: { id: TabId; label: string; count: number }[] = [
  { id: "all", label: "Все", count: BARBERS.length },
  {
    id: "senior",
    label: "Старшие",
    count: BARBERS.filter((b) => b.tags.includes("senior")).length,
  },
  {
    id: "barber",
    label: "Парикмахеры",
    count: BARBERS.filter((b) => b.tags.includes("barber")).length,
  },
  {
    id: "nails",
    label: "Ногтевой сервис",
    count: BARBERS.filter((b) => b.tags.includes("nails")).length,
  },
];

export function BarbersGridSection() {
  const [activeTab, setActiveTab] = useState<TabId>("all");

  const filtered = useMemo(
    () =>
      activeTab === "all"
        ? BARBERS
        : BARBERS.filter((b) => b.tags.includes(activeTab as BarberTag)),
    [activeTab],
  );

  return (
    <div>
      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.1 }}
        role="tablist"
        aria-label="Фильтр по специализации"
        className="mb-7 flex flex-wrap gap-2 md:mb-16 md:gap-3"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-3 md:py-2",
              "font-mono text-[13px] uppercase tracking-[0.12em]",
              "border transition-[background-color,border-color,color] duration-base",
              activeTab === tab.id
                ? "border-accent bg-accent text-accent-fg"
                : "border-border-strong bg-transparent text-fg-muted hover:border-fg-muted/40 hover:text-fg-primary",
            )}
          >
            {tab.label}
            <span aria-hidden="true" className="opacity-70">
              {tab.count}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {filtered.map((barber, i) => (
            <BarberGridCard key={barber.slug} barber={barber} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function BarberGridCard({ barber, index }: { barber: Barber; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.6, ease, delay: index * 0.05 }}
    >
      <NextLink href={`/barbers/${barber.slug}`} className="group block">
        {/* Photo */}
        <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-bg-secondary">
          {/* Placeholder (photo replaces later) */}
          <div className="flex h-full items-center justify-center">
            <span
              className="select-none font-display font-normal leading-none text-fg-muted/15"
              style={{ fontSize: "clamp(4rem, 10vw, 7rem)" }}
            >
              {barber.name[0]}
            </span>
          </div>

          {/* Hover overlay */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-end p-4",
              "bg-bg-primary/60 opacity-0 backdrop-blur-[2px]",
              "transition-opacity duration-base group-hover:opacity-100",
            )}
          >
            <span className="font-display font-normal text-[1.125rem] text-fg-primary">
              {barber.name}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-fg-muted">
              {barber.role}
            </span>
          </div>

          {/* Best employee badge */}
          {barber.isBestEmployee && (
            <div className="absolute left-2 top-2">
              <span className="bg-accent px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-fg">
                ★ Лучший
              </span>
            </div>
          )}

          {/* Senior badge */}
          {barber.isSenior && (
            <div className="absolute left-2 top-2">
              <span className="bg-fg-primary/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fg-muted backdrop-blur-sm">
                Старший
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-0.5">
          <h2 className="font-display font-normal text-[1.125rem] leading-tight text-fg-primary transition-opacity duration-base group-hover:opacity-70">
            {barber.name}
          </h2>
          <p className="font-mono text-[11px] uppercase tracking-wider text-fg-muted">
            {barber.role}
          </p>
          <p className="font-mono text-[11px] text-fg-muted">
            {barber.reviews}&nbsp;{reviewWord(barber.reviews)}
          </p>
        </div>
      </NextLink>
    </motion.div>
  );
}
