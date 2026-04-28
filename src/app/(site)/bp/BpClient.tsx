"use client";

import dynamic from "next/dynamic";
import NextLink from "next/link";
import { useEffect, useState } from "react";

const BpScene = dynamic(() => import("@/components/three/BpScene"), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-[#0A0A0B]" />,
});

export function BpClient() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (!introComplete) return;
    // Show drag hint 0.8s after intro ends
    const t = setTimeout(() => setShowHint(true), 800);
    return () => clearTimeout(t);
  }, [introComplete]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0A0A0B]">
      {/* 3D Canvas */}
      <BpScene onIntroComplete={() => setIntroComplete(true)} />

      {/* Back link — top left */}
      <NextLink
        href="/"
        className="absolute left-6 top-6 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted/30 transition-opacity hover:opacity-70 md:left-8 md:top-8"
        aria-label="На главную"
      >
        ← главная
      </NextLink>

      {/* Brand watermark — bottom left */}
      <div
        className="pointer-events-none absolute bottom-8 left-6 md:left-8"
        style={{
          opacity: introComplete ? 1 : 0,
          transition: "opacity 1.2s cubic-bezier(0.19, 1, 0.22, 1)",
          transitionDelay: introComplete ? "0.2s" : "0s",
        }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg-muted/25">
          base premier
        </p>
        <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-fg-muted/15">
          monogram study · bp
        </p>
      </div>

      {/* Drag hint — bottom right, appears after intro */}
      <div
        className="pointer-events-none absolute bottom-8 right-6 md:right-8"
        style={{
          opacity: showHint ? 1 : 0,
          transition: "opacity 1.5s cubic-bezier(0.19, 1, 0.22, 1)",
        }}
        aria-hidden="true"
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-fg-muted/20">
          drag to rotate
        </p>
      </div>

      {/* Thin horizontal rule — center bottom accent */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 flex justify-center"
        aria-hidden="true"
      >
        <div
          className="h-px bg-fg-muted/5"
          style={{
            width: introComplete ? "40vw" : "0vw",
            transition: "width 2s cubic-bezier(0.19, 1, 0.22, 1)",
            transitionDelay: "0.4s",
          }}
        />
      </div>
    </div>
  );
}
