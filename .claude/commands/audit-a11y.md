---
description: A11y-аудит страницы (axe-core + ручные проверки WCAG 2.2 AA + screen reader)
argument-hint: [<url>] — необязательно, по умолчанию весь сайт
---

# Audit A11y: $ARGUMENTS

Полный аудит доступности по WCAG 2.2 AA для BASE Premier. Используй subagent `a11y-auditor` (см. `.claude/agents/a11y-auditor.md`).

## Шаги

1. **Запусти проект:** `pnpm build && pnpm start`.

2. **Автоматизированный axe-core прогон:**
   ```bash
   # через Playwright + axe-core
   pnpm test:a11y -- --url=$ARGUMENTS
   ```
   Или через subagent:
   - `a11y-auditor` использует `@axe-core/playwright`.
   - Прогоняет каждую страницу из списка (если URL не указан).
   - Фиксирует violations серьёзности `critical`, `serious`, `moderate`, `minor`.

3. **Список страниц по умолчанию:**
   - `/` (с раскрытым FAQ + открытой модалкой booking)
   - `/services`
   - `/services/strizhka-s-borodoy`
   - `/barbers` + `/barbers/marat`
   - `/about`
   - `/journal` + любая статья
   - `/quiz` (на каждом шаге)
   - `/gift-cards`
   - `/contacts`
   - `/404` (при `/not-found`)

4. **Ручные проверки (то, что axe не ловит):**

   ### Клавиатурная навигация
   - Tab проходит по всем интерактивам в логичном порядке.
   - Esc закрывает модалки и мобильное меню.
   - Enter/Space активируют кнопки.
   - Arrow keys работают в каруселях (если карусель — `role="region"` или с custom keyboard handler).
   - Focus-visible виден на каждом фокусируемом элементе.

   ### Фокус-trap в модалках
   - При открытии booking modal фокус переезжает на первый интерактив внутри.
   - Tab/Shift+Tab циркулируют только внутри модалки.
   - Esc возвращает фокус на триггер.

   ### Контраст
   - Все тексты ≥ 4.5:1 на фоне.
   - Крупные тексты (≥ 18px) ≥ 3:1.
   - Использовать contrast-checker для каждой комбинации `text-*` и `bg-*` из `tokens.css`.

   ### Reduced motion
   - В DevTools: Rendering → Emulate CSS media `prefers-reduced-motion: reduce`.
   - Проверить: 3D-монограмма заменена на статичный SVG, hero-видео заменено на poster, GSAP-анимации мгновенные (или 0.15s).

   ### Скрин-ридер (NVDA / VoiceOver / TalkBack)
   - Проходим всю главную через VoiceOver (macOS Safari).
   - Заголовки читаются в правильной иерархии.
   - Кнопки имеют ясные labels («Открыть мобильное меню», не просто «Меню»).
   - Иконки stencil/декоративные имеют `aria-hidden="true"`.
   - 3D-canvas: читается как «изображение, Трёхмерная монограмма BASE Premier».

   ### Touch targets
   - Все интерактивы ≥ 44×44px (мобильный).
   - Расстояние между туч-целями ≥ 8px.

5. **Лог нарушений:**
   - Critical/Serious — блокеры, фиксим перед merge.
   - Moderate — фиксим в течение спринта.
   - Minor — backlog.
   - Сохрани отчёт в `tests/a11y-reports/{date}/{page}.json`.

6. **Чек WCAG 2.2 AA по уровням:**

   ### Perceivable
   - [ ] 1.1.1 Non-text content: alt-text на всех изображениях.
   - [ ] 1.3.1 Info and Relationships: семантический HTML, landmarks.
   - [ ] 1.4.3 Contrast: ≥ 4.5:1.
   - [ ] 1.4.10 Reflow: контент работает на 320×256 без horizontal scroll.
   - [ ] 1.4.11 Non-text Contrast: UI components ≥ 3:1.
   - [ ] 1.4.12 Text Spacing: line-height adjustable.

   ### Operable
   - [ ] 2.1.1 Keyboard: всё доступно с клавиатуры.
   - [ ] 2.1.2 No Keyboard Trap: фокус-trap только в модалках.
   - [ ] 2.4.1 Bypass Blocks: skip-link есть.
   - [ ] 2.4.3 Focus Order: логичный порядок.
   - [ ] 2.4.7 Focus Visible: outline видим.
   - [ ] 2.5.5 Target Size (AAA, но желательно): ≥ 44×44px.
   - [ ] 2.5.7 Dragging Movements (2.2): drag-операции имеют keyboard alternative.
   - [ ] 2.5.8 Target Size (Minimum) (2.2): ≥ 24×24px минимум.

   ### Understandable
   - [ ] 3.1.1 Language of Page: `<html lang="ru">`.
   - [ ] 3.2.1 On Focus: фокус не вызывает unexpected context change.
   - [ ] 3.3.1 Error Identification: ошибки форм видимы и анонсируются.
   - [ ] 3.3.7 Redundant Entry (2.2): не требуем повторного ввода данных.

   ### Robust
   - [ ] 4.1.2 Name, Role, Value: ARIA корректный.
   - [ ] 4.1.3 Status Messages: toasts через `aria-live`.

7. **Финальный отчёт:**
   - Markdown summary с пройденными/непройденными пунктами.
   - JSON-отчёт от axe-core.
   - Скриншоты проблемных мест.

## Инструменты

- `axe-core` + `@axe-core/playwright` — авто-проверка.
- `pa11y` — альтернатива/дополнение.
- Chrome DevTools Lighthouse Accessibility — встроенный (не такой подробный, но быстрый).
- Wave (https://wave.webaim.org/) — браузерное расширение, для финальной ручной проверки.
- VoiceOver (Cmd+F5 на macOS), NVDA (Windows бесплатно), TalkBack (Android).

## Документы

- `.claude/agents/a11y-auditor.md` — workflow аудита
- `docs/DESIGN-BRIEF.md` § 7 — A11y чеклист
- `docs/BRAND.md` — цвета и контрасты
- `https://www.w3.org/WAI/WCAG22/quickref/` — официальный WCAG 2.2 quick reference
