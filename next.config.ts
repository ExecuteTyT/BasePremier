import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  serverExternalPackages: ["three", "@react-three/fiber", "@react-three/drei"],
  devIndicators: false,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default withSentryConfig(nextConfig, {
  // Sentry org/project slugs — set in CI/CD environment, optional locally
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Suppress Sentry CLI output except in CI
  silent: !process.env.CI,

  // Upload a wider set of source maps (includes lazy-loaded chunks)
  widenClientFileUpload: true,

  // Delete source maps from the build output after upload — keeps them off the public CDN
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },

  // Self-hosted — no Vercel Cron Monitors needed
  webpack: {
    // Tree-shake Sentry's debug logger from the production bundle
    treeshake: {
      removeDebugLogging: true,
    },
    // No Vercel Cron Monitor instrumentation
    automaticVercelMonitors: false,
  },
});
