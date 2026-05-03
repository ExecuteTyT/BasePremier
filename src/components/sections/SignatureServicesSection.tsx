"use client";

import { motion } from "framer-motion";
import { forwardRef, useEffect, useRef } from "react";

import { cn } from "@/lib/cn";
import { formatDuration, formatPrice, formatPriceRange } from "@/lib/format";
import { gsap } from "@/lib/gsap";

const SERVICES = [
  {
    index: "01",
    label: "Парикмахерский зал",
    name: ["Мужская", "стрижка"],
    duration: formatDuration(60),
    price: formatPriceRange(1800, 2700),
    note: "Мытьё, стрижка по структуре волоса, моделирование, укладка, парфюм.",
  },
  {
    index: "02",
    label: "Парикмахерский зал",
    name: ["Стрижка", "с бородой"],
    duration: formatDuration(90),
    price: formatPriceRange(3200, 4600),
    note: "Стрижка и моделирование бороды горячим полотенцем и прямой бритвой.",
  },
  {
    index: "03",
    label: "Парикмахерский зал",
    name: ["Моделирование", "бороды"],
    duration: formatDuration(30),
    price: formatPriceRange(1400, 1900),
    note: "Контур, баланс, текстура. Прямая бритва и машинка по длине.",
  },
  {
    index: "04",
    label: "Парикмахерский зал",
    name: ["Гладкое", "бритьё"],
    duration: formatDuration(45),
    price: formatPrice(1800),
    note: "Горячее полотенце, пена барсук, прямое лезвие. Финиш — охлаждающий бальзам.",
  },
  {
    index: "05",
    label: "Уход за лицом",
    name: ["Премиальный", "уход"],
    duration: formatDuration(30),
    price: formatPrice(2150),
    note: "London Grooming Co: очищение, пилинг, маска и увлажнение.",
  },
];

// N × 100vh total section height (N panels, 1 viewport of scroll per transition)
const N = SERVICES.length;

const mEase = [0.19, 1, 0.22, 1] as const;

export function SignatureServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    const vh = window.innerHeight;

    // Set section height = N viewports; extra (N-1) viewports = scroll space
    section.style.height = `${N * vh}px`;

    const ctx = gsap.context(() => {
      // Progress line scrubs across all (N-1) scroll transitions
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `top+=${(N - 1) * vh} top`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      // Each panel (except first) wipes in from the left as a razor cut
      // Panel i+1 reveals during scroll segment [i*vh … i*vh + 0.65*vh]
      panelRefs.current.slice(1).forEach((panel, i) => {
        if (!panel) return;

        gsap.fromTo(
          panel,
          { clipPath: "inset(0 0 0 100%)" },
          {
            clipPath: "inset(0 0 0 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: `top+=${i * vh} top`,
              end: `top+=${i * vh + vh * 0.65} top`,
              scrub: 0.4,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    }, section);

    const onResize = () => {
      section.style.height = `${N * window.innerHeight}px`;
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      ctx.revert();
      section.style.height = "";
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section ref={sectionRef} aria-label="Фирменные услуги" className="bg-bg-primary">
      {/* Screen-reader heading (visually hidden) */}
      <h2 className="sr-only">Фирменные услуги</h2>

      {/* ── Desktop: sticky viewport with clip-path panel stack ── */}
      <div className="sticky top-0 hidden h-screen overflow-hidden md:block">
        {/* Bottom progress line */}
        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 z-20 h-px bg-border">
          <div ref={progressBarRef} className="h-full origin-left scale-x-0 bg-fg-primary/50" />
        </div>

        {/* Panel stack — renders in DOM order so panel N sits on top */}
        {SERVICES.map((service, i) => (
          <ServicePanel
            key={service.index}
            service={service}
            index={i}
            total={N}
            ref={(el: HTMLDivElement | null) => {
              panelRefs.current[i] = el;
            }}
          />
        ))}
      </div>

      {/* ── Mobile: vertical list with Framer Motion reveals ── */}
      <div className="md:hidden">
        <div className="px-6 pb-4 pt-16">
          <p
            aria-hidden="true"
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg-muted"
          >
            Фирменные услуги
          </p>
        </div>

        {SERVICES.map((service) => (
          <motion.div
            key={service.index}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.7, ease: mEase }}
            className="border-t border-border px-6 py-9"
          >
            {/* Index + duration row */}
            <div className="mb-5 flex items-baseline justify-between">
              <span
                aria-hidden="true"
                className="font-display select-none font-normal italic leading-none text-fg-primary/[0.12]"
                style={{ fontSize: "clamp(3rem, 12vw, 4rem)" }}
              >
                {service.index}
              </span>
              <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-fg-muted">
                {service.duration}
              </span>
            </div>

            {/* Name */}
            <div className="mb-5">
              {service.name.map((line, j) => (
                <p
                  key={j}
                  className="font-display font-normal italic leading-[0.92] text-fg-primary"
                  style={{ fontSize: "clamp(2.8rem, 11vw, 3.6rem)" }}
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Price + label */}
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <p className="font-mono text-[1.05rem] text-fg-primary">{service.price}</p>
              <span className="text-right font-mono text-[11px] uppercase tracking-[0.15em] text-fg-muted">
                {service.label}
              </span>
            </div>

            {/* Note */}
            <p className="border-t border-border pt-4 font-sans text-[13px] leading-relaxed text-fg-muted">
              {service.note}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── ServicePanel ────────────────────────────────────────────────────────────

type PanelProps = {
  service: (typeof SERVICES)[number];
  index: number;
  total: number;
};

const ServicePanel = forwardRef<HTMLDivElement, PanelProps>(function ServicePanel(
  { service, index, total },
  ref,
) {
  const even = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 flex items-end justify-between",
        "px-8 pb-16 md:px-16 lg:px-24",
        even ? "bg-bg-primary" : "bg-bg-secondary",
      )}
    >
      {/* Ghost index — large decorative number, aria-hidden */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-16 top-1/2 -translate-y-[45%] select-none font-display font-normal italic leading-none text-fg-primary/[0.03] lg:right-24"
        style={{ fontSize: "clamp(16rem, 38vw, 34rem)" }}
      >
        {service.index}
      </span>

      {/* ── Left column: eyebrow + giant name ── */}
      <div className="relative z-10 flex max-w-[62%] flex-col gap-7">
        {/* Eyebrow */}
        <div className="flex items-center gap-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-fg-muted">
            {service.label}
          </span>
          <span
            aria-hidden="true"
            className="font-mono text-[11px] tracking-[0.08em] text-fg-muted/40"
          >
            {service.index}&thinsp;/&thinsp;{String(total).padStart(2, "0")}
          </span>
        </div>

        {/* Service name — giant italic Fraunces */}
        <div aria-label={service.name.join(" ")}>
          {service.name.map((line, j) => (
            <p
              key={j}
              aria-hidden="true"
              className="font-display font-normal italic leading-[0.88] text-fg-primary"
              style={{ fontSize: "clamp(5rem, 11.5vw, 10.5rem)" }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* ── Right column: price + duration + note ── */}
      <div className="relative z-10 flex flex-col items-end gap-5 pb-0.5">
        <p
          className="text-right font-mono leading-tight text-fg-primary"
          style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.25rem)" }}
        >
          {service.price}
        </p>

        <p className="font-mono text-[13px] uppercase tracking-[0.22em] text-fg-muted">
          {service.duration}
        </p>

        <div aria-hidden="true" className="h-10 w-px self-end bg-border" />

        <p className="max-w-[260px] text-right font-sans text-[13px] leading-relaxed text-fg-muted">
          {service.note}
        </p>
      </div>
    </div>
  );
});
