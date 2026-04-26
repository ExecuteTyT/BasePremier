"use client";

import { useSoundContext } from "@/components/motion/SoundProvider";
import { cn } from "@/lib/cn";

export function MuteToggle({ className }: { className?: string }) {
  const { muted, toggle } = useSoundContext();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={muted ? "Включить звук" : "Выключить звук"}
      aria-pressed={!muted}
      className={cn(
        "flex h-8 w-8 items-center justify-center text-fg-muted",
        "transition-colors duration-base hover:text-fg-primary",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg-primary",
        className,
      )}
    >
      {muted ? <IconMuted /> : <IconUnmuted />}
    </button>
  );
}

function IconMuted() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 4L6.5 7.5H3.5C3.22 7.5 3 7.72 3 8v4c0 .28.22.5.5.5h3l4 3.5V4Z"
        fill="currentColor"
      />
      <line
        x1="14"
        y1="8"
        x2="18"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="8"
        x2="14"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconUnmuted() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 4L6.5 7.5H3.5C3.22 7.5 3 7.72 3 8v4c0 .28.22.5.5.5h3l4 3.5V4Z"
        fill="currentColor"
      />
      <path
        d="M13.5 7.5a3 3 0 0 1 0 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M15.5 5.5a6 6 0 0 1 0 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
