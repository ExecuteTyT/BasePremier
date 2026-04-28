import { expect, test } from "@playwright/test";

/**
 * Mobile UX suite — runs on mobile-chrome (Pixel 7) + mobile-safari (iPhone 12).
 * See playwright.config.ts → projects mobile-chrome / mobile-safari testMatch.
 *
 * Selector notes (from source):
 *  - Hamburger: <button aria-label="Открыть меню" / "Закрыть меню"> in MobileMenu.tsx
 *    Size: h-8 w-8 (32×32 px) — noted as a known a11y gap (touch target < 44px).
 *  - Mobile drawer: <nav aria-label="Мобильная навигация"> inside
 *    <div role="dialog" aria-label="Мобильное меню" translate-x-full when closed>
 *  - StickyCTA: <div aria-hidden={!visible}> wraps <button aria-label="Записаться онлайн">
 *    Appears when window.scrollY > 800. Hidden via translate-y-full + aria-hidden.
 *    Only visible at md:hidden breakpoint (mobile only).
 *
 * NOTE: All tests in this file run in serial mode (test.describe.configure below).
 * Reason: mobile-safari (WebKit) throttles background tabs when multiple browser
 * contexts run in parallel — this makes scroll-event-driven React state updates
 * unreliable under load. Serial mode ensures one test runs at a time per worker.
 */

// Run all tests in this file serially to avoid WebKit tab-throttling under parallel load.
test.describe.configure({ mode: "serial" });

const MOBILE_PAGES = ["/", "/services", "/barbers", "/about", "/contacts", "/journal"] as const;

// ---------------------------------------------------------------------------
// No horizontal scroll
// ---------------------------------------------------------------------------

test.describe("No horizontal scroll", () => {
  for (const path of MOBILE_PAGES) {
    test(`${path} — no horizontal overflow`, async ({ page }) => {
      await page.goto(path);
      // Wait for layout to stabilise (fonts, images, lazy-loaded sections).
      await page.waitForLoadState("networkidle");

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      expect(hasHorizontalScroll, `Horizontal scroll detected on ${path}`).toBe(false);
    });
  }
});

// ---------------------------------------------------------------------------
// Mobile menu
// ---------------------------------------------------------------------------

test.describe("Mobile menu", () => {
  test("hamburger button is visible on mobile", async ({ page }) => {
    await page.goto("/");
    // The hamburger lives in a <div class="md:hidden"> inside the header.
    // On mobile viewports (Pixel 7 = 412px, iPhone 12 = 390px) md:hidden renders.
    const hamburger = page
      .locator("header")
      .locator('button[aria-label="Открыть меню"], button[aria-label="Закрыть меню"]')
      .first();
    await expect(hamburger).toBeVisible();
    await expect(hamburger).toHaveAttribute("aria-expanded", "false");
  });

  test("opening menu reveals nav links", async ({ page }) => {
    await page.goto("/");
    const hamburger = page.getByRole("button", { name: "Открыть меню" });
    await hamburger.click();

    // After click the button becomes "Закрыть меню"
    await expect(page.getByRole("button", { name: "Закрыть меню" })).toBeVisible();

    // The drawer (dialog) contains the nav
    const mobileNav = page.locator('nav[aria-label="Мобильная навигация"]');
    await expect(mobileNav.getByRole("link", { name: "Услуги", exact: true })).toBeVisible();
    await expect(mobileNav.getByRole("link", { name: "Мастера", exact: true })).toBeVisible();
    await expect(mobileNav.getByRole("link", { name: "О нас", exact: true })).toBeVisible();
    await expect(mobileNav.getByRole("link", { name: "Контакты", exact: true })).toBeVisible();
  });

  test("backdrop click closes the menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Открыть меню" }).click();
    await expect(page.getByRole("button", { name: "Закрыть меню" })).toBeVisible();

    // The backdrop has aria-hidden="true" and sits behind the drawer in the DOM stacking context,
    // so Playwright's actionability checks block a normal .click(). We dispatch the click via JS
    // using the stable data-testid selector (replaces the original fragile CSS-class query).
    await page.evaluate(() => {
      const backdrop = document.querySelector(
        '[data-testid="mobile-menu-backdrop"]',
      ) as HTMLElement | null;
      backdrop?.click();
    });

    // After close: aria-expanded on the hamburger reverts to false
    const hamburger = page
      .locator("header")
      .locator('button[aria-label="Открыть меню"], button[aria-label="Закрыть меню"]')
      .first();
    await expect(hamburger).toHaveAttribute("aria-expanded", "false");
    await expect(hamburger).toHaveAttribute("aria-label", "Открыть меню");
  });

  test("Esc key closes mobile menu", async ({ page, browserName }) => {
    // iOS Safari does not dispatch KeyboardEvent for Escape via physical/synthetic keyboard.
    test.skip(
      browserName === "webkit",
      "iOS Safari does not reliably dispatch Escape keyboard events in mobile emulation",
    );

    await page.goto("/");
    await page.getByRole("button", { name: "Открыть меню" }).click();
    await expect(page.getByRole("button", { name: "Закрыть меню" })).toBeVisible();

    await page.keyboard.press("Escape");

    // Check via aria-expanded — more semantically meaningful and doesn't depend on parent DOM structure.
    const hamburger = page
      .locator("header")
      .locator('button[aria-label="Открыть меню"], button[aria-label="Закрыть меню"]')
      .first();
    await expect(hamburger).toHaveAttribute("aria-expanded", "false");
    await expect(hamburger).toHaveAttribute("aria-label", "Открыть меню");
  });

  test("menu closes when navigating to another page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Открыть меню" }).click();
    await expect(page.getByRole("button", { name: "Закрыть меню" })).toBeVisible();

    // Click a link inside the mobile nav drawer
    const mobileNav = page.locator('nav[aria-label="Мобильная навигация"]');
    await Promise.all([
      page.waitForURL("/services"),
      mobileNav.getByRole("link", { name: "Услуги", exact: true }).click(),
    ]);

    await expect(page).toHaveURL("/services");
    // Menu should be closed after navigation.
    // MobileMenu uses startTransition(() => setOpen(false)) on pathname change.
    // Use toHaveAttribute with built-in retry timeout (default 5s) to wait for
    // the React state update to propagate through startTransition.
    const hamburger = page
      .locator("header")
      .locator('button[aria-label="Открыть меню"], button[aria-label="Закрыть меню"]')
      .first();
    await expect(hamburger).toHaveAttribute("aria-expanded", "false", { timeout: 8000 });
    await expect(hamburger).toHaveAttribute("aria-label", "Открыть меню");
  });
});

// ---------------------------------------------------------------------------
// StickyCTA
// ---------------------------------------------------------------------------

/**
 * Helpers for StickyCTA.
 *
 * StickyCTA.tsx renders:
 *   <div aria-hidden={!visible} class="fixed inset-x-0 bottom-0 … translate-y-full/translate-y-0">
 *     <div style="padding: …">
 *       <button data-yclients-open tabIndex={visible ? 0 : -1} aria-label="Записаться онлайн">
 *
 * The wrapper slides off-screen via `translate-y-full` but Playwright's
 * toBeVisible() doesn't reliably detect transform-only off-screen placement.
 * Instead we assert on:
 *   - Button tabIndex="-1" → hidden (aria-hidden="true" on wrapper)
 *   - Button tabIndex="0"  → visible (aria-hidden="false" on wrapper)
 *
 * We scope to the sticky button via the unique combination of:
 *   data-yclients-open + aria-label="Записаться онлайн" + tabindex (changes)
 * among all [data-yclients-open] elements on the page.
 *
 * The sticky button is the ONLY one that ever has tabindex="-1" (others don't
 * set tabIndex explicitly so it defaults to 0 / inherited).
 */
function stickyCTAButton(page: import("@playwright/test").Page) {
  // The sticky CTA button is the one inside the "fixed bottom bar" wrapper.
  // It's identified by having data-yclients-open AND aria-label="Записаться онлайн".
  // Note: there may be multiple [data-yclients-open] on the page, but only one
  // inside the StickyCTA component has this specific aria-label + dynamic tabindex.
  return page.locator('[data-yclients-open][aria-label="Записаться онлайн"]').last(); // StickyCTA is rendered in layout, other booking buttons are in main content
}

/**
 * Programmatic scroll helper — cross-browser compatible.
 *
 * Uses window.scrollTo + a manual "scroll" event dispatch because:
 *  - WebKit mobile does NOT support page.mouse.wheel()
 *  - window.scrollTo() alone may not fire "scroll" event in WebKit
 *
 * Serial test mode (set at file level) ensures the RAF-based state update
 * in StickyCTA has time to run without WebKit tab-throttling interference.
 */
async function scrollTo(page: import("@playwright/test").Page, y: number) {
  await page.evaluate((scrollY) => {
    window.scrollTo({ top: scrollY, behavior: "instant" });
    window.dispatchEvent(new Event("scroll"));
  }, y);
  // Give StickyCTA's requestAnimationFrame time to run and update React state
  await page.waitForTimeout(300);
}

test.describe("StickyCTA", () => {
  test("StickyCTA is inactive (tabindex=-1) at page top", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // At page top (scrollY=0), visible=false → button has tabIndex="-1"
    await expect(stickyCTAButton(page)).toHaveAttribute("tabindex", "-1");
  });

  test("StickyCTA becomes active (tabindex=0) after scrolling past 800px", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await scrollTo(page, 900);

    // Poll until tabindex changes — avoids flakiness from RAF timing under load
    await expect(stickyCTAButton(page)).toHaveAttribute("tabindex", "0", { timeout: 8000 });
  });

  test("StickyCTA deactivates when scrolling back to top", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Scroll down to activate it
    await scrollTo(page, 900);
    await expect(stickyCTAButton(page)).toHaveAttribute("tabindex", "0", { timeout: 8000 });

    // Scroll back to top to deactivate it
    await scrollTo(page, 0);
    await expect(stickyCTAButton(page)).toHaveAttribute("tabindex", "-1", { timeout: 8000 });
  });
});

// ---------------------------------------------------------------------------
// Touch targets
// ---------------------------------------------------------------------------

test.describe("Touch targets", () => {
  test("hamburger button size is documented (currently below 44px WCAG target)", async ({
    page,
  }) => {
    await page.goto("/");
    // Open the menu so the close button is rendered and interactable
    await page.getByRole("button", { name: "Открыть меню" }).click();

    const closeBtn = page.getByRole("button", { name: "Закрыть меню" });
    const box = await closeBtn.boundingBox();

    expect(box, "Close button has no bounding box").not.toBeNull();
    // Note: hamburger/close button renders as h-8 w-8 (32px). This test
    // documents the current state. A future a11y pass should add min-h-[44px]
    // padding to reach the WCAG 2.5.5 target size.
    // For now we assert it is at least 32px (actual rendered size).
    expect(box!.width, "Close button width < 32px").toBeGreaterThanOrEqual(32);
    expect(box!.height, "Close button height < 32px").toBeGreaterThanOrEqual(32);
  });

  test("StickyCTA button meets 44px height", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await scrollTo(page, 900);

    // Confirm button is active (tabindex=0 means the sticky CTA is visible)
    await expect(stickyCTAButton(page)).toHaveAttribute("tabindex", "0", { timeout: 8000 });

    const btn = stickyCTAButton(page);
    const box = await btn.boundingBox();
    expect(box, "StickyCTA button has no bounding box").not.toBeNull();
    // StickyCTA renders as h-12 (48px) — well above the 44px minimum
    expect(box!.height, "StickyCTA height < 44px").toBeGreaterThanOrEqual(44);
    expect(box!.width, "StickyCTA width < 44px").toBeGreaterThanOrEqual(44);
  });
});
