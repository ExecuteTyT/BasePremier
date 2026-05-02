# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: live-qa.spec.ts >> @375px >> Home / — H1 + CTA + console
- Location: tests/e2e/live-qa.spec.ts:44:11

# Error details

```
Error: Primary CTA visible on / @ 375px

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
        - generic [ref=e15]:
            - generic [ref=e16]:
                - img [ref=e18]
                - generic [ref=e24]:
                    - paragraph [ref=e26]: Казань · Шаляпина 26
                    - heading "Мужской салон красоты BASE Premier" [level=1] [ref=e27]
                    - paragraph [ref=e29]: Дорого · Премиально · С собственным шармом
                    - paragraph [ref=e30]: Уникальный интерьер, профессиональные барберы, высокие стандарты — всё для того, чтобы вы чувствовали себя на высоте.
                    - generic [ref=e31]:
                        - button "Записаться" [ref=e33]
                        - link "Услуги" [ref=e34]:
                            - /url: /services
                    - generic [ref=e35]:
                        - link "★★★★★ 5,0 · 394 отзыва Яндекс.Карты" [ref=e36]:
                            - /url: https://yandex.ru/maps/org/base_premier/236063126987/
                            - generic [ref=e37]: ★★★★★
                            - generic [ref=e38]: 5,0 · 394 отзыва
                            - generic [ref=e39]: Яндекс.Карты
                        - paragraph [ref=e40]: от 1 800 ₽ · Ежедневно 10:00 — 21:00
                - generic [ref=e43]: scroll
            - generic [ref=e45]:
                - paragraph [ref=e46]: МЫ ДЕЛАЕМ ТРИ ВЕЩИ
                - generic [ref=e47]:
                    - generic [ref=e49]:
                        - generic [ref=e50]: "01"
                        - paragraph [ref=e51]: Стрижём.
                        - paragraph [ref=e52]: Только мужские стрижки. Каждый мастер — профиль, не набор услуг.
                    - generic [ref=e54]:
                        - generic [ref=e55]: "02"
                        - paragraph [ref=e56]: Ухаживаем.
                        - paragraph [ref=e57]: Борода, кожа, детали. Graham Hill, Davines, Solomon's.
                    - generic [ref=e59]:
                        - generic [ref=e60]: "03"
                        - paragraph [ref=e61]: Заботимся.
                        - paragraph [ref=e62]: "О вашем времени: онлайн-запись без очередей."
                - paragraph [ref=e64]: И ничего больше.
                - link "Манифест и история →" [ref=e67]:
                    - /url: /about
            - generic "Ключевые показатели BASE Premier" [ref=e68]:
                - generic [ref=e69]:
                    - generic [ref=e70]:
                        - generic [ref=e71]:
                            - generic [ref=e72]: ★★★★★ 5,0 — Яндекс.Карты
                            - generic [ref=e73]: ·
                        - generic [ref=e74]:
                            - generic [ref=e75]: 394 отзыва
                            - generic [ref=e76]: ·
                        - generic [ref=e77]:
                            - generic [ref=e78]: 10 мастеров
                            - generic [ref=e79]: ·
                        - generic [ref=e80]:
                            - generic [ref=e81]: с 2022 года
                            - generic [ref=e82]: ·
                        - generic [ref=e83]:
                            - generic [ref=e84]: Ежедневно 10:00–21:00
                            - generic [ref=e85]: ·
                        - generic [ref=e86]:
                            - generic [ref=e87]: Казань · Шаляпина 26
                            - generic [ref=e88]: ·
                    - generic [ref=e89]:
                        - generic [ref=e90]:
                            - generic [ref=e91]: ★★★★★ 5,0 — Яндекс.Карты
                            - generic [ref=e92]: ·
                        - generic [ref=e93]:
                            - generic [ref=e94]: 394 отзыва
                            - generic [ref=e95]: ·
                        - generic [ref=e96]:
                            - generic [ref=e97]: 10 мастеров
                            - generic [ref=e98]: ·
                        - generic [ref=e99]:
                            - generic [ref=e100]: с 2022 года
                            - generic [ref=e101]: ·
                        - generic [ref=e102]:
                            - generic [ref=e103]: Ежедневно 10:00–21:00
                            - generic [ref=e104]: ·
                        - generic [ref=e105]:
                            - generic [ref=e106]: Казань · Шаляпина 26
                            - generic [ref=e107]: ·
            - generic [ref=e109]:
                - generic [ref=e110]:
                    - heading "У с л у г и" [level=2] [ref=e111]:
                        - generic [ref=e112]:
                            - generic [ref=e114]: У
                            - generic [ref=e116]: с
                            - generic [ref=e118]: л
                            - generic [ref=e120]: у
                            - generic [ref=e122]: г
                            - generic [ref=e124]: и
                    - link "Все услуги →" [ref=e126]:
                        - /url: /services
                - generic [ref=e127]:
                    - link "01 Парикмахерский зал Стрижки, моделирование бороды, окантовка и детокс кожи головы — 18 услуг от 600 ₽" [ref=e129]:
                        - /url: /services
                        - generic [ref=e130]:
                            - generic [ref=e131]: "01"
                            - generic [ref=e132]:
                                - heading "Парикмахерский зал" [level=3] [ref=e133]
                                - paragraph [ref=e134]: Стрижки, моделирование бороды, окантовка и детокс кожи головы — 18 услуг
                        - generic [ref=e135]:
                            - generic [ref=e136]: от 600 ₽
                            - generic [ref=e137]: Записаться →
                    - link "02 Бритьё Гладкое бритьё лица или бритьё головы опасной бритвой с горячим компрессом от 1 800 ₽" [ref=e139]:
                        - /url: /services
                        - generic [ref=e140]:
                            - generic [ref=e141]: "02"
                            - generic [ref=e142]:
                                - heading "Бритьё" [level=3] [ref=e143]
                                - paragraph [ref=e144]: Гладкое бритьё лица или бритьё головы опасной бритвой с горячим компрессом
                        - generic [ref=e145]:
                            - generic [ref=e146]: от 1 800 ₽
                            - generic [ref=e147]: Записаться →
                    - link "03 Уход за лицом Премиальный уход London Grooming, детокс Graham Hill, скраб и чёрная маска от 600 ₽" [ref=e149]:
                        - /url: /services
                        - generic [ref=e150]:
                            - generic [ref=e151]: "03"
                            - generic [ref=e152]:
                                - heading "Уход за лицом" [level=3] [ref=e153]
                                - paragraph [ref=e154]: Премиальный уход London Grooming, детокс Graham Hill, скраб и чёрная маска
                        - generic [ref=e155]:
                            - generic [ref=e156]: от 600 ₽
                            - generic [ref=e157]: Записаться →
                    - link "04 Ногтевой сервис Мужской маникюр, педикюр гигиенический, массаж рук и стоп от 500 ₽" [ref=e159]:
                        - /url: /services
                        - generic [ref=e160]:
                            - generic [ref=e161]: "04"
                            - generic [ref=e162]:
                                - heading "Ногтевой сервис" [level=3] [ref=e163]
                                - paragraph [ref=e164]: Мужской маникюр, педикюр гигиенический, массаж рук и стоп
                        - generic [ref=e165]:
                            - generic [ref=e166]: от 500 ₽
                            - generic [ref=e167]: Записаться →
            - generic [ref=e169]:
                - generic [ref=e170]:
                    - heading "1 0 м а с т е р о в" [level=2] [ref=e171]:
                        - generic [ref=e172]:
                            - generic [ref=e174]: "1"
                            - generic [ref=e176]: "0"
                        - generic [ref=e178]:
                            - generic [ref=e180]: м
                            - generic [ref=e182]: а
                            - generic [ref=e184]: с
                            - generic [ref=e186]: т
                            - generic [ref=e188]: е
                            - generic [ref=e190]: р
                            - generic [ref=e192]: о
                            - generic [ref=e194]: в
                    - link "Все мастера →" [ref=e196]:
                        - /url: /barbers
                - generic [ref=e197]:
                    - link "Фото Марат — ожидается Марат 300+ отзывов" [ref=e200]:
                        - /url: /barbers/marat
                        - img "Фото Марат — ожидается" [ref=e202]:
                            - generic [ref=e204]: МА
                            - generic [ref=e205]: ФОТО
                        - generic [ref=e206]:
                            - generic [ref=e207]: Марат
                            - generic [ref=e208]: 300+ отзывов
                    - link "Фото Вячеслав — ожидается Вячеслав 276+ отзывов" [ref=e211]:
                        - /url: /barbers/vyacheslav
                        - img "Фото Вячеслав — ожидается" [ref=e213]:
                            - generic [ref=e215]: ВЯ
                            - generic [ref=e216]: ФОТО
                        - generic [ref=e217]:
                            - generic [ref=e218]: Вячеслав
                            - generic [ref=e219]: 276+ отзывов
                    - link "Фото Сайод — ожидается Сайод 239+ отзывов" [ref=e222]:
                        - /url: /barbers/sayod
                        - img "Фото Сайод — ожидается" [ref=e224]:
                            - generic [ref=e226]: СА
                            - generic [ref=e227]: ФОТО
                        - generic [ref=e228]:
                            - generic [ref=e229]: Сайод
                            - generic [ref=e230]: 239+ отзывов
                    - link "Фото Алексей — ожидается Алексей 213+ отзывов" [ref=e233]:
                        - /url: /barbers/aleksey
                        - img "Фото Алексей — ожидается" [ref=e235]:
                            - generic [ref=e237]: АЛ
                            - generic [ref=e238]: ФОТО
                        - generic [ref=e239]:
                            - generic [ref=e240]: Алексей
                            - generic [ref=e241]: 213+ отзывов
                    - link "Фото Тимерлан — ожидается Тимерлан 177+ отзывов" [ref=e244]:
                        - /url: /barbers/timerlan
                        - img "Фото Тимерлан — ожидается" [ref=e246]:
                            - generic [ref=e248]: ТИ
                            - generic [ref=e249]: ФОТО
                        - generic [ref=e250]:
                            - generic [ref=e251]: Тимерлан
                            - generic [ref=e252]: 177+ отзывов
                    - link "Фото Николай — ожидается Николай 153+ отзывов" [ref=e255]:
                        - /url: /barbers/nikolay
                        - img "Фото Николай — ожидается" [ref=e257]:
                            - generic [ref=e259]: НИ
                            - generic [ref=e260]: ФОТО
                        - generic [ref=e261]:
                            - generic [ref=e262]: Николай
                            - generic [ref=e263]: 153+ отзывов
                - paragraph [ref=e264]: «Десять мастеров — каждый со своим почерком.»
            - generic [ref=e266]:
                - heading "Интерьер" [level=2] [ref=e268]
                - generic [ref=e270]:
                    - generic [ref=e271]:
                        - img "Интерьер BASE Premier — лобби с ресепшеном" [ref=e273]
                        - img "Интерьер BASE Premier — барберские кресла и вывеска" [ref=e275]
                        - img "Интерьер BASE Premier — рабочий зал" [ref=e277]
                    - paragraph [ref=e279]: Шаляпина, 26 · 245 м от Концертного зала Филармонии
            - generic [ref=e281]:
                - generic [ref=e282]:
                    - heading "Отзывы" [level=2] [ref=e283]
                    - generic [ref=e284]:
                        - generic "5 звёзд из 5" [ref=e285]: ★★★★★
                        - link "5.0 на Яндекс.Картах · 394 отзыва" [ref=e286]:
                            - /url: https://yandex.ru/maps/org/base_premier
                - generic [ref=e287]:
                    - generic [ref=e289]:
                        - blockquote [ref=e290]:
                            - paragraph [ref=e291]: "«Долго не мог найти барбера под себя — обошёл несколько заведений в Казани. В BASE Premier с первого визита понял: это то, что нужно. Марат работает методично, без спешки. Результат — именно то, что хотел.»"
                        - generic [ref=e292]: Клиент BASE Premier · Сентябрь 2025
                    - generic [ref=e294]:
                        - tablist "Переключение отзывов" [ref=e295]:
                            - tab "Отзыв 1" [selected] [ref=e296]
                            - tab "Отзыв 2" [ref=e298]
                            - tab "Отзыв 3" [ref=e300]
                            - tab "Отзыв 4" [ref=e302]
                            - tab "Отзыв 5" [ref=e304]
                        - generic [ref=e306]: 01 / 05
            - generic [ref=e308]:
                - generic [ref=e309]:
                    - heading "Прайс" [level=2] [ref=e310]
                    - link "Все 27 услуг →" [ref=e312]:
                        - /url: /services
                - list [ref=e313]:
                    - listitem [ref=e314]:
                        - generic [ref=e315]: Мужская стрижка
                        - generic [ref=e317]: 1 800 – 2 700 ₽
                    - listitem [ref=e318]:
                        - generic [ref=e319]: Стрижка с бородой
                        - generic [ref=e321]: 3 200 – 4 600 ₽
                    - listitem [ref=e322]:
                        - generic [ref=e323]: Моделирование бороды
                        - generic [ref=e325]: 1 400 – 1 900 ₽
                    - listitem [ref=e326]:
                        - generic [ref=e327]: Детская стрижка
                        - generic [ref=e329]: 1 600 – 2 400 ₽
                    - listitem [ref=e330]:
                        - generic [ref=e331]: Мужской маникюр
                        - generic [ref=e333]: от 1 900 ₽
                    - listitem [ref=e334]:
                        - generic [ref=e335]: Стрижка + маникюр
                        - generic [ref=e337]: 3 100 – 4 000 ₽
                - paragraph [ref=e338]: Средний чек — 2 400 ₽ · Ежедневно 10:00–21:00
                - button "Записаться на услугу" [ref=e341]
            - generic [ref=e343]:
                - heading "Для постоянных гостей" [level=2] [ref=e344]
                - generic [ref=e345]:
                    - generic [ref=e346]:
                        - generic [ref=e347]: "01"
                        - generic [ref=e348]:
                            - heading "Накопительная скидка" [level=3] [ref=e349]
                            - paragraph [ref=e350]: Программа лояльности работает через YClients. Каждый визит — баллы, баллы — скидка. Детали узнайте у мастера при первом визите.
                    - generic [ref=e351]:
                        - generic [ref=e352]: "02"
                        - generic [ref=e353]:
                            - heading "Приведи друга" [level=3] [ref=e354]
                            - paragraph [ref=e355]: Порекомендуйте BASE Premier — оба получите бонус на следующий визит. Условия уточняйте на стойке администратора.
                    - generic [ref=e356]:
                        - generic [ref=e357]: "03"
                        - generic [ref=e358]:
                            - heading "Подарочные сертификаты" [level=3] [ref=e359]
                            - paragraph [ref=e360]: Физические сертификаты на любую сумму. Отличный подарок для тех, кто ценит качество. Приобрести можно в салоне на Шаляпина 26.
            - generic [ref=e362]:
                - generic [ref=e363]:
                    - heading "Вопросы и ответы" [level=2] [ref=e364]
                    - link "Все вопросы →" [ref=e365]:
                        - /url: /about
                - generic [ref=e367]:
                    - generic [ref=e368]:
                        - button "Сколько длится стрижка?" [expanded] [ref=e369]:
                            - generic [ref=e370]: Сколько длится стрижка?
                            - img [ref=e372]
                        - region "Сколько длится стрижка?" [ref=e375]:
                            - paragraph [ref=e377]: Час. Это базовая длительность для большинства услуг. Если у вас борода — добавляется 30 минут. Точная длительность каждой услуги указана на странице услуги.
                    - generic [ref=e378]:
                        - button "Сколько стоит стрижка в барбершопе BASE Premier?" [ref=e379]:
                            - generic [ref=e380]: Сколько стоит стрижка в барбершопе BASE Premier?
                            - img [ref=e382]
                        - region "Сколько стоит стрижка в барбершопе BASE Premier?":
                            - paragraph [ref=e383]: Мужская стрижка — от 1 800 до 2 700 ₽ в зависимости от категории мастера. Стрижка с бородой — от 3 200 до 4 600 ₽. Все цены указаны за час работы, включая мытьё головы, моделирование и укладку.
                    - generic [ref=e384]:
                        - button "Как часто нужно стричься мужчине?" [ref=e385]:
                            - generic [ref=e386]: Как часто нужно стричься мужчине?
                            - img [ref=e388]
                        - region "Как часто нужно стричься мужчине?":
                            - paragraph [ref=e389]: В среднем раз в 3–4 недели — это поддерживающая стрижка, когда форма уже есть. Если вы отращиваете волосы или работаете с техническими деталями (fade, taper), мастер порекомендует индивидуальный интервал на первом визите.
                    - generic [ref=e390]:
                        - button "Можно ли совместить стрижку и маникюр?" [ref=e391]:
                            - generic [ref=e392]: Можно ли совместить стрижку и маникюр?
                            - img [ref=e394]
                        - region "Можно ли совместить стрижку и маникюр?":
                            - paragraph [ref=e395]: Да, и это выгодно. Одновременно — мастера работают в 4 руки, час, 2 800–3 700 ₽. Последовательно — два часа, скидка до 15 %, 3 100–4 000 ₽. При записи выбирайте «Комплекс» в виджете.
                    - generic [ref=e396]:
                        - button "Как отменить или перенести запись?" [ref=e397]:
                            - generic [ref=e398]: Как отменить или перенести запись?
                            - img [ref=e400]
                        - region "Как отменить или перенести запись?":
                            - paragraph [ref=e401]: Через ссылку в SMS-напоминании — придёт за сутки до визита. Или позвоните по номеру +7 (917) 918-38-77. Просим предупреждать за 3 часа — так мастер успеет принять другого клиента.
                    - generic [ref=e402]:
                        - button "Где вы находитесь?" [ref=e403]:
                            - generic [ref=e404]: Где вы находитесь?
                            - img [ref=e406]
                        - region "Где вы находитесь?":
                            - paragraph [ref=e407]: Казань, ул. Шаляпина, 26, 1 этаж — в трёхстах метрах от Концертного зала Филармонии. Парковка по периметру здания. Ежедневно 10:00–21:00.
            - generic [ref=e408]:
                - generic:
                    - generic: BP
                - generic [ref=e410]:
                    - generic [ref=e411]:
                        - heading "Записаться?" [level=2] [ref=e412]
                        - paragraph [ref=e413]: Шаляпина, 26 · Казань · ежедневно с 10 до 21
                    - button "Записаться онлайн" [ref=e415]
                    - paragraph [ref=e416]:
                        - text: или позвонить
                        - link "+7 (917) 918-38-77" [ref=e417]:
                            - /url: tel:+79179183877
    - contentinfo [ref=e418]:
        - generic [ref=e419]:
            - generic [ref=e420]:
                - generic [ref=e421]:
                    - link "BASE Premier — на главную" [ref=e422]:
                        - /url: /
                        - img [ref=e423]:
                            - generic [ref=e424]: BP
                            - generic [ref=e425]: BASE PREMIER
                    - paragraph [ref=e426]: Стиль, атмосфера, мастерство — мужской уход без компромиссов
                - navigation "Навигация по сайту" [ref=e427]:
                    - list [ref=e428]:
                        - listitem [ref=e429]:
                            - link "Услуги" [ref=e430]:
                                - /url: /services
                        - listitem [ref=e431]:
                            - link "Мастера" [ref=e432]:
                                - /url: /barbers
                        - listitem [ref=e433]:
                            - link "О нас" [ref=e434]:
                                - /url: /about
                        - listitem [ref=e435]:
                            - link "Журнал" [ref=e436]:
                                - /url: /journal
                        - listitem [ref=e437]:
                            - link "Контакты" [ref=e438]:
                                - /url: /contacts
                - generic [ref=e439]:
                    - generic [ref=e440]:
                        - generic [ref=e441]: ул. Шаляпина, 26, 1 этаж
                        - generic [ref=e442]: Казань
                    - paragraph [ref=e443]: Ежедневно 10:00–21:00
                    - link "+7 (917) 918-38-77" [ref=e444]:
                        - /url: tel:+79179183877
                    - generic [ref=e445]:
                        - link "WhatsApp" [ref=e446]:
                            - /url: https://wa.me/79179183877
                            - img [ref=e447]
                        - link "Telegram" [ref=e450]:
                            - /url: https://t.me/+79179183877
                            - img [ref=e451]
            - generic [ref=e453]:
                - generic [ref=e454]: © 2022–2026 BASE Premier
                - generic [ref=e455]:
                    - generic [ref=e456]: ИП Шайхутдинов Айрат Рафаэлевич · ИНН 163207031442
                    - link "Политика конфиденциальности" [ref=e457]:
                        - /url: /privacy
    - generic:
        - button "Записаться онлайн": Записаться
    - generic [ref=e458]:
        - link "Написать в WhatsApp" [ref=e459]:
            - /url: https://wa.me/79179183877
            - img [ref=e460]
        - link "Написать в Telegram" [ref=e463]:
            - /url: https://t.me/+79179183877
            - img [ref=e464]
    - dialog [ref=e466]:
        - generic [ref=e467]:
            - paragraph [ref=e468]:
                - text: Мы используем cookie для аналитики и улучшения сервиса. Подробнее —
                - link [ref=e469]:
                    - /url: /privacy
                    - text: Политика конфиденциальности
                - text: .
            - generic [ref=e470]:
                - button [ref=e471]: Только необходимые
                - button [ref=e472]: Принять все
    - alert [ref=e473]
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
      |                                                                                  ^ Error: Primary CTA visible on / @ 375px
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
