# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: live-qa.spec.ts >> @375px >> Services /services — H1 + CTA + console
- Location: tests/e2e/live-qa.spec.ts:34:11

# Error details

```
Error: Primary CTA visible on /services @ 375px

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
                - paragraph [ref=e19]: 27 услуг · 3 категории
                - heading "У с л у г и" [level=1] [ref=e20]:
                    - generic [ref=e21]:
                        - generic [ref=e23]: У
                        - generic [ref=e25]: с
                        - generic [ref=e27]: л
                        - generic [ref=e29]: у
                        - generic [ref=e31]: г
                        - generic [ref=e33]: и
                - paragraph [ref=e34]: Двадцать семь процедур в трёх категориях. Средний чек — 2 400 ₽. Прозрачные цены, один мастер от начала до конца.
            - generic [ref=e37]:
                - searchbox "Поиск услуги" [ref=e40]
                - tablist "Фильтр по категориям" [ref=e41]:
                    - tab "Все" [selected] [ref=e42]
                    - tab "Парикмахерский зал" [ref=e43]
                    - tab "Комплексные" [ref=e44]
                    - tab "Ногтевой зал" [ref=e45]
                - generic [ref=e48]:
                    - region "Парикмахерский зал" [ref=e49]:
                        - generic [ref=e50]:
                            - heading "Парикмахерский зал" [level=2] [ref=e51]
                            - generic [ref=e53]: "18"
                        - generic [ref=e54]:
                            - link "Мужская стрижка 1 800 – 2 700 ₽ 1 ч Парикмахерский зал" [ref=e56]:
                                - /url: /services/haircut
                                - img
                                - generic [ref=e61]:
                                    - heading "Мужская стрижка" [level=3] [ref=e62]
                                    - generic [ref=e63]:
                                        - generic [ref=e64]: 1 800 – 2 700 ₽
                                        - generic [ref=e65]: 1 ч
                                - generic [ref=e66]: →
                                - generic [ref=e67]: Парикмахерский зал
                            - link "Мужская стрижка с бородой 3 200 – 4 600 ₽ 1 ч 30 мин Парикмахерский зал" [ref=e69]:
                                - /url: /services/haircut-beard
                                - img
                                - generic [ref=e74]:
                                    - heading "Мужская стрижка с бородой" [level=3] [ref=e75]
                                    - generic [ref=e76]:
                                        - generic [ref=e77]: 3 200 – 4 600 ₽
                                        - generic [ref=e78]: 1 ч 30 мин
                                - generic [ref=e79]: →
                                - generic [ref=e80]: Парикмахерский зал
                            - link "Моделирование бороды 1 400 – 1 900 ₽ 30 мин Парикмахерский зал" [ref=e82]:
                                - /url: /services/beard
                                - img
                                - generic [ref=e87]:
                                    - heading "Моделирование бороды" [level=3] [ref=e88]
                                    - generic [ref=e89]:
                                        - generic [ref=e90]: 1 400 – 1 900 ₽
                                        - generic [ref=e91]: 30 мин
                                - generic [ref=e92]: →
                                - generic [ref=e93]: Парикмахерский зал
                            - link "Премиальное моделирование SOLOMON'S 3 000 ₽ 1 ч Парикмахерский зал" [ref=e95]:
                                - /url: /services/beard-premium
                                - img
                                - generic [ref=e100]:
                                    - heading "Премиальное моделирование SOLOMON'S" [level=3] [ref=e101]
                                    - generic [ref=e102]:
                                        - generic [ref=e103]: 3 000 ₽
                                        - generic [ref=e104]: 1 ч
                                - generic [ref=e105]: →
                                - generic [ref=e106]: Парикмахерский зал
                            - link "Премиальный уход за лицом London Grooming 2 150 ₽ 30 мин Парикмахерский зал" [ref=e108]:
                                - /url: /services/face-london
                                - img
                                - generic [ref=e113]:
                                    - heading "Премиальный уход за лицом London Grooming" [level=3] [ref=e114]
                                    - generic [ref=e115]:
                                        - generic [ref=e116]: 2 150 ₽
                                        - generic [ref=e117]: 30 мин
                                - generic [ref=e118]: →
                                - generic [ref=e119]: Парикмахерский зал
                            - link "5–10 лет Детская стрижка 1 600 – 2 400 ₽ 1 ч Парикмахерский зал" [ref=e121]:
                                - /url: /services/kids
                                - img
                                - generic [ref=e126]:
                                    - paragraph [ref=e127]: 5–10 лет
                                    - heading "Детская стрижка" [level=3] [ref=e128]
                                    - generic [ref=e129]:
                                        - generic [ref=e130]: 1 600 – 2 400 ₽
                                        - generic [ref=e131]: 1 ч
                                - generic [ref=e132]: →
                                - generic [ref=e133]: Парикмахерский зал
                            - link "Стрижка машинкой 1 400 – 2 000 ₽ 30 мин Парикмахерский зал" [ref=e135]:
                                - /url: /services/clipper
                                - img
                                - generic [ref=e140]:
                                    - heading "Стрижка машинкой" [level=3] [ref=e141]
                                    - generic [ref=e142]:
                                        - generic [ref=e143]: 1 400 – 2 000 ₽
                                        - generic [ref=e144]: 30 мин
                                - generic [ref=e145]: →
                                - generic [ref=e146]: Парикмахерский зал
                            - link "Окантовка 1 200 – 1 500 ₽ 30 мин Парикмахерский зал" [ref=e148]:
                                - /url: /services/outline
                                - img
                                - generic [ref=e153]:
                                    - heading "Окантовка" [level=3] [ref=e154]
                                    - generic [ref=e155]:
                                        - generic [ref=e156]: 1 200 – 1 500 ₽
                                        - generic [ref=e157]: 30 мин
                                - generic [ref=e158]: →
                                - generic [ref=e159]: Парикмахерский зал
                            - link "Ваксинг (нос / уши / брови) 700 ₽ 10 мин Парикмахерский зал" [ref=e161]:
                                - /url: /services/waxing
                                - img
                                - generic [ref=e166]:
                                    - heading "Ваксинг (нос / уши / брови)" [level=3] [ref=e167]
                                    - generic [ref=e168]:
                                        - generic [ref=e169]: 700 ₽
                                        - generic [ref=e170]: 10 мин
                                - generic [ref=e171]: →
                                - generic [ref=e172]: Парикмахерский зал
                            - link "Детокс кожи головы Graham Hill 600 ₽ 15 мин Парикмахерский зал" [ref=e174]:
                                - /url: /services/detox
                                - img
                                - generic [ref=e179]:
                                    - heading "Детокс кожи головы Graham Hill" [level=3] [ref=e180]
                                    - generic [ref=e181]:
                                        - generic [ref=e182]: 600 ₽
                                        - generic [ref=e183]: 15 мин
                                - generic [ref=e184]: →
                                - generic [ref=e185]: Парикмахерский зал
                            - link "Оформление бровей 1 200 ₽ 20 мин Парикмахерский зал" [ref=e187]:
                                - /url: /services/eyebrows
                                - img
                                - generic [ref=e192]:
                                    - heading "Оформление бровей" [level=3] [ref=e193]
                                    - generic [ref=e194]:
                                        - generic [ref=e195]: 1 200 ₽
                                        - generic [ref=e196]: 20 мин
                                - generic [ref=e197]: →
                                - generic [ref=e198]: Парикмахерский зал
                            - link "Бритьё головы 2 000 ₽ 1 ч Парикмахерский зал" [ref=e200]:
                                - /url: /services/head-shave
                                - img
                                - generic [ref=e205]:
                                    - heading "Бритьё головы" [level=3] [ref=e206]
                                    - generic [ref=e207]:
                                        - generic [ref=e208]: 2 000 ₽
                                        - generic [ref=e209]: 1 ч
                                - generic [ref=e210]: →
                                - generic [ref=e211]: Парикмахерский зал
                            - link "Гладкое бритьё лица 1 800 ₽ 45 мин Парикмахерский зал" [ref=e213]:
                                - /url: /services/shave
                                - img
                                - generic [ref=e218]:
                                    - heading "Гладкое бритьё лица" [level=3] [ref=e219]
                                    - generic [ref=e220]:
                                        - generic [ref=e221]: 1 800 ₽
                                        - generic [ref=e222]: 45 мин
                                - generic [ref=e223]: →
                                - generic [ref=e224]: Парикмахерский зал
                            - link "Камуфляж седины от 1 600 ₽ 30 мин Парикмахерский зал" [ref=e226]:
                                - /url: /services/camouflage
                                - img
                                - generic [ref=e231]:
                                    - heading "Камуфляж седины" [level=3] [ref=e232]
                                    - generic [ref=e233]:
                                        - generic [ref=e234]: от 1 600 ₽
                                        - generic [ref=e235]: 30 мин
                                - generic [ref=e236]: →
                                - generic [ref=e237]: Парикмахерский зал
                            - link "Окрашивание от 7 000 ₽ 1 ч Парикмахерский зал" [ref=e239]:
                                - /url: /services/color
                                - img
                                - generic [ref=e244]:
                                    - heading "Окрашивание" [level=3] [ref=e245]
                                    - generic [ref=e246]:
                                        - generic [ref=e247]: от 7 000 ₽
                                        - generic [ref=e248]: 1 ч
                                - generic [ref=e249]: →
                                - generic [ref=e250]: Парикмахерский зал
                            - link "Скраб + чёрная маска 1 500 ₽ 25 мин Парикмахерский зал" [ref=e252]:
                                - /url: /services/scrub
                                - img
                                - generic [ref=e257]:
                                    - heading "Скраб + чёрная маска" [level=3] [ref=e258]
                                    - generic [ref=e259]:
                                        - generic [ref=e260]: 1 500 ₽
                                        - generic [ref=e261]: 25 мин
                                - generic [ref=e262]: →
                                - generic [ref=e263]: Парикмахерский зал
                            - link "Укладка 600 ₽ 15 мин Парикмахерский зал" [ref=e265]:
                                - /url: /services/styling
                                - img
                                - generic [ref=e270]:
                                    - heading "Укладка" [level=3] [ref=e271]
                                    - generic [ref=e272]:
                                        - generic [ref=e273]: 600 ₽
                                        - generic [ref=e274]: 15 мин
                                - generic [ref=e275]: →
                                - generic [ref=e276]: Парикмахерский зал
                            - link "Массаж шейно-воротниковой зоны и лица 1 200 ₽ 20 мин Парикмахерский зал" [ref=e278]:
                                - /url: /services/massage
                                - img
                                - generic [ref=e283]:
                                    - heading "Массаж шейно-воротниковой зоны и лица" [level=3] [ref=e284]
                                    - generic [ref=e285]:
                                        - generic [ref=e286]: 1 200 ₽
                                        - generic [ref=e287]: 20 мин
                                - generic [ref=e288]: →
                                - generic [ref=e289]: Парикмахерский зал
                    - region "Комплексные услуги" [ref=e290]:
                        - generic [ref=e291]:
                            - heading "Комплексные услуги" [level=2] [ref=e292]
                            - generic [ref=e294]: "2"
                        - generic [ref=e295]:
                            - link "В 4 руки, одновременно Стрижка + Экспресс маникюр 2 800 – 3 700 ₽ 1 ч Комплексные услуги" [ref=e297]:
                                - /url: /services/combo-express
                                - img
                                - generic [ref=e302]:
                                    - paragraph [ref=e303]: В 4 руки, одновременно
                                    - heading "Стрижка + Экспресс маникюр" [level=3] [ref=e304]
                                    - generic [ref=e305]:
                                        - generic [ref=e306]: 2 800 – 3 700 ₽
                                        - generic [ref=e307]: 1 ч
                                - generic [ref=e308]: →
                                - generic [ref=e309]: Комплексные услуги
                            - link "Экономия 15% Стрижка + Маникюр 3 100 – 4 000 ₽ 2 ч Комплексные услуги" [ref=e311]:
                                - /url: /services/combo-manicure
                                - img
                                - generic [ref=e316]:
                                    - paragraph [ref=e317]: Экономия 15%
                                    - heading "Стрижка + Маникюр" [level=3] [ref=e318]
                                    - generic [ref=e319]:
                                        - generic [ref=e320]: 3 100 – 4 000 ₽
                                        - generic [ref=e321]: 2 ч
                                - generic [ref=e322]: →
                                - generic [ref=e323]: Комплексные услуги
                    - region "Ногтевой зал «Fresh Hands»" [ref=e324]:
                        - generic [ref=e325]:
                            - heading "Ногтевой зал «Fresh Hands»" [level=2] [ref=e326]
                            - generic [ref=e327]: "7"
                        - generic [ref=e328]:
                            - link "Мужской маникюр 1 900 ₽ 1 ч Ногтевой зал «Fresh Hands»" [ref=e330]:
                                - /url: /services/manicure
                                - img
                                - generic [ref=e335]:
                                    - heading "Мужской маникюр" [level=3] [ref=e336]
                                    - generic [ref=e337]:
                                        - generic [ref=e338]: 1 900 ₽
                                        - generic [ref=e339]: 1 ч
                                - generic [ref=e340]: →
                                - generic [ref=e341]: Ногтевой зал «Fresh Hands»
                            - link "Экспресс маникюр 1 000 ₽ 15 мин Ногтевой зал «Fresh Hands»" [ref=e343]:
                                - /url: /services/manicure-express
                                - img
                                - generic [ref=e348]:
                                    - heading "Экспресс маникюр" [level=3] [ref=e349]
                                    - generic [ref=e350]:
                                        - generic [ref=e351]: 1 000 ₽
                                        - generic [ref=e352]: 15 мин
                                - generic [ref=e353]: →
                                - generic [ref=e354]: Ногтевой зал «Fresh Hands»
                            - link "Педикюр гигиенический (пальцы + стопы) 3 000 ₽ 1 ч Ногтевой зал «Fresh Hands»" [ref=e356]:
                                - /url: /services/pedicure-full
                                - img
                                - generic [ref=e361]:
                                    - heading "Педикюр гигиенический (пальцы + стопы)" [level=3] [ref=e362]
                                    - generic [ref=e363]:
                                        - generic [ref=e364]: 3 000 ₽
                                        - generic [ref=e365]: 1 ч
                                - generic [ref=e366]: →
                                - generic [ref=e367]: Ногтевой зал «Fresh Hands»
                            - link "Педикюр гигиенический (только пальцы) 2 300 ₽ 1 ч Ногтевой зал «Fresh Hands»" [ref=e369]:
                                - /url: /services/pedicure-toes
                                - img
                                - generic [ref=e374]:
                                    - heading "Педикюр гигиенический (только пальцы)" [level=3] [ref=e375]
                                    - generic [ref=e376]:
                                        - generic [ref=e377]: 2 300 ₽
                                        - generic [ref=e378]: 1 ч
                                - generic [ref=e379]: →
                                - generic [ref=e380]: Ногтевой зал «Fresh Hands»
                            - link "Экспресс педикюр 1 200 ₽ 15 мин Ногтевой зал «Fresh Hands»" [ref=e382]:
                                - /url: /services/pedicure-express
                                - img
                                - generic [ref=e387]:
                                    - heading "Экспресс педикюр" [level=3] [ref=e388]
                                    - generic [ref=e389]:
                                        - generic [ref=e390]: 1 200 ₽
                                        - generic [ref=e391]: 15 мин
                                - generic [ref=e392]: →
                                - generic [ref=e393]: Ногтевой зал «Fresh Hands»
                            - link "Массаж стоп 1 500 ₽ 15 мин Ногтевой зал «Fresh Hands»" [ref=e395]:
                                - /url: /services/foot-massage
                                - img
                                - generic [ref=e400]:
                                    - heading "Массаж стоп" [level=3] [ref=e401]
                                    - generic [ref=e402]:
                                        - generic [ref=e403]: 1 500 ₽
                                        - generic [ref=e404]: 15 мин
                                - generic [ref=e405]: →
                                - generic [ref=e406]: Ногтевой зал «Fresh Hands»
                            - link "Массаж рук 500 ₽ 10 мин Ногтевой зал «Fresh Hands»" [ref=e408]:
                                - /url: /services/hand-massage
                                - img
                                - generic [ref=e413]:
                                    - heading "Массаж рук" [level=3] [ref=e414]
                                    - generic [ref=e415]:
                                        - generic [ref=e416]: 500 ₽
                                        - generic [ref=e417]: 10 мин
                                - generic [ref=e418]: →
                                - generic [ref=e419]: Ногтевой зал «Fresh Hands»
            - generic [ref=e422]:
                - paragraph [ref=e423]: Не нашли нужную услугу? Позвоните — подберём вместе.
                - link "+7 (917) 918-38-77" [ref=e424]:
                    - /url: tel:+79179183877
    - contentinfo [ref=e425]:
        - generic [ref=e426]:
            - generic [ref=e427]:
                - generic [ref=e428]:
                    - link "BASE Premier — на главную" [ref=e429]:
                        - /url: /
                        - img [ref=e430]:
                            - generic [ref=e431]: BP
                            - generic [ref=e432]: BASE PREMIER
                    - paragraph [ref=e433]: Стиль, атмосфера, мастерство — мужской уход без компромиссов
                - navigation "Навигация по сайту" [ref=e434]:
                    - list [ref=e435]:
                        - listitem [ref=e436]:
                            - link "Услуги" [ref=e437]:
                                - /url: /services
                        - listitem [ref=e438]:
                            - link "Мастера" [ref=e439]:
                                - /url: /barbers
                        - listitem [ref=e440]:
                            - link "О нас" [ref=e441]:
                                - /url: /about
                        - listitem [ref=e442]:
                            - link "Журнал" [ref=e443]:
                                - /url: /journal
                        - listitem [ref=e444]:
                            - link "Контакты" [ref=e445]:
                                - /url: /contacts
                - generic [ref=e446]:
                    - generic [ref=e447]:
                        - generic [ref=e448]: ул. Шаляпина, 26, 1 этаж
                        - generic [ref=e449]: Казань
                    - paragraph [ref=e450]: Ежедневно 10:00–21:00
                    - link "+7 (917) 918-38-77" [ref=e451]:
                        - /url: tel:+79179183877
                    - generic [ref=e452]:
                        - link "WhatsApp" [ref=e453]:
                            - /url: https://wa.me/79179183877
                            - img [ref=e454]
                        - link "Telegram" [ref=e457]:
                            - /url: https://t.me/+79179183877
                            - img [ref=e458]
            - generic [ref=e460]:
                - generic [ref=e461]: © 2022–2026 BASE Premier
                - generic [ref=e462]:
                    - generic [ref=e463]: ИП Шайхутдинов Айрат Рафаэлевич · ИНН 163207031442
                    - link "Политика конфиденциальности" [ref=e464]:
                        - /url: /privacy
    - generic:
        - button "Записаться онлайн": Записаться
    - generic [ref=e465]:
        - link "Написать в WhatsApp" [ref=e466]:
            - /url: https://wa.me/79179183877
            - img [ref=e467]
        - link "Написать в Telegram" [ref=e470]:
            - /url: https://t.me/+79179183877
            - img [ref=e471]
    - dialog [ref=e473]:
        - generic [ref=e474]:
            - paragraph [ref=e475]:
                - text: Мы используем cookie для аналитики и улучшения сервиса. Подробнее —
                - link [ref=e476]:
                    - /url: /privacy
                    - text: Политика конфиденциальности
                - text: .
            - generic [ref=e477]:
                - button [ref=e478]: Только необходимые
                - button [ref=e479]: Принять все
    - alert [ref=e480]
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
  29  | for (const vp of VIEWPORTS) {
  30  |   test.describe(`@${vp.name}px`, () => {
  31  |     test.use({ viewport: { width: vp.width, height: vp.height } });
  32  |
  33  |     for (const pg of PAGES) {
  34  |       test(`${pg.label} ${pg.route} — H1 + CTA + console`, async ({ page }) => {
  35  |         const errors: string[] = [];
  36  |         page.on("console", (msg) => {
  37  |           if (msg.type() === "error") errors.push(msg.text());
  38  |         });
  39  |         page.on("pageerror", (err) => errors.push(err.message));
  40  |
  41  |         await page.goto(`${BASE}${pg.route}`, { waitUntil: "domcontentloaded" });
  42  |         await page.waitForLoadState("networkidle").catch(() => {});
  43  |
  44  |         // Screenshot — full page
  45  |         const filename = `${pg.label.toLowerCase()}-${vp.name}.png`;
  46  |         await page.screenshot({
  47  |           path: path.join(screenshotDir, filename),
  48  |           fullPage: true,
  49  |         });
  50  |
  51  |         // 1. H1 exists and is non-empty
  52  |         const h1 = page.locator("h1").first();
  53  |         await expect(h1, `H1 must exist on ${pg.route}`).toBeVisible({ timeout: 10000 });
  54  |         const h1Text = (await h1.textContent()) ?? "";
  55  |         expect(h1Text.trim().length, `H1 must have text on ${pg.route}`).toBeGreaterThan(0);
  56  |         console.warn(`  H1 [${vp.name}px] ${pg.route}: "${h1Text.trim()}"`);
  57  |
  58  |         // 2. Cookie banner check — must not obscure primary CTA
  59  |         //    Find booking CTA buttons
  60  |         const cta = page.locator(
  61  |           "a[href*='yclients'], button:has-text('Записаться'), a:has-text('Записаться')",
  62  |         );
  63  |         const ctaCount = await cta.count();
  64  |         if (ctaCount > 0) {
  65  |           const firstCta = cta.first();
  66  |           const isVisible = await firstCta.isVisible();
  67  |           console.warn(`  CTA visible [${vp.name}px] ${pg.route}: ${isVisible}`);
> 68  |           expect(isVisible, `Primary CTA visible on ${pg.route} @ ${vp.name}px`).toBeTruthy();
      |                                                                                  ^ Error: Primary CTA visible on /services @ 375px
  69  |         } else {
  70  |           console.warn(`  CTA not found [${vp.name}px] ${pg.route}`);
  71  |         }
  72  |
  73  |         // 3. Console errors
  74  |         if (errors.length > 0) {
  75  |           console.warn(`  CONSOLE ERRORS [${vp.name}px] ${pg.route}:`, errors);
  76  |         }
  77  |         expect(
  78  |           errors.filter((e) => !e.includes("favicon")),
  79  |           `No console errors on ${pg.route}`,
  80  |         ).toHaveLength(0);
  81  |       });
  82  |     }
  83  |
  84  |     // tel: link test — only once per viewport on homepage
  85  |     test(`tel: link on Home @ ${vp.name}px`, async ({ page }) => {
  86  |       await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  87  |       await page.waitForLoadState("networkidle").catch(() => {});
  88  |
  89  |       const telLink = page.locator('a[href^="tel:"]').first();
  90  |       await expect(telLink, "tel: link must exist").toBeVisible({ timeout: 8000 });
  91  |       const href = await telLink.getAttribute("href");
  92  |       expect(href, "tel: href must include phone number").toMatch(/tel:\+7/);
  93  |       console.warn(`  tel: link [${vp.name}px]: ${href}`);
  94  |     });
  95  |
  96  |     // Cookie banner overlay test on Home
  97  |     test(`Cookie banner does not block H1 CTA @ ${vp.name}px`, async ({ page }) => {
  98  |       await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  99  |       await page.waitForLoadState("networkidle").catch(() => {});
  100 |
  101 |       // Check if cookie banner is present
  102 |       const banner = page.locator(
  103 |         "[data-testid='cookie-banner'], .cookie-banner, [class*='cookie'], [id*='cookie']",
  104 |       );
  105 |       const bannerVisible = await banner
  106 |         .first()
  107 |         .isVisible()
  108 |         .catch(() => false);
  109 |       console.warn(`  Cookie banner visible [${vp.name}px]: ${bannerVisible}`);
  110 |
  111 |       // Hero CTA must still be interactive even if banner present
  112 |       const heroSection = page.locator("section").first();
  113 |       const heroCta = heroSection
  114 |         .locator("button:has-text('Записаться'), a:has-text('Записаться'), a[href*='yclients']")
  115 |         .first();
  116 |
  117 |       const heroCtaExists = (await heroCta.count()) > 0;
  118 |       if (heroCtaExists) {
  119 |         // Check it's not fully obscured (clickable)
  120 |         const box = await heroCta.boundingBox();
  121 |         if (box) {
  122 |           // Element in viewport?
  123 |           const viewportHeight = vp.height;
  124 |           const inViewport = box.y < viewportHeight;
  125 |           console.warn(
  126 |             `  Hero CTA in viewport [${vp.name}px]: ${inViewport}, y=${Math.round(box.y)}`,
  127 |           );
  128 |         }
  129 |       }
  130 |     });
  131 |   });
  132 | }
  133 |
```
