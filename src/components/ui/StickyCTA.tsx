"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function StickyCTA({ className }: { className?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setVisible(window.scrollY > 200);
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
        "border-t border-border-default bg-bg-primary/90 p-4 backdrop-blur-sm",
        "transition-transform duration-slow ease-[var(--ease-out-expo)]",
        visible ? "translate-y-0" : "translate-y-full",
        className,
      )}
    >
      <Button variant="primary" size="md" className="w-full" tabIndex={visible ? 0 : -1}>
        Записаться
      </Button>
    </div>
  );
}
