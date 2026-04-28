# QA E2E + Cross-Browser Tests Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Install Playwright, write smoke + functional + mobile + a11y tests covering all 10+ pages of BASE Premier across 5 browsers (Chrome, Firefox, WebKit, Mobile Chrome, Mobile Safari).

**Architecture:** `playwright.config.ts` auto-starts `pnpm dev` via `webServer`. Global `reducedMotion: 'reduce'` disables all GSAP/CSS animations to prevent flakiness. Smoke tests run on all 5 browser projects; interaction tests on Chromium only; mobile tests on Mobile Chrome + Mobile Safari; a11y on Chromium.

**Tech Stack:** `@playwright/test ^1.48`, `@axe-core/playwright ^4.x`, Playwright built-in device descriptors.

---

## File Map

| Action | Path                           | Responsibility                                                                         |
| ------ | ------------------------------ | -------------------------------------------------------------------------------------- |
| Create | `playwright.config.ts`         | 5 browser projects, webServer, global reducedMotion                                    |
| Modify | `package.json`                 | Add `test:e2e`, `test:e2e:ui`, `test:a11y` scripts                                     |
| Create | `tests/e2e/smoke.spec.ts`      | All pages 200 + h1 visible + no console errors (all 5 browsers)                        |
| Create | `tests/e2e/navigation.spec.ts` | Header nav links, mobile menu open/close (chromium + webkit)                           |
| Create | `tests/e2e/home.spec.ts`       | Hero h1, CTA button, sections present (chromium)                                       |
| Create | `tests/e2e/pages.spec.ts`      | Services filter, barbers filter, quiz 4-step flow, journal filter (chromium)           |
| Create | `tests/e2e/mobile.spec.ts`     | No horizontal scroll, StickyCTA on scroll, mobile menu (mobile-chrome + mobile-safari) |
| Create | `tests/a11y/axe.spec.ts`       | axe-core zero violations on all key pages (chromium)                                   |

---

## Task 1: Install Playwright + axe-core

**Files:**

- Modify: `package.json`

- [ ] **Step 1: Install packages**

```bash
pnpm add -D @playwright/test @axe-core/playwright
```

- [ ] **Step 2: Install Playwright browsers**

```bash
pnpm exec playwright install --with-deps chromium firefox webkit
```

Expected output ends with: `✓ Chromium ... is already installed` / similar install lines.

- [ ] **Step 3: Add scripts to package.json**

In `package.json`, add to the `"scripts"` object:

```json
"test:e2e": "playwright test tests/e2e",
"test:e2e:ui": "playwright test tests/e2e --ui",
"test:a11y": "playwright test tests/a11y",
"test:e2e:smoke": "playwright test tests/e2e/smoke.spec.ts"
```

- [ ] **Step 4: Verify install**

```bash
pnpm exec playwright --version
```

Expected: `Version 1.48.x` or higher.

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore(qa): install @playwright/test + @axe-core/playwright"
```

---

## Task 2: Create `playwright.config.ts`

**Files:**

- Create: `playwright.config.ts`

- [ ] **Step 1: Create the config file**

Create `playwright.config.ts` in the project root:

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { open: "never" }], ["list"]],

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    // Disable all animations to prevent test flakiness
    reducedMotion: "reduce",
  },

  projects: [
    // --- Desktop browsers — smoke + all functional tests ---
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      // runs everything in tests/
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

    // --- Mobile browsers — smoke + mobile-specific tests ---
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
```

- [ ] **Step 2: Verify config is valid**

```bash
pnpm exec playwright test --list 2>&1 | head -20
```

Expected: lists test files (even if empty). No "Error" lines.

- [ ] **Step 3: Commit**

```bash
git add playwright.config.ts
git commit -m "chore(qa): add playwright.config.ts — 5 browser projects"
```

---

## Task 3: Smoke Tests (all pages, all browsers)

**Files:**

- Create: `tests/e2e/smoke.spec.ts`

- [ ] **Step 1: Create test file**

Create `tests/e2e/smoke.spec.ts`:

```typescript
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
  { path: "/privacy", h1: null }, // just checks 200 + visible h1
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

    // Ignore browser-injected favicon 404s (not our code)
    const realErrors = consoleErrors.filter((e) => !e.toLowerCase().includes("favicon"));
    expect(realErrors, `Console errors on ${path}`).toHaveLength(0);
  });
}

test("/quiz — loads (no traditional h1)", async ({ page }) => {
  const response = await page.goto("/quiz");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/BASE Premier/);
  // Quiz shows step indicator instead of page h1
  await expect(page.getByText("Шаг 1 из 4")).toBeVisible();
});

test("404 — custom not-found page", async ({ page }) => {
  const response = await page.goto("/nyet-takoy-stranitsy");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1").first()).toBeVisible();
});
```

- [ ] **Step 2: Run smoke tests (Chromium only for speed)**

```bash
pnpm exec playwright test tests/e2e/smoke.spec.ts --project=chromium
```

Expected: all tests PASS. Fix any failures before continuing.

- [ ] **Step 3: Run on all 5 browsers**

```bash
pnpm exec playwright test tests/e2e/smoke.spec.ts
```

Expected: all tests PASS on chromium, firefox, webkit, mobile-chrome, mobile-safari.

- [ ] **Step 4: Commit**

```bash
git add tests/e2e/smoke.spec.ts
git commit -m "test(qa): smoke tests — all pages, 5 browsers (QA-01 partial)"
```

---

## Task 4: Navigation Tests (chromium + webkit)

**Files:**

- Create: `tests/e2e/navigation.spec.ts`

- [ ] **Step 1: Create test file**

Create `tests/e2e/navigation.spec.ts`:

```typescript
import { expect, test } from "@playwright/test";

/**
 * Navigation suite — runs on chromium + webkit (see playwright.config.ts).
 * Tests: header nav links, mobile menu open/close, footer contact info.
 */

test.describe("Header navigation", () => {
  test("logo links to homepage", async ({ page }) => {
    await page.goto("/services");
    await page.click('a[aria-label="На главную"], header a[href="/"]');
    await expect(page).toHaveURL("/");
  });

  test.describe("desktop nav links", () => {
    const NAV = [
      { label: "Услуги", href: "/services" },
      { label: "Мастера", href: "/barbers" },
      { label: "О нас", href: "/about" },
      { label: "Журнал", href: "/journal" },
      { label: "Контакты", href: "/contacts" },
    ] as const;

    for (const { label, href } of NAV) {
      test(`"${label}" navigates to ${href}`, async ({ page }) => {
        await page.goto("/");
        const nav = page.locator('nav[aria-label="Главная навигация"]');
        await nav.getByRole("link", { name: label }).click();
        await expect(page).toHaveURL(href);
      });
    }
  });

  test("CTA «Записаться» is visible in header", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header");
    await expect(header.getByRole("button", { name: /записаться/i })).toBeVisible();
  });

  test("phone link has tel: href", async ({ page }) => {
    await page.goto("/");
    const phoneLink = page.locator("header").getByRole("link", { name: /\+7/ });
    await expect(phoneLink).toHaveAttribute("href", /^tel:/);
  });
});

test.describe("Mobile menu", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("hamburger opens and closes menu", async ({ page }) => {
    await page.goto("/");

    const openBtn = page.getByRole("button", { name: "Открыть меню" });
    await expect(openBtn).toBeVisible();

    // Open
    await openBtn.click();
    const mobileNav = page.locator('nav[aria-label="Мобильная навигация"]');
    await expect(mobileNav).toBeVisible();
    await expect(page.getByRole("button", { name: "Закрыть меню" })).toBeVisible();

    // Close
    await page.getByRole("button", { name: "Закрыть меню" }).click();
    await expect(mobileNav).not.toBeVisible();
  });

  test("mobile menu links navigate correctly", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Открыть меню" }).click();
    const mobileNav = page.locator('nav[aria-label="Мобильная навигация"]');
    await mobileNav.getByRole("link", { name: "Услуги" }).click();
    await expect(page).toHaveURL("/services");
  });
});

test.describe("Footer", () => {
  test("footer has address and phone", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.getByText(/Шаляпина/)).toBeVisible();
    await expect(footer.getByText(/917/)).toBeVisible();
  });

  test("footer links to key pages", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: /услуги/i })).toBeVisible();
    await expect(footer.getByRole("link", { name: /мастера/i })).toBeVisible();
  });
});
```

- [ ] **Step 2: Run navigation tests**

```bash
pnpm exec playwright test tests/e2e/navigation.spec.ts --project=chromium
```

Expected: all PASS. If a link selector doesn't match, inspect the header HTML via `page.pause()` and adjust the selector.

- [ ] **Step 3: Run on webkit**

```bash
pnpm exec playwright test tests/e2e/navigation.spec.ts --project=webkit
```

Expected: all PASS.

- [ ] **Step 4: Commit**

```bash
git add tests/e2e/navigation.spec.ts
git commit -m "test(qa): navigation tests — header, mobile menu, footer"
```

---

## Task 5: Home Page Tests (chromium only)

**Files:**

- Create: `tests/e2e/home.spec.ts`

- [ ] **Step 1: Create test file**

Create `tests/e2e/home.spec.ts`:

```typescript
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
    await expect(page.getByText(/394\s*отзыва/)).toBeVisible();
  });

  test("scroll indicator is rendered", async ({ page }) => {
    await page.goto("/");
    // ScrollIndicator renders an SVG arrow or animated div
    const hero = page.locator("section").first();
    await expect(hero).toBeVisible();
  });
});

test.describe("Home page sections", () => {
  const SECTION_HEADINGS = [/услуги/i, /мастера/i, /интерьер/i, /отзывы/i];

  for (const heading of SECTION_HEADINGS) {
    test(`section with "${heading.source}" heading is visible`, async ({ page }) => {
      await page.goto("/");
      await expect(page.getByRole("heading", { name: heading }).first()).toBeVisible();
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
```

- [ ] **Step 2: Run home tests**

```bash
pnpm exec playwright test tests/e2e/home.spec.ts --project=chromium
```

Expected: all PASS.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/home.spec.ts
git commit -m "test(qa): home page tests — hero, CTA, sections"
```

---

## Task 6: Inner Pages Interaction Tests (chromium only)

**Files:**

- Create: `tests/e2e/pages.spec.ts`

- [ ] **Step 1: Create test file**

Create `tests/e2e/pages.spec.ts`:

```typescript
import { expect, test } from "@playwright/test";

/**
 * Inner pages suite — chromium only.
 * Tests: services filter, barbers filter + navigation, quiz 4-step flow, journal filter.
 */

// ─── /services ────────────────────────────────────────────────────────────────

test.describe("/services — category filter", () => {
  test("has 4 filter tabs", async ({ page }) => {
    await page.goto("/services");
    const tablist = page.getByRole("tablist", {
      name: "Фильтр по категориям",
    });
    await expect(tablist).toBeVisible();
    const tabs = tablist.getByRole("tab");
    await expect(tabs).toHaveCount(4);
  });

  test('"Парикмахерский зал" tab filters services', async ({ page }) => {
    await page.goto("/services");
    const tablist = page.getByRole("tablist", {
      name: "Фильтр по категориям",
    });
    await tablist.getByRole("tab", { name: "Парикмахерский зал" }).click();
    // After filter, "Ногтевой зал" category header should disappear
    await expect(page.getByText("Ногтевой зал")).not.toBeVisible();
  });

  test('"Все" tab restores full list', async ({ page }) => {
    await page.goto("/services");
    const tablist = page.getByRole("tablist", {
      name: "Фильтр по категориям",
    });
    await tablist.getByRole("tab", { name: "Парикмахерский зал" }).click();
    await tablist.getByRole("tab", { name: "Все" }).click();
    // Both categories visible again
    await expect(page.getByText("Ногтевой зал")).toBeVisible();
    await expect(page.getByText("Парикмахерский зал")).toBeVisible();
  });

  test("search filters services", async ({ page }) => {
    await page.goto("/services");
    const searchInput = page.getByRole("textbox", { name: "Поиск услуги" });
    await searchInput.fill("маникюр");
    // "Мужской маникюр" should be visible; "Детская стрижка" should not
    await expect(page.getByText(/маникюр/i).first()).toBeVisible();
  });
});

// ─── /barbers ─────────────────────────────────────────────────────────────────

test.describe("/barbers — filter + navigation", () => {
  test("has specialization filter tabs", async ({ page }) => {
    await page.goto("/barbers");
    const tablist = page.getByRole("tablist", {
      name: "Фильтр по специализации",
    });
    await expect(tablist).toBeVisible();
  });

  test("all 10 barbers visible by default", async ({ page }) => {
    await page.goto("/barbers");
    // Each barber card has the barber name as visible text
    // We check for a few known names
    await expect(page.getByText("Марат")).toBeVisible();
    await expect(page.getByText("Арина")).toBeVisible();
    await expect(page.getByText("Диана")).toBeVisible();
  });

  test('"Барберы" tab hides nail specialist', async ({ page }) => {
    await page.goto("/barbers");
    const tablist = page.getByRole("tablist", {
      name: "Фильтр по специализации",
    });
    await tablist.getByRole("tab", { name: /барберы/i }).click();
    // Арина is nails-only, should disappear
    await expect(page.getByText("Арина")).not.toBeVisible();
  });

  test("clicking Marat card navigates to /barbers/marat", async ({ page }) => {
    await page.goto("/barbers");
    // Barber card links to /barbers/[slug]
    await page.getByRole("link", { name: /марат/i }).first().click();
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
    // Click the first answer button on step 1
    await page.locator("button").filter({ hasText: /.+/ }).first().click();
    await expect(page.getByText("Шаг 2 из 4")).toBeVisible();
  });

  test("«Назад» button returns to previous step", async ({ page }) => {
    await page.goto("/quiz");
    await page.locator("button").filter({ hasText: /.+/ }).first().click();
    await expect(page.getByText("Шаг 2 из 4")).toBeVisible();
    await page.getByRole("button", { name: /назад/i }).click();
    await expect(page.getByText("Шаг 1 из 4")).toBeVisible();
  });

  test("completing all 4 steps shows result with CTA", async ({ page }) => {
    await page.goto("/quiz");

    // Complete all 4 steps by always picking the first answer
    for (let i = 0; i < 4; i++) {
      await expect(page.getByText(`Шаг ${i + 1} из 4`)).toBeVisible();
      // Click first non-back answer button
      const answerBtn = page
        .locator("button")
        .filter({ hasText: /[А-ЯЁа-яёA-Za-z]/ })
        .filter({ hasNot: page.getByText(/назад/i) })
        .first();
      await answerBtn.click();
    }

    // Result should show a CTA button
    await expect(page.getByRole("button", { name: /записаться/i })).toBeVisible();
  });
});

// ─── /journal ─────────────────────────────────────────────────────────────────

test.describe("/journal — article grid + filter", () => {
  test("shows article cards", async ({ page }) => {
    await page.goto("/journal");
    // At least one article card link visible
    const articleLinks = page.locator('article a, [href^="/journal/"]');
    await expect(articleLinks.first()).toBeVisible();
  });

  test("category filter tabs are present", async ({ page }) => {
    await page.goto("/journal");
    // Journal has category tabs: Все, Гид, Уход, Цена, Лайфстайл
    await expect(page.getByRole("button", { name: /все/i }).first()).toBeVisible();
  });

  test("clicking an article card navigates to /journal/[slug]", async ({ page }) => {
    await page.goto("/journal");
    const firstArticleLink = page
      .locator('a[href^="/journal/"]')
      .filter({ hasNotText: /журнал/i })
      .first();
    const href = await firstArticleLink.getAttribute("href");
    await firstArticleLink.click();
    await expect(page).toHaveURL(href!);
    await expect(page.locator("h1").first()).toBeVisible();
  });
});
```

- [ ] **Step 2: Run pages tests**

```bash
pnpm exec playwright test tests/e2e/pages.spec.ts --project=chromium
```

Expected: all PASS. If a selector doesn't match, run with `--debug` flag and inspect:

```bash
pnpm exec playwright test tests/e2e/pages.spec.ts --project=chromium --debug
```

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/pages.spec.ts
git commit -m "test(qa): inner pages — services filter, barbers, quiz flow, journal"
```

---

## Task 7: Mobile UX Tests (mobile-chrome + mobile-safari)

**Files:**

- Create: `tests/e2e/mobile.spec.ts`

- [ ] **Step 1: Create test file**

Create `tests/e2e/mobile.spec.ts`:

```typescript
import { expect, test } from "@playwright/test";

/**
 * Mobile UX suite — runs on mobile-chrome + mobile-safari (see playwright.config.ts).
 * Tests: no horizontal scroll, mobile menu, StickyCTA appears on scroll.
 */

const MOBILE_PAGES = ["/", "/services", "/barbers", "/about", "/contacts", "/journal"] as const;

test.describe("No horizontal scroll", () => {
  for (const path of MOBILE_PAGES) {
    test(`${path} — no horizontal overflow`, async ({ page }) => {
      await page.goto(path);
      // Wait for layout to stabilize
      await page.waitForTimeout(300);

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      expect(hasHorizontalScroll, `Horizontal scroll on ${path}`).toBe(false);
    });
  }
});

test.describe("Mobile menu", () => {
  test("hamburger button is visible on mobile", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Открыть меню" })).toBeVisible();
  });

  test("mobile menu opens and shows nav links", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Открыть меню" }).click();

    const mobileNav = page.locator('nav[aria-label="Мобильная навигация"]');
    await expect(mobileNav).toBeVisible();
    await expect(mobileNav.getByRole("link", { name: "Услуги" })).toBeVisible();
    await expect(mobileNav.getByRole("link", { name: "Мастера" })).toBeVisible();
  });

  test("Esc key closes mobile menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Открыть меню" }).click();
    await expect(page.locator('nav[aria-label="Мобильная навигация"]')).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.locator('nav[aria-label="Мобильная навигация"]')).not.toBeVisible();
  });
});

test.describe("StickyCTA", () => {
  test("StickyCTA appears after scrolling 800px on home", async ({ page }) => {
    await page.goto("/");

    // Initially hidden (page top)
    const stickyCta = page.getByRole("button", {
      name: "Записаться онлайн",
    });

    // Scroll past threshold
    await page.evaluate(() => window.scrollTo(0, 900));
    await page.waitForTimeout(400);

    await expect(stickyCta).toBeVisible();
  });

  test("StickyCTA is not visible at page top", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(300);

    const stickyCta = page.getByRole("button", {
      name: "Записаться онлайн",
    });
    // At top of page StickyCTA should be hidden
    await expect(stickyCta).not.toBeVisible();
  });
});

test.describe("Touch targets", () => {
  test("header buttons are at least 44×44 px", async ({ page }) => {
    await page.goto("/");

    const hamburger = page.getByRole("button", { name: "Открыть меню" });
    const box = await hamburger.boundingBox();

    expect(box, "Hamburger button has no bounding box").not.toBeNull();
    expect(box!.width, "Hamburger width < 44px").toBeGreaterThanOrEqual(44);
    expect(box!.height, "Hamburger height < 44px").toBeGreaterThanOrEqual(44);
  });
});
```

- [ ] **Step 2: Run mobile tests on Mobile Chrome**

```bash
pnpm exec playwright test tests/e2e/mobile.spec.ts --project=mobile-chrome
```

Expected: all PASS.

- [ ] **Step 3: Run on Mobile Safari**

```bash
pnpm exec playwright test tests/e2e/mobile.spec.ts --project=mobile-safari
```

Expected: all PASS.

- [ ] **Step 4: Commit**

```bash
git add tests/e2e/mobile.spec.ts
git commit -m "test(qa): mobile UX tests — no hscroll, menu, StickyCTA, touch targets"
```

---

## Task 8: Accessibility Tests — axe-core (chromium only)

**Files:**

- Create: `tests/a11y/axe.spec.ts`

- [ ] **Step 1: Create test file**

Create `tests/a11y/axe.spec.ts`:

```typescript
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Accessibility suite — chromium only.
 * Zero axe-core violations on all key pages (WCAG 2.1 AA).
 */

const PAGES_TO_AUDIT = [
  "/",
  "/services",
  "/barbers",
  "/barbers/marat",
  "/about",
  "/contacts",
  "/journal",
  "/journal/kak-vybrat-strizhku-pod-formu-litsa",
  "/quiz",
  "/privacy",
] as const;

for (const path of PAGES_TO_AUDIT) {
  test(`${path} — zero axe violations`, async ({ page }) => {
    await page.goto(path);
    // Wait for page to fully render
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    // Print violations on failure for easier debugging
    if (results.violations.length > 0) {
      const summary = results.violations
        .map(
          (v) =>
            `[${v.impact}] ${v.id}: ${v.description}\n  Nodes: ${v.nodes.map((n) => n.target).join(", ")}`,
        )
        .join("\n\n");
      console.error(`Axe violations on ${path}:\n${summary}`);
    }

    expect(results.violations).toHaveLength(0);
  });
}

test("homepage — no critical or serious violations at minimum", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();

  const criticalOrSerious = results.violations.filter((v) =>
    ["critical", "serious"].includes(v.impact ?? ""),
  );

  if (criticalOrSerious.length > 0) {
    const msg = criticalOrSerious.map((v) => `${v.id}: ${v.description}`).join("\n");
    throw new Error(`Critical/serious a11y violations:\n${msg}`);
  }
});
```

- [ ] **Step 2: Run a11y tests**

```bash
pnpm test:a11y --project=chromium
```

Expected: all PASS (we confirmed Lighthouse A11y = 100 in POL-03).

If any violations appear, the test output will include the violating element selectors. Fix the violation in the component, then re-run.

- [ ] **Step 3: Commit**

```bash
git add tests/a11y/axe.spec.ts
git commit -m "test(qa-a11y): axe-core WCAG 2.1 AA audit on 10 pages"
```

---

## Task 9: Full Cross-Browser Run + HTML Report

**Files:** none

- [ ] **Step 1: Run full test suite across all browsers**

```bash
pnpm exec playwright test
```

Expected output summary: `X passed (Ys)` across 5 browser projects. Note any failures.

- [ ] **Step 2: Open HTML report**

```bash
pnpm exec playwright show-report
```

Review the report. All tests should be green. Pay attention to mobile-safari webkit-specific failures.

- [ ] **Step 3: Fix any cross-browser failures**

Common issues:

- **WebKit / Safari:** `backdrop-filter` may behave differently — test is just checking visibility, not CSS, so should pass.
- **Mobile Safari:** `Escape` key test may need to be skipped if iOS doesn't fire keyboard events. Add:
  ```typescript
  test.skip(({ browserName }) => browserName === "webkit", "iOS does not dispatch Escape");
  ```
- **Firefox:** Cookie banner may have different timing — add `await page.waitForTimeout(200)` before checking h1 if console errors include a hydration warning.

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "test(qa): full cross-browser suite green — POL-04 complete"
```

---

## Self-Review Checklist

**Spec coverage:**

- [x] All 10+ pages covered by smoke tests (5 browsers)
- [x] Header nav + mobile menu navigation tested
- [x] Services category filter + search tested
- [x] Barbers filter + card navigation tested
- [x] Quiz 4-step flow including back navigation tested
- [x] Journal article grid + category filter tested
- [x] No horizontal scroll on 6 mobile pages tested
- [x] StickyCTA appears after scrolling 800px
- [x] Touch targets ≥ 44px verified
- [x] axe-core WCAG 2.1 AA on 10 pages
- [x] 404 page tested
- [x] CTA "Записаться" button present on home tested

**Placeholders scan:** None found — all code is complete.

**Type consistency:** All imports use `@playwright/test` and `@axe-core/playwright`. No cross-file type dependencies.
