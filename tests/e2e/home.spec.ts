import { expect, test } from "@playwright/test";

/**
 * Home page suite — chromium only.
 * Tests: hero elements visible, CTA clickable, all major sections rendered.
 */

function filterConsoleErrors(errors: string[]): string[] {
  return errors.filter(
    (e) =>
      !e.toLowerCase().includes("favicon") &&
      !e.toLowerCase().includes("sentry") &&
      !e.toLowerCase().includes("net::err") &&
      !e.toLowerCase().includes("failed to load resource"),
  );
}

test.describe("Hero section", () => {
  test("h1 is visible and correct", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    await page.goto("/");
    await expect(page.locator("h1").first()).toContainText("Мужской салон красоты BASE Premier");

    const realErrors = filterConsoleErrors(consoleErrors);
    expect(realErrors, "Console errors on /").toHaveLength(0);
  });

  test("CTA «Записаться» button is visible", async ({ page }) => {
    await page.goto("/");
    const cta = page
      .locator("section")
      .first()
      .getByRole("button", { name: /записаться/i });
    await expect(cta).toBeVisible();
  });

  test("rating caption is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/394\s*отзыва/).first()).toBeVisible();
  });

  test("scroll indicator is rendered", async ({ page }) => {
    await page.goto("/");
    // ScrollIndicator has aria-hidden="true" so we check DOM attachment.
    // It contains a .scroll-line animated div and a "scroll" caption.
    const scrollLine = page.locator(".scroll-line");
    await expect(scrollLine).toBeAttached();
  });
});

test.describe("Home page sections", () => {
  // Note: "мастера" section heading is "10 мастеров" in the actual DOM.
  // CharReveal splits text into char spans, so getByRole('heading') accessible name
  // matching doesn't work — use locator('h2').filter({ hasText }) instead.
  const SECTION_HEADINGS = [/услуги/i, /мастер/i, /интерьер/i, /отзывы/i];

  for (const heading of SECTION_HEADINGS) {
    test(`section with "${heading.source}" heading is visible`, async ({ page }) => {
      await page.goto("/");
      await expect(page.locator("h2").filter({ hasText: heading }).first()).toBeVisible();
    });
  }

  test("footer CTA section has «Записаться» button", async ({ page }) => {
    await page.goto("/");
    // CtaFinalSection is a RSC-rendered section; button has aria-label="Записаться онлайн"
    await expect(page.getByRole("button", { name: "Записаться онлайн" })).toBeVisible();
  });
});

test.describe("Header behaviour on home page", () => {
  test("header is present with correct initial state", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header");
    await expect(header).toBeVisible();
    // Initially not scrolled — data-scrolled starts as "false"
    await expect(header).toHaveAttribute("data-scrolled", "false");
  });
});
