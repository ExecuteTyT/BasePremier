# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: live-qa.spec.ts >> @375px >> Barbers /barbers — H1 + CTA + console
- Location: tests/e2e/live-qa.spec.ts:44:11

# Error details

```
Error: Primary CTA visible on /barbers @ 375px

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
                - paragraph [ref=e19]: 10 мастеров · 1570 отзывов на Яндекс.Картах
                - heading "К о м а н д а" [level=1] [ref=e20]:
                    - generic [ref=e21]:
                        - generic [ref=e23]: К
                        - generic [ref=e25]: о
                        - generic [ref=e27]: м
                        - generic [ref=e29]: а
                        - generic [ref=e31]: н
                        - generic [ref=e33]: д
                        - generic [ref=e35]: а
                - paragraph [ref=e36]: Каждый мастер — со своим почерком и любимыми техниками. Вы выбираете сами.
            - generic [ref=e39]:
                - tablist "Фильтр по специализации" [ref=e40]:
                    - tab "Все" [selected] [ref=e41]:
                        - text: Все
                        - generic [ref=e42]: "10"
                    - tab "Старшие" [ref=e43]:
                        - text: Старшие
                        - generic [ref=e44]: "2"
                    - tab "Парикмахеры" [ref=e45]:
                        - text: Парикмахеры
                        - generic [ref=e46]: "8"
                    - tab "Ногтевой сервис" [ref=e47]:
                        - text: Ногтевой сервис
                        - generic [ref=e48]: "1"
                - generic [ref=e49]:
                    - link "Фото Марат — ожидается Марат Старший мастер Старший Марат Старший мастер 300 отзывов" [ref=e51]:
                        - /url: /barbers/marat
                        - generic [ref=e52]:
                            - img "Фото Марат — ожидается" [ref=e53]:
                                - generic [ref=e55]: МА
                                - generic [ref=e56]: ФОТО
                            - generic [ref=e57]:
                                - generic [ref=e58]: Марат
                                - generic [ref=e59]: Старший мастер
                            - generic [ref=e60]: Старший
                        - generic [ref=e61]:
                            - heading "Марат" [level=2] [ref=e62]
                            - paragraph [ref=e63]: Старший мастер
                            - paragraph [ref=e64]: 300 отзывов
                    - link "Фото Вячеслав — ожидается Вячеслав Мужской парикмахер Вячеслав Мужской парикмахер 276 отзывов" [ref=e66]:
                        - /url: /barbers/vyacheslav
                        - generic [ref=e67]:
                            - img "Фото Вячеслав — ожидается" [ref=e68]:
                                - generic [ref=e70]: ВЯ
                                - generic [ref=e71]: ФОТО
                            - generic [ref=e72]:
                                - generic [ref=e73]: Вячеслав
                                - generic [ref=e74]: Мужской парикмахер
                        - generic [ref=e75]:
                            - heading "Вячеслав" [level=2] [ref=e76]
                            - paragraph [ref=e77]: Мужской парикмахер
                            - paragraph [ref=e78]: 276 отзывов
                    - link "Фото Сайод — ожидается Сайод Мужской парикмахер ★ Лучший Сайод Мужской парикмахер 239 отзывов" [ref=e80]:
                        - /url: /barbers/sayod
                        - generic [ref=e81]:
                            - img "Фото Сайод — ожидается" [ref=e82]:
                                - generic [ref=e84]: СА
                                - generic [ref=e85]: ФОТО
                            - generic [ref=e86]:
                                - generic [ref=e87]: Сайод
                                - generic [ref=e88]: Мужской парикмахер
                            - generic [ref=e89]: ★ Лучший
                        - generic [ref=e90]:
                            - heading "Сайод" [level=2] [ref=e91]
                            - paragraph [ref=e92]: Мужской парикмахер
                            - paragraph [ref=e93]: 239 отзывов
                    - link "Фото Алексей — ожидается Алексей Мужской парикмахер Алексей Мужской парикмахер 213 отзывов" [ref=e95]:
                        - /url: /barbers/aleksey
                        - generic [ref=e96]:
                            - img "Фото Алексей — ожидается" [ref=e97]:
                                - generic [ref=e99]: АЛ
                                - generic [ref=e100]: ФОТО
                            - generic [ref=e101]:
                                - generic [ref=e102]: Алексей
                                - generic [ref=e103]: Мужской парикмахер
                        - generic [ref=e104]:
                            - heading "Алексей" [level=2] [ref=e105]
                            - paragraph [ref=e106]: Мужской парикмахер
                            - paragraph [ref=e107]: 213 отзывов
                    - link "Фото Тимерлан — ожидается Тимерлан Мужской парикмахер Тимерлан Мужской парикмахер 177 отзывов" [ref=e109]:
                        - /url: /barbers/timerlan
                        - generic [ref=e110]:
                            - img "Фото Тимерлан — ожидается" [ref=e111]:
                                - generic [ref=e113]: ТИ
                                - generic [ref=e114]: ФОТО
                            - generic [ref=e115]:
                                - generic [ref=e116]: Тимерлан
                                - generic [ref=e117]: Мужской парикмахер
                        - generic [ref=e118]:
                            - heading "Тимерлан" [level=2] [ref=e119]
                            - paragraph [ref=e120]: Мужской парикмахер
                            - paragraph [ref=e121]: 177 отзывов
                    - link "Фото Николай — ожидается Николай Мужской парикмахер Николай Мужской парикмахер 153 отзыва" [ref=e123]:
                        - /url: /barbers/nikolay
                        - generic [ref=e124]:
                            - img "Фото Николай — ожидается" [ref=e125]:
                                - generic [ref=e127]: НИ
                                - generic [ref=e128]: ФОТО
                            - generic [ref=e129]:
                                - generic [ref=e130]: Николай
                                - generic [ref=e131]: Мужской парикмахер
                        - generic [ref=e132]:
                            - heading "Николай" [level=2] [ref=e133]
                            - paragraph [ref=e134]: Мужской парикмахер
                            - paragraph [ref=e135]: 153 отзыва
                    - link "Фото Джим — ожидается Джим Мужской парикмахер Джим Мужской парикмахер 113 отзывов" [ref=e137]:
                        - /url: /barbers/dzhim
                        - generic [ref=e138]:
                            - img "Фото Джим — ожидается" [ref=e139]:
                                - generic [ref=e141]: ДЖ
                                - generic [ref=e142]: ФОТО
                            - generic [ref=e143]:
                                - generic [ref=e144]: Джим
                                - generic [ref=e145]: Мужской парикмахер
                        - generic [ref=e146]:
                            - heading "Джим" [level=2] [ref=e147]
                            - paragraph [ref=e148]: Мужской парикмахер
                            - paragraph [ref=e149]: 113 отзывов
                    - link "Фото Арина — ожидается Арина Мастер ногтевого сервиса Арина Мастер ногтевого сервиса 75 отзывов" [ref=e151]:
                        - /url: /barbers/arina
                        - generic [ref=e152]:
                            - img "Фото Арина — ожидается" [ref=e153]:
                                - generic [ref=e155]: АР
                                - generic [ref=e156]: ФОТО
                            - generic [ref=e157]:
                                - generic [ref=e158]: Арина
                                - generic [ref=e159]: Мастер ногтевого сервиса
                        - generic [ref=e160]:
                            - heading "Арина" [level=2] [ref=e161]
                            - paragraph [ref=e162]: Мастер ногтевого сервиса
                            - paragraph [ref=e163]: 75 отзывов
                    - link "Фото Мурат — ожидается Мурат Младший мастер Мурат Младший мастер 15 отзывов" [ref=e165]:
                        - /url: /barbers/murat
                        - generic [ref=e166]:
                            - img "Фото Мурат — ожидается" [ref=e167]:
                                - generic [ref=e169]: МУ
                                - generic [ref=e170]: ФОТО
                            - generic [ref=e171]:
                                - generic [ref=e172]: Мурат
                                - generic [ref=e173]: Младший мастер
                        - generic [ref=e174]:
                            - heading "Мурат" [level=2] [ref=e175]
                            - paragraph [ref=e176]: Младший мастер
                            - paragraph [ref=e177]: 15 отзывов
                    - link "Фото Диана — ожидается Диана Мужской парикмахер Диана Мужской парикмахер 9 отзывов" [ref=e179]:
                        - /url: /barbers/diana
                        - generic [ref=e180]:
                            - img "Фото Диана — ожидается" [ref=e181]:
                                - generic [ref=e183]: ДИ
                                - generic [ref=e184]: ФОТО
                            - generic [ref=e185]:
                                - generic [ref=e186]: Диана
                                - generic [ref=e187]: Мужской парикмахер
                        - generic [ref=e188]:
                            - heading "Диана" [level=2] [ref=e189]
                            - paragraph [ref=e190]: Мужской парикмахер
                            - paragraph [ref=e191]: 9 отзывов
            - generic [ref=e194]:
                - paragraph [ref=e195]: Не знаете к кому записаться? Позвоните — подберём мастера вместе.
                - link "+7 (917) 918-38-77" [ref=e196]:
                    - /url: tel:+79179183877
    - contentinfo [ref=e197]:
        - generic [ref=e198]:
            - generic [ref=e199]:
                - generic [ref=e200]:
                    - link "BASE Premier — на главную" [ref=e201]:
                        - /url: /
                        - img [ref=e202]:
                            - generic [ref=e203]: BP
                            - generic [ref=e204]: BASE PREMIER
                    - paragraph [ref=e205]: Стиль, атмосфера, мастерство — мужской уход без компромиссов
                - navigation "Навигация по сайту" [ref=e206]:
                    - list [ref=e207]:
                        - listitem [ref=e208]:
                            - link "Услуги" [ref=e209]:
                                - /url: /services
                        - listitem [ref=e210]:
                            - link "Мастера" [ref=e211]:
                                - /url: /barbers
                        - listitem [ref=e212]:
                            - link "О нас" [ref=e213]:
                                - /url: /about
                        - listitem [ref=e214]:
                            - link "Журнал" [ref=e215]:
                                - /url: /journal
                        - listitem [ref=e216]:
                            - link "Контакты" [ref=e217]:
                                - /url: /contacts
                - generic [ref=e218]:
                    - generic [ref=e219]:
                        - generic [ref=e220]: ул. Шаляпина, 26, 1 этаж
                        - generic [ref=e221]: Казань
                    - paragraph [ref=e222]: Ежедневно 10:00–21:00
                    - link "+7 (917) 918-38-77" [ref=e223]:
                        - /url: tel:+79179183877
                    - generic [ref=e224]:
                        - link "WhatsApp" [ref=e225]:
                            - /url: https://wa.me/79179183877
                            - img [ref=e226]
                        - link "Telegram" [ref=e229]:
                            - /url: https://t.me/+79179183877
                            - img [ref=e230]
            - generic [ref=e232]:
                - generic [ref=e233]: © 2022–2026 BASE Premier
                - generic [ref=e234]:
                    - generic [ref=e235]: ИП Шайхутдинов Айрат Рафаэлевич · ИНН 163207031442
                    - link "Политика конфиденциальности" [ref=e236]:
                        - /url: /privacy
    - generic:
        - button "Записаться онлайн": Записаться
    - generic [ref=e237]:
        - link "Написать в WhatsApp" [ref=e238]:
            - /url: https://wa.me/79179183877
            - img [ref=e239]
        - link "Написать в Telegram" [ref=e242]:
            - /url: https://t.me/+79179183877
            - img [ref=e243]
    - dialog [ref=e245]:
        - generic [ref=e246]:
            - paragraph [ref=e247]:
                - text: Мы используем cookie для аналитики и улучшения сервиса. Подробнее —
                - link [ref=e248]:
                    - /url: /privacy
                    - text: Политика конфиденциальности
                - text: .
            - generic [ref=e249]:
                - button [ref=e250]: Только необходимые
                - button [ref=e251]: Принять все
    - alert [ref=e252]
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
  29  | async function dismissCookieBanner(page: Page) {
  30  |   const cookieBtn = page.locator(
  31  |     "button:has-text('Принять'), button:has-text('Согласен'), button:has-text('OK'), button:has-text('Принять всё'), [data-testid='cookie-accept']"
  32  |   );
  33  |   try {
  34  |     await cookieBtn.first().click({ timeout: 3000 });
  35  |   } catch {
  36  |     // no banner shown
  37  |   }
  38  | }
  39  |
  40  | for (const vp of VIEWPORTS) {
  41  |   test.describe(`@${vp.name}px`, () => {
  42  |     test.use({ viewport: { width: vp.width, height: vp.height } });
  43  |
  44  |     for (const pg of PAGES) {
  45  |       test(`${pg.label} ${pg.route} — H1 + CTA + console`, async ({ page }) => {
  46  |         const errors: string[] = [];
  47  |         page.on("console", (msg) => {
  48  |           if (msg.type() === "error") errors.push(msg.text());
  49  |         });
  50  |         page.on("pageerror", (err) => errors.push(err.message));
  51  |
  52  |         await page.goto(`${BASE}${pg.route}`, { waitUntil: "domcontentloaded" });
  53  |         await page.waitForLoadState("networkidle").catch(() => {});
  54  |
  55  |         // Screenshot — full page
  56  |         const filename = `${pg.label.toLowerCase()}-${vp.name}.png`;
  57  |         await page.screenshot({
  58  |           path: path.join(screenshotDir, filename),
  59  |           fullPage: true,
  60  |         });
  61  |
  62  |         // 1. H1 exists and is non-empty
  63  |         const h1 = page.locator("h1").first();
  64  |         await expect(h1, `H1 must exist on ${pg.route}`).toBeVisible({ timeout: 10000 });
  65  |         const h1Text = (await h1.textContent()) ?? "";
  66  |         expect(h1Text.trim().length, `H1 must have text on ${pg.route}`).toBeGreaterThan(0);
  67  |         console.log(`  H1 [${vp.name}px] ${pg.route}: "${h1Text.trim()}"`);
  68  |
  69  |         // 2. Cookie banner check — must not obscure primary CTA
  70  |         //    Find booking CTA buttons
  71  |         const cta = page.locator(
  72  |           "a[href*='yclients'], button:has-text('Записаться'), a:has-text('Записаться')"
  73  |         );
  74  |         const ctaCount = await cta.count();
  75  |         if (ctaCount > 0) {
  76  |           const firstCta = cta.first();
  77  |           const isVisible = await firstCta.isVisible();
> 78  |           console.log(`  CTA visible [${vp.name}px] ${pg.route}: ${isVisible}`);
      |                                                                                  ^ Error: Primary CTA visible on /barbers @ 375px
  79  |           expect(isVisible, `Primary CTA visible on ${pg.route} @ ${vp.name}px`).toBeTruthy();
  80  |         } else {
  81  |           console.log(`  CTA not found [${vp.name}px] ${pg.route}`);
  82  |         }
  83  |
  84  |         // 3. Console errors
  85  |         if (errors.length > 0) {
  86  |           console.warn(`  CONSOLE ERRORS [${vp.name}px] ${pg.route}:`, errors);
  87  |         }
  88  |         expect(errors.filter((e) => !e.includes("favicon")), `No console errors on ${pg.route}`).toHaveLength(0);
  89  |       });
  90  |     }
  91  |
  92  |     // tel: link test — only once per viewport on homepage
  93  |     test(`tel: link on Home @ ${vp.name}px`, async ({ page }) => {
  94  |       await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  95  |       await page.waitForLoadState("networkidle").catch(() => {});
  96  |
  97  |       const telLink = page.locator('a[href^="tel:"]').first();
  98  |       await expect(telLink, "tel: link must exist").toBeVisible({ timeout: 8000 });
  99  |       const href = await telLink.getAttribute("href");
  100 |       expect(href, "tel: href must include phone number").toMatch(/tel:\+7/);
  101 |       console.log(`  tel: link [${vp.name}px]: ${href}`);
  102 |     });
  103 |
  104 |     // Cookie banner overlay test on Home
  105 |     test(`Cookie banner does not block H1 CTA @ ${vp.name}px`, async ({ page }) => {
  106 |       await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  107 |       await page.waitForLoadState("networkidle").catch(() => {});
  108 |
  109 |       // Check if cookie banner is present
  110 |       const banner = page.locator(
  111 |         "[data-testid='cookie-banner'], .cookie-banner, [class*='cookie'], [id*='cookie']"
  112 |       );
  113 |       const bannerVisible = await banner.first().isVisible().catch(() => false);
  114 |       console.log(`  Cookie banner visible [${vp.name}px]: ${bannerVisible}`);
  115 |
  116 |       // Hero CTA must still be interactive even if banner present
  117 |       const heroSection = page.locator("section").first();
  118 |       const heroCta = heroSection.locator(
  119 |         "button:has-text('Записаться'), a:has-text('Записаться'), a[href*='yclients']"
  120 |       ).first();
  121 |
  122 |       const heroCtaExists = await heroCta.count() > 0;
  123 |       if (heroCtaExists) {
  124 |         // Check it's not fully obscured (clickable)
  125 |         const box = await heroCta.boundingBox();
  126 |         if (box) {
  127 |           // Element in viewport?
  128 |           const viewportHeight = vp.height;
  129 |           const inViewport = box.y < viewportHeight;
  130 |           console.log(`  Hero CTA in viewport [${vp.name}px]: ${inViewport}, y=${Math.round(box.y)}`);
  131 |         }
  132 |       }
  133 |     });
  134 |   });
  135 | }
  136 |
```
