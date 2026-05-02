import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "**/live-qa.spec.ts",
  fullyParallel: false,
  retries: 1,
  workers: 2,
  timeout: 60_000,
  reporter: [["list"], ["json", { outputFile: "tests/screenshots/live-qa/results.json" }]],
  use: {
    baseURL: "https://base-premier.vercel.app",
    trace: "off",
    screenshot: "on",
    actionTimeout: 20_000,
    navigationTimeout: 45_000,
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
