"use client";

import { useReducedMotion } from "framer-motion";

const ITEMS = [
  "★ 5,0 рейтинг",
  "394 отзыва",
  "10 мастеров",
  "с 2022 года",
  "Ежедневно 10:00–21:00",
  "Казань · Шаляпина 26",
];

const SEP = "·";

function Band() {
  return (
    <span className="flex shrink-0 items-center" aria-hidden="true">
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
            {item}
          </span>
          <span className="font-mono text-[11px] text-fg-subtle/40">{SEP}</span>
        </span>
      ))}
    </span>
  );
}

export function StatsBand() {
  const reduced = useReducedMotion();

  return (
    <div
      className="overflow-hidden border-y border-border-default bg-bg-secondary py-3"
      aria-label="Ключевые показатели BASE Premier"
    >
      {reduced ? (
        /* Static — single pass for reduced-motion */
        <div className="flex items-center justify-center">
          <Band />
        </div>
      ) : (
        /* Marquee — duplicate for seamless loop */
        <div
          className="flex w-max items-center"
          style={{
            animation: "stats-marquee 55s linear infinite",
          }}
        >
          <Band />
          <Band />
        </div>
      )}

      <style>{`
        @keyframes stats-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
