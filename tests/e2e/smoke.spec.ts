import { expect, test } from "@playwright/test";

/**
 * Smoke suite — runs on ALL 5 browser projects.
 * Each page must: return 200, render h1, set <title> with "BASE Premier",
 * and produce zero console errors.
 */

const PAGES = [
  { path: "/", h1: "Барбершоп BASE Premier" },
  { path: "/services", h1: "Услуги" },
  { path: "/barbers", h1: "Команда" },
  { path: "/about", h1: "О нас" },
  { path: "/contacts", h1: "Адрес" },
  { path: "/journal", h1: "Журнал" },
  { path: "/privacy", h1: null },
  { path: "/barbers/marat", h1: "Марат" },
  {
    path: "/journal/kak-vybrat-strizhku-pod-formu-litsa",
    h1: "Как выбрать стрижку под форму лица",
  },
] as const;

for (const { path, h1 } of PAGES) {
  test(`${path} — loads`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    const response = await page.goto(path);

    expect(response?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();
    if (h1) {
      await expect(page.locator("h1").first()).toContainText(h1);
    }
    await expect(page).toHaveTitle(/BASE Premier/);

    // Ignore browser-injected favicon 404s, Sentry errors, dev-server chunk
    // reload noise (Next.js HMR 404/500 on _next/static/chunks), and
    // network-level failures that aren't our application code.
    const realErrors = consoleErrors.filter(
      (e) =>
        !e.toLowerCase().includes("favicon") &&
        !e.toLowerCase().includes("sentry") &&
        !e.toLowerCase().includes("net::err") &&
        // Next.js dev-server chunk hot-reload failures
        !e.toLowerCase().includes("failed to load resource"),
    );
    expect(realErrors, `Console errors on ${path}`).toHaveLength(0);
  });
}

test("/quiz — loads (no traditional h1)", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  const response = await page.goto("/quiz");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/BASE Premier/);
  await expect(page.getByText("Шаг 1 из 4")).toBeVisible();

  // Ignore browser-injected favicon 404s, Sentry errors, dev-server chunk
  // reload noise (Next.js HMR 404/500 on _next/static/chunks), and
  // network-level failures that aren't our application code.
  const realErrors = consoleErrors.filter(
    (e) =>
      !e.toLowerCase().includes("favicon") &&
      !e.toLowerCase().includes("sentry") &&
      !e.toLowerCase().includes("net::err") &&
      // Next.js dev-server chunk hot-reload failures
      !e.toLowerCase().includes("failed to load resource"),
  );
  expect(realErrors, "Console errors on /quiz").toHaveLength(0);
});

test("404 — custom not-found page", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  const response = await page.goto("/nyet-takoy-stranitsy");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1").first()).toBeVisible();

  // Ignore browser-injected favicon 404s, Sentry errors, dev-server chunk
  // reload noise (Next.js HMR 404/500 on _next/static/chunks), and
  // network-level failures that aren't our application code.
  const realErrors = consoleErrors.filter(
    (e) =>
      !e.toLowerCase().includes("favicon") &&
      !e.toLowerCase().includes("sentry") &&
      !e.toLowerCase().includes("net::err") &&
      // Next.js dev-server chunk hot-reload failures
      !e.toLowerCase().includes("failed to load resource"),
  );
  expect(realErrors, "Console errors on 404 page").toHaveLength(0);
});
