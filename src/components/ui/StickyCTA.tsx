"use client";

import { useEffect, useState } from "react";

import { useSoundContext } from "@/components/motion/SoundProvider";
import { cn } from "@/lib/cn";

export function StickyCTA({ className }: { className?: string }) {
  const [visible, setVisible] = useState(false);
  const { play } = useSoundContext();

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setVisible(window.scrollY > 800);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 md:hidden",
        "border-t border-border-default bg-bg-primary/95 backdrop-blur-sm",
        "transition-transform duration-slow ease-[var(--ease-out-expo)]",
        visible ? "translate-y-0" : "translate-y-full",
        className,
      )}
    >
      {/* px-4 pt-3 + iOS safe-area at bottom */}
      <div
        style={{
          padding: "0.75rem 1rem",
          paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
        }}
      >
        <button
          data-yclients-open
          tabIndex={visible ? 0 : -1}
          aria-label="Записаться онлайн"
          onMouseDown={() => play("click")}
          className={cn(
            "w-full h-12",
            "bg-accent text-accent-fg",
            "font-mono text-[13px] uppercase tracking-[0.12em]",
            "transition-opacity duration-base active:opacity-80",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg-primary",
          )}
        >
          Записаться
        </button>
      </div>
    </div>
  );
}
