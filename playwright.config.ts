import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  // Cap workers at 4 locally to prevent dev-server overload across 5 browser projects
  // running concurrently — each project hits localhost:3000, and uncapped parallelism
  // causes Next.js dev-server to time out on slower browsers (Firefox, WebKit).
  workers: process.env.CI ? 1 : 4,
  // 45 s per test globally — handles slow Firefox page.goto() under parallel load
  // (the /contacts page with Yandex Maps iframe can take ~35 s in Firefox when
  // multiple projects hammer localhost:3000 concurrently).
  timeout: 45_000,
  reporter: [["html", { open: "never" }], ["list"]],

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    // 45 s per test — generous enough for slow browsers (Firefox SSR hydration,
    // WebKit map-iframe negotiation) while still catching real hangs quickly.
    actionTimeout: 15_000,
    navigationTimeout: 45_000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      // Explicitly exclude mobile.spec.ts — it targets mobile viewport projects only.
      testMatch: [
        "**/smoke.spec.ts",
        "**/navigation.spec.ts",
        "**/home.spec.ts",
        "**/pages.spec.ts",
        "**/axe.spec.ts",
        "**/qa-visual.spec.ts",
      ],
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      testMatch: "**/smoke.spec.ts",
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
      testMatch: ["**/smoke.spec.ts", "**/navigation.spec.ts"],
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
      testMatch: ["**/smoke.spec.ts", "**/mobile.spec.ts"],
    },
    {
      name: "mobile-safari",
      use: { ...devices["iPhone 12"] },
      testMatch: ["**/smoke.spec.ts", "**/mobile.spec.ts"],
    },
  ],

  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
