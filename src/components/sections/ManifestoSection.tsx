"use client";

import NextLink from "next/link";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";

const LINES = ["Стрижём.", "Ухаживаем.", "Заботимся."];
const CODA = "И ничего больше.";

function Chars({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span key={i} className="m-char" aria-hidden="true">
          {char}
        </span>
      ))}
    </span>
  );
}

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    const chars = section.querySelectorAll<HTMLElement>(".m-char");

    if (reduced || isMobile) {
      gsap.set(chars, { opacity: 1 });
      if (footerRef.current) gsap.set(footerRef.current, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(chars, { opacity: 0.08 });
      if (footerRef.current) gsap.set(footerRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=320%",
          pin: true,
          pinSpacing: true,
          scrub: 1.5,
        },
      });

      tl.to(chars, {
        opacity: 1,
        ease: "none",
        stagger: { each: 0.018, from: "start" },
        duration: 0.7,
      }).to(footerRef.current, { opacity: 1, duration: 0.12 }, "-=0.08");
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-bg-secondary py-32 md:flex md:min-h-screen md:items-center md:py-0"
    >
      <div className="mx-auto w-full max-w-screen-xl px-6 md:px-8">
        {/* Eyebrow */}
        <p className="mb-16 font-mono text-[14px] uppercase tracking-[0.2em] text-fg-muted md:mb-20">
          МЫ ДЕЛАЕМ ТРИ ВЕЩИ
        </p>

        {/* Verbs */}
        <div className="flex flex-col" style={{ lineHeight: 1.0 }}>
          {LINES.map((line) => (
            <p
              key={line}
              className={cn(
                "font-display font-normal text-fg-primary",
                "text-[clamp(3.5rem,9vw,8.5rem)]",
                "tracking-[-0.04em] leading-none",
              )}
            >
              <Chars text={line} />
            </p>
          ))}
        </div>

        {/* Coda */}
        <p
          className={cn(
            "mt-8 font-display italic font-normal",
            "text-[clamp(1.75rem,4.5vw,4rem)]",
            "tracking-[-0.02em] leading-tight text-fg-primary/40",
          )}
        >
          <Chars text={CODA} />
        </p>

        {/* Footer — fades in last */}
        <div ref={footerRef} className="mt-16">
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
