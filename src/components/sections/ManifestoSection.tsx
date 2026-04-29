"use client";

import NextLink from "next/link";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";

const VERBS = ["Стрижём.", "Ухаживаем.", "Заботимся."];

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const verb1Ref = useRef<HTMLParagraphElement>(null);
  const verb2Ref = useRef<HTMLParagraphElement>(null);
  const verb3Ref = useRef<HTMLParagraphElement>(null);
  const italicRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Mobile: skip pin — elements are visible by default
    if (window.innerWidth < 768) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Hide animated elements before timeline fires
      gsap.set([verb1Ref.current, verb2Ref.current, verb3Ref.current], {
        opacity: 0,
        yPercent: 40,
      });
      gsap.set(italicRef.current, { opacity: 0, yPercent: 20 });
      gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: "left" });
      gsap.set(linkRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=250%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      });

      // Verbs appear one by one as user scrolls
      tl.fromTo(
        verb1Ref.current,
        { opacity: 0, yPercent: 40 },
        { opacity: 1, yPercent: 0, duration: 0.18 },
        0,
      )
        .fromTo(
          verb2Ref.current,
          { opacity: 0, yPercent: 40 },
          { opacity: 1, yPercent: 0, duration: 0.18 },
          0.32,
        )
        .fromTo(
          verb3Ref.current,
          { opacity: 0, yPercent: 40 },
          { opacity: 1, yPercent: 0, duration: 0.18 },
          0.62,
        )
        .fromTo(
          italicRef.current,
          { opacity: 0, yPercent: 20 },
          { opacity: 1, yPercent: 0, duration: 0.12 },
          0.8,
        )
        .fromTo(dividerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.09 }, 0.9)
        .fromTo(linkRef.current, { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.97);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-bg-secondary py-32 md:flex md:min-h-screen md:items-center md:py-0"
    >
      <div className="mx-auto w-full max-w-screen-xl px-6 md:px-8">
        {/* Eyebrow — always visible, sets context before verbs appear */}
        <p className="mb-16 font-mono text-[14px] uppercase tracking-[0.2em] text-fg-muted md:mb-20">
          МЫ ДЕЛАЕМ ТРИ ВЕЩИ
        </p>

        {/* Verbs — each revealed sequentially on scroll (desktop) */}
        <div className="flex flex-col" style={{ lineHeight: 1.0 }}>
          <p
            ref={verb1Ref}
            className={cn(
              "font-display font-normal text-fg-primary",
              "text-[clamp(3.5rem,9vw,8.5rem)]",
              "tracking-[-0.04em] leading-none",
            )}
          >
            {VERBS[0]}
          </p>
          <p
            ref={verb2Ref}
            className={cn(
              "font-display font-normal text-fg-primary",
              "text-[clamp(3.5rem,9vw,8.5rem)]",
              "tracking-[-0.04em] leading-none",
            )}
          >
            {VERBS[1]}
          </p>
          <p
            ref={verb3Ref}
            className={cn(
              "font-display font-normal text-fg-primary",
              "text-[clamp(3.5rem,9vw,8.5rem)]",
              "tracking-[-0.04em] leading-none",
            )}
          >
            {VERBS[2]}
          </p>
        </div>

        {/* Coda */}
        <p
          ref={italicRef}
          className={cn(
            "mt-8 font-display italic font-normal",
            "text-[clamp(1.75rem,4.5vw,4rem)]",
            "tracking-[-0.02em] leading-tight text-fg-primary/40",
          )}
        >
          И ничего больше.
        </p>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="mt-16 mb-6 h-px w-16 bg-fg-muted/30"
          style={{ transformOrigin: "left" }}
        />

        {/* Link */}
        <div ref={linkRef}>
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
