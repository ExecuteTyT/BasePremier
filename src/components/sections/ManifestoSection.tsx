"use client";

import NextLink from "next/link";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";

const LINES = [
  {
    num: "01",
    verb: "Стрижём.",
    desc: "Только мужские стрижки. Каждый мастер — профиль, не набор услуг.",
  },
  {
    num: "02",
    verb: "Ухаживаем.",
    desc: "Борода, кожа, детали. Graham Hill, Davines, Solomon's.",
  },
  {
    num: "03",
    verb: "Заботимся.",
    desc: "О вашем времени: онлайн-запись без очередей.",
  },
];

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const rows = section.querySelectorAll<HTMLElement>(".manifesto-row");
    const footer = section.querySelector<HTMLElement>(".manifesto-footer");

    const ctx = gsap.context(() => {
      rows.forEach((row) => {
        const num = row.querySelector(".manifesto-num");
        const verb = row.querySelector(".manifesto-verb");
        const desc = row.querySelector(".manifesto-desc");
        const line = row.querySelector(".manifesto-line");

        gsap.set([num, verb, desc], { y: 32, opacity: 0 });
        gsap.set(line, { scaleX: 0, transformOrigin: "left center" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });

        tl.to(line, { scaleX: 1, duration: 0.5, ease: "power2.out" })
          .to(num, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" }, "-=0.3")
          .to(verb, { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" }, "-=0.45")
          .to(desc, { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" }, "-=0.4");
      });

      if (footer) {
        gsap.fromTo(
          footer,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footer,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-bg-secondary py-24 md:py-32">
      <div className="mx-auto w-full max-w-screen-xl px-6 md:px-8">
        {/* Eyebrow */}
        <p className="mb-16 font-mono text-[14px] uppercase tracking-[0.2em] text-fg-muted md:mb-20">
          МЫ ДЕЛАЕМ ТРИ ВЕЩИ
        </p>

        {/* Rows */}
        <div className="flex flex-col">
          {LINES.map(({ num, verb, desc }) => (
            <div key={num} className="manifesto-row group relative pb-0">
              {/* Divider line that animates in */}
              <div className="manifesto-line h-px w-full bg-border" />

              <div className="flex flex-col gap-4 py-8 md:grid md:grid-cols-[3rem_1fr_auto] md:items-baseline md:gap-x-10 md:py-10 lg:grid-cols-[3.5rem_1fr_max-content]">
                {/* Number */}
                <span className="manifesto-num font-mono text-[11px] tracking-[0.18em] text-fg-muted/50 md:pt-2">
                  {num}
                </span>

                {/* Verb */}
                <p
                  className={cn(
                    "manifesto-verb font-display font-normal text-fg-primary",
                    "text-[clamp(2.75rem,6.5vw,6.5rem)]",
                    "tracking-[-0.04em] leading-none",
                  )}
                >
                  {verb}
                </p>

                {/* Descriptor */}
                <p className="manifesto-desc max-w-xs font-sans text-[0.9375rem] leading-relaxed text-fg-muted md:max-w-[260px] md:text-right lg:max-w-[320px]">
                  {desc}
                </p>
              </div>
            </div>
          ))}

          {/* Bottom border */}
          <div className="h-px w-full bg-border" />
        </div>

        {/* Coda */}
        <p
          className={cn(
            "mt-10 font-display italic font-normal text-fg-primary/25",
            "text-[clamp(1.5rem,3.5vw,3rem)]",
            "tracking-[-0.02em] leading-tight",
          )}
        >
          И ничего больше.
        </p>

        {/* Footer */}
        <div className="manifesto-footer mt-12">
          <div className="mb-6 h-px w-16 bg-fg-muted/30" />
          <NextLink
            href="/about"
            className={cn(
              "font-sans text-body text-fg-muted",
              "border-b border-fg-muted/30 pb-0.5",
              "transition-[border-color,color] duration-base",
              "hover:border-fg-primary hover:text-fg-primary",
            )}
          >
            Манифест и история →
          </NextLink>
        </div>
      </div>
    </section>
  );
}
