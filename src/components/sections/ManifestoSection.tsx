"use client";

import { motion } from "framer-motion";
import NextLink from "next/link";
import { useEffect, useRef } from "react";

import { CharReveal } from "@/components/motion/CharReveal";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";

const VERBS = ["Стрижём.", "Ухаживаем.", "Заботимся."];
const ease = [0.19, 1, 0.22, 1] as const;

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-bg-secondary py-32 md:py-48">
      <div ref={contentRef} className="mx-auto max-w-screen-xl px-6 md:px-8">
        {/* Eyebrow */}
        <motion.p
          className="mb-16 font-mono text-[14px] uppercase tracking-[0.2em] text-fg-muted md:mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, ease }}
        >
          МЫ ДЕЛАЕМ ТРИ ВЕЩИ
        </motion.p>

        {/* Large verbs */}
        <div className="flex flex-col" style={{ lineHeight: 1.0 }}>
          {VERBS.map((verb, i) => (
            <CharReveal
              key={verb}
              as="p"
              delay={i * 0.12}
              stagger={0.022}
              className={cn(
                "font-display font-normal text-fg-primary",
                "text-[clamp(3.5rem,9vw,8.5rem)]",
                "tracking-[-0.04em] leading-none",
              )}
            >
              {verb}
            </CharReveal>
          ))}
        </div>

        {/* "И ничего больше" */}
        <motion.p
          className={cn(
            "mt-8 font-display italic font-normal",
            "text-[clamp(1.75rem,4.5vw,4rem)]",
            "tracking-[-0.02em] leading-tight text-fg-primary/40",
          )}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease, delay: 0.45 }}
        >
          И ничего больше.
        </motion.p>

        {/* Divider */}
        <motion.div
          className="mt-16 mb-6 h-px w-16 bg-fg-muted/30"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          style={{ transformOrigin: "left" }}
        />

        {/* Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease, delay: 0.35 }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}
