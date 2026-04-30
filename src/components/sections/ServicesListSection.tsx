"use client";

import { AnimatePresence, motion } from "framer-motion";
import Fuse from "fuse.js";
import NextLink from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";

import { SERVICE_CATEGORIES, ServiceCategory } from "@/data/services";
import { cn } from "@/lib/cn";
import { formatDuration, formatPrice, formatPriceFrom, formatPriceRange } from "@/lib/format";

const clipEase = [0.76, 0, 0.24, 1] as const;

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

function flattenServices(cats: ServiceCategory[]): FlatService[] {
  return cats.flatMap((cat) =>
    cat.services.map((svc) => ({ ...svc, categoryId: cat.id, categoryName: cat.name })),
  );
}

const ALL_SERVICES = flattenServices(SERVICE_CATEGORIES);
const fuse = new Fuse(ALL_SERVICES, { keys: ["name", "note"], threshold: 0.35 });

function priceLabel(svc: FlatService): string {
  if (Array.isArray(svc.price)) {
    return svc.from ? formatPriceFrom(svc.price[0]) : formatPriceRange(svc.price[0], svc.price[1]);
  }
  return svc.from ? formatPriceFrom(svc.price) : formatPrice(svc.price);
}

// ── Category themes ─────────────────────────────────────────────────────────────

const THEMES: Record<
  string,
  { bg: string; glow: string; accentBorder: string; svgOpacity: string }
> = {
  barbershop: {
    // Warm mahogany — бритвы, горячие компрессы, amber
    bg: "radial-gradient(ellipse 80% 60% at 15% 15%, rgba(160,80,20,0.14) 0%, transparent 65%), linear-gradient(155deg, #231508 0%, #18100600 100%)",
    glow: "rgba(201,165,107,0.15)",
    accentBorder: "hover:border-[#C9A56B]/50",
    svgOpacity: "opacity-[0.08] group-hover:opacity-[0.14]",
  },
  nails: {
    // Cool indigo — геометрия, точность, чистота
    bg: "radial-gradient(ellipse 80% 60% at 15% 15%, rgba(80,100,200,0.10) 0%, transparent 65%), linear-gradient(155deg, #0D1020 0%, #0A0C1600 100%)",
    glow: "rgba(130,150,220,0.12)",
    accentBorder: "hover:border-[#8896CC]/50",
    svgOpacity: "opacity-[0.08] group-hover:opacity-[0.14]",
  },
  combo: {
    // Navy — глубина, синергия двух направлений
    bg: "radial-gradient(ellipse 80% 60% at 15% 15%, rgba(27,42,78,0.25) 0%, transparent 65%), linear-gradient(155deg, #091422 0%, #06101800 100%)",
    glow: "rgba(60,90,180,0.15)",
    accentBorder: "hover:border-accent/60",
    svgOpacity: "opacity-[0.08] group-hover:opacity-[0.14]",
  },
};

// ── SVG Decorations ─────────────────────────────────────────────────────────────

function BarberDecoration({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className={cn("pointer-events-none absolute -bottom-4 -right-4 h-40 w-40", className)}
      aria-hidden="true"
    >
      {/* Straight razor — handle + blade */}
      <rect x="130" y="8" width="30" height="9" rx="1.5" stroke="white" strokeWidth="0.9" />
      <line x1="145" y1="8" x2="145" y2="17" stroke="white" strokeWidth="0.5" />
      <path d="M133 17 L90 190" stroke="white" strokeWidth="1.2" />
      <path d="M157 17 L114 190" stroke="white" strokeWidth="0.5" />
      <path d="M133 17 L157 17" stroke="white" strokeWidth="0.5" />
      {/* Fine parallel lines — razor guard */}
      <line x1="99" y1="62" x2="120" y2="62" stroke="white" strokeWidth="0.4" />
      <line x1="95" y1="78" x2="116" y2="78" stroke="white" strokeWidth="0.4" />
      <line x1="91" y1="94" x2="112" y2="94" stroke="white" strokeWidth="0.4" />
      <line x1="87" y1="110" x2="108" y2="110" stroke="white" strokeWidth="0.4" />
      <line x1="83" y1="126" x2="104" y2="126" stroke="white" strokeWidth="0.4" />
    </svg>
  );
}

function NailsDecoration({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className={cn("pointer-events-none absolute -bottom-4 -right-4 h-40 w-40", className)}
      aria-hidden="true"
    >
      {/* Concentric squares — precision geometry */}
      <rect x="10" y="10" width="180" height="180" stroke="white" strokeWidth="0.8" />
      <rect x="32" y="32" width="136" height="136" stroke="white" strokeWidth="0.5" />
      <rect x="54" y="54" width="92" height="92" stroke="white" strokeWidth="0.4" />
      <rect x="76" y="76" width="48" height="48" stroke="white" strokeWidth="0.4" />
      {/* Corner ticks */}
      <line x1="10" y1="50" x2="32" y2="50" stroke="white" strokeWidth="0.4" />
      <line x1="50" y1="10" x2="50" y2="32" stroke="white" strokeWidth="0.4" />
      <line x1="150" y1="10" x2="150" y2="32" stroke="white" strokeWidth="0.4" />
      <line x1="168" y1="50" x2="190" y2="50" stroke="white" strokeWidth="0.4" />
    </svg>
  );
}

function ComboDecoration({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className={cn("pointer-events-none absolute -bottom-6 -right-6 h-44 w-44", className)}
      aria-hidden="true"
    >
      {/* Two interlocking circles — синергия двух услуг */}
      <circle cx="80" cy="100" r="72" stroke="white" strokeWidth="0.9" />
      <circle cx="120" cy="100" r="72" stroke="white" strokeWidth="0.9" />
      <circle cx="80" cy="100" r="48" stroke="white" strokeWidth="0.4" />
      <circle cx="120" cy="100" r="48" stroke="white" strokeWidth="0.4" />
      {/* Center axis */}
      <line x1="100" y1="28" x2="100" y2="172" stroke="white" strokeWidth="0.3" />
    </svg>
  );
}

const DECORATIONS: Record<string, (className: string) => React.ReactNode> = {
  barbershop: (cls) => <BarberDecoration className={cls} />,
  nails: (cls) => <NailsDecoration className={cls} />,
  combo: (cls) => <ComboDecoration className={cls} />,
};

// ── Service Card ────────────────────────────────────────────────────────────────

function ServiceCard({ svc, index }: { svc: FlatService; index: number }) {
  const theme = THEMES[svc.categoryId] ?? THEMES["barbershop"]!;
  const decoration = DECORATIONS[svc.categoryId] ?? DECORATIONS["barbershop"]!;
  const price = priceLabel(svc);
  const duration = formatDuration(svc.duration);

  return (
    <motion.div
      initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-4% 0px" }}
      transition={{ duration: 0.65, ease: clipEase, delay: index * 0.06 }}
    >
      <NextLink
        href={`/services/${svc.id}`}
        className={cn(
          "group relative flex h-[180px] flex-col justify-end overflow-hidden",
          "border border-border-default",
          "transition-[border-color,box-shadow] duration-500",
          "md:h-[240px]",
          theme.accentBorder,
        )}
        style={
          {
            "--glow": theme.glow,
          } as React.CSSProperties
        }
      >
        {/* Base fill */}
        <div className="absolute inset-0 bg-bg-tertiary" />

        {/* Category gradient — warm / cool / navy */}
        <div
          className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-80"
          style={{ background: theme.bg }}
        />

        {/* Background scale on hover */}
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{ background: theme.bg, opacity: 0 }}
        />

        {/* Bottom darkening — text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

        {/* SVG decoration */}
        {decoration(cn("transition-opacity duration-700", theme.svgOpacity))}

        {/* Content */}
        <div className="relative z-10 p-5 transition-transform duration-500 ease-out group-hover:-translate-y-1.5 md:p-6">
          {svc.note && (
            <p className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-fg-muted/50 md:text-[10px]">
              {svc.note}
            </p>
          )}
          <h3 className="font-display font-normal leading-tight text-fg-primary text-[1.0625rem] md:text-[1.25rem]">
            {svc.name}
          </h3>
          <div className="mt-2.5 flex items-baseline gap-3 md:mt-3">
            <span className="font-mono text-[0.875rem] text-fg-primary md:text-[0.9375rem]">
              {price}
            </span>
            <span className="font-mono text-[0.6875rem] text-fg-muted md:text-[0.75rem]">
              {duration}
            </span>
          </div>
        </div>

        {/* Arrow */}
        <span
          className={cn(
            "absolute right-4 top-4 z-10 font-mono text-[11px] text-fg-muted/70",
            "translate-x-2 opacity-0",
            "transition-[opacity,transform] duration-300 ease-out",
            "group-hover:translate-x-0 group-hover:opacity-100",
          )}
          aria-hidden="true"
        >
          →
        </span>

        {/* Top-left category micro-label */}
        <span className="absolute left-5 top-4 z-10 font-mono text-[9px] uppercase tracking-[0.18em] text-fg-muted/40 md:text-[10px]">
          {svc.categoryName}
        </span>
      </NextLink>
    </motion.div>
  );
}

// ── Main section ────────────────────────────────────────────────────────────────

export function ServicesListSection() {
  const [activeTab, setActiveTab] = useState<TabId>(ALL_TAB);
  const [query, setQuery] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const ease = [0.19, 1, 0.22, 1] as const;

  const filteredServices = useMemo(() => {
    if (query.trim().length > 0) {
      return fuse.search(query.trim()).map((r) => r.item);
    }
    if (activeTab !== ALL_TAB) {
      return ALL_SERVICES.filter((s) => s.categoryId === activeTab);
    }
    return ALL_SERVICES;
  }, [query, activeTab]);

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
        className="mb-10 flex flex-wrap gap-2 md:mb-16 md:gap-3"
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

      {/* Cards */}
      <div ref={listRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + query}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {groupedServices.length === 0 ? (
              <p className="font-sans text-body text-fg-muted">
                Ничего не найдено. Попробуйте другой запрос.
              </p>
            ) : (
              <div className="flex flex-col gap-10 md:gap-14">
                {groupedServices.map((group) => (
                  <section key={group.id} aria-labelledby={`cat-${group.id}`}>
                    {/* Category heading */}
                    <div className="mb-5 flex items-center gap-4 md:mb-6">
                      <h2
                        id={`cat-${group.id}`}
                        className="font-mono text-[13px] uppercase tracking-[0.2em] text-fg-muted"
                      >
                        {group.name}
                      </h2>
                      <div className="h-px flex-1 bg-border-default" aria-hidden="true" />
                      <span className="font-mono text-[11px] text-fg-subtle">
                        {group.services.length}
                      </span>
                    </div>

                    {/* Card grid */}
                    <div
                      className={cn(
                        "grid grid-cols-2 gap-3",
                        "md:gap-5",
                        group.id === "barbershop" ? "xl:grid-cols-3" : "md:grid-cols-2",
                      )}
                    >
                      {group.services.map((svc, i) => (
                        <ServiceCard key={svc.id} svc={svc} index={i} />
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
