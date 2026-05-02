"use client";

import Image from "next/image";
import { useState } from "react";

import { type SelectedStyle, type UploadedPhoto } from "@/components/sections/TryOnSection";
import { HAIRSTYLE_STYLES } from "@/lib/hairstyle/types";

const SERVICE_MAP: Record<string, string> = {
  "fade-low": "Мужская стрижка",
  "fade-mid": "Мужская стрижка",
  "fade-high": "Мужская стрижка",
  taper: "Мужская стрижка",
  undercut: "Мужская стрижка с бородой",
  "textured-crop": "Мужская стрижка",
  pompadour: "Мужская стрижка с бородой",
  "slick-back": "Стрижка машинкой",
};

interface Props {
  photo: UploadedPhoto;
  onSelect: (style: SelectedStyle) => void;
}

export function StyleSelector({ photo, onSelect }: Props) {
  const [active, setActive] = useState<string | null>(null);

  const handleConfirm = () => {
    const style = HAIRSTYLE_STYLES.find((s) => s.id === active);
    if (!style) return;
    onSelect({
      id: style.id,
      name: style.label,
      description: style.label,
      service: SERVICE_MAP[style.id] ?? "Мужская стрижка",
    });
  };

  return (
    <div className="py-8">
      <div className="mb-10 flex items-start gap-6">
        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl">
          <Image src={photo.preview} alt="Ваше фото" fill className="object-cover" unoptimized />
        </div>
        <div>
          <p className="font-sans text-sm text-fg-muted">Ваше фото загружено.</p>
          <p className="mt-1 font-sans text-base text-fg-primary">Выберите стиль для примерки:</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {HAIRSTYLE_STYLES.map((style) => (
          <button
            key={style.id}
            type="button"
            onClick={() => setActive(style.id)}
            className={[
              "group relative overflow-hidden rounded-xl border transition-all",
              active === style.id
                ? "border-accent ring-2 ring-accent/40"
                : "border-border-default hover:border-fg-muted",
            ].join(" ")}
          >
            <div className="relative aspect-[3/4] w-full bg-bg-secondary">
              <Image
                src={style.referenceUrl}
                alt={style.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
            </div>
            <div className="p-3 text-left">
              <p className="font-sans text-sm text-fg-primary">{style.label}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-10 flex justify-end">
        <button
          type="button"
          disabled={!active}
          onClick={handleConfirm}
          className="rounded-full bg-accent px-8 py-3 font-sans text-sm text-accent-fg transition-opacity disabled:opacity-40"
        >
          Примерить
        </button>
      </div>
    </div>
  );
}
