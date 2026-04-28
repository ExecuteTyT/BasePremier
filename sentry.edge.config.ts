import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // 10% sampling — mirrors client/server config
  tracesSampleRate: 0.1,

  // Silently no-op when DSN is not configured
  enabled: !!process.env.SENTRY_DSN,
});
