# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: live-qa.spec.ts >> @375px >> Journal /journal — H1 + CTA + console
- Location: tests/e2e/live-qa.spec.ts:44:11

# Error details

```
Error: Primary CTA visible on /journal @ 375px

expect(received).toBeTruthy()

Received: false
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
    - banner [ref=e2]:
        - navigation "Главная навигация" [ref=e3]:
            - link "BASE Premier — на главную" [ref=e4]:
                - /url: /
                - img [ref=e5]:
                    - generic [ref=e6]: BP
            - button "Открыть меню" [ref=e9]
    - main [ref=e14]:
        - main [ref=e16]:
            - generic [ref=e18]:
                - paragraph [ref=e19]: 0 статей · Гайды, разборы, мнения
                - heading "Ж у р н а л" [level=1] [ref=e20]:
                    - generic [ref=e21]:
                        - generic [ref=e23]: Ж
                        - generic [ref=e25]: у
                        - generic [ref=e27]: р
                        - generic [ref=e29]: н
                        - generic [ref=e31]: а
                        - generic [ref=e33]: л
            - generic [ref=e36]:
                - tablist "Фильтр по категории" [ref=e37]:
                    - tab "Все" [selected] [ref=e38]:
                        - text: Все
                        - generic [ref=e39]: "0"
                    - tab "Гид" [ref=e40]:
                        - text: Гид
                        - generic [ref=e41]: "0"
                    - tab "Уход" [ref=e42]:
                        - text: Уход
                        - generic [ref=e43]: "0"
                    - tab "Цена" [ref=e44]:
                        - text: Цена
                        - generic [ref=e45]: "0"
                    - tab "Лайфстайл" [ref=e46]:
                        - text: Лайфстайл
                        - generic [ref=e47]: "0"
                - paragraph [ref=e49]: Статей нет
    - contentinfo [ref=e50]:
        - generic [ref=e51]:
            - generic [ref=e52]:
                - generic [ref=e53]:
                    - link "BASE Premier — на главную" [ref=e54]:
                        - /url: /
                        - img [ref=e55]:
                            - generic [ref=e56]: BP
                            - generic [ref=e57]: BASE PREMIER
                    - paragraph [ref=e58]: Стиль, атмосфера, мастерство — мужской уход без компромиссов
                - navigation "Навигация по сайту" [ref=e59]:
                    - list [ref=e60]:
                        - listitem [ref=e61]:
                            - link "Услуги" [ref=e62]:
                                - /url: /services
                        - listitem [ref=e63]:
                            - link "Мастера" [ref=e64]:
                                - /url: /barbers
                        - listitem [ref=e65]:
                            - link "О нас" [ref=e66]:
                                - /url: /about
                        - listitem [ref=e67]:
                            - link "Журнал" [ref=e68]:
                                - /url: /journal
                        - listitem [ref=e69]:
                            - link "Контакты" [ref=e70]:
                                - /url: /contacts
                - generic [ref=e71]:
                    - generic [ref=e72]:
                        - generic [ref=e73]: ул. Шаляпина, 26, 1 этаж
                        - generic [ref=e74]: Казань
                    - paragraph [ref=e75]: Ежедневно 10:00–21:00
                    - link "+7 (917) 918-38-77" [ref=e76]:
                        - /url: tel:+79179183877
                    - generic [ref=e77]:
                        - link "WhatsApp" [ref=e78]:
                            - /url: https://wa.me/79179183877
                            - img [ref=e79]
                        - link "Telegram" [ref=e82]:
                            - /url: https://t.me/+79179183877
                            - img [ref=e83]
            - generic [ref=e85]:
                - generic [ref=e86]: © 2022–2026 BASE Premier
                - generic [ref=e87]:
                    - generic [ref=e88]: ИП Шайхутдинов Айрат Рафаэлевич · ИНН 163207031442
                    - link "Политика конфиденциальности" [ref=e89]:
                        - /url: /privacy
    - generic:
        - button "Записаться онлайн": Записаться
    - generic [ref=e90]:
        - link "Написать в WhatsApp" [ref=e91]:
            - /url: https://wa.me/79179183877
            - img [ref=e92]
        - link "Написать в Telegram" [ref=e95]:
            - /url: https://t.me/+79179183877
            - img [ref=e96]
    - dialog [ref=e98]:
        - generic [ref=e99]:
            - paragraph [ref=e100]:
                - text: Мы используем cookie для аналитики и улучшения сервиса. Подробнее —
                - link [ref=e101]:
                    - /url: /privacy
                    - text: Политика конфиденциальности
                - text: .
            - generic [ref=e102]:
                - button [ref=e103]: Только необходимые
                - button [ref=e104]: Принять все
    - alert [ref=e105]
```

# Test source

```ts
  1   | /**
  2   |  * Live QA — tests https://base-premier.vercel.app
  3   |  * Checks: H1, CTA clickability, console errors, cookie banner, tel: link
  4   |  * Breakpoints: 375 / 768 / 1440 px
  5   |  */
  6   | import * as fs from "fs";
  7   | import * as path from "path";
  8   |
  9   | import { test, expect } from "@playwright/test";
  10  |
  11  | const BASE = "https://base-premier.vercel.app";
  12  | const VIEWPORTS = [
  13  |   { name: "375", width: 375, height: 812 },
  14  |   { name: "768", width: 768, height: 1024 },
  15  |   { name: "1440", width: 1440, height: 900 },
  16  | ];
  17  | const PAGES = [
  18  |   { route: "/", label: "Home" },
  19  |   { route: "/services", label: "Services" },
  20  |   { route: "/barbers", label: "Barbers" },
  21  |   { route: "/about", label: "About" },
  22  |   { route: "/contacts", label: "Contacts" },
  23  |   { route: "/journal", label: "Journal" },
  24  | ];
  25  |
  26  | const screenshotDir = path.join(process.cwd(), "tests", "screenshots", "live-qa");
  27  | fs.mkdirSync(screenshotDir, { recursive: true });
  28  |
  29  |
  30  | for (const vp of VIEWPORTS) {
  31  |   test.describe(`@${vp.name}px`, () => {
  32  |     test.use({ viewport: { width: vp.width, height: vp.height } });
  33  |
  34  |     for (const pg of PAGES) {
  35  |       test(`${pg.label} ${pg.route} — H1 + CTA + console`, async ({ page }) => {
  36  |         const errors: string[] = [];
  37  |         page.on("console", (msg) => {
  38  |           if (msg.type() === "error") errors.push(msg.text());
  39  |         });
  40  |         page.on("pageerror", (err) => errors.push(err.message));
  41  |
  42  |         await page.goto(`${BASE}${pg.route}`, { waitUntil: "domcontentloaded" });
  43  |         await page.waitForLoadState("networkidle").catch(() => {});
  44  |
  45  |         // Screenshot — full page
  46  |         const filename = `${pg.label.toLowerCase()}-${vp.name}.png`;
  47  |         await page.screenshot({
  48  |           path: path.join(screenshotDir, filename),
  49  |           fullPage: true,
  50  |         });
  51  |
  52  |         // 1. H1 exists and is non-empty
  53  |         const h1 = page.locator("h1").first();
  54  |         await expect(h1, `H1 must exist on ${pg.route}`).toBeVisible({ timeout: 10000 });
  55  |         const h1Text = (await h1.textContent()) ?? "";
  56  |         expect(h1Text.trim().length, `H1 must have text on ${pg.route}`).toBeGreaterThan(0);
  57  |         console.log(`  H1 [${vp.name}px] ${pg.route}: "${h1Text.trim()}"`);
  58  |
  59  |         // 2. Cookie banner check — must not obscure primary CTA
  60  |         //    Find booking CTA buttons
  61  |         const cta = page.locator(
  62  |           "a[href*='yclients'], button:has-text('Записаться'), a:has-text('Записаться')"
  63  |         );
  64  |         const ctaCount = await cta.count();
  65  |         if (ctaCount > 0) {
  66  |           const firstCta = cta.first();
  67  |           const isVisible = await firstCta.isVisible();
  68  |           console.log(`  CTA visible [${vp.name}px] ${pg.route}: ${isVisible}`);
  69  |           expect(isVisible, `Primary CTA visible on ${pg.route} @ ${vp.name}px`).toBeTruthy();
  70  |         } else {
  71  |           console.log(`  CTA not found [${vp.name}px] ${pg.route}`);
  72  |         }
  73  |
  74  |         // 3. Console errors
  75  |         if (errors.length > 0) {
  76  |           console.warn(`  CONSOLE ERRORS [${vp.name}px] ${pg.route}:`, errors);
  77  |         }
> 78  |         expect(errors.filter((e) => !e.includes("favicon")), `No console errors on ${pg.route}`).toHaveLength(0);
      |                                                                                  ^ Error: Primary CTA visible on /journal @ 375px
  79  |       });
  80  |     }
  81  |
  82  |     // tel: link test — only once per viewport on homepage
  83  |     test(`tel: link on Home @ ${vp.name}px`, async ({ page }) => {
  84  |       await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  85  |       await page.waitForLoadState("networkidle").catch(() => {});
  86  |
  87  |       const telLink = page.locator('a[href^="tel:"]').first();
  88  |       await expect(telLink, "tel: link must exist").toBeVisible({ timeout: 8000 });
  89  |       const href = await telLink.getAttribute("href");
  90  |       expect(href, "tel: href must include phone number").toMatch(/tel:\+7/);
  91  |       console.log(`  tel: link [${vp.name}px]: ${href}`);
  92  |     });
  93  |
  94  |     // Cookie banner overlay test on Home
  95  |     test(`Cookie banner does not block H1 CTA @ ${vp.name}px`, async ({ page }) => {
  96  |       await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  97  |       await page.waitForLoadState("networkidle").catch(() => {});
  98  |
  99  |       // Check if cookie banner is present
  100 |       const banner = page.locator(
  101 |         "[data-testid='cookie-banner'], .cookie-banner, [class*='cookie'], [id*='cookie']"
  102 |       );
  103 |       const bannerVisible = await banner.first().isVisible().catch(() => false);
  104 |       console.log(`  Cookie banner visible [${vp.name}px]: ${bannerVisible}`);
  105 |
  106 |       // Hero CTA must still be interactive even if banner present
  107 |       const heroSection = page.locator("section").first();
  108 |       const heroCta = heroSection.locator(
  109 |         "button:has-text('Записаться'), a:has-text('Записаться'), a[href*='yclients']"
  110 |       ).first();
  111 |
  112 |       const heroCtaExists = await heroCta.count() > 0;
  113 |       if (heroCtaExists) {
  114 |         // Check it's not fully obscured (clickable)
  115 |         const box = await heroCta.boundingBox();
  116 |         if (box) {
  117 |           // Element in viewport?
  118 |           const viewportHeight = vp.height;
  119 |           const inViewport = box.y < viewportHeight;
  120 |           console.log(`  Hero CTA in viewport [${vp.name}px]: ${inViewport}, y=${Math.round(box.y)}`);
  121 |         }
  122 |       }
  123 |     });
  124 |   });
  125 | }
  126 |
```
