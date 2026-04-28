import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // 10% sampling — low-traffic site, keep costs/noise down
  tracesSampleRate: 0.1,

  // Session Replay is off — privacy-first, no need for replay data
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,

  // Silently no-op when DSN is not configured (e.g. local dev without .env.local)
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
});
