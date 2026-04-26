---
description: Тест интеграции с YClients (виджет, API occupancy, webhooks)
argument-hint: [<subcommand: widget|occupancy|webhook|all>]
---

# YClients Test: $ARGUMENTS

Тестирование интеграции с YClients — единственным источником записей и расписания. Используй skill `yclients-integration` (см. `.claude/skills/yclients-integration/SKILL.md`).

## Что нужно проверить

### 1. Booking Widget (`booking modal`)

**Тест:**
- Открой главную, кликни «Записаться» в шапке.
- Открывается модалка с iframe YClients.
- iframe загружается ≤ 2s.
- Параметры query корректны: `lang=ru`, `theme=dark`, `company_id={Q4}`.

**Проверки UI:**
- Модалка адекватно центрирована.
- Размер iframe: 720px высота на десктопе, full viewport на мобильном.
- Esc закрывает модалку, фокус возвращается на триггер.
- Виджет открывается на iOS Safari без багов с keyboard (известный issue).

**Если widget сломан:**
- План B (см. DESIGN-BRIEF.md § 2.10): спрятать виджет в overlay-карточку с собственными полями (имя, телефон, время) → отправка через `/api/yclients/book` (Edge Route, прокси в YClients API).
- Это потребует API-ключа (Q4 PENDING) и хранения PII → cookie consent + РКН-уведомление.

### 2. Live Occupancy (CTA-final секция на главной)

**Что делаем:**
- Edge Route `/api/yclients/occupancy` запрашивает у YClients API доступные слоты на ближайшие 7 дней.
- Кеш 60s через Edge Cache.
- На главной в секции CTA-final выводятся 3–5 ближайших свободных слотов.

**Тест:**
```bash
curl http://localhost:3000/api/yclients/occupancy | jq
```

Ожидаемый ответ:
```json
{
  "slots": [
    { "datetime": "2026-04-26T14:00:00+03:00", "barberId": null, "available": true },
    { "datetime": "2026-04-27T11:30:00+03:00", "barberId": null, "available": true }
  ],
  "cachedAt": "2026-04-26T08:30:00Z"
}
```

**Проверки:**
- Ответ < 500ms (после прогрева кеша).
- Нет API-ключа в ответе (только в Edge Route, не в браузере).
- При недоступности YClients API — fallback (200 OK + `{ slots: [], reason: "yclients_unavailable" }`).
- Slots не показывают чью-либо персональную информацию.

**Edge cases:**
- Воскресенье вечер → следующая запись в понедельник утром.
- Полный выходной (например, праздник) → пустой массив + сообщение «Запишитесь онлайн или по телефону».
- Network timeout → fallback срабатывает за 3s.

### 3. Webhook → Telegram

**Что делаем:**
- В YClients настроен webhook `record_created` → `https://basepremier.ru/api/webhook/yclients`.
- Edge Route принимает webhook, валидирует подпись (если YClients поддерживает) или secret-token.
- Отправляет уведомление в Telegram bot заказчика.

**Тест (имитация webhook):**
```bash
curl -X POST http://localhost:3000/api/webhook/yclients \
  -H "Content-Type: application/json" \
  -H "X-YClients-Signature: {valid-signature}" \
  -d '{
    "event": "record.created",
    "data": {
      "id": 12345,
      "datetime": "2026-04-27T15:00:00+03:00",
      "client": { "name": "Тест Тест", "phone": "+79991234567" },
      "services": [{ "title": "Стрижка с бородой", "amount": 2400 }],
      "staff": { "name": "Марат" }
    }
  }'
```

**Ожидаемое поведение:**
- 200 OK от Edge Route.
- В Telegram заказчику приходит сообщение:
  ```
  📅 Новая запись
  
  Клиент: Тест Тест (+7 999 123-45-67)
  Услуга: Стрижка с бородой — 2 400 ₽
  Мастер: Марат
  Время: 27 апреля, среда, 15:00
  ```

**Проверки:**
- Невалидная подпись → 401.
- Без `Content-Type: application/json` → 400.
- Дубль (тот же event-id) → 200, но не отправляем в Telegram дважды (idempotency через KV-storage).

### 4. End-to-end booking flow (если активирован план B с собственной формой)

```bash
# Сценарий: пользователь заполняет форму на сайте, она прокидывается в YClients API.

curl -X POST http://localhost:3000/api/yclients/book \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Иван Иванов",
    "phone": "+79991234567",
    "datetime": "2026-04-27T15:00:00+03:00",
    "service_id": 12,
    "staff_id": 3
  }'
```

**Ожидаемое:**
- 200 OK + `{ "record_id": 12345, "status": "created" }`.
- В YClients (внутреннем кабинете) появляется запись.
- Telegram-уведомление приходит.

**На старте план B НЕ активирован.** Используем только виджет.

## Subcommands

- `$ARGUMENTS = widget` → только widget-тесты.
- `$ARGUMENTS = occupancy` → только occupancy API.
- `$ARGUMENTS = webhook` → только webhook-тесты.
- `$ARGUMENTS = all` или пусто → все вышеперечисленное.

## Зависимости

- Q4 (YClients API key + company_id + form_id) — PENDING. До получения от Айрата:
  - Widget работает (требует только form_id, который публичный).
  - Occupancy и webhook — НЕ работают, нужен api-ключ.

## Документы

- `.claude/skills/yclients-integration/SKILL.md` — workflow интеграции
- `docs/ARCHITECTURE.md` § YClients — Edge Routes, кеш, webhooks
- `docs/RISK-REGISTER.md` — риск ограниченной кастомизации виджета
- YClients API docs: https://api.yclients.com (требует регистрации)
