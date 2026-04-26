---
name: create-section
description: Use when creating a new homepage section or full page section for BASE Premier. Provides a standardized workflow for going from DESIGN-BRIEF spec to a working component, ensuring all project conventions are met (BRAND tokens, motion-safe animations, a11y, performance).
---

# Skill: Create New Section

Стандартизированная процедура для добавления новой секции на главную или внутреннюю страницу BASE Premier.

## When to use

- User asks "создай секцию X" / "сделай блок Y" / "implement section [code-from-roadmap]"
- Adding a new section listed in @docs/ROADMAP.md
- Refactoring existing section into proper structure

## Inputs you need

1. **Section name and ROADMAP ticket code** (e.g., `H-01` for Hero, `S-01` for Services Bento)
2. **Specification reference** in @docs/DESIGN-BRIEF.md §3.x
3. **Content draft** if available (or note that it's TBD)

## Procedure

### Step 1 — Read the spec

```
1. Open @docs/DESIGN-BRIEF.md
2. Find the matching section number (3.1 = Hero, 3.2 = Marquee, ...)
3. Note: layout, animation, mobile fallback, content references
```

### Step 2 — Check the brand tokens you'll need

```
1. Open @docs/BRAND.md
2. Identify needed tokens:
   - Typography classes (t-hero, t-h1, t-body, ...)
   - Color tokens (--bg-secondary, --accent, ...)
   - Spacing scale (--space-section, --space-xl, ...)
3. Identify existing atomic components from `src/components/ui/` to reuse
```

### Step 3 — Check related architecture

```
For sections involving:
- Animation → @docs/ARCHITECTURE.md §4.9 (Lenis sync), use `animation-engineer` subagent
- 3D → @docs/ARCHITECTURE.md (R3F lazy loading)
- API data → @docs/ARCHITECTURE.md §4.6 (YClients) or §4.7 (Sanity)
- Forms → @docs/ARCHITECTURE.md (RHF + Zod)
```

### Step 4 — Decide Server vs Client

```
Server Component if:
✓ Static content
✓ Data fetched at build/request time
✓ No state, effects, or browser APIs

Client Component (use 'use client') if:
✓ useState, useEffect, useReducer
✓ Browser APIs (window, localStorage)
✓ Event handlers (onClick, onScroll)
✓ Animations via GSAP, Framer Motion, R3F
✓ Third-party libraries that require client-side
```

### Step 5 — Create the file structure

```
src/components/sections/[SectionName]/
├── index.tsx              # Re-export
├── [SectionName].tsx      # Main component (Server)
├── [SectionName].client.tsx   # Interactive parts (Client) — if needed
└── [SectionName].types.ts # Local types — if non-trivial
```

For atomic UI components, use `src/components/ui/[Name].tsx` (single file).

### Step 6 — Write the component

Template:

```tsx
// src/components/sections/Hero/Hero.tsx
import { Suspense } from 'react'
import { HeroVideo } from './HeroVideo.client'
import { HeroContent } from './HeroContent.client'
import { MonogramBP } from '@/components/three/MonogramBP'

export function Hero() {
  return (
    <section
      className="relative h-svh overflow-hidden bg-bg-primary"
      aria-label="Главная — base premier"
    >
      <HeroVideo />
      <Suspense fallback={null}>
        <MonogramBP />
      </Suspense>
      <HeroContent />
    </section>
  )
}
```

```tsx
// src/components/sections/Hero/HeroContent.client.tsx
'use client'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useReducedMotion } from 'motion/react'
import { Button } from '@/components/ui/Button'

export function HeroContent() {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useGSAP(() => {
    if (reduceMotion) return // motion-safe fallback
    const split = new SplitText('.hero-h1', { type: 'chars' })
    gsap.from(split.chars, {
      yPercent: 100,
      stagger: 0.04,
      duration: 0.9,
      ease: 'expo.out',
    })
  }, { scope: ref })

  return (
    <div ref={ref} className="relative z-10 flex h-full flex-col items-center justify-center">
      <h1 className="hero-h1 t-hero text-fg-primary">base premier</h1>
      <p className="t-lead text-fg-secondary">мужской груминг с собственным шармом</p>
      <p className="t-caption text-fg-tertiary">стрижка от 1 800 ₽ · 1 час · ⭐ 5,0</p>
      <Button variant="primary" size="lg">записаться</Button>
    </div>
  )
}
```

### Step 7 — Add motion-safe fallback

Always handle `prefers-reduced-motion`:
- Animations: skip GSAP timeline, render final state
- Marquee: pause animation
- Video: don't autoplay (or only on user gesture)
- 3D: replace with static PNG

### Step 8 — Test on the page

1. Add to relevant `app/.../page.tsx`:
   ```tsx
   import { Hero } from '@/components/sections/Hero'
   
   export default function HomePage() {
     return (
       <>
         <Hero />
         {/* other sections */}
       </>
     )
   }
   ```

2. Run `pnpm dev`, navigate to the page.

3. Verify checklist:
   - [ ] Renders correctly desktop
   - [ ] Renders correctly mobile (DevTools 375px width)
   - [ ] Keyboard nav works (Tab through all interactive)
   - [ ] `prefers-reduced-motion` test (DevTools rendering tab)
   - [ ] No console errors
   - [ ] Lighthouse Perf for the page >= 85 (will be 90+ after polishing)

### Step 9 — Update ROADMAP

Mark the ticket as done in @docs/ROADMAP.md:
```md
- [x] [H-01] feat(hero): video background ✅ 2026-04-26
```

### Step 10 — Commit

Conventional commit:
```bash
git add src/components/sections/Hero
git commit -m "feat(hero): hero section with video, 3D BP, char-reveal H1"
```

## Output template

After finishing a section, summarize:

```
✅ Section [Name] created.

Files:
- src/components/sections/[Name]/[Name].tsx
- src/components/sections/[Name]/[Name].client.tsx (if applicable)

Tokens used:
- Colors: --bg-primary, --fg-primary, --accent
- Typography: t-hero, t-lead, t-caption
- Spacing: --space-section

Atoms reused:
- Button (primary, lg)

Animations:
- Char-by-char reveal on H1 (GSAP + SplitText, motion-safe ✅)
- 3D BP background (R3F, lazy, mobile fallback to PNG ✅)

A11y:
- aria-label on section
- Heading hierarchy correct
- Keyboard reachable

Next ticket: [next code from roadmap]
```

## Common pitfalls

- ❌ Forgetting `'use client'` when using hooks → causes server error
- ❌ Hardcoded hex colors → breaks design system
- ❌ Missing `prefers-reduced-motion` → fails a11y audit
- ❌ Animating non-compositor properties (width, top) → janks scroll
- ❌ Server-side `useReducedMotion` → must be in client component
