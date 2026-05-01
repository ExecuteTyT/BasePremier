"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";

const ease = [0.19, 1, 0.22, 1] as const;
const clipEase = [0.76, 0, 0.24, 1] as const;

// Directional clip-path wipes per photo slot
const CLIP_IN = [
  "inset(0 0 100% 0)", // 0: curtain drops top→bottom
  "inset(0 100% 0 0)", // 1: wipe right→left
  "inset(100% 0 0 0)", // 2: wipe bottom→top
] as const;
const CLIP_OUT = "inset(0 0 0% 0)";

// Swap src → real paths when photos arrive; set to null to keep placeholder
const PHOTOS: { src: string | null; alt: string }[] = [
  { src: "/images/B43A7806.jpg", alt: "Интерьер BASE Premier — лобби с ресепшеном" },
  { src: "/images/B43A7596.jpg", alt: "Интерьер BASE Premier — барберские кресла и вывеска" },
  { src: "/images/B43A7735.jpg", alt: "Интерьер BASE Premier — рабочий зал" },
];

function PhotoSlot({
  photo,
  className,
  index,
}: {
  photo: (typeof PHOTOS)[number];
  className?: string;
  index: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, clipPath: CLIP_IN[index] ?? CLIP_IN[0] }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, clipPath: CLIP_OUT }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: reduced ? 0.3 : 1.0, ease: clipEase, delay: index * 0.15 }}
      className={cn("relative overflow-hidden bg-bg-secondary", className)}
    >
      {photo.src ? (
        <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="(min-width: 768px) 50vw, 80vw" />
      ) : (
        // Placeholder — удалить когда придут фото
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 select-none">
          <span
            className="font-display font-normal leading-none text-fg-muted/10"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
          >
            BP
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-muted/25">
            Фото скоро
          </span>
        </div>
      )}
    </motion.div>
  );
}

export function InteriorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(grid, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-bg-primary py-24 md:py-32">
      <div className="mx-auto max-w-screen-xl px-6 md:px-8">
        {/* Header */}
        <div className="mb-7 flex items-end justify-between md:mb-16">
          <motion.h2
            className="font-mono text-[14px] uppercase tracking-[0.2em] text-fg-muted"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease }}
          >
            Интерьер
          </motion.h2>

          <motion.p
            className="hidden font-mono text-[12px] uppercase tracking-[0.15em] text-fg-muted md:block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            Шаляпина, 26 · Казань
          </motion.p>
        </div>

        {/* Asymmetric grid */}
        <div ref={gridRef}>
          {/* Desktop: left tall + right 2-stacked */}
          <div className="hidden gap-4 md:grid md:grid-cols-[1fr_1fr] md:grid-rows-[auto]">
            {/* Left — tall main photo */}
            <PhotoSlot photo={PHOTOS[0]!} index={0} className="aspect-[3/4] md:row-span-2" />

            {/* Right top */}
            <PhotoSlot photo={PHOTOS[1]!} index={1} className="aspect-[16/9]" />

            {/* Right bottom + caption */}
            <div className="flex flex-col gap-4">
              <PhotoSlot photo={PHOTOS[2]!} index={2} className="aspect-[16/9] flex-1" />
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-muted">
                245 м от Концертного зала Филармонии
              </p>
            </div>
          </div>

          {/* Mobile: horizontal swipe carousel with CSS scroll-snap */}
          <div className="md:hidden">
            <div
              className={cn(
                "-mx-6 flex gap-3 overflow-x-auto pl-6",
                "snap-x snap-mandatory scroll-smooth",
                "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              )}
            >
              {PHOTOS.map((photo, i) => (
                <PhotoSlot
                  key={i}
                  photo={photo}
                  index={i}
                  className="aspect-[3/4] w-[80vw] flex-none snap-start"
                />
              ))}
              {/* Right-edge padding sentinel */}
              <div className="w-6 flex-none" aria-hidden="true" />
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-muted">
              Шаляпина, 26 · 245 м от Концертного зала Филармонии
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
