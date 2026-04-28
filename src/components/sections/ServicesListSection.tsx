"use client";

import { AnimatePresence, motion } from "framer-motion";
import Fuse from "fuse.js";
import NextLink from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";

import { SERVICE_CATEGORIES, ServiceCategory } from "@/data/services";
import { cn } from "@/lib/cn";
import { formatDuration, formatPrice, formatPriceFrom, formatPriceRange } from "@/lib/format";

const ease = [0.19, 1, 0.22, 1] as const;

const ALL_TAB = "all";

type TabId = "all" | "barbershop" | "combo" | "nails";

const TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "barbershop", label: "Парикмахерский зал" },
  { id: "combo", label: "Комплексные" },
  { id: "nails", label: "Ногтевой зал" },
];

type FlatService = {
  id: string;
  name: string;
  duration: number;
  price: number | [number, number];
  from?: boolean;
  note?: string;
  categoryId: string;
  categoryName: string;
};

function flattenServices(categories: ServiceCategory[]): FlatService[] {
  return categories.flatMap((cat) =>
    cat.services.map((svc) => ({
      ...svc,
      categoryId: cat.id,
      categoryName: cat.name,
    })),
  );
}

const ALL_SERVICES = flattenServices(SERVICE_CATEGORIES);

const fuse = new Fuse(ALL_SERVICES, {
  keys: ["name", "note"],
  threshold: 0.35,
});

function formatServicePrice(svc: FlatService): string {
  if (Array.isArray(svc.price)) {
    return svc.from ? formatPriceFrom(svc.price[0]) : formatPriceRange(svc.price[0], svc.price[1]);
  }
  return svc.from ? formatPriceFrom(svc.price) : formatPrice(svc.price);
}

export function ServicesListSection() {
  const [activeTab, setActiveTab] = useState<TabId>(ALL_TAB);
  const [query, setQuery] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const filteredServices = useMemo(() => {
    let services = ALL_SERVICES;

    if (query.trim().length > 0) {
      services = fuse.search(query.trim()).map((r) => r.item);
    } else if (activeTab !== ALL_TAB) {
      services = ALL_SERVICES.filter((s) => s.categoryId === activeTab);
    }

    return services;
  }, [query, activeTab]);

  // Group filtered services by category, preserving order
  const groupedServices = useMemo(() => {
    const map = new Map<string, { name: string; services: FlatService[] }>();
    for (const svc of filteredServices) {
      if (!map.has(svc.categoryId)) {
        map.set(svc.categoryId, { name: svc.categoryName, services: [] });
      }
      map.get(svc.categoryId)!.services.push(svc);
    }
    return [...map.entries()].map(([id, val]) => ({ id, ...val }));
  }, [filteredServices]);

  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab);
    setQuery("");
    // Scroll list into view smoothly
    setTimeout(() => {
      listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);

  return (
    <div>
      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.1 }}
        className="mb-8"
      >
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value) setActiveTab(ALL_TAB);
            }}
            placeholder="Поиск услуги…"
            aria-label="Поиск услуги"
            className={cn(
              "w-full bg-transparent",
              "border-b border-border-strong pb-3",
              "font-sans text-body text-fg-primary placeholder:text-fg-muted/40",
              "outline-none transition-[border-color] duration-base",
              "focus:border-fg-primary",
              "md:max-w-md",
            )}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Очистить поиск"
              className="absolute right-0 bottom-3 text-fg-muted transition-colors duration-base hover:text-fg-primary"
            >
              ×
            </button>
          )}
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.2 }}
        role="tablist"
        aria-label="Фильтр по категориям"
        className="mb-12 flex flex-wrap gap-2 md:mb-16 md:gap-3"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id && !query}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              "px-4 py-3 font-mono text-[13px] uppercase tracking-[0.12em] md:py-2",
              "border transition-[background-color,border-color,color] duration-base",
              activeTab === tab.id && !query
                ? "border-accent bg-accent text-accent-fg"
                : "border-border-strong bg-transparent text-fg-muted hover:border-fg-muted/40 hover:text-fg-primary",
            )}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Service list */}
      <div ref={listRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + query}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {groupedServices.length === 0 ? (
              <p className="font-sans text-body text-fg-muted">
                Ничего не найдено. Попробуйте другой запрос.
              </p>
            ) : (
              <div className="flex flex-col gap-12 md:gap-16">
                {groupedServices.map((group) => (
                  <section key={group.id} aria-labelledby={`cat-${group.id}`}>
                    {/* Category heading */}
                    <div className="mb-6 flex items-center gap-4">
                      <h2
                        id={`cat-${group.id}`}
                        className="font-mono text-[13px] uppercase tracking-[0.2em] text-fg-muted"
                      >
                        {group.name}
                      </h2>
                      <div className="h-px flex-1 bg-border-default" aria-hidden="true" />
                    </div>

                    {/* Rows */}
                    <div role="list" className="flex flex-col divide-y divide-border-default">
                      {group.services.map((svc, i) => (
                        <ServiceRow key={svc.id} svc={svc} index={i} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ServiceRow({ svc, index }: { svc: FlatService; index: number }) {
  return (
    <motion.div
      role="listitem"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.5, ease, delay: index * 0.03 }}
    >
      <NextLink
        href={`/services/${svc.id}`}
        className={cn(
          "group flex items-center justify-between gap-4 py-5",
          "transition-colors duration-base hover:text-fg-primary",
        )}
      >
        {/* Left: name + note */}
        <div className="flex flex-col gap-0.5">
          <span className="font-display font-normal text-[1.125rem] leading-snug text-fg-primary md:text-[1.25rem]">
            {svc.name}
          </span>
          {svc.note && (
            <span className="font-mono text-[11px] uppercase tracking-widest text-fg-muted/60">
              {svc.note}
            </span>
          )}
        </div>

        {/* Right: price + duration + arrow */}
        <div className="flex shrink-0 items-center gap-4 md:gap-6">
          <span className="font-mono text-[1rem] text-fg-primary md:text-[1.125rem]">
            {formatServicePrice(svc)}
          </span>
          <span className="hidden font-mono text-[0.8125rem] text-fg-muted md:block">
            {formatDuration(svc.duration)}
          </span>
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
    </motion.div>
  );
}
