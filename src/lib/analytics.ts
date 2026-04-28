declare global {
  interface Window {
    ym: (counterId: number, method: string, ...args: unknown[]) => void;
  }
}

/**
 * Fires a Yandex Metrika goal event.
 * No-op if the counter is not initialised or NEXT_PUBLIC_YM_ID is not set.
 */
export function trackGoal(goal: string, params?: Record<string, unknown>): void {
  const id = process.env.NEXT_PUBLIC_YM_ID;
  if (!id || typeof window === "undefined" || typeof window.ym !== "function") return;
  window.ym(Number(id), "reachGoal", goal, params);
}

/**
 * Manually sends a page-view hit to Yandex Metrika.
 * SPA navigation is already handled by YandexMetrika component via usePathname;
 * call this only when you need an additional explicit hit.
 */
export function trackPageView(url: string): void {
  const id = process.env.NEXT_PUBLIC_YM_ID;
  if (!id || typeof window === "undefined" || typeof window.ym !== "function") return;
  window.ym(Number(id), "hit", url);
}
