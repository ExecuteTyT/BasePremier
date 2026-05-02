"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { type SelectedStyle, type UploadedPhoto } from "@/components/sections/TryOnSection";

interface Props {
  photo: UploadedPhoto;
  style: SelectedStyle;
  onReset: () => void;
}

interface ResultData {
  resultUrl: string;
  status: string;
}

export function ResultsGrid({ photo, style, onReset }: Props) {
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(
    () => typeof window !== "undefined" && !!sessionStorage.getItem("hairstyle_job_id"),
  );

  useEffect(() => {
    // The job is complete when we reach this step — fetch the cached result
    // by re-reading from the last known jobId stored in sessionStorage (set by ProcessingScreen).
    const jobId = sessionStorage.getItem("hairstyle_job_id");
    if (!jobId) return;

    fetch(`/api/hairstyle/status/${jobId}`)
      .then((r) => r.json())
      .then((data: ResultData) => {
        if (data.resultUrl) setResultUrl(data.resultUrl);
      })
      .catch(() => {
        /* result already shown */
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-8">
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Original */}
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-fg-muted">До</p>
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-bg-secondary">
            <Image
              src={photo.preview}
              alt="Исходное фото"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* Result */}
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-fg-muted">
            Стиль: {style.name}
          </p>
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-bg-secondary">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-fg-muted border-t-transparent" />
              </div>
            )}
            {resultUrl && (
              <Image
                src={resultUrl}
                alt={`Стиль ${style.name}`}
                fill
                className="object-cover"
                unoptimized
              />
            )}
            {!loading && !resultUrl && (
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                <p className="font-sans text-sm text-fg-muted">
                  Результат недоступен. Попробуйте ещё раз.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-center">
        <a
          href="#booking"
          className="rounded-full bg-accent px-8 py-3 font-sans text-sm text-accent-fg transition-opacity hover:opacity-90"
        >
          Записаться на {style.service}
        </a>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-border-default px-8 py-3 font-sans text-sm text-fg-primary transition-colors hover:border-fg-muted"
        >
          Попробовать другой стиль
        </button>
      </div>
    </div>
  );
}
