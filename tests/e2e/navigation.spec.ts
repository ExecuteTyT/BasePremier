import { expect, test } from "@playwright/test";

/**
 * Navigation suite — runs on chromium + webkit (see playwright.config.ts).
 * Tests: header nav links, mobile menu open/close, footer contact info.
 *
 * Selector notes (from source):
 *  - Logo: <a aria-label="BASE Premier — на главную" href="/">
 *  - Header wraps everything in <nav aria-label="Главная навигация">
 *  - Desktop links: <ul class="hidden md:flex"> inside that nav
 *  - Mobile hamburger: single <button> whose aria-label toggles between
 *    "Открыть меню" / "Закрыть меню" (same button element)
 *  - Mobile drawer: <nav aria-label="Мобильная навигация"> inside
 *    a <div aria-hidden={!open}> overlay; visibility tracked via aria-hidden
 *  - Footer nav: <nav aria-label="Навигация по сайту">
 *  - Footer address: <span>ул. Шаляпина, 26, 1 этаж</span>
 *  - Footer phone link: <a href="tel:+79179183877">+7 (917) 918-38-77</a>
 */

test.describe("Header navigation", () => {
  test("logo links to homepage", async ({ page }) => {
    await page.goto("/services");
    // Logo renders as <a aria-label="BASE Premier — на главную" href="/">.
    // Scope to <header> to avoid any other such links elsewhere in the DOM.
    await page.locator("header").locator('a[aria-label="BASE Premier — на главную"]').click();
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
        // Desktop links live in <ul class="hidden md:flex"> inside the header nav.
        // The mobile drawer (translate-x-full, off-screen) also has identical link
        // text — scope to the <ul role="list"> to hit only the desktop link.
        // Use Promise.all to pair click with waitForURL — required in WebKit where
        // Next.js client-side navigation fires asynchronously after the click.
        const desktopList = page.locator('nav[aria-label="Главная навигация"] ul[role="list"]');
        const link = desktopList.getByRole("link", { name: label, exact: true });
        await Promise.all([page.waitForURL(href), link.click()]);
        await expect(page).toHaveURL(href);
      });
    }
  });

  test("CTA «Записаться» is visible in header", async ({ page }) => {
    await page.goto("/");
    // MagneticButton → Button → <button>; visible at md+ viewport (1280px)
    const header = page.locator("header");
    await expect(header.getByRole("button", { name: /записаться/i })).toBeVisible();
  });

  test("phone link has tel: href", async ({ page }) => {
    await page.goto("/");
    // Phone link is hidden on mobile (lg:block), visible at lg: (1024px+).
    // Default desktop viewport is 1280px so it renders.
    // Use `.first()` to avoid strict-mode error: the mobile drawer also has
    // a tel: link inside the header's <nav aria-label="Главная навигация">.
    const phoneLink = page.locator("header").locator('a[href^="tel:"]').first();
    await expect(phoneLink).toHaveAttribute("href", "tel:+79179183877");
  });
});

test.describe("Mobile menu", () => {
  // 375×812 — iPhone SE / typical mobile viewport
  test.use({ viewport: { width: 375, height: 812 } });

  test("hamburger opens and closes menu", async ({ page }) => {
    await page.goto("/");

    // The mobile hamburger button lives inside the header's <div class="md:hidden">
    // wrapper. Locate it directly via aria-label so we always hit the correct node
    // and avoid accidentally matching other .md:hidden elements on the page (e.g.
    // the YClients booking widget which also renders inside a hidden div).
    const hamburger = page
      .locator("header")
      .locator('button[aria-label="Открыть меню"], button[aria-label="Закрыть меню"]')
      .first();

    await expect(hamburger).toBeVisible();
    await expect(hamburger).toHaveAttribute("aria-expanded", "false");
    await expect(hamburger).toHaveAttribute("aria-label", "Открыть меню");

    // Open: button aria-expanded → true, aria-label → "Закрыть меню"
    await hamburger.click();
    await expect(hamburger).toHaveAttribute("aria-expanded", "true");
    await expect(hamburger).toHaveAttribute("aria-label", "Закрыть меню");

    // Verify the overlay wrapper is no longer aria-hidden
    const overlayWrapper = page
      .locator('[role="dialog"][aria-label="Мобильное меню"]')
      .locator("..");
    await expect(overlayWrapper).not.toHaveAttribute("aria-hidden", "true");

    // Close: press Escape — MobileMenu listens for it when open.
    // Avoids any pointer-event interception issues with the open overlay.
    await page.keyboard.press("Escape");
    // After close: aria-expanded reverts to false, aria-label → "Открыть меню"
    await expect(hamburger).toHaveAttribute("aria-expanded", "false");
    await expect(hamburger).toHaveAttribute("aria-label", "Открыть меню");
  });

  test("mobile menu links navigate correctly", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Открыть меню" }).click();
    // Wait for the button to become "Закрыть меню" (drawer is open)
    await expect(page.getByRole("button", { name: "Закрыть меню" })).toBeVisible();
    // Click a nav link inside the drawer.
    // Use Promise.all to pair click with waitForURL — required in WebKit where
    // Next.js client-side navigation fires asynchronously after the click.
    const mobileNav = page.locator('nav[aria-label="Мобильная навигация"]');
    const servicesLink = mobileNav.getByRole("link", { name: "Услуги", exact: true });
    await Promise.all([page.waitForURL("/services"), servicesLink.click()]);
    await expect(page).toHaveURL("/services");
  });
});

test.describe("Footer", () => {
  test("footer has address and phone", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    // Address contains "Шаляпина"
    await expect(footer.getByText(/Шаляпина/)).toBeVisible();
    // Phone link contains "917"
    await expect(footer.getByText(/917/)).toBeVisible();
  });

  test("footer links to key pages", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    // Footer nav has aria-label "Навигация по сайту"
    const footerNav = footer.locator('nav[aria-label="Навигация по сайту"]');
    await expect(footerNav.getByRole("link", { name: "Услуги", exact: true })).toBeVisible();
    await expect(footerNav.getByRole("link", { name: "Мастера", exact: true })).toBeVisible();
  });

  test("footer phone link has tel: href", async ({ page }) => {
    await page.goto("/");
    const footerPhone = page.locator("footer").locator('a[href="tel:+79179183877"]');
    await expect(footerPhone).toBeVisible();
  });
});
