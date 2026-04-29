"use client";

import { AnimatePresence, motion } from "framer-motion";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { startTransition, useEffect, useState } from "react";

import { cn } from "@/lib/cn";

type NavItem = { href: string; label: string };
type Phone = { display: string; href: string };

type Props = {
  navItems: NavItem[];
  phone: Phone;
};

const ease = [0.19, 1, 0.22, 1] as const;

export function MobileMenu({ navItems, phone }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    startTransition(() => setOpen(false));
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Hamburger — 44×44px touch target */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        className={cn(
          "relative flex min-h-[44px] min-w-[44px] items-center justify-center",
          "text-fg-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg-primary",
        )}
      >
        <span className="flex h-[14px] w-6 flex-col items-end justify-between">
          <span
            className={cn(
              "block h-px w-full bg-current transition-all duration-300 ease-[var(--ease-out-expo)]",
              open && "translate-y-[6.5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-px bg-current transition-all duration-300",
              open ? "w-full opacity-0" : "w-4 opacity-100",
            )}
          />
          <span
            className={cn(
              "block h-px bg-current transition-all duration-300 ease-[var(--ease-out-expo)]",
              open ? "w-full -translate-y-[6.5px] -rotate-45" : "w-3/4",
            )}
          />
        </span>
      </button>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Мобильное меню"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease }}
            className="fixed inset-0 z-40 flex flex-col bg-bg-primary px-6 pb-8 pt-20"
          >
            {/* Nav links */}
            <nav aria-label="Мобильная навигация" className="flex flex-col">
              {navItems.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease, delay: 0.1 + i * 0.06 }}
                >
                  <NextLink
                    href={href}
                    className={cn(
                      "block border-b border-border-default py-5",
                      "font-display text-[2rem] font-normal leading-none text-fg-primary",
                      "transition-colors duration-base hover:text-fg-muted",
                    )}
                  >
                    {label}
                  </NextLink>
                </motion.div>
              ))}
            </nav>

            {/* Bottom info block */}
            <motion.div
              className="mt-auto flex flex-col gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease, delay: 0.45 }}
            >
              <div className="flex flex-col gap-1">
                <a
                  href={phone.href}
                  className="font-mono text-body-sm text-fg-muted transition-colors duration-base hover:text-fg-primary"
                >
                  {phone.display}
                </a>
                <p className="font-mono text-caption text-fg-subtle">
                  Шаляпина, 26 · Казань · 10:00–21:00
                </p>
              </div>
              <button
                data-yclients-open
                className={cn(
                  "min-h-[52px] w-full bg-accent",
                  "font-mono text-[13px] uppercase tracking-[0.12em] text-accent-fg",
                  "transition-opacity duration-base active:opacity-80",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg-primary",
                )}
              >
                Записаться
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
