---
name: yclients-integration
description: Use when integrating YClients booking widget, fetching live occupancy, or syncing data from YClients API to BASE Premier. Covers the API proxy pattern, rate limiting, error handling, and Telegram webhook fallback for amoCRM.
---

# Skill: YClients Integration

Procedures for safely integrating YClients into BASE Premier without exposing API keys to the client.

## Architecture

```
Browser ↔ Next.js API Route (Edge) ↔ YClients API
                ↓
         (cached 60s)
                ↓
         (server tokens)
```

**Never** call YClients API directly from client-side code — the User Token must stay server-side.

## ENV setup

```bash
# .env.local (NOT committed)
YCLIENTS_PARTNER_TOKEN=xxx     # выдаёт YClients интеграционный отдел
YCLIENTS_USER_TOKEN=xxx        # auth токен сотрудника-админа
YCLIENTS_COMPANY_ID=12345      # ID компании в YClients
YCLIENTS_BRANCH_ID=67890       # ID филиала Шаляпина

# Public (для widget URL)
NEXT_PUBLIC_YCLIENTS_COMPANY_ID=12345
NEXT_PUBLIC_YCLIENTS_BRANCH_ID=67890
```

## Pattern 1 — Booking widget (modal)

YClients widget is loaded as iframe inside our custom modal so we maintain visual style:

```tsx
// src/components/booking/BookingModal.tsx
'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useEffect } from 'react'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  serviceId?: string  // pre-fill
  staffId?: string    // pre-fill
}

export function BookingModal({ open, onOpenChange, serviceId, staffId }: Props) {
  const url = buildYclientsWidgetUrl({ serviceId, staffId })

  // Listen for booking_complete from iframe
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.origin !== 'https://yclients.com' && e.origin !== 'https://w.yclients.com') return
      if (e.data?.type === 'booking_complete') {
        // Track in Yandex.Metrica
        window.ym?.(Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID), 'reachGoal', 'BOOKING_COMPLETE', {
          service: e.data.service,
          staff: e.data.staff,
        })
        // Close modal after small delay
        setTimeout(() => onOpenChange(false), 2000)
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [onOpenChange])

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-bg-primary/80 backdrop-blur-md data-[state=open]:animate-in" />
        <Dialog.Content className="fixed inset-4 z-50 flex flex-col rounded-lg border border-metal-line bg-bg-tertiary md:inset-x-1/2 md:left-1/2 md:top-1/2 md:h-[80vh] md:w-[640px] md:-translate-x-1/2 md:-translate-y-1/2">
          <header className="flex items-center justify-between border-b border-metal-line p-md">
            <Dialog.Title className="t-h3">запись · base premier</Dialog.Title>
            <Dialog.Close className="t-button">×</Dialog.Close>
          </header>
          <iframe
            src={url}
            title="Booking form"
            className="h-full w-full flex-1 border-0"
            allow="payment"
            sandbox="allow-scripts allow-same-origin allow-forms allow-top-navigation"
          />
          <footer className="border-t border-metal-line p-md text-center">
            <p className="t-caption">или позвоните <a href="tel:+79179183877" className="text-accent-glow">+7 917 918-38-77</a></p>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function buildYclientsWidgetUrl({ serviceId, staffId }: { serviceId?: string; staffId?: string }) {
  const params = new URLSearchParams()
  if (serviceId) params.set('o-s', serviceId)
  if (staffId) params.set('o-m', staffId)
  return `https://w.yclients.com/${process.env.NEXT_PUBLIC_YCLIENTS_COMPANY_ID}?${params.toString()}`
}
```

## Pattern 2 — Live occupancy API proxy

```ts
// src/app/api/occupancy/route.ts
export const runtime = 'edge'
export const revalidate = 60 // 1 минута кеша

interface OccupancyResponse {
  masters: Array<{
    id: string
    name: string
    role: string
    slotsToday: number
    nextAvailable: string | null
  }>
  updatedAt: string
}

export async function GET(): Promise<Response> {
  try {
    const today = new Date().toISOString().split('T')[0]

    const response = await fetch(
      `https://api.yclients.com/api/v1/book_staff/${process.env.YCLIENTS_COMPANY_ID}?date=${today}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.YCLIENTS_PARTNER_TOKEN}, User ${process.env.YCLIENTS_USER_TOKEN}`,
          Accept: 'application/vnd.yclients.v2+json',
        },
        next: { revalidate: 60 },
      }
    )

    if (!response.ok) {
      throw new Error(`YClients API error: ${response.status}`)
    }

    const data = await response.json()

    const result: OccupancyResponse = {
      masters: data.data.map((master: any) => ({
        id: master.id,
        name: master.name,
        role: master.specialization,
        slotsToday: master.bookable ? master.seance_length || 0 : 0,
        nextAvailable: master.nearest_seance_date ?? null,
      })),
      updatedAt: new Date().toISOString(),
    }

    return Response.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    })
  } catch (error) {
    console.error('[/api/occupancy]', error)
    return Response.json(
      { error: 'Загруженность временно недоступна', masters: [] },
      { status: 503 }
    )
  }
}
```

Usage in client:

```tsx
// src/components/sections/FinalCta/FinalCta.client.tsx
'use client'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function FinalCta() {
  const { data, error } = useSWR('/api/occupancy', fetcher, { refreshInterval: 60_000 })

  return (
    <section>
      <h2 className="t-display">готовы?</h2>
      {data?.masters && data.masters.length > 0 ? (
        <ul>
          {data.masters
            .filter((m: any) => m.slotsToday > 0)
            .slice(0, 3)
            .map((m: any) => (
              <li key={m.id}>
                у <strong>{m.name}</strong> {m.slotsToday} {pluralize(m.slotsToday, 'окно', 'окна', 'окон')} сегодня
              </li>
            ))}
        </ul>
      ) : (
        <p className="t-body text-fg-secondary">
          загруженность уточняйте по телефону{' '}
          <a href="tel:+79179183877">+7 917 918-38-77</a>
        </p>
      )}
    </section>
  )
}
```

## Pattern 3 — Telegram webhook (вместо amoCRM)

YClients поддерживает webhook на новые записи. Настраиваем endpoint в нашем приложении, который ловит и шлёт в Telegram-канал.

```ts
// src/app/api/yclients-webhook/route.ts
import crypto from 'node:crypto'

export const runtime = 'nodejs' // нужен crypto

export async function POST(request: Request) {
  // Verify webhook signature
  const body = await request.text()
  const signature = request.headers.get('x-yclients-signature')
  
  const expected = crypto
    .createHmac('sha256', process.env.YCLIENTS_WEBHOOK_SECRET!)
    .update(body)
    .digest('hex')
  
  if (signature !== expected) {
    return Response.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const event = JSON.parse(body)

  // Process event types
  if (event.type === 'record:created') {
    const record = event.data
    const message = formatBookingMessage(record)
    await sendToTelegram(message)
  }

  return Response.json({ ok: true })
}

function formatBookingMessage(record: any): string {
  return [
    '🆕 Новая запись',
    `Клиент: ${record.client.name}`,
    `Телефон: ${record.client.phone}`,
    `Услуга: ${record.services.map((s: any) => s.title).join(', ')}`,
    `Мастер: ${record.staff.name}`,
    `Дата: ${record.datetime}`,
    `Сумма: ${record.cost} ₽`,
    record.client.comment ? `Комментарий: ${record.client.comment}` : '',
  ].filter(Boolean).join('\n')
}

async function sendToTelegram(text: string) {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'Markdown',
    }),
  })
}
```

Регистрация webhook в YClients dashboard: Настройки → Интеграции → Webhooks → Add webhook URL `https://basepremier.ru/api/yclients-webhook`, secret = `YCLIENTS_WEBHOOK_SECRET` env var.

## Pattern 4 — Pre-fill widget с UTM

При переходе с конкретной услуги или мастера, заполняем виджет:

```tsx
// /services/men-haircut → click CTA "Записаться"
<Button onClick={() => openBookingModal({ serviceId: '12345' })}>записаться</Button>

// /barbers/marat → click CTA "Записаться к Марату"
<Button onClick={() => openBookingModal({ staffId: '67890' })}>записаться к марату</Button>
```

URL widget будет: `https://w.yclients.com/12345?o-s=12345&o-m=67890`.

## Best practices

1. **Cache occupancy on Edge** — 60s TTL, реально актуально, экономит rate limit
2. **Error handling** — UI должен gracefully fall back
3. **Verify signatures** на webhook — иначе спам или атаки
4. **Не хранить ПД** на нашем сервере — все booking-данные остаются в YClients
5. **Тестировать** webhook с YClients sandbox перед production

## Common errors

- ❌ Положить токен в `NEXT_PUBLIC_*` — utokенется в client bundle
- ❌ Iframe widget без `sandbox` — security risk
- ❌ Не верифицировать webhook подпись — открыты к спаму
- ❌ Полить YClients API на каждый рендер — превысите rate limit (~120 req/min)
- ❌ Хардкодить ID компании / филиала — выносим в env

## Тариф YClients

Для полной интеграции (custom widget styling, full API access) нужен тариф **YClients Plus** или выше. Уточнить с заказчиком к нед. 6.

Если бюджет не позволяет:
- На стандартном тарифе виджет показывается как есть, без кастомной темы
- API доступен ограниченно (только public endpoints)
- Webhook доступен с тарифа Pro

## Production checklist

- [ ] Все ENV в production VPS, не закоммичены
- [ ] Webhook URL зарегистрирован в YClients
- [ ] Telegram bot создан и chat_id известен
- [ ] Тестовая запись через виджет проходит
- [ ] Тестовое уведомление в Telegram приходит
- [ ] Я.Метрика goal `BOOKING_COMPLETE` срабатывает
- [ ] Live occupancy показывает реальные данные
