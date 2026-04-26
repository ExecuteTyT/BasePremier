"use client";

import NextLink from "next/link";
import { startTransition, useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function CookieBanner({ className }: { className?: string }) {
  const [accepted, setAccepted] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("bp:cookies");
    if (stored === "true") return;

    startTransition(() => setAccepted(false));

    const timer = setTimeout(() => {
      setVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("bp:cookies", "true");
    setAccepted(true);
  };

  const handleDecline = () => {
    setAccepted(true);
  };

  const shown = !accepted && visible;

  return (
    <div
      aria-hidden={!shown}
      aria-label="Уведомление о cookie"
      className={cn(
        "fixed inset-x-0 bottom-0 z-50",
        "border-t border-border-default bg-bg-primary",
        "px-4 py-4 md:px-8 md:py-5",
        "transition-transform duration-slow ease-[var(--ease-out-expo)]",
        shown ? "translate-y-0" : "translate-y-full",
        className,
      )}
    >
      <div className="mx-auto flex max-w-screen-xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-body-sm text-fg-muted">
          Мы используем cookie для аналитики и улучшения сайта. Продолжая пользоваться сайтом, вы
          соглашаетесь с нашей{" "}
          <NextLink
            href="/privacy"
            className="text-fg-primary underline underline-offset-2 transition-colors duration-base hover:text-fg-muted"
          >
            Политикой конфиденциальности
          </NextLink>
          .
        </p>
        <div className="flex flex-shrink-0 items-center gap-3">
          <Button variant="ghost" size="sm" tabIndex={shown ? 0 : -1} onClick={handleDecline}>
            Отклонить
          </Button>
          <Button variant="primary" size="sm" tabIndex={shown ? 0 : -1} onClick={handleAccept}>
            Принять
          </Button>
        </div>
      </div>
    </div>
  );
}
