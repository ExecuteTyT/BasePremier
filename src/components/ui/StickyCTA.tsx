"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";

export function StickyCTA({ className }: { className?: string }) {
  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mobile = mobileRef.current;
    const desktop = desktopRef.current;
    if (!mobile && !desktop) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Start hidden
    if (mobile) gsap.set(mobile, { y: "100%", pointerEvents: "none" });
    if (desktop) gsap.set(desktop, { opacity: 0, y: 12, pointerEvents: "none" });

    let rafId = 0;
    let lastVisible = false;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const show = window.scrollY > 600;
        if (show === lastVisible) return;
        lastVisible = show;

        if (mobile) {
          gsap.to(mobile, {
            y: show ? "0%" : "100%",
            duration: reduced ? 0 : 0.45,
            ease: "power3.out",
            pointerEvents: show ? "auto" : "none",
          });
        }
        if (desktop) {
          gsap.to(desktop, {
            opacity: show ? 1 : 0,
            y: show ? 0 : 12,
            duration: reduced ? 0 : 0.35,
            ease: "power2.out",
            pointerEvents: show ? "auto" : "none",
          });
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Mobile — full-width bottom bar */}
      <div
        ref={mobileRef}
        aria-hidden="true"
        className={cn(
          "fixed inset-x-0 bottom-0 z-[100] md:hidden",
          "border-t border-border-strong bg-bg-secondary/95 backdrop-blur-sm",
          className,
        )}
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="px-4 pt-3 pb-0">
          <button
            data-yclients-open
            tabIndex={0}
            aria-label="Записаться онлайн"
            className={cn(
              "w-full min-h-[44px]",
              "bg-accent text-accent-fg",
              "font-mono text-[13px] uppercase tracking-[0.12em]",
              "transition-opacity duration-base active:opacity-80",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg-primary",
            )}
          >
            Записаться
          </button>
          <p className="mt-1.5 mb-2 text-center font-mono text-[9px] uppercase tracking-[0.1em] text-fg-subtle">
            Ежедневно 10:00 — 21:00
          </p>
        </div>
      </div>

      {/* Desktop — floating pill bottom-right */}
      <div
        ref={desktopRef}
        className={cn(
          "hidden md:flex",
          "fixed bottom-6 right-6 z-[100]",
          "items-center gap-3",
          "border border-border-strong bg-bg-secondary/95 backdrop-blur-sm",
          "px-4 py-2.5",
          "shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
        )}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-subtle">
          Запись онлайн
        </span>
        <button
          data-yclients-open
          aria-label="Записаться онлайн"
          className={cn(
            "min-h-[36px] px-4",
            "bg-accent text-accent-fg",
            "font-mono text-[11px] uppercase tracking-[0.1em]",
            "transition-[background-color] duration-base hover:bg-accent-hover",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg-primary",
          )}
        >
          Записаться
        </button>
        <a
          href="tel:+79179183877"
          className={cn(
            "font-mono text-[11px] text-fg-muted",
            "border-b border-fg-muted/30 pb-px",
            "transition-[color,border-color] duration-base hover:text-fg-primary hover:border-fg-primary",
            "min-h-[44px] flex items-center",
          )}
        >
          +7 (917) 918-38-77
        </a>
      </div>
    </>
  );
}
