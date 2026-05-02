import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/qa-live-375.spec.ts",
  fullyParallel: false,
  retries: 0,
  workers: 1,
  timeout: 60_000,
  reporter: [["list"]],
  use: {
    baseURL: "https://base-premier.vercel.app",
    trace: "off",
    screenshot: "off",
    actionTimeout: 30_000,
    navigationTimeout: 60_000,
  },
  projects: [
    {
      name: "mobile-375",
      use: {
        ...devices["Pixel 5"],
        viewport: { width: 375, height: 812 },
        isMobile: true,
        hasTouch: true,
        userAgent:
          "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.58 Mobile Safari/537.36",
      },
    },
  ],
});
