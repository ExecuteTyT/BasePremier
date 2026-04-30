import NextLink from "next/link";

import { Logo } from "@/components/ui/Logo";

const NAV_ITEMS = [
  { href: "/services", label: "Услуги" },
  { href: "/barbers", label: "Мастера" },
  { href: "/about", label: "О нас" },
  { href: "/journal", label: "Журнал" },
  { href: "/contacts", label: "Контакты" },
];

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-border-default bg-bg-secondary">
      <div className="mx-auto max-w-screen-xl px-4 py-7 md:px-8 md:py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Logo variant="wordmark" size="sm" href="/" className="py-2.5" />
            <p className="mt-4 max-w-xs text-body-sm text-fg-muted">
              Стиль, атмосфера, мастерство — мужской уход без компромиссов
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Навигация по сайту">
            <ul className="flex flex-col gap-1" role="list">
              {NAV_ITEMS.map(({ href, label }) => (
                <li key={href}>
                  <NextLink
                    href={href}
                    className="inline-block py-3 text-body-sm text-fg-muted transition-colors duration-base hover:text-fg-primary"
                  >
                    {label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacts */}
          <div className="flex flex-col gap-3">
            <address className="flex flex-col gap-1 text-body-sm not-italic text-fg-muted">
              <span>ул. Шаляпина, 26, 1 этаж</span>
              <span>Казань</span>
            </address>
            <p className="text-body-sm text-fg-muted">Ежедневно 10:00–21:00</p>
            <a
              href="tel:+79179183877"
              className="inline-flex min-h-[44px] items-center font-mono text-body-sm text-fg-primary transition-colors duration-base hover:text-fg-muted"
            >
              +7 (917) 918-38-77
            </a>
            <div className="flex items-center gap-4 pt-1">
              <a
                href="https://wa.me/79179183877"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="-m-2.5 inline-flex h-7 w-7 items-center justify-center text-fg-muted transition-colors duration-base hover:text-fg-primary"
              >
                <IconWhatsApp />
              </a>
              <a
                href="https://t.me/+79179183877"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="-m-2.5 inline-flex h-7 w-7 items-center justify-center text-fg-muted transition-colors duration-base hover:text-fg-primary"
              >
                <IconTelegram />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-7 flex flex-col gap-3 border-t border-border-default pt-6 text-body-sm text-fg-muted md:flex-row md:items-center md:justify-between">
          <span className="font-mono">© 2022–{YEAR} BASE Premier</span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>ИП Шайхутдинов Айрат Рафаэлевич · ИНН 163207031442</span>
            <NextLink
              href="/privacy"
              className="transition-colors duration-base hover:text-fg-primary"
            >
              Политика конфиденциальности
            </NextLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function IconWhatsApp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.404A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.952 7.952 0 0 1-4.054-1.108l-.29-.172-3.017.85.854-2.945-.189-.302A7.97 7.97 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" />
    </svg>
  );
}

function IconTelegram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}
