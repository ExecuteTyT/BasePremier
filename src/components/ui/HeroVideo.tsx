"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";

type Props = {
  src: string;
  poster: string;
  mobilePoster?: string;
  className?: string;
};

export function HeroVideo({ src, poster, mobilePoster, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const loadVideo = () => {
      const video = videoRef.current;
      if (!video) return;
      video.src = src;
      video.load();
    };

    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(loadVideo, { timeout: 3000 });
      return () => cancelIdleCallback(id);
    }

    const id = setTimeout(loadVideo, 500);
    return () => clearTimeout(id);
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden", className)} aria-hidden="true">
      {/* Poster shown immediately and on mobile (video src never set on coarse pointer) */}
      <Image src={mobilePoster ?? poster} alt="" fill priority className="object-cover" />
      {/* Video element — src injected lazily on desktop via requestIdleCallback */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        preload="none"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
