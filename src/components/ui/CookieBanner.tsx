"use client";

import NextLink from "next/link";
import { startTransition, useEffect, useState } from "react";

import { useSoundContext } from "@/components/motion/SoundProvider";
import { cn } from "@/lib/cn";

const STORAGE_KEY = "bp:cookies";

export function CookieBanner({ className }: { className?: string }) {
  const [shown, setShown] = useState(false);
  const { play } = useSoundContext();

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => {
      startTransition(() => setShown(true));
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = (analytics: boolean) => {
    if (analytics) play("success");
    else play("click");
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics, ts: Date.now() }));
    setShown(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Уведомление о cookie"
      aria-hidden={!shown}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50",
        "border-t border-border-default bg-bg-secondary",
        "px-4 py-4 md:px-8 md:py-5",
        "transition-transform duration-slow ease-[var(--ease-out-expo)]",
        shown ? "translate-y-0" : "translate-y-full",
        className,
      )}
    >
      <div className="mx-auto flex max-w-screen-xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="font-sans text-body-sm text-fg-muted">
          Мы используем cookie для аналитики и улучшения сервиса. Подробнее —{" "}
          <NextLink
            href="/privacy"
            className="text-fg-primary underline underline-offset-2 transition-opacity duration-base hover:opacity-70"
          >
            Политика конфиденциальности
          </NextLink>
          .
        </p>

        <div className="flex flex-shrink-0 items-center gap-3">
          <button
            tabIndex={shown ? 0 : -1}
            onClick={() => dismiss(false)}
            className={cn(
              "min-h-[44px] px-4 py-2 font-mono text-[12px] uppercase tracking-[0.12em]",
              "border border-border-strong text-fg-muted",
              "transition-[border-color,color] duration-base",
              "hover:border-fg-muted/50 hover:text-fg-primary",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg-primary",
            )}
          >
            Только необходимые
          </button>
          <button
            tabIndex={shown ? 0 : -1}
            onClick={() => dismiss(true)}
            className={cn(
              "min-h-[44px] px-4 py-2 font-mono text-[12px] uppercase tracking-[0.12em]",
              "bg-accent text-accent-fg",
              "transition-opacity duration-base hover:opacity-90",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg-primary",
            )}
          >
            Принять все
          </button>
        </div>
      </div>
    </div>
  );
}
