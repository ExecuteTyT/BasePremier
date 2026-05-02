"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { PhotoUpload } from "@/components/try-on/PhotoUpload";
import { ProcessingScreen } from "@/components/try-on/ProcessingScreen";
import { ResultsGrid } from "@/components/try-on/ResultsGrid";
import { StyleSelector } from "@/components/try-on/StyleSelector";
import type { UploadedPhoto, SelectedStyle } from "@/components/try-on/types";

export type { UploadedPhoto, SelectedStyle };

type Step = "upload" | "style" | "processing" | "results";

const STEPS: { id: Step; label: string }[] = [
  { id: "upload", label: "Фото" },
  { id: "style", label: "Стиль" },
  { id: "processing", label: "Примерка" },
  { id: "results", label: "Результат" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function TryOnSection() {
  const shouldReduce = useReducedMotion();

  const [step, setStep] = useState<Step>("upload");
  const [photo, setPhoto] = useState<UploadedPhoto | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<SelectedStyle | null>(null);

  const currentIndex = STEPS.findIndex((s) => s.id === step);

  const handlePhotoReady = (uploaded: UploadedPhoto) => {
    setPhoto(uploaded);
    setStep("style");
  };

  const handleStyleSelect = (style: SelectedStyle) => {
    setSelectedStyle(style);
    setStep("processing");
  };

  const handleProcessingComplete = () => {
    setStep("results");
  };

  const handleReset = () => {
    if (photo) URL.revokeObjectURL(photo.preview);
    setPhoto(null);
    setSelectedStyle(null);
    setStep("upload");
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* ── Hero ── */}
      <section className="pb-0 pt-28 md:pt-40">
        <div className="mx-auto max-w-screen-xl px-6 md:px-8">
          <p className="mb-6 font-mono text-[13px] uppercase tracking-[0.2em] text-fg-muted">
            Виртуальная примерка
          </p>
          <h1
            className="font-display font-normal text-fg-primary"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            Найдите свой стиль
          </h1>
          <p className="mt-6 max-w-lg font-sans text-body leading-relaxed text-fg-muted">
            Загрузите фото — ИИ подберёт образ из нашего каталога и покажет результат до визита.
          </p>
        </div>
      </section>

      {/* ── Step indicator ── */}
      <div className="mx-auto max-w-screen-xl px-6 py-10 md:px-8">
        <div className="flex items-center gap-0">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className={[
                    "flex h-7 w-7 items-center justify-center rounded-full font-mono text-[11px] transition-colors",
                    i <= currentIndex
                      ? "bg-accent text-accent-fg"
                      : "border border-border-default text-fg-subtle",
                  ].join(" ")}
                  style={{
                    transition:
                      "background-color var(--duration-slow) var(--ease-out-quart), color var(--duration-slow) var(--ease-out-quart)",
                  }}
                >
                  {i < currentIndex ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5l2 2.5L8 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={[
                    "font-sans text-[13px] transition-colors",
                    i === currentIndex ? "text-fg-primary" : "text-fg-subtle",
                  ].join(" ")}
                  style={{ transition: "color var(--duration-base) var(--ease-out-quart)" }}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="mx-4 h-px w-8 overflow-hidden bg-border-default">
                  <div
                    className="h-full bg-accent"
                    style={{
                      width: i < currentIndex ? "100%" : "0%",
                      transition: "width var(--duration-slow) var(--ease-out-expo)",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Step content ── */}
      <div className="mx-auto max-w-screen-xl px-6 pb-24 md:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: shouldReduce ? 0 : 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: shouldReduce ? 0 : -32 }}
            transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
          >
            {step === "upload" && <PhotoUpload onSuccess={handlePhotoReady} />}

            {step === "style" && photo && (
              <StyleSelector photo={photo} onSelect={handleStyleSelect} />
            )}

            {step === "processing" && photo && selectedStyle && (
              <ProcessingScreen
                photo={photo}
                style={selectedStyle}
                onComplete={handleProcessingComplete}
              />
            )}

            {step === "results" && photo && selectedStyle && (
              <ResultsGrid photo={photo} style={selectedStyle} onReset={handleReset} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
