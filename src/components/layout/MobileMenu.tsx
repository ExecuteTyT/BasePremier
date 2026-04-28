"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { startTransition, useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type NavItem = { href: string; label: string };
type Phone = { display: string; href: string };

type Props = {
  navItems: NavItem[];
  phone: Phone;
};

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
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        className="flex h-8 w-8 flex-col items-center justify-center gap-[6px] text-fg-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg-primary"
      >
        <span
          className={cn(
            "block h-px w-6 bg-current transition-transform duration-300",
            open && "translate-y-[9px] rotate-45",
          )}
        />
        <span
          className={cn(
            "block h-px w-6 bg-current transition-opacity duration-300",
            open && "opacity-0",
          )}
        />
        <span
          className={cn(
            "block h-px w-6 bg-current transition-transform duration-300",
            open && "-translate-y-[9px] -rotate-45",
          )}
        />
      </button>

      {/* Fixed overlay — clips off-screen drawer so it doesn't add to document scrollWidth */}
      <div
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-40 overflow-hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        {/* Backdrop */}
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-bg-primary/70 backdrop-blur-sm",
            "transition-opacity duration-slow",
            open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
          )}
        />

        {/* Drawer */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Мобильное меню"
          className={cn(
            "absolute inset-y-0 right-0 z-10 flex w-72 flex-col bg-bg-secondary px-6 py-6",
            "transition-transform duration-slow ease-[var(--ease-out-expo)]",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <nav aria-label="Мобильная навигация" className="mt-12 flex flex-col">
            {navItems.map(({ href, label }) => (
              <NextLink
                key={href}
                href={href}
                className="border-b border-border-default py-4 font-sans text-h4 text-fg-primary transition-colors duration-base hover:text-fg-muted"
              >
                {label}
              </NextLink>
            ))}
          </nav>

          <div className="mt-auto space-y-4 pb-4">
            <a
              href={phone.href}
              className="flex min-h-[44px] items-center font-mono text-body-sm text-fg-muted transition-colors duration-base hover:text-fg-primary"
            >
              {phone.display}
            </a>
            <Button variant="primary" size="md" className="w-full">
              Записаться
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
