"use client";

import { startTransition, useEffect, useState } from "react";

import { cn } from "@/lib/cn";

type Speed = "slow" | "normal" | "fast";
type Direction = "left" | "right";

const DURATIONS: Record<Speed, string> = {
  slow: "60s",
  normal: "30s",
  fast: "15s",
};

type Props = {
  speed?: Speed;
  direction?: Direction;
  pauseOnHover?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Marquee({
  speed = "normal",
  direction = "left",
  pauseOnHover = false,
  className,
  children,
}: Props) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    startTransition(() =>
      setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches),
    );
  }, []);

  if (reduced) {
    return (
      <div className={cn("flex items-center gap-8 overflow-hidden", className)}>{children}</div>
    );
  }

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className={cn("flex w-max", pauseOnHover && "hover:[animation-play-state:paused]")}
        style={{
          animation: `marquee ${DURATIONS[speed]} linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden="true" className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
