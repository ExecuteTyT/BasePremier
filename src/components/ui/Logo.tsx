"use client";

import NextLink from "next/link";
import { useRef } from "react";

import { cn } from "@/lib/cn";

type Size = "sm" | "md" | "lg" | "xl";
type Variant = "mark" | "wordmark";

const HEIGHTS: Record<Size, number> = { sm: 24, md: 40, lg: 56, xl: 112 };

type Props = {
  size?: Size;
  variant?: Variant;
  href?: string;
  className?: string;
};

export function Logo({ size = "md", variant = "mark", href, className }: Props) {
  const clickCount = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    clickCount.current++;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 2000);
    if (clickCount.current >= 5) {
      clickCount.current = 0;
      console.warn("вы один из своих 🤝 — basepremier.ru");
    }
  };

  const h = HEIGHTS[size];
  const svgMark = (
    <svg
      viewBox="0 0 80 60"
      height={h}
      width={(h * 80) / 60}
      fill="currentColor"
      aria-hidden="true"
      className="hover:animate-wiggle"
    >
      <text
        x="2"
        y="52"
        fontSize="56"
        letterSpacing="-4"
        style={{ fontFamily: "var(--font-display, Georgia, serif)", fontWeight: 600 }}
      >
        BP
      </text>
    </svg>
  );

  const svgWordmark = (
    <svg
      viewBox="0 0 210 76"
      height={h}
      width={(h * 210) / 76}
      fill="currentColor"
      aria-hidden="true"
      className="hover:animate-wiggle"
    >
      <text
        x="2"
        y="54"
        fontSize="56"
        letterSpacing="-4"
        style={{ fontFamily: "var(--font-display, Georgia, serif)", fontWeight: 600 }}
      >
        BP
      </text>
      <text
        x="4"
        y="72"
        fontSize="11"
        letterSpacing="5"
        style={{ fontFamily: "var(--font-mono, monospace)", fontWeight: 400 }}
      >
        BASE PREMIER
      </text>
    </svg>
  );

  const content = variant === "wordmark" ? svgWordmark : svgMark;
  const label = "BASE Premier";

  if (href) {
    return (
      <NextLink
        href={href}
        onClick={handleClick}
        aria-label={`${label} — на главную`}
        className={cn(
          "inline-flex items-center text-fg-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg-primary",
          className,
        )}
      >
        {content}
      </NextLink>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className={cn(
        "inline-block cursor-pointer border-none bg-transparent p-0 text-fg-primary",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg-primary",
        className,
      )}
    >
      {content}
    </button>
  );
}
