"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/cn";

const ease = [0.19, 1, 0.22, 1] as const;

export function CtaFinalSection() {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    btnRef.current?.style.setProperty("--gx", `${x}%`);
    btnRef.current?.style.setProperty("--gy", `${y}%`);
  };

  const handleMouseLeave = () => {
    btnRef.current?.style.setProperty("--gx", "50%");
    btnRef.current?.style.setProperty("--gy", "50%");
  };

  return (
    <section className="relative overflow-hidden bg-bg-primary py-24 md:py-48">
      {/* Background BP monogram — faint depth layer */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-end pr-16",
          "select-none overflow-hidden",
        )}
      >
        <span className="font-display text-[55vw] font-bold leading-none text-fg-primary opacity-[0.03] md:text-[40vw]">
          BP
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-screen-xl px-6 md:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Heading */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease }}
          >
            <h2
              className={cn(
                "font-display font-normal leading-none text-fg-primary",
                "text-[clamp(3rem,8vw,7rem)]",
              )}
            >
              Записаться?
            </h2>
            <p className="font-mono text-caption uppercase tracking-[0.2em] text-fg-muted">
              Шаляпина, 26 · Казань · ежедневно с 10 до 21
            </p>
          </motion.div>

          {/* Giant CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            className="w-full md:w-auto"
          >
            <button
              ref={btnRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              aria-label="Записаться онлайн"
              className={cn(
                "group relative overflow-hidden",
                "h-20 w-full md:h-[120px] md:w-[480px]",
                "bg-accent text-accent-fg",
                "transition-transform duration-base hover:-translate-y-px",
                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg-primary",
                // Cursor-tracking gradient overlay
                "before:pointer-events-none before:absolute before:inset-0",
                "before:bg-[radial-gradient(circle_at_var(--gx,50%)_var(--gy,50%),rgba(255,255,255,0.10),transparent_60%)]",
                "before:opacity-0 before:transition-opacity before:duration-300",
                "hover:before:opacity-100",
              )}
              style={{ "--gx": "50%", "--gy": "50%" } as React.CSSProperties}
            >
              <span
                className={cn(
                  "relative font-display italic font-normal",
                  "text-[clamp(1.25rem,3vw,2rem)] md:text-[2rem]",
                  "tracking-tight leading-none",
                )}
              >
                Записаться онлайн
              </span>
            </button>
          </motion.div>

          {/* Phone fallback */}
          <motion.p
            className="font-mono text-caption text-fg-muted/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
          >
            или позвонить{" "}
            <a
              href="tel:+79179183877"
              className={cn(
                "inline-flex min-h-[44px] items-center",
                "text-fg-muted",
                "border-b border-fg-muted/30 pb-px",
                "transition-[border-color,color] duration-base",
                "hover:border-fg-primary hover:text-fg-primary",
              )}
            >
              +7 (917) 918-38-77
            </a>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
