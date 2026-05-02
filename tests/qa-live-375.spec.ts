import { test, expect } from "@playwright/test";

const BASE_URL = "https://base-premier.vercel.app";

test.use({ viewport: { width: 375, height: 812 } });

test("QA: главная страница 375px — полный скриншот и проверки", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 30000 });

  // Full page screenshot
  await page.screenshot({
    path: "playwright-report/qa-375-fullpage.png",
    fullPage: true,
  });

  // H1 check
  const h1 = page.locator("h1").first();
  const h1Text = await h1.textContent();
  console.warn(`H1: "${h1Text}"`);
  expect(h1Text).toBeTruthy();

  // Cookie banner
  const cookieBanner = page
    .locator('[data-testid="cookie-banner"], #cookie-banner, [class*="cookie"], [class*="Cookie"]')
    .first();
  const cookieVisible = await cookieBanner.isVisible().catch(() => false);
  console.warn(`Cookie banner visible: ${cookieVisible}`);

  // CTA button
  const ctaButton = page.locator('button:has-text("Записаться"), a:has-text("Записаться")').first();
  const ctaVisible = await ctaButton.isVisible().catch(() => false);
  console.warn(`CTA "Записаться" visible: ${ctaVisible}`);

  // Phone link
  const phoneLink = page.locator('a[href^="tel:"]').first();
  const phoneHref = await phoneLink.getAttribute("href").catch(() => null);
  console.warn(`Phone tel: link: ${phoneHref}`);

  console.warn(`Console errors: ${consoleErrors.length > 0 ? consoleErrors.join(", ") : "none"}`);

  // Services section screenshot
  const servicesSection = page.locator("section").filter({ hasText: "Парикмахерский зал" }).first();
  const servicesSectionExists = (await servicesSection.count()) > 0;
  console.warn(`Services section found: ${servicesSectionExists}`);
  if (servicesSectionExists) {
    await servicesSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: "playwright-report/qa-375-services-section.png" });
  }
});

test("QA: секция 4 карточки услуг — детальный скриншот и проверка обрезки текста", async ({
  page,
}) => {
  await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 30000 });

  // Scroll through all sections and take screenshots
  const sections = [
    { selector: "section:nth-of-type(1)", name: "01-hero" },
    { selector: "section:nth-of-type(2)", name: "02-section2" },
    { selector: "section:nth-of-type(3)", name: "03-section3" },
    { selector: "section:nth-of-type(4)", name: "04-section4" },
    { selector: "section:nth-of-type(5)", name: "05-section5" },
    { selector: "section:nth-of-type(6)", name: "06-section6" },
    { selector: "section:nth-of-type(7)", name: "07-section7" },
  ];

  for (const s of sections) {
    const el = page.locator(s.selector).first();
    if ((await el.count()) > 0) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await page.screenshot({ path: `playwright-report/qa-375-${s.name}.png` });
    }
  }

  // Find service cards specifically
  const cards = page
    .locator('[class*="card"], [class*="Card"], article')
    .filter({ hasText: "Парикмахерский" });
  const cardCount = await cards.count();
  console.warn(`Service cards with "Парикмахерский": ${cardCount}`);

  // Check for text overflow on ALL cards
  const allCards = page.locator('[class*="card"], [class*="Card"], article');
  const totalCards = await allCards.count();
  console.warn(`Total card-like elements: ${totalCards}`);

  // Check overflow via JS evaluation
  const overflowIssues = await page.evaluate(() => {
    const issues: string[] = [];
    const cards = document.querySelectorAll('[class*="card"], [class*="Card"], article');
    cards.forEach((card, i) => {
      if (card.scrollHeight > card.clientHeight + 2) {
        issues.push(
          `Card ${i}: scrollHeight=${card.scrollHeight} > clientHeight=${card.clientHeight} — TEXT MAY BE CLIPPED`,
        );
      }
      // Check children too
      const children = card.querySelectorAll("p, h2, h3, h4, span");
      children.forEach((child, j) => {
        const el = child as HTMLElement;
        if (el.scrollWidth > el.clientWidth + 2) {
          issues.push(
            `Card ${i} child ${j} (${el.tagName}): scrollWidth=${el.scrollWidth} > clientWidth=${el.clientWidth} — TEXT OVERFLOW`,
          );
        }
      });
    });
    return issues;
  });

  if (overflowIssues.length > 0) {
    console.warn("OVERFLOW ISSUES FOUND:");
    overflowIssues.forEach((issue) => console.warn(`  - ${issue}`));
  } else {
    console.warn("No overflow issues detected in cards");
  }
});

test("QA: ServicesPreviewSection — найти секцию с 4 карточками", async ({ page }) => {
  await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 30000 });

  // Scroll to middle of page where services section likely is
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 3));
  await page.waitForTimeout(500);
  await page.screenshot({ path: "playwright-report/qa-375-scroll-33pct.png" });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await page.waitForTimeout(500);
  await page.screenshot({ path: "playwright-report/qa-375-scroll-50pct.png" });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.66));
  await page.waitForTimeout(500);
  await page.screenshot({ path: "playwright-report/qa-375-scroll-66pct.png" });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.8));
  await page.waitForTimeout(500);
  await page.screenshot({ path: "playwright-report/qa-375-scroll-80pct.png" });

  // Get page structure
  const structure = await page.evaluate(() => {
    const sections = document.querySelectorAll("section");
    return Array.from(sections).map((s, i) => ({
      index: i,
      id: s.id || "",
      className: s.className.slice(0, 100),
      firstH2: s.querySelector("h2")?.textContent?.slice(0, 60) || "",
      firstH3: s.querySelector("h3")?.textContent?.slice(0, 60) || "",
      cardCount: s.querySelectorAll('[class*="card"], [class*="Card"], article, li').length,
      height: s.getBoundingClientRect().height,
    }));
  });

  console.warn("Page section structure:");
  structure.forEach((s) => {
    console.warn(
      `  Section ${s.index}: id="${s.id}" h2="${s.firstH2}" h3="${s.firstH3}" cards=${s.cardCount} height=${Math.round(s.height)}px`,
    );
  });

  // Look for the services preview section specifically
  const servicesKeywords = ["Парикмахерский зал", "Бритьё", "Уход", "Маникюр", "Fresh Hands"];
  for (const kw of servicesKeywords) {
    const el = page.getByText(kw, { exact: false }).first();
    if ((await el.count()) > 0) {
      console.warn(`Found text: "${kw}"`);
      const box = await el.boundingBox();
      console.warn(
        `  Position: top=${box?.y?.toFixed(0)}, left=${box?.x?.toFixed(0)}, width=${box?.width?.toFixed(0)}`,
      );
    } else {
      console.warn(`NOT FOUND: "${kw}"`);
    }
  }
});
