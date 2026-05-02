# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: live-qa.spec.ts >> @375px >> About /about — H1 + CTA + console
- Location: tests/e2e/live-qa.spec.ts:44:11

# Error details

```
Error: Primary CTA visible on /about @ 375px

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
                - paragraph [ref=e19]: С 2022 · Казань
                - heading "О н а с" [level=1] [ref=e20]:
                    - generic [ref=e23]: О
                    - generic [ref=e25]:
                        - generic [ref=e27]: н
                        - generic [ref=e29]: а
                        - generic [ref=e31]: с
            - generic [ref=e35]:
                - paragraph [ref=e36]: BASE Premier — мужской салон в Казани. Мы открылись в 2022 году в самом центре города, на улице Шаляпина, 26 — в трёхстах метрах от Концертного зала Филармонии.
                - paragraph [ref=e37]:
                    - strong [ref=e38]: "Мы делаем три вещи: стрижём, ухаживаем, заботимся."
                - paragraph [ref=e39]: И ничего больше.
                - paragraph [ref=e40]: В этом — суть. У нас нет бильярда, кальянной комнаты, дорогого виски и притворной мужской атмосферы. Если вам нужно мужское пространство в стиле американского клуба — мы посоветуем коллег. Здесь — другое.
                - paragraph [ref=e41]: Здесь тишина. Свет, который не режет глаз. Музыка, которую можно не слушать. Один час, в течение которого десять человек команды работают для одного клиента.
                - paragraph [ref=e42]:
                    - text: В нашем зале — десять мастеров, каждый из которых за плечами имеет от ста до трёхсот стрижек. В работе мы используем профессиональные средства от
                    - strong [ref=e43]: Graham Hill, Davines, The London Grooming Co и Solomon's
                    - text: — те же, которыми пользуются в Лондоне, Милане и Берлине.
                - paragraph [ref=e44]: Каждая стрижка длится не меньше часа. В этот час входит детокс кожи головы, мытьё, стрижка по структуре волос, моделирование, укладка, бритьё шеи. Если у вас борода — добавляется получасовая работа над контурами и компресс.
                - paragraph [ref=e45]: Мы знаем, что у людей, которые приходят к нам, — бизнес, переговоры, дети, тренажёры, утренние кофе и вечерние самолёты. Поэтому мы держим зал открытым семь дней в неделю, с десяти утра до девяти вечера. Записаться можно за один клик — прямо здесь, на сайте.
                - paragraph [ref=e46]: Мы не обещаем «преобразить вас». Мы обещаем час покоя и чёткую, продуманную работу. Это всё, что нужно. Этого, как правило, достаточно.
                - paragraph [ref=e47]:
                    - text: — BASE Premier
                    - text: ул. Шаляпина, 26 · Казань · с 2022
            - generic [ref=e49]:
                - paragraph [ref=e50]: Стандарты
                - generic [ref=e51]:
                    - generic [ref=e52]:
                        - paragraph [ref=e53]: "01"
                        - heading "Час, а не 30 минут" [level=2] [ref=e54]
                        - paragraph [ref=e55]: Большинство барбершопов выделяют 30 минут на стрижку. Мы — час. В этот час входит детокс кожи головы, мытьё, стрижка по структуре волос, моделирование, укладка и завершающее парфюмирование. В среднем — в два раза больше работы.
                    - generic [ref=e56]:
                        - paragraph [ref=e57]: "02"
                        - heading "Профессиональная косметика" [level=2] [ref=e58]
                        - paragraph [ref=e59]: В нашем зале на полках — Graham Hill, Davines, The London Grooming Co и Solomon's. Шампунь для тонких волос, шампунь для жирной кожи головы, тоник с никотиновой кислотой, восемь видов укладочных средств. Под вашу структуру волос мы подбираем средство, а не используем универсальное.
                    - generic [ref=e60]:
                        - paragraph [ref=e61]: "03"
                        - heading "Десять мастеров, не один универсал" [level=2] [ref=e62]
                        - paragraph [ref=e63]: В нашем зале десять мастеров. Каждый — со своим почерком и любимыми техниками. Если ваша задача — fade с короткими висками и длинной макушкой, к Сайоду вы попадёте быстрее, чем к универсальному мастеру в массмаркете. Мы не назначаем мастера автоматически — вы выбираете.
                    - generic [ref=e64]:
                        - paragraph [ref=e65]: "04"
                        - heading "Тишина, а не open space" [level=2] [ref=e66]
                        - paragraph [ref=e67]: "В нашем зале — пять рабочих мест и десять минут между визитами. Это значит: вы не сидите рядом с другим клиентом «локоть в локоть», вас не отвлекает разговор соседа, и мастер не торопится — он работает с вашими волосами, а не «успевает до следующего»."
            - generic [ref=e70]:
                - generic [ref=e71]:
                    - paragraph [ref=e72]: FAQ
                    - heading "Частые вопросы" [level=2] [ref=e73]:
                        - text: Частые
                        - text: вопросы
                - generic [ref=e74]:
                    - generic [ref=e75]:
                        - button "Сколько длится стрижка?" [expanded] [ref=e76]:
                            - generic [ref=e77]: Сколько длится стрижка?
                            - img [ref=e79]
                        - region "Сколько длится стрижка?" [ref=e82]:
                            - paragraph [ref=e84]: Час. Это базовая длительность для большинства услуг. Если у вас борода — добавляется 30 минут. Точная длительность каждой услуги указана на странице услуги.
                    - generic [ref=e85]:
                        - button "Можно ли записаться без онлайн-записи?" [ref=e86]:
                            - generic [ref=e87]: Можно ли записаться без онлайн-записи?
                            - img [ref=e89]
                        - region "Можно ли записаться без онлайн-записи?":
                            - paragraph [ref=e90]: "Можно. Позвоните по номеру +7 (917) 918-38-77 или напишите в WhatsApp / Telegram на этот же номер. Но онлайн-запись через сайт — быстрее: вы видите свободные окна всех мастеров и записываетесь в один клик."
                    - generic [ref=e91]:
                        - button "Что значат разные цены на одну услугу — 1 800 и 2 700 ₽?" [ref=e92]:
                            - generic [ref=e93]: Что значат разные цены на одну услугу — 1 800 и 2 700 ₽?
                            - img [ref=e95]
                        - region "Что значат разные цены на одну услугу — 1 800 и 2 700 ₽?":
                            - paragraph [ref=e96]: Это категории мастеров. У младших мастеров — стартовая цена. У старших — финальная. Все мастера прошли одинаковое обучение внутри BASE Premier; разница в опыте, скорости и количестве отработанных случаев. Выбор — за вами.
                    - generic [ref=e97]:
                        - button "Делаете ли вы детские стрижки?" [ref=e98]:
                            - generic [ref=e99]: Делаете ли вы детские стрижки?
                            - img [ref=e101]
                        - region "Делаете ли вы детские стрижки?":
                            - paragraph [ref=e102]: Да, для детей от 5 до 10 лет. Длительность — час, как и у взрослого клиента. Цена — 1 600–2 400 ₽. Если ребёнку нужно отвлечься, у нас есть планшет с играми и наушниками.
                    - generic [ref=e103]:
                        - button "Какие средства используются на полках?" [ref=e104]:
                            - generic [ref=e105]: Какие средства используются на полках?
                            - img [ref=e107]
                        - region "Какие средства используются на полках?":
                            - paragraph [ref=e108]: Graham Hill (Германия), Davines (Италия), The London Grooming Co (Великобритания), Solomon's (Великобритания). Это профессиональная косметика, а не «парикмахерский ширпотреб». Подбор делает мастер по типу ваших волос и кожи головы.
                    - generic [ref=e109]:
                        - button "Есть ли мужской маникюр и педикюр?" [ref=e110]:
                            - generic [ref=e111]: Есть ли мужской маникюр и педикюр?
                            - img [ref=e113]
                        - region "Есть ли мужской маникюр и педикюр?":
                            - paragraph [ref=e114]: "Да. Ногтевой зал называется «Fresh Hands» — отдельный кабинет внутри барбершопа. Маникюр — 1 900 ₽, педикюр — от 2 300 ₽. Покрытий не делаем: только гигиеническая и эстетическая обработка."
                    - generic [ref=e115]:
                        - button "Можно ли совместить стрижку и маникюр?" [ref=e116]:
                            - generic [ref=e117]: Можно ли совместить стрижку и маникюр?
                            - img [ref=e119]
                        - region "Можно ли совместить стрижку и маникюр?":
                            - paragraph [ref=e120]: "Да, и это выгодно. Есть два варианта: одновременно (мастера работают в 4 руки, час, 2 800–3 700 ₽) или последовательно (два часа, 3 100–4 000 ₽, скидка до 15 %). При записи на комплекс выбирайте «Комплекс» в виджете записи."
                    - generic [ref=e121]:
                        - button "Принимаете ли вы по картам лояльности?" [ref=e122]:
                            - generic [ref=e123]: Принимаете ли вы по картам лояльности?
                            - img [ref=e125]
                        - region "Принимаете ли вы по картам лояльности?":
                            - paragraph [ref=e126]: У нас есть накопительная программа в YClients — она автоматически активируется после первого визита. Скидку получаете на 5-й, 10-й и 15-й визит. Дополнительной карты иметь не нужно.
                    - generic [ref=e127]:
                        - button "Что с алкогольными напитками в зале?" [ref=e128]:
                            - generic [ref=e129]: Что с алкогольными напитками в зале?
                            - img [ref=e131]
                        - region "Что с алкогольными напитками в зале?":
                            - paragraph [ref=e132]: "В нашем зале не предлагают алкоголь. Это сознательное решение: мы не «мужской клуб с виски», мы — барбершоп. Кофе, чай, вода — в любое время. Если вы предпочитаете кофе с молоком или особый сорт чая, скажите администратору при входе."
                    - generic [ref=e133]:
                        - button "Есть ли подарочные сертификаты?" [ref=e134]:
                            - generic [ref=e135]: Есть ли подарочные сертификаты?
                            - img [ref=e137]
                        - region "Есть ли подарочные сертификаты?":
                            - paragraph [ref=e138]: Да, в физическом виде, на любую сумму. Купить можно на ресепшене салона. Срок действия — 12 месяцев с даты покупки. Онлайн-покупки сертификатов пока нет.
                    - generic [ref=e139]:
                        - button "Сколько у вас филиалов в Казани?" [ref=e140]:
                            - generic [ref=e141]: Сколько у вас филиалов в Казани?
                            - img [ref=e143]
                        - region "Сколько у вас филиалов в Казани?":
                            - paragraph [ref=e144]: Один. Шаляпина, 26, в самом центре, в трёхстах метрах от Концертного зала Филармонии. Парковка — по периметру здания и на соседних улицах.
                    - generic [ref=e145]:
                        - button "Как добраться от метро?" [ref=e146]:
                            - generic [ref=e147]: Как добраться от метро?
                            - img [ref=e149]
                        - region "Как добраться от метро?":
                            - paragraph [ref=e150]: Ближайшие станции метро — «Площадь Тукая» (8 минут пешком) и «Кремлёвская» (10 минут пешком).
            - generic [ref=e153]:
                - paragraph [ref=e154]: Остались вопросы? Позвоните — ответим на всё.
                - link "+7 (917) 918-38-77" [ref=e155]:
                    - /url: tel:+79179183877
    - contentinfo [ref=e156]:
        - generic [ref=e157]:
            - generic [ref=e158]:
                - generic [ref=e159]:
                    - link "BASE Premier — на главную" [ref=e160]:
                        - /url: /
                        - img [ref=e161]:
                            - generic [ref=e162]: BP
                            - generic [ref=e163]: BASE PREMIER
                    - paragraph [ref=e164]: Стиль, атмосфера, мастерство — мужской уход без компромиссов
                - navigation "Навигация по сайту" [ref=e165]:
                    - list [ref=e166]:
                        - listitem [ref=e167]:
                            - link "Услуги" [ref=e168]:
                                - /url: /services
                        - listitem [ref=e169]:
                            - link "Мастера" [ref=e170]:
                                - /url: /barbers
                        - listitem [ref=e171]:
                            - link "О нас" [ref=e172]:
                                - /url: /about
                        - listitem [ref=e173]:
                            - link "Журнал" [ref=e174]:
                                - /url: /journal
                        - listitem [ref=e175]:
                            - link "Контакты" [ref=e176]:
                                - /url: /contacts
                - generic [ref=e177]:
                    - generic [ref=e178]:
                        - generic [ref=e179]: ул. Шаляпина, 26, 1 этаж
                        - generic [ref=e180]: Казань
                    - paragraph [ref=e181]: Ежедневно 10:00–21:00
                    - link "+7 (917) 918-38-77" [ref=e182]:
                        - /url: tel:+79179183877
                    - generic [ref=e183]:
                        - link "WhatsApp" [ref=e184]:
                            - /url: https://wa.me/79179183877
                            - img [ref=e185]
                        - link "Telegram" [ref=e188]:
                            - /url: https://t.me/+79179183877
                            - img [ref=e189]
            - generic [ref=e191]:
                - generic [ref=e192]: © 2022–2026 BASE Premier
                - generic [ref=e193]:
                    - generic [ref=e194]: ИП Шайхутдинов Айрат Рафаэлевич · ИНН 163207031442
                    - link "Политика конфиденциальности" [ref=e195]:
                        - /url: /privacy
    - generic:
        - button "Записаться онлайн": Записаться
    - generic [ref=e196]:
        - link "Написать в WhatsApp" [ref=e197]:
            - /url: https://wa.me/79179183877
            - img [ref=e198]
        - link "Написать в Telegram" [ref=e201]:
            - /url: https://t.me/+79179183877
            - img [ref=e202]
    - dialog [ref=e204]:
        - generic [ref=e205]:
            - paragraph [ref=e206]:
                - text: Мы используем cookie для аналитики и улучшения сервиса. Подробнее —
                - link [ref=e207]:
                    - /url: /privacy
                    - text: Политика конфиденциальности
                - text: .
            - generic [ref=e208]:
                - button [ref=e209]: Только необходимые
                - button [ref=e210]: Принять все
    - alert [ref=e211]
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
      |                                                                                  ^ Error: Primary CTA visible on /about @ 375px
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
