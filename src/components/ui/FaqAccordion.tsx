"use client";

import { useId, useState } from "react";

import { cn } from "@/lib/cn";

type Item = { question: string; answer: string };

type Props = {
  items: Item[];
  defaultOpen?: number;
  className?: string;
};

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <line
        x1="8"
        y1="1"
        x2="8"
        y2="15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="1"
        y1="8"
        x2="15"
        y2="8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FaqAccordion({ items, defaultOpen, className }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen ?? null);
  const uid = useId();

  return (
    <div className={cn("flex flex-col", className)}>
      {items.map(({ question, answer }, index) => {
        const open = openIndex === index;
        const btnId = `${uid}-btn-${index}`;
        const panelId = `${uid}-panel-${index}`;

        return (
          <div
            key={index}
            className={cn(
              "border-t border-border-default",
              index === items.length - 1 && "border-b",
            )}
          >
            <button
              id={btnId}
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              aria-controls={panelId}
              className={cn(
                "flex w-full items-center justify-between gap-6 py-5 text-left",
                "font-sans text-h4 text-fg-primary",
                "transition-colors duration-base hover:text-fg-muted",
                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg-primary",
              )}
            >
              <span>{question}</span>
              <span
                className={cn(
                  "flex-shrink-0 text-fg-muted transition-transform duration-base",
                  open && "rotate-45",
                )}
              >
                <PlusIcon />
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn(
                "grid transition-[grid-template-rows] duration-slow",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="pb-6 pt-1 text-body text-fg-muted">{answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
