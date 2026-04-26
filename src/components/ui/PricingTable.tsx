"use client";

import { useId, useState } from "react";

import { SERVICE_CATEGORIES, type ServiceCategory } from "@/data/services";
import { cn } from "@/lib/cn";
import { formatDuration, formatPrice, formatPriceFrom, formatPriceRange } from "@/lib/format";

type Props = {
  categories?: ServiceCategory[];
  className?: string;
};

export function PricingTable({ categories = SERVICE_CATEGORIES, className }: Props) {
  const uid = useId();
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(categories.map((c) => [c.id, true])),
  );

  const toggle = (id: string) => setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className={cn("w-full", className)}>
      {categories.map((category) => {
        const isOpen = openMap[category.id] ?? true;
        const btnId = `${uid}-cat-${category.id}`;
        const panelId = `${uid}-panel-${category.id}`;

        return (
          <div key={category.id} className="border-t border-border-default">
            <button
              id={btnId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(category.id)}
              className={cn(
                "flex w-full items-center justify-between py-6",
                "text-left transition-colors duration-base",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg-primary",
              )}
            >
              <span className="font-display text-h4 text-fg-primary">{category.name}</span>
              <div className="flex items-center gap-4">
                <span className="font-mono text-caption text-fg-muted">
                  {category.services.length} услуг
                </span>
                <ChevronIcon
                  className={cn(
                    "h-4 w-4 flex-shrink-0 text-fg-muted transition-transform duration-base",
                    isOpen && "rotate-180",
                  )}
                />
              </div>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className="grid transition-[grid-template-rows] duration-slow ease-[var(--ease-out-expo)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="pb-2">
                  {category.services.map((service) => {
                    const priceStr = Array.isArray(service.price)
                      ? formatPriceRange(service.price[0], service.price[1])
                      : service.from
                        ? formatPriceFrom(service.price)
                        : formatPrice(service.price);

                    return (
                      <div
                        key={service.id}
                        className={cn(
                          "group flex items-start justify-between gap-6",
                          "border-t border-border-default py-4",
                          "transition-[border-color] duration-base",
                          "hover:border-fg-muted/30",
                        )}
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="font-sans text-body text-fg-primary">
                            {service.name}
                          </span>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
                            <span className="font-mono text-caption text-fg-muted">
                              {formatDuration(service.duration)}
                            </span>
                            {service.note && (
                              <span className="font-mono text-caption text-fg-muted/60">
                                {service.note}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="flex-shrink-0 font-mono text-body-sm text-fg-primary">
                          {priceStr}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="border-t border-border-default" />
    </div>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={className}
      aria-hidden="true"
    >
      <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
