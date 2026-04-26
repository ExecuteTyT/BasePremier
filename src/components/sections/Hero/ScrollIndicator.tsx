"use client";

import { cn } from "@/lib/cn";

export function ScrollIndicator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute bottom-8 left-1/2 -translate-x-1/2",
        "flex flex-col items-center gap-2",
        className,
      )}
      aria-hidden="true"
    >
      <div className="relative h-10 w-px overflow-hidden bg-fg-muted/20">
        <div className="scroll-line absolute inset-x-0 top-0 bg-fg-muted" />
      </div>
      <span
        className="origin-center rotate-90 font-mono text-[10px] uppercase tracking-widest text-fg-muted/60"
        style={{ writingMode: "vertical-rl" }}
      >
        scroll
      </span>

      <style>{`
        .scroll-line {
          height: 100%;
          animation: scroll-grow 2s ease-in-out infinite;
        }
        @keyframes scroll-grow {
          0%   { transform: scaleY(0); transform-origin: top; }
          45%  { transform: scaleY(1); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: bottom; }
          95%  { transform: scaleY(0); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: top; }
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-line { animation: none; transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
