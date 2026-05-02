"use client";

import React, { type ComponentPropsWithoutRef, type ElementType, useEffect, useRef } from "react";

import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";

type Props<T extends ElementType = "div"> = {
  as?: T;
  children: string;
  delay?: number;
  stagger?: number;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function CharReveal<T extends ElementType = "div">({
  as,
  children,
  delay = 0,
  stagger = 0.03,
  className,
  ...rest
}: Props<T>) {
  const containerRef = useRef<HTMLElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = (as ?? "div") as any;
  const words = children.split(" ");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll<HTMLElement>("[data-char]");
    if (!chars.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.8,
          ease: "expo.out",
          stagger,
          delay,
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, container);

    return () => ctx.revert();
  }, [delay, stagger]);

  return (
    <Tag {...rest} className={cn(className)} ref={containerRef as React.Ref<HTMLElement>}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => (
            <span key={ci} className="inline-block overflow-hidden">
              <span data-char="" className="inline-block">
                {char}
              </span>
            </span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
