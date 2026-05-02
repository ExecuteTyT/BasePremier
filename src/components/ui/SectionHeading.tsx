"use client";

import { motion, useReducedMotion } from "framer-motion";
import { createElement, type ElementType } from "react";

import { CharReveal } from "@/components/motion/CharReveal";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  heading: string;
  subline?: string;
  align?: "left" | "center";
  as?: ElementType;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  heading,
  subline,
  align = "left",
  as,
  className,
}: Props) {
  const reduced = useReducedMotion();
  const centered = align === "center";
  const sublineClass = cn("text-body text-fg-muted", centered ? "max-w-2xl" : "max-w-prose");

  return createElement(
    as ?? "div",
    {
      className: cn(
        "flex flex-col gap-3 md:gap-4",
        centered && "items-center text-center",
        className,
      ),
    },
    eyebrow && (
      <span
        key="eyebrow"
        className="font-mono text-caption uppercase tracking-widest text-fg-muted"
      >
        {eyebrow}
      </span>
    ),
    <CharReveal key="heading" as="h2" className="text-h2 font-display">
      {heading}
    </CharReveal>,
    subline &&
      (reduced ? (
        <p key="subline" className={sublineClass}>
          {subline}
        </p>
      ) : (
        <motion.p
          key="subline"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: 0.25 }}
          className={sublineClass}
        >
          {subline}
        </motion.p>
      )),
  );
}
