# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: live-qa.spec.ts >> @375px >> tel: link on Home @ 375px
- Location: tests/e2e/live-qa.spec.ts:85:9

# Error details

```
Error: tel: link must exist

expect(locator).toBeVisible() failed

Locator:  locator('a[href^="tel:"]').first()
Expected: visible
Received: hidden
Timeout:  8000ms

Call log:
  - tel: link must exist with timeout 8000ms
  - waiting for locator('a[href^="tel:"]').first()
    12 × locator resolved to <a href="tel:+79179183877" class="hidden font-mono text-body-sm text-fg-muted transition-colors duration-base hover:text-fg-primary lg:block">+7 (917) 918-38-77</a>
       - unexpected value "hidden"

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
                - generic [ref=e44]: scroll
            - generic [ref=e46]:
                - paragraph [ref=e47]: МЫ ДЕЛАЕМ ТРИ ВЕЩИ
                - generic [ref=e48]:
                    - generic [ref=e50]:
                        - generic [ref=e51]: "01"
                        - paragraph [ref=e52]: Стрижём.
                        - paragraph [ref=e53]: Только мужские стрижки. Каждый мастер — профиль, не набор услуг.
                    - generic [ref=e55]:
                        - generic [ref=e56]: "02"
                        - paragraph [ref=e57]: Ухаживаем.
                        - paragraph [ref=e58]: Борода, кожа, детали. Graham Hill, Davines, Solomon's.
                    - generic [ref=e60]:
                        - generic [ref=e61]: "03"
                        - paragraph [ref=e62]: Заботимся.
                        - paragraph [ref=e63]: "О вашем времени: онлайн-запись без очередей."
                - paragraph [ref=e65]: И ничего больше.
                - link "Манифест и история →" [ref=e68]:
                    - /url: /about
            - generic "Ключевые показатели BASE Premier" [ref=e69]:
                - generic [ref=e70]:
                    - generic [ref=e71]:
                        - generic [ref=e72]:
                            - generic [ref=e73]: ★★★★★ 5,0 — Яндекс.Карты
                            - generic [ref=e74]: ·
                        - generic [ref=e75]:
                            - generic [ref=e76]: 394 отзыва
                            - generic [ref=e77]: ·
                        - generic [ref=e78]:
                            - generic [ref=e79]: 10 мастеров
                            - generic [ref=e80]: ·
                        - generic [ref=e81]:
                            - generic [ref=e82]: с 2022 года
                            - generic [ref=e83]: ·
                        - generic [ref=e84]:
                            - generic [ref=e85]: Ежедневно 10:00–21:00
                            - generic [ref=e86]: ·
                        - generic [ref=e87]:
                            - generic [ref=e88]: Казань · Шаляпина 26
                            - generic [ref=e89]: ·
                    - generic [ref=e90]:
                        - generic [ref=e91]:
                            - generic [ref=e92]: ★★★★★ 5,0 — Яндекс.Карты
                            - generic [ref=e93]: ·
                        - generic [ref=e94]:
                            - generic [ref=e95]: 394 отзыва
                            - generic [ref=e96]: ·
                        - generic [ref=e97]:
                            - generic [ref=e98]: 10 мастеров
                            - generic [ref=e99]: ·
                        - generic [ref=e100]:
                            - generic [ref=e101]: с 2022 года
                            - generic [ref=e102]: ·
                        - generic [ref=e103]:
                            - generic [ref=e104]: Ежедневно 10:00–21:00
                            - generic [ref=e105]: ·
                        - generic [ref=e106]:
                            - generic [ref=e107]: Казань · Шаляпина 26
                            - generic [ref=e108]: ·
            - generic [ref=e110]:
                - generic [ref=e111]:
                    - heading "У с л у г и" [level=2] [ref=e112]:
                        - generic [ref=e113]:
                            - generic [ref=e115]: У
                            - generic [ref=e117]: с
                            - generic [ref=e119]: л
                            - generic [ref=e121]: у
                            - generic [ref=e123]: г
                            - generic [ref=e125]: и
                    - link "Все услуги →" [ref=e127]:
                        - /url: /services
                - generic [ref=e128]:
                    - link "01 Парикмахерский зал Стрижки, моделирование бороды, окантовка и детокс кожи головы — 18 услуг от 600 ₽" [ref=e130]:
                        - /url: /services
                        - generic [ref=e131]:
                            - generic [ref=e132]: "01"
                            - generic [ref=e133]:
                                - heading "Парикмахерский зал" [level=3] [ref=e134]
                                - paragraph [ref=e135]: Стрижки, моделирование бороды, окантовка и детокс кожи головы — 18 услуг
                        - generic [ref=e136]:
                            - generic [ref=e137]: от 600 ₽
                            - generic [ref=e138]: Записаться →
                    - link "02 Бритьё Гладкое бритьё лица или бритьё головы опасной бритвой с горячим компрессом от 1 800 ₽" [ref=e140]:
                        - /url: /services
                        - generic [ref=e141]:
                            - generic [ref=e142]: "02"
                            - generic [ref=e143]:
                                - heading "Бритьё" [level=3] [ref=e144]
                                - paragraph [ref=e145]: Гладкое бритьё лица или бритьё головы опасной бритвой с горячим компрессом
                        - generic [ref=e146]:
                            - generic [ref=e147]: от 1 800 ₽
                            - generic [ref=e148]: Записаться →
                    - link "03 Уход за лицом Премиальный уход London Grooming, детокс Graham Hill, скраб и чёрная маска от 600 ₽" [ref=e150]:
                        - /url: /services
                        - generic [ref=e151]:
                            - generic [ref=e152]: "03"
                            - generic [ref=e153]:
                                - heading "Уход за лицом" [level=3] [ref=e154]
                                - paragraph [ref=e155]: Премиальный уход London Grooming, детокс Graham Hill, скраб и чёрная маска
                        - generic [ref=e156]:
                            - generic [ref=e157]: от 600 ₽
                            - generic [ref=e158]: Записаться →
                    - link "04 Ногтевой сервис Мужской маникюр, педикюр гигиенический, массаж рук и стоп от 500 ₽" [ref=e160]:
                        - /url: /services
                        - generic [ref=e161]:
                            - generic [ref=e162]: "04"
                            - generic [ref=e163]:
                                - heading "Ногтевой сервис" [level=3] [ref=e164]
                                - paragraph [ref=e165]: Мужской маникюр, педикюр гигиенический, массаж рук и стоп
                        - generic [ref=e166]:
                            - generic [ref=e167]: от 500 ₽
                            - generic [ref=e168]: Записаться →
            - generic [ref=e170]:
                - generic [ref=e171]:
                    - heading "1 0 м а с т е р о в" [level=2] [ref=e172]:
                        - generic [ref=e173]:
                            - generic [ref=e175]: "1"
                            - generic [ref=e177]: "0"
                        - generic [ref=e179]:
                            - generic [ref=e181]: м
                            - generic [ref=e183]: а
                            - generic [ref=e185]: с
                            - generic [ref=e187]: т
                            - generic [ref=e189]: е
                            - generic [ref=e191]: р
                            - generic [ref=e193]: о
                            - generic [ref=e195]: в
                    - link "Все мастера →" [ref=e197]:
                        - /url: /barbers
                - generic [ref=e198]:
                    - link "Фото Марат — ожидается Марат 300+ отзывов" [ref=e201]:
                        - /url: /barbers/marat
                        - img "Фото Марат — ожидается" [ref=e203]:
                            - generic [ref=e205]: МА
                            - generic [ref=e206]: ФОТО
                        - generic [ref=e207]:
                            - generic [ref=e208]: Марат
                            - generic [ref=e209]: 300+ отзывов
                    - link "Фото Вячеслав — ожидается Вячеслав 276+ отзывов" [ref=e212]:
                        - /url: /barbers/vyacheslav
                        - img "Фото Вячеслав — ожидается" [ref=e214]:
                            - generic [ref=e216]: ВЯ
                            - generic [ref=e217]: ФОТО
                        - generic [ref=e218]:
                            - generic [ref=e219]: Вячеслав
                            - generic [ref=e220]: 276+ отзывов
                    - link "Фото Сайод — ожидается Сайод 239+ отзывов" [ref=e223]:
                        - /url: /barbers/sayod
                        - img "Фото Сайод — ожидается" [ref=e225]:
                            - generic [ref=e227]: СА
                            - generic [ref=e228]: ФОТО
                        - generic [ref=e229]:
                            - generic [ref=e230]: Сайод
                            - generic [ref=e231]: 239+ отзывов
                    - link "Фото Алексей — ожидается Алексей 213+ отзывов" [ref=e234]:
                        - /url: /barbers/aleksey
                        - img "Фото Алексей — ожидается" [ref=e236]:
                            - generic [ref=e238]: АЛ
                            - generic [ref=e239]: ФОТО
                        - generic [ref=e240]:
                            - generic [ref=e241]: Алексей
                            - generic [ref=e242]: 213+ отзывов
                    - link "Фото Тимерлан — ожидается Тимерлан 177+ отзывов" [ref=e245]:
                        - /url: /barbers/timerlan
                        - img "Фото Тимерлан — ожидается" [ref=e247]:
                            - generic [ref=e249]: ТИ
                            - generic [ref=e250]: ФОТО
                        - generic [ref=e251]:
                            - generic [ref=e252]: Тимерлан
                            - generic [ref=e253]: 177+ отзывов
                    - link "Фото Николай — ожидается Николай 153+ отзывов" [ref=e256]:
                        - /url: /barbers/nikolay
                        - img "Фото Николай — ожидается" [ref=e258]:
                            - generic [ref=e260]: НИ
                            - generic [ref=e261]: ФОТО
                        - generic [ref=e262]:
                            - generic [ref=e263]: Николай
                            - generic [ref=e264]: 153+ отзывов
                - paragraph [ref=e265]: «Десять мастеров — каждый со своим почерком.»
            - generic [ref=e267]:
                - heading "Интерьер" [level=2] [ref=e269]
                - generic [ref=e271]:
                    - generic [ref=e272]:
                        - img "Интерьер BASE Premier — лобби с ресепшеном" [ref=e274]
                        - img "Интерьер BASE Premier — барберские кресла и вывеска" [ref=e276]
                        - img "Интерьер BASE Premier — рабочий зал" [ref=e278]
                    - paragraph [ref=e280]: Шаляпина, 26 · 245 м от Концертного зала Филармонии
            - generic [ref=e282]:
                - generic [ref=e283]:
                    - heading "Отзывы" [level=2] [ref=e284]
                    - generic [ref=e285]:
                        - generic "5 звёзд из 5" [ref=e286]: ★★★★★
                        - link "5.0 на Яндекс.Картах · 394 отзыва" [ref=e287]:
                            - /url: https://yandex.ru/maps/org/base_premier
                - generic [ref=e288]:
                    - generic [ref=e290]:
                        - blockquote [ref=e291]:
                            - paragraph [ref=e292]: "«Был на стрижке с бородой. Час двадцать — и оба ушли с правильными пропорциями. Атмосфера в зале особенная: тихо, без лишних разговоров, всё по делу.»"
                        - generic [ref=e293]: Клиент BASE Premier · Август 2025
                    - generic [ref=e295]:
                        - tablist "Переключение отзывов" [ref=e296]:
                            - tab "Отзыв 1" [ref=e297]
                            - tab "Отзыв 2" [selected] [ref=e299]
                            - tab "Отзыв 3" [ref=e301]
                            - tab "Отзыв 4" [ref=e303]
                            - tab "Отзыв 5" [ref=e305]
                        - generic [ref=e307]: 02 / 05
            - generic [ref=e309]:
                - generic [ref=e310]:
                    - heading "Прайс" [level=2] [ref=e311]
                    - link "Все 27 услуг →" [ref=e313]:
                        - /url: /services
                - list [ref=e314]:
                    - listitem [ref=e315]:
                        - generic [ref=e316]: Мужская стрижка
                        - generic [ref=e318]: 1 800 – 2 700 ₽
                    - listitem [ref=e319]:
                        - generic [ref=e320]: Стрижка с бородой
                        - generic [ref=e322]: 3 200 – 4 600 ₽
                    - listitem [ref=e323]:
                        - generic [ref=e324]: Моделирование бороды
                        - generic [ref=e326]: 1 400 – 1 900 ₽
                    - listitem [ref=e327]:
                        - generic [ref=e328]: Детская стрижка
                        - generic [ref=e330]: 1 600 – 2 400 ₽
                    - listitem [ref=e331]:
                        - generic [ref=e332]: Мужской маникюр
                        - generic [ref=e334]: от 1 900 ₽
                    - listitem [ref=e335]:
                        - generic [ref=e336]: Стрижка + маникюр
                        - generic [ref=e338]: 3 100 – 4 000 ₽
                - paragraph [ref=e339]: Средний чек — 2 400 ₽ · Ежедневно 10:00–21:00
                - button "Записаться на услугу" [ref=e342]
            - generic [ref=e344]:
                - heading "Для постоянных гостей" [level=2] [ref=e345]
                - generic [ref=e346]:
                    - generic [ref=e347]:
                        - generic [ref=e348]: "01"
                        - generic [ref=e349]:
                            - heading "Накопительная скидка" [level=3] [ref=e350]
                            - paragraph [ref=e351]: Программа лояльности работает через YClients. Каждый визит — баллы, баллы — скидка. Детали узнайте у мастера при первом визите.
                    - generic [ref=e352]:
                        - generic [ref=e353]: "02"
                        - generic [ref=e354]:
                            - heading "Приведи друга" [level=3] [ref=e355]
                            - paragraph [ref=e356]: Порекомендуйте BASE Premier — оба получите бонус на следующий визит. Условия уточняйте на стойке администратора.
                    - generic [ref=e357]:
                        - generic [ref=e358]: "03"
                        - generic [ref=e359]:
                            - heading "Подарочные сертификаты" [level=3] [ref=e360]
                            - paragraph [ref=e361]: Физические сертификаты на любую сумму. Отличный подарок для тех, кто ценит качество. Приобрести можно в салоне на Шаляпина 26.
            - generic [ref=e363]:
                - generic [ref=e364]:
                    - heading "Вопросы и ответы" [level=2] [ref=e365]
                    - link "Все вопросы →" [ref=e366]:
                        - /url: /about
                - generic [ref=e368]:
                    - generic [ref=e369]:
                        - button "Сколько длится стрижка?" [expanded] [ref=e370]:
                            - generic [ref=e371]: Сколько длится стрижка?
                            - img [ref=e373]
                        - region "Сколько длится стрижка?" [ref=e376]:
                            - paragraph [ref=e378]: Час. Это базовая длительность для большинства услуг. Если у вас борода — добавляется 30 минут. Точная длительность каждой услуги указана на странице услуги.
                    - generic [ref=e379]:
                        - button "Сколько стоит стрижка в барбершопе BASE Premier?" [ref=e380]:
                            - generic [ref=e381]: Сколько стоит стрижка в барбершопе BASE Premier?
                            - img [ref=e383]
                        - region "Сколько стоит стрижка в барбершопе BASE Premier?":
                            - paragraph [ref=e384]: Мужская стрижка — от 1 800 до 2 700 ₽ в зависимости от категории мастера. Стрижка с бородой — от 3 200 до 4 600 ₽. Все цены указаны за час работы, включая мытьё головы, моделирование и укладку.
                    - generic [ref=e385]:
                        - button "Как часто нужно стричься мужчине?" [ref=e386]:
                            - generic [ref=e387]: Как часто нужно стричься мужчине?
                            - img [ref=e389]
                        - region "Как часто нужно стричься мужчине?":
                            - paragraph [ref=e390]: В среднем раз в 3–4 недели — это поддерживающая стрижка, когда форма уже есть. Если вы отращиваете волосы или работаете с техническими деталями (fade, taper), мастер порекомендует индивидуальный интервал на первом визите.
                    - generic [ref=e391]:
                        - button "Можно ли совместить стрижку и маникюр?" [ref=e392]:
                            - generic [ref=e393]: Можно ли совместить стрижку и маникюр?
                            - img [ref=e395]
                        - region "Можно ли совместить стрижку и маникюр?":
                            - paragraph [ref=e396]: Да, и это выгодно. Одновременно — мастера работают в 4 руки, час, 2 800–3 700 ₽. Последовательно — два часа, скидка до 15 %, 3 100–4 000 ₽. При записи выбирайте «Комплекс» в виджете.
                    - generic [ref=e397]:
                        - button "Как отменить или перенести запись?" [ref=e398]:
                            - generic [ref=e399]: Как отменить или перенести запись?
                            - img [ref=e401]
                        - region "Как отменить или перенести запись?":
                            - paragraph [ref=e402]: Через ссылку в SMS-напоминании — придёт за сутки до визита. Или позвоните по номеру +7 (917) 918-38-77. Просим предупреждать за 3 часа — так мастер успеет принять другого клиента.
                    - generic [ref=e403]:
                        - button "Где вы находитесь?" [ref=e404]:
                            - generic [ref=e405]: Где вы находитесь?
                            - img [ref=e407]
                        - region "Где вы находитесь?":
                            - paragraph [ref=e408]: Казань, ул. Шаляпина, 26, 1 этаж — в трёхстах метрах от Концертного зала Филармонии. Парковка по периметру здания. Ежедневно 10:00–21:00.
            - generic [ref=e409]:
                - generic:
                    - generic: BP
                - generic [ref=e411]:
                    - generic [ref=e412]:
                        - heading "Записаться?" [level=2] [ref=e413]
                        - paragraph [ref=e414]: Шаляпина, 26 · Казань · ежедневно с 10 до 21
                    - button "Записаться онлайн" [ref=e416]
                    - paragraph [ref=e417]:
                        - text: или позвонить
                        - link "+7 (917) 918-38-77" [ref=e418]:
                            - /url: tel:+79179183877
    - contentinfo [ref=e419]:
        - generic [ref=e420]:
            - generic [ref=e421]:
                - generic [ref=e422]:
                    - link "BASE Premier — на главную" [ref=e423]:
                        - /url: /
                        - img [ref=e424]:
                            - generic [ref=e425]: BP
                            - generic [ref=e426]: BASE PREMIER
                    - paragraph [ref=e427]: Стиль, атмосфера, мастерство — мужской уход без компромиссов
                - navigation "Навигация по сайту" [ref=e428]:
                    - list [ref=e429]:
                        - listitem [ref=e430]:
                            - link "Услуги" [ref=e431]:
                                - /url: /services
                        - listitem [ref=e432]:
                            - link "Мастера" [ref=e433]:
                                - /url: /barbers
                        - listitem [ref=e434]:
                            - link "О нас" [ref=e435]:
                                - /url: /about
                        - listitem [ref=e436]:
                            - link "Журнал" [ref=e437]:
                                - /url: /journal
                        - listitem [ref=e438]:
                            - link "Контакты" [ref=e439]:
                                - /url: /contacts
                - generic [ref=e440]:
                    - generic [ref=e441]:
                        - generic [ref=e442]: ул. Шаляпина, 26, 1 этаж
                        - generic [ref=e443]: Казань
                    - paragraph [ref=e444]: Ежедневно 10:00–21:00
                    - link "+7 (917) 918-38-77" [ref=e445]:
                        - /url: tel:+79179183877
                    - generic [ref=e446]:
                        - link "WhatsApp" [ref=e447]:
                            - /url: https://wa.me/79179183877
                            - img [ref=e448]
                        - link "Telegram" [ref=e451]:
                            - /url: https://t.me/+79179183877
                            - img [ref=e452]
            - generic [ref=e454]:
                - generic [ref=e455]: © 2022–2026 BASE Premier
                - generic [ref=e456]:
                    - generic [ref=e457]: ИП Шайхутдинов Айрат Рафаэлевич · ИНН 163207031442
                    - link "Политика конфиденциальности" [ref=e458]:
                        - /url: /privacy
    - generic:
        - button "Записаться онлайн": Записаться
    - generic [ref=e459]:
        - link "Написать в WhatsApp" [ref=e460]:
            - /url: https://wa.me/79179183877
            - img [ref=e461]
        - link "Написать в Telegram" [ref=e464]:
            - /url: https://t.me/+79179183877
            - img [ref=e465]
    - dialog "Уведомление о cookie" [ref=e467]:
        - generic [ref=e468]:
            - paragraph [ref=e469]:
                - text: Мы используем cookie для аналитики и улучшения сервиса. Подробнее —
                - link "Политика конфиденциальности" [ref=e470]:
                    - /url: /privacy
                - text: .
            - generic [ref=e471]:
                - button "Только необходимые" [ref=e472]
                - button "Принять все" [ref=e473]
    - alert [ref=e474]
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
  68  |           expect(isVisible, `Primary CTA visible on ${pg.route} @ ${vp.name}px`).toBeTruthy();
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
> 90  |       await expect(telLink, "tel: link must exist").toBeVisible({ timeout: 8000 });
      |                                                     ^ Error: tel: link must exist
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
