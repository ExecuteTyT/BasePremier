---
description: Создать новую секцию главной страницы по шаблону BASE Premier (GSAP + ScrollTrigger + a11y)
argument-hint: <SectionName> (PascalCase, например HeroSection или ServicesSection)
---

# Init Section: $ARGUMENTS

Создай новую секцию главной страницы с именем `$ARGUMENTS`. Следуй стандартам BASE Premier:

## Шаги

1. **Прочитай контекст:**
   - `CLAUDE.md` — общие инварианты бренда
   - `docs/BRAND.md` — токены, типографика, motion
   - `docs/DESIGN-BRIEF.md` — найди секцию с этим именем (или ближайшую) и применяй её спеку
   - `.claude/skills/create-section/SKILL.md` — детальный паттерн

2. **Создай файл:**
   - Путь: `src/components/sections/$ARGUMENTS.tsx`
   - Используй `'use client'` ТОЛЬКО если нужны хуки (useEffect для анимаций, useState).
   - Если секция полностью статичная — оставляй Server Component.

3. **Структура компонента:**
   ```tsx
   import { useGSAP } from '@gsap/react'
   import { useRef } from 'react'
   import gsap from 'gsap'
   import ScrollTrigger from 'gsap/ScrollTrigger'
   
   gsap.registerPlugin(ScrollTrigger)
   
   export function $ARGUMENTS() {
     const sectionRef = useRef<HTMLElement>(null)
   
     useGSAP(() => {
       // ScrollTrigger анимации
     }, { scope: sectionRef })
   
     return (
       <section
         ref={sectionRef}
         aria-labelledby="$ARGUMENTS-heading"
         className="relative py-32 px-6 lg:px-12"
       >
         <div className="max-w-screen-xl mx-auto">
           {/* eyebrow + heading */}
           <header className="mb-16">
             <p className="eyebrow text-text-tertiary">Раздел</p>
             <h2 id="$ARGUMENTS-heading" className="font-display text-display-md mt-4">
               Заголовок секции
             </h2>
           </header>
           
           {/* content */}
         </div>
       </section>
     )
   }
   ```

4. **A11y-чеклист (обязательный):**
   - `aria-labelledby` указывает на ID заголовка секции.
   - `<h2>` для заголовка (на главной только один `<h1>` — в hero).
   - Все интерактивы имеют `aria-label` или видимый текст.
   - `prefers-reduced-motion` уважается в анимациях.

5. **Performance-чеклист:**
   - Изображения через `next/image` с `sizes` attribute.
   - Видео через `<HeroVideo />` компонент (см. VIDEO-STORYBOARD.md).
   - Bundle-size: серверный компонент по умолчанию, клиентский только если необходимо.

6. **GSAP-паттерн:**
   - Используй `useGSAP({ scope: sectionRef })` для автоматического cleanup.
   - ScrollTrigger всегда c `start: 'top 80%'` (по умолчанию) и `once: true` для intro-анимаций.
   - Easing — `power2.out` или `ease-out-expo` для длинных движений.

7. **После создания:**
   - Импортируй секцию в `src/app/page.tsx`.
   - Запусти `pnpm typecheck && pnpm lint`.
   - Запусти `pnpm test` если есть тесты.
   - Сделай скриншот через playwright (десктоп + мобильный) и приложи к ответу.

8. **НЕ ЗАБУДЬ:**
   - Никаких эмодзи в UI.
   - Никаких упоминаний Павлюхины (закрыта).
   - Только dark theme.
   - Логотип «BP», не «X».
