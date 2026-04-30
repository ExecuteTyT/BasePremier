"use client";

import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useRef } from "react";

import { ScrollIndicator } from "@/components/sections/Hero/ScrollIndicator";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";

const EASE = "cubic-bezier(0.19,1,0.22,1)";

function slideUp(duration: number, delay: number) {
  return `hero-slide-up ${duration}s ${EASE} ${delay}s both`;
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const eyebrowWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const quickTo = (el: HTMLElement | null, prop: string) =>
      el ? gsap.quickTo(el, prop, { duration: 0.9, ease: "power3.out" }) : () => {};

    const bgX = quickTo(bgRef.current, "x");
    const bgY = quickTo(bgRef.current, "y");
    const ovX = quickTo(overlayRef.current, "x");
    const ovY = quickTo(overlayRef.current, "y");
    const ctX = quickTo(contentRef.current, "x");
    const ctY = quickTo(contentRef.current, "y");
    const eyX = quickTo(eyebrowWrapRef.current, "x");
    const eyY = quickTo(eyebrowWrapRef.current, "y");

    function onMouseMove(e: MouseEvent) {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      // Each layer moves at a different depth — numbers are full-range px at nx=±0.5
      bgX(nx * 8);
      bgY(ny * 4); // ±4px / ±2px
      ovX(nx * 16);
      ovY(ny * 8); // ±8px / ±4px
      ctX(nx * 28);
      ctY(ny * 14); // ±14px / ±7px
      // Eyebrow is child of content, so 4px additional = 18px total visual depth
      eyX(nx * 8);
      eyY(ny * 4); // ±4px extra
    }

    section.addEventListener("mousemove", onMouseMove);
    return () => section.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen min-h-[580px] flex-col overflow-hidden md:min-h-[700px]"
    >
      {/* Background image — enlarged 20px on each side for parallax bleed */}
      <div ref={bgRef} className="absolute" style={{ inset: "-20px", willChange: "transform" }}>
        <Image
          src="/images/B43A7874.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          className="object-cover object-[40%_center] md:object-[30%_center]"
          aria-hidden="true"
        />
      </div>

      {/* Overlays — stronger on mobile so text stays legible */}
      <div ref={overlayRef} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/95 via-bg-primary/80 to-bg-primary/50 md:from-bg-primary/85 md:via-bg-primary/50 md:to-bg-primary/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/20 to-transparent md:from-bg-primary/60 md:via-transparent" />
      </div>

      {/* Content — pinned to bottom on mobile, centered on desktop */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-1 flex-col justify-end pb-10 pt-20 md:justify-center md:pb-0"
      >
        <div className="mx-auto w-full max-w-screen-xl px-6 md:px-8">
          <div className="flex max-w-xl flex-col gap-4 md:max-w-2xl md:gap-6">
            {/* Eyebrow — extra depth layer inside content */}
            <div ref={eyebrowWrapRef}>
              <p
                className="font-mono text-caption uppercase tracking-overline text-fg-muted"
                style={{ animation: slideUp(0.6, 0.1) }}
              >
                Казань · Шаляпина 26
              </p>
            </div>

            <h1
              className="font-display text-[2.6rem] leading-none text-fg-primary md:text-display-xl"
              style={{ animation: slideUp(1.0, 0) }}
            >
              Барбершоп BASE Premier
            </h1>

            <div
              className="h-px bg-fg-muted/30"
              style={{ transformOrigin: "left", animation: `hero-scale-x 0.8s ${EASE} 0.35s both` }}
            />

            <p
              className="font-mono text-[0.6rem] uppercase tracking-overline text-fg-muted md:text-overline"
              style={{ animation: slideUp(0.7, 0.5) }}
            >
              Дорого&nbsp;·&nbsp;Премиально&nbsp;·&nbsp;С&nbsp;собственным&nbsp;шармом
            </p>

            <p
              className="font-sans text-body-sm text-fg-muted md:text-body"
              style={{ animation: slideUp(0.7, 0.65) }}
            >
              Уникальный интерьер, профессиональные барберы, высокие стандарты — всё для того, чтобы
              вы чувствовали себя на высоте.
            </p>

            <div
              className="flex flex-wrap items-center gap-3 md:gap-4"
              style={{ animation: slideUp(0.7, 0.8) }}
            >
              <MagneticButton variant="primary" size="md">
                Записаться
              </MagneticButton>
              <NextLink
                href="/services"
                className={cn(
                  "font-sans text-body text-fg-muted",
                  "border-b border-fg-muted/40 pb-0.5",
                  "transition-[border-color,color] duration-base",
                  "hover:border-fg-primary hover:text-fg-primary",
                )}
              >
                Услуги
              </NextLink>
            </div>

            {/* Yandex rating badge + hours */}
            <div className="flex flex-col gap-2" style={{ animation: slideUp(0.6, 0.95) }}>
              <a
                href="https://yandex.ru/maps/org/base_premier/236063126987/"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex w-fit items-center gap-2",
                  "border border-border-strong px-3 py-1.5",
                  "transition-[border-color] duration-base hover:border-accent",
                )}
              >
                <span className="font-mono text-[11px] text-warning">★★★★★</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-secondary">
                  5,0&nbsp;·&nbsp;394&nbsp;отзыва
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-fg-subtle">
                  Яндекс.Карты
                </span>
              </a>
              <p className="font-mono text-[0.65rem] uppercase tracking-overline text-fg-subtle">
                от&nbsp;1&nbsp;800&nbsp;₽&nbsp;·&nbsp;Ежедневно&nbsp;10:00&nbsp;—&nbsp;21:00
              </p>
            </div>
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
