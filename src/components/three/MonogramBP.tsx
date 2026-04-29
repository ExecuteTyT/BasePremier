"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

export function MonogramBP({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    let rafId: number;

    const tick = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const mx = window._bpMouseX ?? cx;
      const my = window._bpMouseY ?? cy;

      const dx = ((mx - cx) / (rect.width / 2)) * 12;
      const dy = ((my - cy) / (rect.height / 2)) * 8;

      el.style.transform = `perspective(900px) rotateY(${dx}deg) rotateX(${-dy}deg)`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [reduced]);

  return (
    <div
      className={className}
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div
        ref={ref}
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-display, serif)",
          fontSize: "clamp(7rem, 14vw, 12rem)",
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: "-0.04em",
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(245,245,242,0.18)",
          userSelect: "none",
          willChange: "transform",
          transition: "transform 0.05s linear",
        }}
      >
        BP
      </div>
    </div>
  );
}

declare global {
  interface Window {
    _bpMouseX?: number;
    _bpMouseY?: number;
  }
}
