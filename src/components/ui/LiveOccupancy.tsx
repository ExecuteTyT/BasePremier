"use client";

import { cn } from "@/lib/cn";

type Props = {
  // Will be replaced with real YClients data in YC-XX integration phase
  freeSlots?: number;
  className?: string;
};

export function LiveOccupancy({ freeSlots = 3, className }: Props) {
  const isBusy = freeSlots <= 1;
  const label = freeSlots === 0 ? "Все мастера заняты" : `Свободно ${freeSlots} мастера`;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5",
        "rounded-none border border-border-default bg-bg-secondary",
        "px-3 py-2",
        className,
      )}
    >
      <span className="relative flex h-2 w-2 flex-shrink-0">
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
            isBusy ? "bg-error" : "bg-success",
          )}
        />
        <span
          className={cn(
            "relative inline-flex h-2 w-2 rounded-full",
            isBusy ? "bg-error" : "bg-success",
          )}
        />
      </span>
      <span className="font-mono text-caption text-fg-muted">{label}</span>
    </div>
  );
}
