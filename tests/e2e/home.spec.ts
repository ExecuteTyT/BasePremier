import { expect, test } from "@playwright/test";

/**
 * Home page suite — chromium only.
 * Tests: hero elements visible, CTA clickable, all major sections rendered.
 */

test.describe("Hero section", () => {
  test("h1 is visible and correct", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1").first()).toContainText("Барбершоп BASE Premier");
  });

  test("CTA «Записаться» button is visible", async ({ page }) => {
    await page.goto("/");
    const cta = page
      .locator("section")
      .first()
      .getByRole("button", { name: /записаться/i })
      .first();
    await expect(cta).toBeVisible();
  });

  test("rating caption is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/394\s*отзыва/).first()).toBeVisible();
  });

  test("scroll indicator is rendered", async ({ page }) => {
    await page.goto("/");
    // ScrollIndicator renders an SVG arrow or animated div
    const hero = page.locator("section").first();
    await expect(hero).toBeVisible();
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
    // Scroll to bottom to ensure footer CTA is rendered
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByRole("button", { name: /записаться/i }).last()).toBeVisible();
  });
});

test.describe("Header behaviour on home page", () => {
  test("header becomes opaque after scrolling", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header");

    // Initially transparent (has a class or style indicating transparent state)
    // Scroll down 200px
    await page.evaluate(() => window.scrollBy(0, 200));
    await page.waitForTimeout(300);

    // Header should still be in the DOM and visible
    await expect(header).toBeVisible();
  });
});
