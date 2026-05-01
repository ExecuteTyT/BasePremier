"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";

// useLayoutEffect fires before paint on the client; on SSR it's a no-op.
// This lets the server deliver fully-visible HTML (good for LCP) while still
// applying the fade-in during client-side navigations (template re-mounts on route change).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  // Hide before paint so client navigations don't flash
  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.set(ref.current, { opacity: 0 });
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(ref.current, { opacity: 1 });
      return;
    }
    gsap.to(ref.current, { opacity: 1, duration: 0.5, delay: 0.15, ease: "power2.out" });
  }, []);

  return <div ref={ref}>{children}</div>;
}
