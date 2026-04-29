"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { MobileMenu } from "@/components/layout/MobileMenu";
import { Logo } from "@/components/ui/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { href: "/services", label: "Услуги" },
  { href: "/barbers", label: "Мастера" },
  { href: "/about", label: "О нас" },
  { href: "/journal", label: "Журнал" },
  { href: "/contacts", label: "Контакты" },
];

const PHONE = { display: "+7 (917) 918-38-77", href: "tel:+79179183877" };

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        header.dataset.scrolled = String(window.scrollY > 80);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      data-scrolled="false"
      className={cn(
        "sticky top-0 z-50 flex items-center border-b border-border-default",
        "h-14 md:h-16",
        "bg-bg-primary/80 backdrop-blur-sm",
        "transition-[height,background-color] duration-slow",
        "data-[scrolled=true]:h-7 data-[scrolled=true]:bg-bg-primary",
      )}
    >
      <nav
        className="flex w-full items-center justify-between px-4 md:px-8"
        aria-label="Главная навигация"
      >
        <Logo href="/" size="sm" className="py-2.5" />

        {/* Desktop nav — hidden on mobile */}
        <ul className="hidden items-center gap-6 md:flex" role="list">
          {NAV_ITEMS.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <li key={href}>
                <NextLink
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "font-sans text-body-sm transition-colors duration-base",
                    active ? "text-fg-primary" : "text-fg-muted hover:text-fg-primary",
                  )}
                >
                  {label}
                </NextLink>
              </li>
            );
          })}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-3 md:gap-4">
          <a
            href={PHONE.href}
            className="hidden font-mono text-body-sm text-fg-muted transition-colors duration-base hover:text-fg-primary lg:block"
          >
            {PHONE.display}
          </a>
          <div className="hidden md:block">
            <MagneticButton variant="primary" size="md">
              Записаться
            </MagneticButton>
          </div>
          <div className="md:hidden">
            <MobileMenu navItems={NAV_ITEMS} phone={PHONE} />
          </div>
        </div>
      </nav>
    </header>
  );
}
