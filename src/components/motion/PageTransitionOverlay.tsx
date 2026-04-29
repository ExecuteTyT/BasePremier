"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { lenisInstance } from "@/components/motion/SmoothScrollProvider";
import { gsap } from "@/lib/gsap";

// Module-level flag prevents overlapping transitions
let isTransitioning = false;

export function PageTransitionOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Start hidden — ready to wipe in from the left
    gsap.set(overlay, { clipPath: "inset(0 100% 0 0)" });

    function handleClick(e: MouseEvent) {
      const anchor = (e.target as Element).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/")) return;
      if (href.startsWith("/#") || href === window.location.pathname) return;
      if (anchor.getAttribute("target") === "_blank") return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (isTransitioning) return;

      e.preventDefault();
      isTransitioning = true;

      // Snap to top while hidden under the curtain
      lenisInstance?.scrollTo(0, { immediate: true });

      // ENTER: curtain wipes in left→right, covering the page
      gsap.to(overlay, {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.55,
        ease: "cubic-bezier(0.76, 0, 0.24, 1)",
        onComplete() {
          setTimeout(() => {
            router.push(href);

            // EXIT: curtain slides away to the right, revealing the new page
            gsap.to(overlay, {
              clipPath: "inset(0 0 0 100%)",
              duration: 0.55,
              ease: "cubic-bezier(0.76, 0, 0.24, 1)",
              delay: 0.05,
              onComplete() {
                isTransitioning = false;
                // Reset for next use
                gsap.set(overlay, { clipPath: "inset(0 100% 0 0)" });
              },
            });
          }, 80);
        },
      });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [router]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9990] bg-bg-primary"
    />
  );
}
