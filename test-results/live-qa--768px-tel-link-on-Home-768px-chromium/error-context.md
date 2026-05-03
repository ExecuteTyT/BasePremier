# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: live-qa.spec.ts >> @768px >> tel: link on Home @ 768px
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
            - list [ref=e7]:
                - listitem [ref=e8]:
                    - link "Услуги" [ref=e9]:
                        - /url: /services
                - listitem [ref=e10]:
                    - link "Мастера" [ref=e11]:
                        - /url: /barbers
                - listitem [ref=e12]:
                    - link "О нас" [ref=e13]:
                        - /url: /about
                - listitem [ref=e14]:
                    - link "Журнал" [ref=e15]:
                        - /url: /journal
                - listitem [ref=e16]:
                    - link "Контакты" [ref=e17]:
                        - /url: /contacts
            - button "Записаться" [ref=e21]
    - main [ref=e22]:
        - generic [ref=e23]:
            - generic [ref=e24]:
                - img [ref=e26]
                - generic [ref=e32]:
                    - paragraph [ref=e34]: Казань · Шаляпина 26
                    - heading "Мужской салон красоты BASE Premier" [level=1] [ref=e35]
                    - paragraph [ref=e37]: Дорого · Премиально · С собственным шармом
                    - paragraph [ref=e38]: Уникальный интерьер, профессиональные барберы, высокие стандарты — всё для того, чтобы вы чувствовали себя на высоте.
                    - generic [ref=e39]:
                        - button "Записаться" [ref=e41]
                        - link "Услуги" [ref=e42]:
                            - /url: /services
                    - generic [ref=e43]:
                        - link "★★★★★ 5,0 · 394 отзыва Яндекс.Карты" [ref=e44]:
                            - /url: https://yandex.ru/maps/org/base_premier/236063126987/
                            - generic [ref=e45]: ★★★★★
                            - generic [ref=e46]: 5,0 · 394 отзыва
                            - generic [ref=e47]: Яндекс.Карты
                        - paragraph [ref=e48]: от 1 800 ₽ · Ежедневно 10:00 — 21:00
                - generic [ref=e52]: scroll
            - generic [ref=e54]:
                - paragraph [ref=e55]: МЫ ДЕЛАЕМ ТРИ ВЕЩИ
                - generic [ref=e56]:
                    - generic [ref=e58]:
                        - generic [ref=e59]: "01"
                        - paragraph [ref=e60]: Стрижём.
                        - paragraph [ref=e61]: Только мужские стрижки. Каждый мастер — профиль, не набор услуг.
                    - generic [ref=e63]:
                        - generic [ref=e64]: "02"
                        - paragraph [ref=e65]: Ухаживаем.
                        - paragraph [ref=e66]: Борода, кожа, детали. Graham Hill, Davines, Solomon's.
                    - generic [ref=e68]:
                        - generic [ref=e69]: "03"
                        - paragraph [ref=e70]: Заботимся.
                        - paragraph [ref=e71]: "О вашем времени: онлайн-запись без очередей."
                - paragraph [ref=e73]: И ничего больше.
                - link "Манифест и история →" [ref=e76]:
                    - /url: /about
            - generic "Ключевые показатели BASE Premier" [ref=e77]:
                - generic [ref=e78]:
                    - generic [ref=e79]:
                        - generic [ref=e80]:
                            - generic [ref=e81]: ★★★★★ 5,0 — Яндекс.Карты
                            - generic [ref=e82]: ·
                        - generic [ref=e83]:
                            - generic [ref=e84]: 394 отзыва
                            - generic [ref=e85]: ·
                        - generic [ref=e86]:
                            - generic [ref=e87]: 10 мастеров
                            - generic [ref=e88]: ·
                        - generic [ref=e89]:
                            - generic [ref=e90]: с 2022 года
                            - generic [ref=e91]: ·
                        - generic [ref=e92]:
                            - generic [ref=e93]: Ежедневно 10:00–21:00
                            - generic [ref=e94]: ·
                        - generic [ref=e95]:
                            - generic [ref=e96]: Казань · Шаляпина 26
                            - generic [ref=e97]: ·
                    - generic [ref=e98]:
                        - generic [ref=e99]:
                            - generic [ref=e100]: ★★★★★ 5,0 — Яндекс.Карты
                            - generic [ref=e101]: ·
                        - generic [ref=e102]:
                            - generic [ref=e103]: 394 отзыва
                            - generic [ref=e104]: ·
                        - generic [ref=e105]:
                            - generic [ref=e106]: 10 мастеров
                            - generic [ref=e107]: ·
                        - generic [ref=e108]:
                            - generic [ref=e109]: с 2022 года
                            - generic [ref=e110]: ·
                        - generic [ref=e111]:
                            - generic [ref=e112]: Ежедневно 10:00–21:00
                            - generic [ref=e113]: ·
                        - generic [ref=e114]:
                            - generic [ref=e115]: Казань · Шаляпина 26
                            - generic [ref=e116]: ·
            - generic [ref=e118]:
                - generic [ref=e119]:
                    - heading "У с л у г и" [level=2] [ref=e120]:
                        - generic [ref=e121]:
                            - generic [ref=e123]: У
                            - generic [ref=e125]: с
                            - generic [ref=e127]: л
                            - generic [ref=e129]: у
                            - generic [ref=e131]: г
                            - generic [ref=e133]: и
                    - link "Все услуги →" [ref=e135]:
                        - /url: /services
                - generic [ref=e136]:
                    - link "01 Парикмахерский зал Стрижки, моделирование бороды, окантовка и детокс кожи головы — 18 услуг от 600 ₽" [ref=e138]:
                        - /url: /services
                        - generic [ref=e139]:
                            - generic [ref=e140]: "01"
                            - generic [ref=e141]:
                                - heading "Парикмахерский зал" [level=3] [ref=e142]
                                - paragraph [ref=e143]: Стрижки, моделирование бороды, окантовка и детокс кожи головы — 18 услуг
                        - generic [ref=e144]:
                            - generic [ref=e145]: от 600 ₽
                            - generic [ref=e146]: Записаться →
                    - link "02 Бритьё Гладкое бритьё лица или бритьё головы опасной бритвой с горячим компрессом от 1 800 ₽" [ref=e148]:
                        - /url: /services
                        - generic [ref=e149]:
                            - generic [ref=e150]: "02"
                            - generic [ref=e151]:
                                - heading "Бритьё" [level=3] [ref=e152]
                                - paragraph [ref=e153]: Гладкое бритьё лица или бритьё головы опасной бритвой с горячим компрессом
                        - generic [ref=e154]:
                            - generic [ref=e155]: от 1 800 ₽
                            - generic [ref=e156]: Записаться →
                    - link "03 Уход за лицом Премиальный уход London Grooming, детокс Graham Hill, скраб и чёрная маска от 600 ₽" [ref=e158]:
                        - /url: /services
                        - generic [ref=e159]:
                            - generic [ref=e160]: "03"
                            - generic [ref=e161]:
                                - heading "Уход за лицом" [level=3] [ref=e162]
                                - paragraph [ref=e163]: Премиальный уход London Grooming, детокс Graham Hill, скраб и чёрная маска
                        - generic [ref=e164]:
                            - generic [ref=e165]: от 600 ₽
                            - generic [ref=e166]: Записаться →
                    - link "04 Ногтевой сервис Мужской маникюр, педикюр гигиенический, массаж рук и стоп от 500 ₽" [ref=e168]:
                        - /url: /services
                        - generic [ref=e169]:
                            - generic [ref=e170]: "04"
                            - generic [ref=e171]:
                                - heading "Ногтевой сервис" [level=3] [ref=e172]
                                - paragraph [ref=e173]: Мужской маникюр, педикюр гигиенический, массаж рук и стоп
                        - generic [ref=e174]:
                            - generic [ref=e175]: от 500 ₽
                            - generic [ref=e176]: Записаться →
            - generic [ref=e178]:
                - generic [ref=e179]:
                    - heading "1 0 м а с т е р о в" [level=2] [ref=e180]:
                        - generic [ref=e181]:
                            - generic [ref=e183]: "1"
                            - generic [ref=e185]: "0"
                        - generic [ref=e187]:
                            - generic [ref=e189]: м
                            - generic [ref=e191]: а
                            - generic [ref=e193]: с
                            - generic [ref=e195]: т
                            - generic [ref=e197]: е
                            - generic [ref=e199]: р
                            - generic [ref=e201]: о
                            - generic [ref=e203]: в
                    - link "Все мастера →" [ref=e205]:
                        - /url: /barbers
                - generic [ref=e206]:
                    - link "Фото Марат — ожидается Марат 300+ отзывов" [ref=e209]:
                        - /url: /barbers/marat
                        - img "Фото Марат — ожидается" [ref=e211]:
                            - generic [ref=e213]: МА
                            - generic [ref=e214]: ФОТО
                        - generic [ref=e215]:
                            - generic [ref=e216]: Марат
                            - generic [ref=e217]: 300+ отзывов
                    - link "Фото Вячеслав — ожидается Вячеслав 276+ отзывов" [ref=e220]:
                        - /url: /barbers/vyacheslav
                        - img "Фото Вячеслав — ожидается" [ref=e222]:
                            - generic [ref=e224]: ВЯ
                            - generic [ref=e225]: ФОТО
                        - generic [ref=e226]:
                            - generic [ref=e227]: Вячеслав
                            - generic [ref=e228]: 276+ отзывов
                    - link "Фото Сайод — ожидается Сайод 239+ отзывов" [ref=e231]:
                        - /url: /barbers/sayod
                        - img "Фото Сайод — ожидается" [ref=e233]:
                            - generic [ref=e235]: СА
                            - generic [ref=e236]: ФОТО
                        - generic [ref=e237]:
                            - generic [ref=e238]: Сайод
                            - generic [ref=e239]: 239+ отзывов
                    - link "Фото Алексей — ожидается Алексей 213+ отзывов" [ref=e242]:
                        - /url: /barbers/aleksey
                        - img "Фото Алексей — ожидается" [ref=e244]:
                            - generic [ref=e246]: АЛ
                            - generic [ref=e247]: ФОТО
                        - generic [ref=e248]:
                            - generic [ref=e249]: Алексей
                            - generic [ref=e250]: 213+ отзывов
                    - link "Фото Тимерлан — ожидается Тимерлан 177+ отзывов" [ref=e253]:
                        - /url: /barbers/timerlan
                        - img "Фото Тимерлан — ожидается" [ref=e255]:
                            - generic [ref=e257]: ТИ
                            - generic [ref=e258]: ФОТО
                        - generic [ref=e259]:
                            - generic [ref=e260]: Тимерлан
                            - generic [ref=e261]: 177+ отзывов
                    - link "Фото Николай — ожидается Николай 153+ отзывов" [ref=e264]:
                        - /url: /barbers/nikolay
                        - img "Фото Николай — ожидается" [ref=e266]:
                            - generic [ref=e268]: НИ
                            - generic [ref=e269]: ФОТО
                        - generic [ref=e270]:
                            - generic [ref=e271]: Николай
                            - generic [ref=e272]: 153+ отзывов
                - paragraph [ref=e273]: «Десять мастеров — каждый со своим почерком.»
            - generic [ref=e275]:
                - generic [ref=e276]:
                    - heading "Интерьер" [level=2] [ref=e277]
                    - paragraph [ref=e278]: Шаляпина, 26 · Казань
                - generic [ref=e280]:
                    - img "Интерьер BASE Premier — лобби с ресепшеном" [ref=e282]
                    - img "Интерьер BASE Premier — барберские кресла и вывеска" [ref=e284]
                    - generic [ref=e285]:
                        - img "Интерьер BASE Premier — рабочий зал" [ref=e287]
                        - paragraph [ref=e288]: 245 м от Концертного зала Филармонии
            - generic [ref=e290]:
                - generic [ref=e291]:
                    - heading "Отзывы" [level=2] [ref=e292]
                    - generic [ref=e293]:
                        - generic "5 звёзд из 5" [ref=e294]: ★★★★★
                        - link "5.0 на Яндекс.Картах · 394 отзыва" [ref=e295]:
                            - /url: https://yandex.ru/maps/org/base_premier
                - generic [ref=e296]:
                    - generic [ref=e298]:
                        - blockquote [ref=e299]:
                            - paragraph [ref=e300]: "«Был на стрижке с бородой. Час двадцать — и оба ушли с правильными пропорциями. Атмосфера в зале особенная: тихо, без лишних разговоров, всё по делу.»"
                        - generic [ref=e301]: Клиент BASE Premier · Август 2025
                    - generic [ref=e302]:
                        - generic [ref=e303]:
                            - button "Предыдущий отзыв" [ref=e304]: ←
                            - button "Следующий отзыв" [ref=e305]: →
                        - generic [ref=e306]:
                            - tablist "Переключение отзывов" [ref=e307]:
                                - tab "Отзыв 1" [ref=e308]
                                - tab "Отзыв 2" [selected] [ref=e310]
                                - tab "Отзыв 3" [ref=e312]
                                - tab "Отзыв 4" [ref=e314]
                                - tab "Отзыв 5" [ref=e316]
                            - generic [ref=e318]: 02 / 05
            - generic [ref=e320]:
                - generic [ref=e321]:
                    - heading "Прайс" [level=2] [ref=e322]
                    - link "Все 27 услуг →" [ref=e324]:
                        - /url: /services
                - list [ref=e325]:
                    - listitem [ref=e326]:
                        - generic [ref=e327]: Мужская стрижка
                        - generic [ref=e328]:
                            - generic [ref=e329]: 1 ч
                            - generic [ref=e330]: 1 800 – 2 700 ₽
                    - listitem [ref=e331]:
                        - generic [ref=e332]: Стрижка с бородой
                        - generic [ref=e333]:
                            - generic [ref=e334]: 1 ч 30 мин
                            - generic [ref=e335]: 3 200 – 4 600 ₽
                    - listitem [ref=e336]:
                        - generic [ref=e337]: Моделирование бороды
                        - generic [ref=e338]:
                            - generic [ref=e339]: 30 мин
                            - generic [ref=e340]: 1 400 – 1 900 ₽
                    - listitem [ref=e341]:
                        - generic [ref=e342]: Детская стрижка
                        - generic [ref=e343]:
                            - generic [ref=e344]: 1 ч
                            - generic [ref=e345]: 1 600 – 2 400 ₽
                    - listitem [ref=e346]:
                        - generic [ref=e347]: Мужской маникюр
                        - generic [ref=e348]:
                            - generic [ref=e349]: 1 ч
                            - generic [ref=e350]: от 1 900 ₽
                    - listitem [ref=e351]:
                        - generic [ref=e352]: Стрижка + маникюр
                        - generic [ref=e353]:
                            - generic [ref=e354]: 2 ч
                            - generic [ref=e355]: 3 100 – 4 000 ₽
                - paragraph [ref=e356]: Средний чек — 2 400 ₽ · Ежедневно 10:00–21:00
                - button "Записаться на услугу" [ref=e359]
            - generic [ref=e361]:
                - heading "Для постоянных гостей" [level=2] [ref=e362]
                - generic [ref=e363]:
                    - generic [ref=e364]:
                        - generic [ref=e365]: "01"
                        - generic [ref=e366]:
                            - heading "Накопительная скидка" [level=3] [ref=e367]
                            - paragraph [ref=e368]: Программа лояльности работает через YClients. Каждый визит — баллы, баллы — скидка. Детали узнайте у мастера при первом визите.
                    - generic [ref=e369]:
                        - generic [ref=e370]: "02"
                        - generic [ref=e371]:
                            - heading "Приведи друга" [level=3] [ref=e372]
                            - paragraph [ref=e373]: Порекомендуйте BASE Premier — оба получите бонус на следующий визит. Условия уточняйте на стойке администратора.
                    - generic [ref=e374]:
                        - generic [ref=e375]: "03"
                        - generic [ref=e376]:
                            - heading "Подарочные сертификаты" [level=3] [ref=e377]
                            - paragraph [ref=e378]: Физические сертификаты на любую сумму. Отличный подарок для тех, кто ценит качество. Приобрести можно в салоне на Шаляпина 26.
            - generic [ref=e380]:
                - generic [ref=e381]:
                    - heading "Вопросы и ответы" [level=2] [ref=e382]
                    - link "Все вопросы →" [ref=e383]:
                        - /url: /about
                - generic [ref=e385]:
                    - generic [ref=e386]:
                        - button "Сколько длится стрижка?" [expanded] [ref=e387]:
                            - generic [ref=e388]: Сколько длится стрижка?
                            - img [ref=e390]
                        - region "Сколько длится стрижка?" [ref=e393]:
                            - paragraph [ref=e395]: Час. Это базовая длительность для большинства услуг. Если у вас борода — добавляется 30 минут. Точная длительность каждой услуги указана на странице услуги.
                    - generic [ref=e396]:
                        - button "Сколько стоит стрижка в барбершопе BASE Premier?" [ref=e397]:
                            - generic [ref=e398]: Сколько стоит стрижка в барбершопе BASE Premier?
                            - img [ref=e400]
                        - region "Сколько стоит стрижка в барбершопе BASE Premier?":
                            - paragraph [ref=e401]: Мужская стрижка — от 1 800 до 2 700 ₽ в зависимости от категории мастера. Стрижка с бородой — от 3 200 до 4 600 ₽. Все цены указаны за час работы, включая мытьё головы, моделирование и укладку.
                    - generic [ref=e402]:
                        - button "Как часто нужно стричься мужчине?" [ref=e403]:
                            - generic [ref=e404]: Как часто нужно стричься мужчине?
                            - img [ref=e406]
                        - region "Как часто нужно стричься мужчине?":
                            - paragraph [ref=e407]: В среднем раз в 3–4 недели — это поддерживающая стрижка, когда форма уже есть. Если вы отращиваете волосы или работаете с техническими деталями (fade, taper), мастер порекомендует индивидуальный интервал на первом визите.
                    - generic [ref=e408]:
                        - button "Можно ли совместить стрижку и маникюр?" [ref=e409]:
                            - generic [ref=e410]: Можно ли совместить стрижку и маникюр?
                            - img [ref=e412]
                        - region "Можно ли совместить стрижку и маникюр?":
                            - paragraph [ref=e413]: Да, и это выгодно. Одновременно — мастера работают в 4 руки, час, 2 800–3 700 ₽. Последовательно — два часа, скидка до 15 %, 3 100–4 000 ₽. При записи выбирайте «Комплекс» в виджете.
                    - generic [ref=e414]:
                        - button "Как отменить или перенести запись?" [ref=e415]:
                            - generic [ref=e416]: Как отменить или перенести запись?
                            - img [ref=e418]
                        - region "Как отменить или перенести запись?":
                            - paragraph [ref=e419]: Через ссылку в SMS-напоминании — придёт за сутки до визита. Или позвоните по номеру +7 (917) 918-38-77. Просим предупреждать за 3 часа — так мастер успеет принять другого клиента.
                    - generic [ref=e420]:
                        - button "Где вы находитесь?" [ref=e421]:
                            - generic [ref=e422]: Где вы находитесь?
                            - img [ref=e424]
                        - region "Где вы находитесь?":
                            - paragraph [ref=e425]: Казань, ул. Шаляпина, 26, 1 этаж — в трёхстах метрах от Концертного зала Филармонии. Парковка по периметру здания. Ежедневно 10:00–21:00.
            - generic [ref=e426]:
                - generic:
                    - generic: BP
                - generic [ref=e428]:
                    - generic [ref=e429]:
                        - heading "Записаться?" [level=2] [ref=e430]
                        - paragraph [ref=e431]: Шаляпина, 26 · Казань · ежедневно с 10 до 21
                    - button "Записаться онлайн" [ref=e433]
                    - paragraph [ref=e434]:
                        - text: или позвонить
                        - link "+7 (917) 918-38-77" [ref=e435]:
                            - /url: tel:+79179183877
    - contentinfo [ref=e436]:
        - generic [ref=e437]:
            - generic [ref=e438]:
                - generic [ref=e439]:
                    - link "BASE Premier — на главную" [ref=e440]:
                        - /url: /
                        - img [ref=e441]:
                            - generic [ref=e442]: BP
                            - generic [ref=e443]: BASE PREMIER
                    - paragraph [ref=e444]: Стиль, атмосфера, мастерство — мужской уход без компромиссов
                - navigation "Навигация по сайту" [ref=e445]:
                    - list [ref=e446]:
                        - listitem [ref=e447]:
                            - link "Услуги" [ref=e448]:
                                - /url: /services
                        - listitem [ref=e449]:
                            - link "Мастера" [ref=e450]:
                                - /url: /barbers
                        - listitem [ref=e451]:
                            - link "О нас" [ref=e452]:
                                - /url: /about
                        - listitem [ref=e453]:
                            - link "Журнал" [ref=e454]:
                                - /url: /journal
                        - listitem [ref=e455]:
                            - link "Контакты" [ref=e456]:
                                - /url: /contacts
                - generic [ref=e457]:
                    - generic [ref=e458]:
                        - generic [ref=e459]: ул. Шаляпина, 26, 1 этаж
                        - generic [ref=e460]: Казань
                    - paragraph [ref=e461]: Ежедневно 10:00–21:00
                    - link "+7 (917) 918-38-77" [ref=e462]:
                        - /url: tel:+79179183877
                    - generic [ref=e463]:
                        - link "WhatsApp" [ref=e464]:
                            - /url: https://wa.me/79179183877
                            - img [ref=e465]
                        - link "Telegram" [ref=e468]:
                            - /url: https://t.me/+79179183877
                            - img [ref=e469]
            - generic [ref=e471]:
                - generic [ref=e472]: © 2022–2026 BASE Premier
                - generic [ref=e473]:
                    - generic [ref=e474]: ИП Шайхутдинов Айрат Рафаэлевич · ИНН 163207031442
                    - link "Политика конфиденциальности" [ref=e475]:
                        - /url: /privacy
    - generic:
        - generic: Запись онлайн
        - button "Записаться онлайн": Записаться
        - link "+7 (917) 918-38-77":
            - /url: tel:+79179183877
    - generic [ref=e476]:
        - link "Написать в WhatsApp" [ref=e477]:
            - /url: https://wa.me/79179183877
            - img [ref=e478]
        - link "Написать в Telegram" [ref=e481]:
            - /url: https://t.me/+79179183877
            - img [ref=e482]
    - dialog "Уведомление о cookie" [ref=e484]:
        - generic [ref=e485]:
            - paragraph [ref=e486]:
                - text: Мы используем cookie для аналитики и улучшения сервиса. Подробнее —
                - link "Политика конфиденциальности" [ref=e487]:
                    - /url: /privacy
                - text: .
            - generic [ref=e488]:
                - button "Только необходимые" [ref=e489]
                - button "Принять все" [ref=e490]
    - alert [ref=e491]
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
