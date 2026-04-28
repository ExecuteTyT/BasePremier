// Re-export Sentry helpers so the rest of the codebase imports from one place
// rather than depending on @sentry/nextjs directly.
//
// Usage:
//   import { captureException, captureMessage } from "@/lib/sentry";
export { captureException, captureMessage } from "@sentry/nextjs";
