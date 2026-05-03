"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import NextLink from "next/link";

import { BARBERS_BY_CATEGORY, ServiceDetail } from "@/data/service-details";
import { Service, SERVICE_CATEGORIES, ServiceCategory } from "@/data/services";
import { cn } from "@/lib/cn";
import { formatDuration, formatPrice, formatPriceFrom, formatPriceRange } from "@/lib/format";

const ease = [0.19, 1, 0.22, 1] as const;
const clipEase = [0.76, 0, 0.24, 1] as const;

function findServiceById(id: string): { service: Service; category: ServiceCategory } | null {
  for (const cat of SERVICE_CATEGORIES) {
    for (const svc of cat.services) {
      if (svc.id === id) return { service: svc, category: cat };
    }
  }
  return null;
}

function priceLabel(service: Service): string {
  if (Array.isArray(service.price)) {
    return service.from
      ? formatPriceFrom(service.price[0])
      : formatPriceRange(service.price[0], service.price[1]);
  }
  return service.from ? formatPriceFrom(service.price) : formatPrice(service.price);
}

type Props = {
  service: Service;
  category: ServiceCategory;
  detail: ServiceDetail;
};

export function ServiceDetailContent({ service, category, detail }: Props) {
  const reduced = useReducedMotion();
  const price = priceLabel(service);
  const duration = formatDuration(service.duration);
  const barbers = BARBERS_BY_CATEGORY[category.id] ?? BARBERS_BY_CATEGORY.barbershop ?? [];

  const related = detail.relatedSlugs
    .map((slug) => findServiceById(slug))
    .filter(Boolean) as Array<{ service: Service; category: ServiceCategory }>;

  return (
    <>
      {/* ── Hero image ── */}
      {detail.heroImage && (
        <motion.div
          className="relative h-[60vh] min-h-[360px] w-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease }}
        >
          <Image
            src={detail.heroImage}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Dark overlay — harmonises bright daylight photos with the dark theme */}
          <div className="absolute inset-0 bg-bg-primary/65" />
          {/* Bottom gradient to seamlessly join the content section */}
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-bg-primary to-transparent" />
        </motion.div>
      )}

      {/* ── Main section ── */}
      <section
        className={cn(
          "bg-bg-primary pb-16 md:pb-24",
          detail.heroImage ? "pt-10 md:pt-16" : "pt-20 md:pt-32",
        )}
      >
        <div className="mx-auto max-w-screen-xl px-6 md:px-8">
          {/* Breadcrumb */}
          <motion.nav
            aria-label="Навигация по сайту"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease }}
          >
            <NextLink
              href="/services"
              className={cn(
                "inline-flex items-center gap-2",
                "font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted",
                "transition-colors duration-base hover:text-fg-primary",
              )}
            >
              <span aria-hidden="true">←</span>
              Все услуги
            </NextLink>
          </motion.nav>

          {/* 2-column grid on md+ */}
          <div className="mt-10 md:grid md:grid-cols-[1fr_300px] md:gap-16 lg:grid-cols-[1fr_340px] lg:gap-24">
            {/* ── Left column ── */}
            <div>
              {/* Category label */}
              <motion.p
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease, delay: 0.05 }}
              >
                {category.name}
              </motion.p>

              {/* H1 */}
              <motion.h1
                className={cn(
                  "mt-3 font-display font-normal text-fg-primary",
                  "text-[clamp(2.5rem,6vw,5.5rem)]",
                  "leading-none tracking-[-0.03em]",
                )}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.1 }}
              >
                {service.name}
              </motion.h1>

              {/* Note badge (e.g. "5–10 лет", "В 4 руки") */}
              {service.note && (
                <motion.p
                  className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease, delay: 0.2 }}
                >
                  {service.note}
                </motion.p>
              )}

              {/* Divider */}
              <motion.div
                className="mt-6 h-px bg-border-default"
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease, delay: 0.25 }}
              />

              {/* Price + Duration */}
              <motion.div
                className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease, delay: 0.3 }}
              >
                <span className="font-mono text-[1.75rem] leading-none text-fg-primary">
                  {price}
                </span>
                <span className="font-mono text-caption text-fg-muted">{duration}</span>
              </motion.div>

              {/* Mobile CTA — hidden on desktop (card handles it) */}
              <motion.div
                className="mt-6 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease, delay: 0.4 }}
              >
                <button
                  data-yclients-open
                  aria-label="Записаться онлайн"
                  className={cn(
                    "w-full min-h-[52px]",
                    "bg-accent text-accent-fg",
                    "font-mono text-[13px] uppercase tracking-[0.12em]",
                    "transition-[background-color] duration-base active:opacity-80",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg-primary",
                  )}
                >
                  Записаться
                </button>
              </motion.div>

              {/* Description */}
              <motion.p
                className="mt-8 font-sans text-body leading-relaxed text-fg-muted md:max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease, delay: 0.45 }}
              >
                {detail.description}
              </motion.p>

              {/* Includes */}
              <motion.div
                className="mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease, delay: 0.55 }}
              >
                <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
                  Что входит
                </p>
                <ul className="flex flex-col gap-4" role="list">
                  {detail.includes.map((item, i) => (
                    <motion.li
                      key={item}
                      role="listitem"
                      className="flex items-start gap-4"
                      initial={reduced ? { opacity: 0 } : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.6 + i * 0.07 }}
                    >
                      <span
                        className="mt-0.5 shrink-0 font-mono text-[13px] text-accent"
                        aria-hidden="true"
                      >
                        →
                      </span>
                      <span className="font-sans text-body text-fg-primary">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Masters */}
              <motion.div
                className="mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease, delay: 0.7 }}
              >
                <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
                  Мастера
                </p>
                <div className="flex flex-wrap gap-4">
                  {barbers.map((b) => (
                    <NextLink
                      key={b.slug}
                      href={`/barbers/${b.slug}`}
                      className="group flex flex-col gap-2"
                      aria-label={`${b.name}, ${b.role}`}
                    >
                      {/* Avatar */}
                      <div
                        className={cn(
                          "relative flex h-16 w-12 items-center justify-center md:h-20 md:w-16",
                          "border border-border-default bg-bg-secondary",
                          "transition-[border-color] duration-base group-hover:border-accent",
                        )}
                      >
                        <span className="font-display text-[1.75rem] font-normal leading-none text-fg-muted/20 select-none">
                          {b.name[0]}
                        </span>
                      </div>
                      {/* Name */}
                      <div className="flex flex-col gap-0.5">
                        <span className="font-sans text-body-sm font-medium text-fg-muted transition-colors duration-base group-hover:text-fg-primary">
                          {b.name}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-fg-subtle">
                          {b.reviews}+ отзывов
                        </span>
                      </div>
                    </NextLink>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── Right sticky booking card (desktop only) ── */}
            <div className="hidden md:block">
              <motion.div
                className={cn("sticky top-24", "border border-border-default bg-bg-secondary p-8")}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.2 }}
              >
                {/* Service name */}
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
                  {service.name}
                </p>

                {/* Price */}
                <p className="mt-4 font-mono text-[1.875rem] leading-none text-fg-primary">
                  {price}
                </p>

                {/* Duration */}
                <p className="mt-2 font-mono text-caption text-fg-muted">{duration}</p>

                {/* Note if exists */}
                {service.note && (
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-subtle/70">
                    {service.note}
                  </p>
                )}

                {/* Divider */}
                <div className="my-6 h-px bg-border-default" />

                {/* CTA */}
                <button
                  data-yclients-open
                  aria-label="Записаться онлайн"
                  className={cn(
                    "w-full min-h-[48px]",
                    "bg-accent text-accent-fg",
                    "font-mono text-[12px] uppercase tracking-[0.14em]",
                    "transition-[background-color] duration-base hover:bg-accent-hover",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg-primary",
                  )}
                >
                  Записаться
                </button>

                {/* Phone fallback */}
                <a
                  href="tel:+79179183877"
                  className={cn(
                    "mt-4 block text-center",
                    "font-mono text-[11px] text-fg-muted",
                    "transition-colors duration-base hover:text-fg-primary",
                    "min-h-[44px] flex items-center justify-center",
                  )}
                >
                  или позвонить +7 (917) 918-38-77
                </a>

                {/* Trust */}
                <div className="mt-6 border-t border-border-default pt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-subtle">
                    ★★★★★ 5,0 · 394 отзыва · Яндекс.Карты
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related services ── */}
      {related.length > 0 && (
        <section className="border-t border-border-default bg-bg-secondary py-16 md:py-24">
          <div className="mx-auto max-w-screen-xl px-6 md:px-8">
            <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted md:mb-12">
              Похожие услуги
            </p>
            <div
              className={cn(
                "-mx-6 flex gap-4 overflow-x-auto px-6 pb-4",
                "snap-x snap-mandatory",
                "md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 md:snap-none",
              )}
            >
              {related.map(({ service: rel, category: relCat }, i) => (
                <motion.div
                  key={rel.id}
                  className="w-[260px] shrink-0 snap-start md:w-auto"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                  whileInView={
                    reduced ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0% 0)" }
                  }
                  viewport={{ once: true, margin: "-5% 0px" }}
                  transition={{ duration: 0.8, ease: clipEase, delay: i * 0.1 }}
                >
                  <RelatedCard service={rel} category={relCat} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function RelatedCard({ service, category }: { service: Service; category: ServiceCategory }) {
  const price = priceLabel(service);
  const duration = formatDuration(service.duration);

  return (
    <NextLink
      href={`/services/${service.id}`}
      className={cn(
        "group flex h-[200px] flex-col justify-between p-6 md:h-[220px]",
        "bg-bg-tertiary border border-border-default",
        "transition-[border-color] duration-base hover:border-accent",
      )}
    >
      {/* Top */}
      <div className="flex flex-col gap-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
          {category.name}
        </p>
        <h3 className="font-display font-normal text-[1.125rem] leading-snug text-fg-primary">
          {service.name}
        </h3>
      </div>

      {/* Bottom */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-body-sm text-fg-primary">{price}</span>
          <span className="font-mono text-[11px] text-fg-muted">{duration}</span>
        </div>
        <span
          className={cn(
            "font-mono text-[11px] text-fg-muted",
            "-translate-x-2 opacity-0",
            "transition-[opacity,transform] duration-base",
            "group-hover:translate-x-0 group-hover:opacity-100",
          )}
          aria-hidden="true"
        >
          →
        </span>
      </div>
    </NextLink>
  );
}
