"use client";

import { useCallback, useRef, useState } from "react";

import { type UploadedPhoto } from "@/components/sections/TryOnSection";

interface Props {
  onSuccess: (photo: UploadedPhoto) => void;
}

const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

export function PhotoUpload({ onSuccess }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const process = useCallback(
    (file: File) => {
      setError(null);
      if (!ALLOWED_MIME.includes(file.type)) {
        setError("Поддерживаются форматы JPEG, PNG, WebP.");
        return;
      }
      if (file.size > MAX_BYTES) {
        setError("Файл не должен превышать 8 МБ.");
        return;
      }
      const preview = URL.createObjectURL(file);
      onSuccess({ file, preview });
    },
    [onSuccess],
  );

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) process(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) process(file);
  };

  return (
    <div className="mx-auto max-w-xl py-8">
      <div
        role="button"
        tabIndex={0}
        aria-label="Загрузить фото"
        className={[
          "flex cursor-pointer flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed px-8 py-20 transition-colors",
          dragging ? "border-accent bg-accent/5" : "border-border-default hover:border-fg-muted",
        ].join(" ")}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-fg-muted">
          <path
            d="M20 28V12m0 0l-6 6m6-6l6 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="6" y="30" width="28" height="2" rx="1" fill="currentColor" opacity="0.3" />
        </svg>

        <div className="text-center">
          <p className="font-sans text-sm text-fg-primary">
            Перетащите фото или <span className="underline underline-offset-4">выберите файл</span>
          </p>
          <p className="mt-2 font-mono text-[12px] uppercase tracking-widest text-fg-muted">
            JPEG · PNG · WebP · до 8 МБ
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={handleFile}
      />

      {error && (
        <p role="alert" className="mt-4 text-center font-sans text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}
