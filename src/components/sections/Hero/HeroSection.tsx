"use client";

import Image from "next/image";
import NextLink from "next/link";

import { ScrollIndicator } from "@/components/sections/Hero/ScrollIndicator";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/cn";

const EASE = "cubic-bezier(0.19,1,0.22,1)";

function slideUp(duration: number, delay: number) {
  return `hero-slide-up ${duration}s ${EASE} ${delay}s both`;
}

export function HeroSection() {
  return (
    <section className="relative flex h-screen min-h-[580px] flex-col overflow-hidden md:min-h-[700px]">
      {/* Background image */}
      <Image
        src="/images/B43A7874.jpg"
        alt=""
        fill
        priority
        fetchPriority="high"
        className="object-cover object-[40%_center] md:object-[30%_center]"
        aria-hidden="true"
      />

      {/* Overlays — stronger on mobile so text stays legible */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/95 via-bg-primary/80 to-bg-primary/50 md:from-bg-primary/85 md:via-bg-primary/50 md:to-bg-primary/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/20 to-transparent md:from-bg-primary/60 md:via-transparent" />

      {/* Content — pinned to bottom on mobile, centered on desktop */}
      <div className="relative z-10 flex flex-1 flex-col justify-end pb-10 pt-20 md:justify-center md:pb-0">
        <div className="mx-auto w-full max-w-screen-xl px-6 md:px-8">
          <div className="flex max-w-xl flex-col gap-4 md:max-w-2xl md:gap-6">
            <p
              className="font-mono text-caption uppercase tracking-overline text-fg-muted"
              style={{ animation: slideUp(0.6, 0.1) }}
            >
              Казань · Шаляпина 26
            </p>

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

            <p
              className="font-mono text-[0.65rem] uppercase tracking-overline text-fg-subtle"
              style={{ animation: slideUp(0.5, 0.95) }}
            >
              Ежедневно&nbsp;10:00&nbsp;—&nbsp;21:00
            </p>

            <p
              className="font-mono text-caption text-fg-muted"
              style={{ animation: slideUp(0.6, 1.0) }}
            >
              от&nbsp;1&nbsp;800&nbsp;₽&nbsp;·&nbsp;★&nbsp;5,0&nbsp;·&nbsp;394&nbsp;отзыва
            </p>
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
