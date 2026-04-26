"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("custom-cursor");

    const moveDotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power1.out" });
    const moveDotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power1.out" });
    const moveRingX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const moveRingY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let visible = false;

    const onMove = (e: MouseEvent) => {
      moveDotX(e.clientX);
      moveDotY(e.clientY);
      moveRingX(e.clientX);
      moveRingY(e.clientY);
      if (!visible) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
        visible = true;
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest("a, button, [data-cursor='magnet']");
      if (el) {
        gsap.to(ring, { scale: 2, duration: 0.3, ease: "power2.out" });
      }
    };

    const onOut = (e: MouseEvent) => {
      const el = (e.target as Element).closest("a, button, [data-cursor='magnet']");
      if (el && !el.contains(e.relatedTarget as Node)) {
        gsap.to(ring, { scale: 1, duration: 0.3, ease: "power2.out" });
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg-primary opacity-0"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fg-primary opacity-0"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
