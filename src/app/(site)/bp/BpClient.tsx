"use client";

import dynamic from "next/dynamic";
import NextLink from "next/link";

const BpScene = dynamic(() => import("@/components/three/BpScene"), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-[#0A0A0B]" />,
});

export function BpClient() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0A0A0B]">
      <BpScene />

      <div className="pointer-events-none absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg-muted/40">
          base premier · monogram study · bp
        </p>
      </div>

      <NextLink
        href="/"
        className="absolute left-6 top-6 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted/30 transition-opacity hover:opacity-70 md:left-8 md:top-8"
      >
        ← главная
      </NextLink>
    </div>
  );
}
