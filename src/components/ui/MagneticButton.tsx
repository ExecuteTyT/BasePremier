"use client";

import { useEffect, useRef } from "react";

import { useSoundContext } from "@/components/motion/SoundProvider";
import { Button, type ButtonVariant, type ButtonSize } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";

type Props = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export function MagneticButton({ className, children, ...buttonProps }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { play } = useSoundContext();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = wrapRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      gsap.to(el, {
        x: dx * rect.width * 0.3,
        y: dy * rect.height * 0.3,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    };

    const onEnter = () => play("hover");

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [play]);

  return (
    <div ref={wrapRef} data-cursor="magnet" className={cn("inline-block", className)}>
      <Button
        {...buttonProps}
        onClick={(e) => {
          play("click");
          buttonProps.onClick?.(e);
        }}
      >
        {children}
      </Button>
    </div>
  );
}
