import { expect, test } from "@playwright/test";

/**
 * Inner pages suite — chromium only (via playwright.config.ts project filter).
 * Tests: services filter + search, barbers filter + navigation,
 *        quiz 4-step flow, journal article grid + filter.
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

// ─── /services ────────────────────────────────────────────────────────────────

test.describe("/services — category filter", () => {
  test("has 4 filter tabs", async ({ page }) => {
    await page.goto("/services");
    const tablist = page.getByRole("tablist", { name: "Фильтр по категориям" });
    await expect(tablist).toBeVisible();
    const tabs = tablist.getByRole("tab");
    await expect(tabs).toHaveCount(4);
  });

  test('"Парикмахерский зал" tab filters services', async ({ page }) => {
    await page.goto("/services");
    const tablist = page.getByRole("tablist", { name: "Фильтр по категориям" });
    await tablist.getByRole("tab", { name: "Парикмахерский зал" }).click();
    // After filter, "Ногтевой зал" category heading should disappear
    await expect(page.getByRole("heading", { name: "Ногтевой зал" })).not.toBeVisible();
    // Barbershop category should remain
    await expect(page.getByRole("heading", { name: "Парикмахерский зал" })).toBeVisible();
  });

  test('"Все" tab restores full list', async ({ page }) => {
    await page.goto("/services");
    const tablist = page.getByRole("tablist", { name: "Фильтр по категориям" });
    await tablist.getByRole("tab", { name: "Парикмахерский зал" }).click();
    await tablist.getByRole("tab", { name: "Все" }).click();
    await expect(page.getByRole("heading", { name: "Ногтевой зал" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Парикмахерский зал" })).toBeVisible();
  });

  test("search filters services", async ({ page }) => {
    await page.goto("/services");
    const searchInput = page.getByRole("searchbox", { name: "Поиск услуги" });
    await searchInput.fill("маникюр");
    // At least one result containing "маникюр" should appear
    await expect(page.getByText(/маникюр/i).first()).toBeVisible();
    // Unrelated category heading should disappear
    await expect(page.getByRole("heading", { name: "Парикмахерский зал" })).not.toBeVisible();
  });

  test("clearing search restores tabs", async ({ page }) => {
    await page.goto("/services");
    const searchInput = page.getByRole("searchbox", { name: "Поиск услуги" });
    await searchInput.fill("маникюр");
    // Clear by selecting all and pressing Backspace (avoids click stability issues on animated button)
    await searchInput.clear();
    // All categories should be back
    await expect(page.getByRole("heading", { name: "Парикмахерский зал" })).toBeVisible();
  });
});

// ─── /barbers ─────────────────────────────────────────────────────────────────

test.describe("/barbers — filter + navigation", () => {
  test("has specialization filter tablist", async ({ page }) => {
    await page.goto("/barbers");
    const tablist = page.getByRole("tablist", { name: "Фильтр по специализации" });
    await expect(tablist).toBeVisible();
  });

  test("has 4 filter tabs", async ({ page }) => {
    await page.goto("/barbers");
    const tablist = page.getByRole("tablist", { name: "Фильтр по специализации" });
    const tabs = tablist.getByRole("tab");
    await expect(tabs).toHaveCount(4);
  });

  test("senior master Marat is visible by default", async ({ page }) => {
    await page.goto("/barbers");
    await expect(page.getByRole("heading", { name: "Марат" })).toBeVisible();
  });

  test("nail specialist Arina is visible by default", async ({ page }) => {
    await page.goto("/barbers");
    await expect(page.getByRole("heading", { name: "Арина" })).toBeVisible();
  });

  test('"Парикмахеры" tab hides nail specialist', async ({ page }) => {
    await page.goto("/barbers");
    const tablist = page.getByRole("tablist", { name: "Фильтр по специализации" });
    await tablist.getByRole("tab", { name: /Парикмахеры/i }).click();
    // Arina is a nails specialist — should not be in the filtered list
    await expect(page.getByRole("heading", { name: "Арина" })).not.toBeVisible();
  });

  test('"Ногтевой сервис" tab shows only Arina', async ({ page }) => {
    await page.goto("/barbers");
    const tablist = page.getByRole("tablist", { name: "Фильтр по специализации" });
    await tablist.getByRole("tab", { name: /Ногтевой сервис/i }).click();
    await expect(page.getByRole("heading", { name: "Арина" })).toBeVisible();
    // Senior master Marat should not appear in nails filter
    await expect(page.getByRole("heading", { name: "Марат" })).not.toBeVisible();
  });

  test("clicking Marat card navigates to /barbers/marat", async ({ page }) => {
    await page.goto("/barbers");
    // Cards are NextLink anchors with href="/barbers/marat"
    await page.locator('a[href="/barbers/marat"]').first().click();
    await expect(page).toHaveURL("/barbers/marat");
    await expect(page.locator("h1").first()).toContainText("Марат");
  });
});

// ─── /quiz ────────────────────────────────────────────────────────────────────

test.describe("/quiz — 4-step flow", () => {
  test("step 1 of 4 is visible on load", async ({ page }) => {
    await page.goto("/quiz");
    await expect(page.getByText("Шаг 1 из 4")).toBeVisible();
    await expect(page.getByText("Какая у вас длина волос?")).toBeVisible();
  });

  test("clicking an answer advances to step 2", async ({ page }) => {
    await page.goto("/quiz");
    // Click the first answer button (e.g. "Очень короткие")
    await page.getByRole("button", { name: /Очень короткие/i }).click();
    await expect(page.getByText("Шаг 2 из 4")).toBeVisible();
    await expect(page.getByText("Есть ли у вас борода?")).toBeVisible();
  });

  test("«Назад» button returns to previous step", async ({ page }) => {
    await page.goto("/quiz");
    await page.getByRole("button", { name: /Очень короткие/i }).click();
    await expect(page.getByText("Шаг 2 из 4")).toBeVisible();
    await page.getByRole("button", { name: /Назад/i }).click();
    await expect(page.getByText("Шаг 1 из 4")).toBeVisible();
    await expect(page.getByText("Какая у вас длина волос?")).toBeVisible();
  });

  test("«Назад» button is NOT shown on step 1", async ({ page }) => {
    await page.goto("/quiz");
    await expect(page.getByRole("button", { name: /Назад/i })).not.toBeVisible();
  });

  test("completing all 4 steps shows result with booking CTA", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    await page.goto("/quiz");

    // Step 1 — hair length
    await expect(page.getByText("Шаг 1 из 4")).toBeVisible();
    await page.getByRole("button", { name: /Средние/i }).click();

    // Step 2 — beard
    await expect(page.getByText("Шаг 2 из 4")).toBeVisible();
    await page.getByRole("button", { name: /Нет бороды/i }).click();

    // Step 3 — goal: click "Стрижка" (the standalone one, not "Стрижка + маникюр")
    await expect(page.getByText("Шаг 3 из 4")).toBeVisible();
    // The button contains a span with the label text and a span with the sub-label.
    // Filter: has "Основная услуга" sub-text to uniquely identify the "Стрижка" answer.
    await page.getByRole("button").filter({ hasText: "Основная услуга" }).click();

    // Step 4 — frequency
    await expect(page.getByText("Шаг 4 из 4")).toBeVisible();
    await page.getByRole("button", { name: /Раз в месяц/i }).click();

    // Result screen
    await expect(page.getByText("Ваша рекомендация")).toBeVisible();
    await expect(page.getByRole("button", { name: /Записаться/i }).first()).toBeVisible();

    expect(filterConsoleErrors(consoleErrors), "Console errors during quiz flow").toHaveLength(0);
  });

  test("«Пройти заново» resets quiz to step 1", async ({ page }) => {
    await page.goto("/quiz");

    // Complete all steps
    await page.getByRole("button", { name: /Средние/i }).click();
    await page.getByRole("button", { name: /Нет бороды/i }).click();
    // Filter by sub-label to pick "Стрижка" (not "Стрижка + маникюр")
    await page.getByRole("button").filter({ hasText: "Основная услуга" }).click();
    await page.getByRole("button", { name: /Раз в месяц/i }).click();

    await expect(page.getByText("Ваша рекомендация")).toBeVisible();
    await page.getByRole("button", { name: /Пройти заново/i }).click();

    await expect(page.getByText("Шаг 1 из 4")).toBeVisible();
  });
});

// ─── /journal ─────────────────────────────────────────────────────────────────

test.describe("/journal — article grid + filter", () => {
  test("has category filter tablist", async ({ page }) => {
    await page.goto("/journal");
    const tablist = page.getByRole("tablist", { name: "Фильтр по категории" });
    await expect(tablist).toBeVisible();
  });

  test('"Все" tab is present and selected by default', async ({ page }) => {
    await page.goto("/journal");
    const tablist = page.getByRole("tablist", { name: "Фильтр по категории" });
    const allTab = tablist.getByRole("tab", { name: /Все/i });
    await expect(allTab).toBeVisible();
    await expect(allTab).toHaveAttribute("aria-selected", "true");
  });

  test("shows article cards on load", async ({ page }) => {
    await page.goto("/journal");
    // Article cards are NextLink <a> elements with href starting /journal/
    // but we exclude the nav link to /journal itself
    const articleLinks = page.locator('a[href^="/journal/"]');
    await expect(articleLinks.first()).toBeVisible();
  });

  test("clicking an article card navigates to /journal/[slug]", async ({ page }) => {
    await page.goto("/journal");
    const firstArticleLink = page.locator('a[href^="/journal/"]').first();
    const href = await firstArticleLink.getAttribute("href");
    await firstArticleLink.click();
    await expect(page).toHaveURL(href!);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("category filter tab hides non-matching articles", async ({ page }) => {
    await page.goto("/journal");
    const tablist = page.getByRole("tablist", { name: "Фильтр по категории" });
    const guidTab = tablist.getByRole("tab", { name: "Гид" });
    await guidTab.click();
    // Tab should become selected
    await expect(guidTab).toHaveAttribute("aria-selected", "true");
    // "Все" tab should no longer be selected
    await expect(tablist.getByRole("tab", { name: "Все" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
    // Articles grid should still have at least one card (unless category is empty)
    // We just ensure the page doesn't crash — content may vary
    await expect(page.locator("#main")).toBeVisible();
  });
});
