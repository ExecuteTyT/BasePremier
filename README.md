# BASE Premier · Пакет редизайна

Полный планирующий и подготовительный пакет для редизайна сайта премиального барбершопа BASE Premier (Казань, basepremier.ru) на Next.js 15. Создан под **solo-founder workflow** — единственный исполнитель — Claude Code, заказчик Айрат — финальное ЛПР.

---

## Структура пакета

```
base-premier/
├── README.md                           ← вы здесь
├── CLAUDE.md                           ← главный контекст для Claude Code (читается автоматически)
│
├── docs/                               ← планирующая документация (~13000 строк)
│   ├── BRAND.md                        ← концепция «Concrete & Midnight», CSS-токены, типографика, sound design, 3D-монограмма BP
│   ├── DESIGN-BRIEF.md                 ← sitemap, спецификация 9 секций главной + 12 внутренних страниц
│   ├── CONTENT-BRIEF.md                ← ТЗ на тексты, биографии 10 мастеров, 12 SEO-статей блога, прайс
│   ├── ARCHITECTURE.md                 ← Next.js 15 + Sanity + YClients + JSON-LD + Nginx + GitHub Actions
│   ├── ROADMAP.md                      ← 16-недельный план, 7 фаз, детальные тикеты BS-01…
│   ├── RISK-REGISTER.md                ← риски, mitigation-планы (фотосессия мастеров — критический блокер)
│   ├── VIDEO-STORYBOARD.md             ← план A (постпрод существующего hero-видео) + план B (пере-съёмка)
│   └── CLIENT-ANSWERS.md               ← все финальные решения заказчика, бизнес-данные verbatim
│
└── .claude/                            ← конфигурация Claude Code
    ├── settings.json                   ← hooks (pre/post-tool), permissions
    ├── agents/                         ← 7 субагентов (узкая специализация)
    │   ├── animation-engineer.md       ← GSAP / Lenis / Framer Motion
    │   ├── content-modeler.md          ← Sanity-схемы
    │   ├── copywriter.md               ← тексты в tone-of-voice бренда
    │   ├── design-importer.md          ← импорт BRAND.md → Tailwind-токены
    │   ├── perf-auditor.md             ← Lighthouse runs, performance budget
    │   ├── a11y-auditor.md             ← axe-core, WCAG 2.2 AA
    │   └── seo-auditor.md              ← meta + JSON-LD + sitemap + robots
    ├── skills/                         ← 5 переиспользуемых skill-пакетов
    │   ├── create-section/             ← boilerplate секции с GSAP-анимацией
    │   ├── gsap-scroll-trigger/        ← паттерны scroll-анимаций
    │   ├── lighthouse-check/           ← CI-runner Lighthouse
    │   ├── schema-localbusiness/       ← JSON-LD HairSalon
    │   └── yclients-integration/       ← виджет + API-прокси + webhooks
    └── commands/                       ← 6 slash-команд для рутины
        ├── /init-section               ← новая секция главной
        ├── /new-page                   ← новая страница App Router
        ├── /audit-perf                 ← Lighthouse-прогон
        ├── /audit-a11y                 ← axe + WCAG 2.2 AA
        ├── /check-seo                  ← SEO-аудит
        └── /yc-test                    ← тест YClients-интеграции

.mcp.json                               ← MCP-серверы: context7, playwright, sanity
```

---

## Что делать дальше — пошагово

### 1. Распаковка в репозиторий

```bash
# создать рабочий каталог проекта
mkdir -p ~/projects/base-premier && cd ~/projects/base-premier

# скопировать сюда содержимое пакета (все файлы и папки base-premier/*)
# у вас должно быть:
ls -la
# README.md  CLAUDE.md  docs/  .claude/  .mcp.json
```

### 2. Инициализация репозитория

```bash
git init
git add .
git commit -m "chore: planning package for BASE Premier redesign"

# создать удалённый репозиторий на GitHub (приватный) и запушить:
gh repo create base-premier --private --source=. --push
# или вручную:
# git remote add origin git@github.com:USER/base-premier.git
# git push -u origin main
```

### 3. Запуск Claude Code

```bash
# установить Claude Code, если ещё не установлен
npm install -g @anthropic-ai/claude-code

# запустить из корня проекта
cd ~/projects/base-premier
claude

# при первом запуске Claude Code автоматически прочитает CLAUDE.md
# и подгрузит конфиг из .claude/settings.json + .mcp.json
```

### 4. Установка MCP-серверов

В первой сессии Claude Code сам предложит установить пакеты MCP-серверов из `.mcp.json` (context7, playwright, sanity). Подтвердить установку — это даст Claude доступ к свежим докам Next.js 15 и инструменту тестов.

### 5. Первый тикет — BS-01 (Bootstrap)

Открыть `docs/ROADMAP.md` — там 16-недельный план с детализацией по тикетам. Самый первый — **BS-01: Bootstrap проекта** (Неделя 1, Фаза 0). Команда в Claude Code:

```
Прочитай docs/ROADMAP.md, секцию "Фаза 0 · Неделя 1 · BS-01 Bootstrap".
Выполни все задачи тикета: pnpm init, Next.js 15 c App Router и Tailwind v4,
TypeScript strict, конфиг ESLint/Prettier, базовая структура папок по
ARCHITECTURE.md, .gitignore, .env.example, husky pre-commit. Коммить пачками.
```

### 6. Параллельно — что делать заказчику (PENDING-вопросы)

Открыть `docs/CLIENT-ANSWERS.md`, секция **«Открытые вопросы»**. Самые срочные блокеры:

- **Q9 Логотип BP в векторе** (нужен на Неделе 1, без него не запустить дизайн-импорт)
- **Q6 Решение по фотосессии 10 мастеров** (нужно к Неделе 8 — это критический блокер production)
- **Q4 YClients API-ключ + company_id + form_id** (нужен к Неделе 12)
- **Q1 GPS-координаты салона** (нужны к Неделе 5 — для JSON-LD HairSalon)

Остальные (Q2, Q3, Q5, Q7, Q8, Q10) — не блокируют старт, ответы нужны позже.

---

## Ключевые инварианты — НЕ ЛОМАТЬ

1. **Шрифты** — Fraunces + Inter + JetBrains Mono из Google Fonts. Бесплатные, лицензия SIL OFL. Никаких коммерческих шрифтов.
2. **Тема** — только dark. Никаких переключателей светлой темы.
3. **Логотип** — «**BP**», не «X», не «B», не «P».
4. **1 филиал** — Шаляпина 26. Павлюхина продана и нигде не упоминается.
5. **10 мастеров с реальными именами** — Марат, Вячеслав, Сайод, Алексей, Тимерлан, Николай, Джим, Арина, Мурат, Диана. Не выдумывать.
6. **27 услуг с реальным прайсом** 500–7000 ₽ из `docs/CONTENT-BRIEF.md`. Не округлять, не упрощать.
7. **Хостинг** — собственный VPS (не Vercel). Домен через reg.ru. SSL — Let's Encrypt.
8. **Performance budget** — LCP < 1.8s, INP < 100ms, CLS < 0.05, Lighthouse Perf ≥ 92. Жёстко.
9. **Что нельзя ломать**: записи в YClients (виджет + API-сценарии), старые URL (301-редиректы в Nginx), SEO-позиции (8–9 страница сейчас, не должно стать хуже), программа лояльности.
10. **Главные страхи заказчика**: «выйдет как у всех» + «красиво, но не продаст». Этим калибровать каждое решение.

---

## Контакты и реквизиты — verbatim для JSON-LD

- **ИП** Шайхутдинов Айрат Рафаэлевич, ИНН 163207031442, ОГРНИП 321169000005742
- **Адрес** ул. Шаляпина 26, 1 этаж, Казань (ориентир — Концертный зал Филармонии, 245 м)
- **Телефон / WhatsApp / Telegram** +7 (917) 918-38-77 (один номер на все каналы)
- **Часы** ежедневно 10:00–21:00
- **Instagram** https://www.instagram.com/basepremier/
- **Год основания** 2022
- **Косметика** Graham Hill, Davines, The London Grooming Co, Solomon's

---

## Финансовая прикидка (без шрифтов и копирайта — они бесплатны)

| Статья | Бюджет |
|---|---|
| VPS (год вперёд) | 12 000 ₽ |
| Домен (продление) | 800 ₽ |
| Sanity Studio (free tier) | 0 ₽ |
| Фотосессия 10 мастеров (план B) | 60 000–115 000 ₽ |
| Hero-видео постпрод (план A — DaVinci/ffmpeg) | 0 ₽ |
| Hero-видео пере-съёмка (план B — опционально) | 80 000–150 000 ₽ |
| Я.Директ (старт, 1 месяц) | 30 000–100 000 ₽ |
| Sound design (Freesound CC0) | 0 ₽ |
| Шрифты (Google Fonts) | 0 ₽ |
| Блог (Claude пишет) | 0 ₽ |
| **Минимум на старт** | **≈ 102 000 ₽** |
| **Полный пакет** | **≈ 280 000 ₽** |

Всё остальное — труд Claude Code в рамках ваших подписок.

---

## Срок: 16 недель

- **Фаза 0** (Нед. 1) — Bootstrap
- **Фаза 1** (Нед. 2–3) — Дизайн-система, Tailwind-токены
- **Фаза 2** (Нед. 4–6) — Главная страница, 9 секций
- **Фаза 3** (Нед. 7–9) — Внутренние страницы, мастера, услуги, контакты
- **Фаза 4** (Нед. 10–11) — Блог, Sanity Studio, 12 SEO-статей
- **Фаза 5** (Нед. 12) — YClients-интеграция, виджет, webhook
- **Фаза 6** (Нед. 13–14) — SEO-полировка, JSON-LD, sitemap, OG-картинки
- **Фаза 7** (Нед. 15–16) — Production-deploy, мониторинг, Я.Директ

Допуск +4 недели (до 20 нед.) ради качества Awwwards SOTD — заказчик подтвердил.

---

## Помощь

Если что-то непонятно по содержимому какого-либо документа — открыть его и попросить Claude Code:

```
Объясни своими словами раздел X в docs/Y.md
```

или попросить Claude Code обновить документацию:

```
В docs/CONTENT-BRIEF.md, секции "Биография мастера", замени имя X на Y.
Обнови все упоминания в проекте, проверь связи.
```

Удачного запуска. Начните с тикета BS-01.
