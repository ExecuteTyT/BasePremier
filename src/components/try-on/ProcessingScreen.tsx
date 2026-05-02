"use client";

import { useEffect, useRef, useState } from "react";

import { type SelectedStyle, type UploadedPhoto } from "@/components/sections/TryOnSection";

interface Props {
  photo: UploadedPhoto;
  style: SelectedStyle;
  onComplete: () => void;
}

type Phase = "uploading" | "processing" | "done" | "error";

const POLL_INTERVAL_MS = 2500;
const LABELS: Record<Phase, string> = {
  uploading: "Отправляем фото...",
  processing: "ИИ подбирает образ...",
  done: "Готово",
  error: "Произошла ошибка",
};

export function ProcessingScreen({ photo, style, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>("uploading");
  const [error, setError] = useState<string | null>(null);
  const jobIdRef = useRef<string | null>(null);
  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      if (pollTimer.current) clearTimeout(pollTimer.current);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function submit() {
      try {
        const body = new FormData();
        body.append("photo", photo.file);
        body.append("styleId", style.id);

        const res = await fetch("/api/hairstyle/generate", {
          method: "POST",
          body,
        });

        if (!res.ok) {
          const json = (await res.json()) as { error?: string };
          throw new Error(json.error ?? `HTTP ${res.status}`);
        }

        const { jobId } = (await res.json()) as { jobId: string };
        if (cancelled) return;

        jobIdRef.current = jobId;
        setPhase("processing");
        poll(jobId);
      } catch (err) {
        if (!cancelled) {
          setPhase("error");
          setError(err instanceof Error ? err.message : "Неизвестная ошибка");
        }
      }
    }

    function poll(jobId: string) {
      if (cancelled) return;
      pollTimer.current = setTimeout(async () => {
        try {
          const res = await fetch(`/api/hairstyle/status/${jobId}`);
          if (!res.ok) {
            const json = (await res.json()) as { error?: string };
            throw new Error(json.error ?? `HTTP ${res.status}`);
          }
          const data = (await res.json()) as {
            status: string;
            resultUrl?: string;
            error?: string;
          };

          if (cancelled) return;

          if (data.status === "completed") {
            setPhase("done");
            onComplete();
          } else if (data.status === "failed") {
            throw new Error(data.error ?? "Обработка завершилась с ошибкой");
          } else {
            poll(jobId);
          }
        } catch (err) {
          if (!cancelled) {
            setPhase("error");
            setError(err instanceof Error ? err.message : "Неизвестная ошибка");
          }
        }
      }, POLL_INTERVAL_MS);
    }

    void submit();
    return () => {
      cancelled = true;
      if (pollTimer.current) clearTimeout(pollTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-24">
      {phase !== "error" ? (
        <>
          <div className="relative h-16 w-16">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-20" />
            <span className="absolute inset-2 rounded-full border-2 border-accent" />
          </div>
          <p className="font-sans text-base text-fg-primary">{LABELS[phase]}</p>
          <p className="font-mono text-[12px] uppercase tracking-widest text-fg-muted">
            {style.name}
          </p>
        </>
      ) : (
        <>
          <p className="font-sans text-base text-error">{LABELS.error}</p>
          {error && <p className="font-mono text-[12px] text-fg-muted">{error}</p>}
        </>
      )}
    </div>
  );
}
