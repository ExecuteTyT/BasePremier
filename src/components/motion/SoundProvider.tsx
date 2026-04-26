"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  startTransition,
} from "react";

import { playSound, type SoundName } from "@/lib/sounds";

type SoundContextValue = {
  muted: boolean;
  toggle: () => void;
  play: (name: SoundName) => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("bp:muted");
    if (stored !== null) startTransition(() => setMuted(stored === "true"));
  }, []);

  const toggle = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      localStorage.setItem("bp:muted", String(next));
      return next;
    });
  }, []);

  const play = useCallback(
    (name: SoundName) => {
      playSound(name, muted);
    },
    [muted],
  );

  return <SoundContext.Provider value={{ muted, toggle, play }}>{children}</SoundContext.Provider>;
}

export function useSoundContext(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSoundContext must be used within SoundProvider");
  return ctx;
}
