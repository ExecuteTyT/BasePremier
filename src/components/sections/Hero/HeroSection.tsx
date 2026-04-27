"use client";

import { motion, useReducedMotion } from "framer-motion";
import NextLink from "next/link";
import { ComponentType, Suspense, useEffect, useState } from "react";

import { CharReveal } from "@/components/motion/CharReveal";
import { ScrollIndicator } from "@/components/sections/Hero/ScrollIndicator";
import { HeroVideo } from "@/components/ui/HeroVideo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/cn";

const ease = [0.19, 1, 0.22, 1] as const;

export function HeroSection() {
  const reduced = useReducedMotion();
  const [MonogramBP, setMonogramBP] = useState<ComponentType<{ className?: string }> | null>(null);

  // Import Three.js chunk only after LCP — prevents preload of 575KB bundle
  useEffect(() => {
    const t = setTimeout(() => {
      import("@/components/three/MonogramBP").then((m) => setMonogramBP(() => m.MonogramBP));
    }, 800);
    return () => clearTimeout(t);
  }, []);

  // Track mouse globally for 3D scene
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      window._bpMouseX = e.clientX;
      window._bpMouseY = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative flex h-screen min-h-[580px] flex-col overflow-hidden md:min-h-[700px]">
      {/* Background video */}
      <HeroVideo
        src="/videos/hero.mp4"
        poster="/images/hero-poster.svg"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/85 via-bg-primary/50 to-bg-primary/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent" />

      {/* Mobile-only: decorative BP letterform (replaces the desktop 3D scene) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 flex select-none items-end overflow-hidden md:hidden"
      >
        <span
          className="font-display font-bold leading-none text-fg-primary"
          style={{ fontSize: "clamp(8rem, 45vw, 16rem)", opacity: 0.04, letterSpacing: "-0.05em" }}
        >
          BP
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col justify-center pt-20">
        <div className="mx-auto flex w-full max-w-screen-xl items-start px-6 md:items-center md:px-8">
          {/* Left: text */}
          <div className="flex max-w-2xl flex-col gap-6">
            {/* Eyebrow */}
            <motion.p
              className="font-mono text-caption uppercase tracking-overline text-fg-muted"
              initial={{ y: 8 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
            >
              Казань · Шаляпина 26
            </motion.p>

            {/* H1 */}
            <CharReveal
              as="h1"
              className="font-display text-display-xl leading-none text-fg-primary"
            >
              Барбершоп BASE Premier
            </CharReveal>

            {/* Divider line */}
            <motion.div
              className="h-px bg-fg-muted/30"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease, delay: 0.35 }}
              style={{ transformOrigin: "left" }}
            />

            {/* Epithet */}
            <motion.p
              className="font-mono text-overline uppercase tracking-overline text-fg-muted"
              initial={{ y: 8 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.5 }}
            >
              Дорого&nbsp;·&nbsp;Премиально&nbsp;·&nbsp;С&nbsp;собственным&nbsp;шармом
            </motion.p>

            {/* Body */}
            <motion.p
              className="max-w-lg font-sans text-body text-fg-muted"
              initial={{ y: 8 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.65 }}
            >
              Уникальный интерьер, профессиональные барберы, высокие стандарты — всё для того, чтобы
              вы чувствовали себя на высоте.
            </motion.p>

            {/* CTA row */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ y: 8 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.8 }}
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
            </motion.div>

            {/* Caption stats */}
            <motion.p
              className="font-mono text-caption text-fg-muted"
              initial={{ y: 4 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease, delay: 1.0 }}
            >
              от&nbsp;1&nbsp;800&nbsp;₽&nbsp;·&nbsp;★&nbsp;5,0&nbsp;·&nbsp;394&nbsp;отзыва
            </motion.p>
          </div>

          {/* Right: 3D Monogram (desktop only) — delayed to unblock LCP */}
          <motion.div
            className="ml-auto hidden flex-shrink-0 md:block"
            initial={reduced ? {} : { scale: 0, opacity: 0 }}
            animate={
              reduced ? {} : MonogramBP ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
            }
            transition={{ duration: 0.9, ease, delay: 0 }}
          >
            {MonogramBP ? (
              <Suspense fallback={<MonogramFallback />}>
                <MonogramBP className="h-[420px] w-[380px] lg:h-[500px] lg:w-[460px]" />
              </Suspense>
            ) : (
              <MonogramFallback />
            )}
          </motion.div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}

function MonogramFallback() {
  return (
    <div className="flex h-[420px] w-[380px] items-center justify-center lg:h-[500px] lg:w-[460px]">
      <span className="font-display text-[8rem] font-bold leading-none text-fg-primary/10 select-none">
        BP
      </span>
    </div>
  );
}

declare global {
  interface Window {
    _bpMouseX?: number;
    _bpMouseY?: number;
  }
}
