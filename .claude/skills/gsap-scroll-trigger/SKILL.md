---
name: gsap-scroll-trigger
description: Use when implementing scroll-driven animations in BASE Premier. Provides battle-tested patterns for ScrollTrigger that work correctly with Lenis smooth scroll, respect prefers-reduced-motion, and don't break on dynamic content.
---

# Skill: GSAP ScrollTrigger Patterns

Reusable patterns for scroll-driven animations in BASE Premier.

## When to use

- Section reveals on scroll
- Pinned sections with horizontal scroll
- Counters that increment on enter
- Parallax backgrounds
- Char-by-char text reveals tied to scroll
- Progress bars / scroll indicators

## Setup (one-time, already in project)

```ts
// src/lib/gsap.ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

gsap.defaults({
  ease: 'expo.out',
  duration: 0.6,
})

export { gsap, ScrollTrigger, SplitText }
```

## Pattern 1 — Section enter (most common)

```tsx
'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from 'motion/react'

export function Section() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  useGSAP(() => {
    if (reduce) return

    gsap.from('.reveal-item', {
      y: 60,
      opacity: 0,
      stagger: 0.08,
      duration: 0.8,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',  // animation starts when section top hits 80% of viewport
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: ref })

  return (
    <section ref={ref}>
      <h2 className="reveal-item">Заголовок</h2>
      <p className="reveal-item">Подзаголовок</p>
    </section>
  )
}
```

## Pattern 2 — Char-by-char H1 reveal

```tsx
useGSAP(() => {
  if (reduce) return

  const split = new SplitText('.headline', { type: 'chars,words' })

  gsap.from(split.chars, {
    yPercent: 100,
    opacity: 0,
    stagger: 0.04,
    duration: 0.9,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.headline',
      start: 'top 75%',
    },
  })

  return () => split.revert() // cleanup
}, { scope: ref })
```

## Pattern 3 — Pinned horizontal scroll (Aesop-style)

```tsx
useGSAP(() => {
  const track = trackRef.current
  if (!track || reduce) return

  const scrollWidth = track.scrollWidth
  const viewWidth = window.innerWidth

  gsap.to(track, {
    x: -(scrollWidth - viewWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: pinRef.current,
      start: 'top top',
      end: () => `+=${scrollWidth - viewWidth}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    },
  })

  // Refresh on resize
  ScrollTrigger.refresh()
}, { scope: pinRef })
```

JSX:
```tsx
<div ref={pinRef} className="overflow-hidden">
  <div ref={trackRef} className="flex gap-8 will-change-transform">
    {items.map(item => <Card key={item.id} {...item} />)}
  </div>
</div>
```

## Pattern 4 — Parallax background

```tsx
useGSAP(() => {
  if (reduce) return

  gsap.to('.bg-image', {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: ref.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  })
}, { scope: ref })
```

## Pattern 5 — Counter animation

```tsx
useGSAP(() => {
  const targetValue = 300 // 300 reviews

  if (reduce) {
    counterRef.current!.textContent = targetValue.toString()
    return
  }

  gsap.to({ value: 0 }, {
    value: targetValue,
    duration: 1.5,
    ease: 'power2.out',
    onUpdate() {
      counterRef.current!.textContent = Math.round(this.targets()[0].value).toString()
    },
    scrollTrigger: {
      trigger: counterRef.current,
      start: 'top 80%',
      toggleActions: 'play none none none', // play once
    },
  })
}, { scope: ref })
```

## Pattern 6 — Multi-stage timeline

```tsx
useGSAP(() => {
  if (reduce) return

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ref.current,
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
    },
  })

  tl.from('.layer-1', { opacity: 0, y: 100 })
    .from('.layer-2', { opacity: 0, x: -100 }, '<0.2')
    .to('.layer-1', { scale: 1.2 }, '<')
}, { scope: ref })
```

## Pattern 7 — Progress indicator (top of page)

```tsx
'use client'
import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrolled / max)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 z-[100] h-0.5 bg-accent-glow origin-left"
      style={{ transform: `scaleX(${progress})` }}
    />
  )
}
```

## Lenis × ScrollTrigger sync (already in project)

This is set up once in `<SmoothScroll>` provider:

```tsx
<ReactLenis
  root
  options={{ lerp: 0.1, duration: 1.2, smoothTouch: false }}
  onSyncCallback={(lenis) => {
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
  }}
>
  {children}
</ReactLenis>
```

You don't need to repeat this in section components — just use ScrollTrigger normally.

## Common pitfalls

### ❌ Animating in `useEffect` instead of `useGSAP`
```tsx
// BAD
useEffect(() => {
  gsap.to(...)
  return () => ScrollTrigger.killAll()
}, [])
```
- No scope isolation
- ScrollTrigger.killAll() also kills other components
- Won't auto-refresh on dependency change

### ✅ Use `useGSAP` with scope
```tsx
useGSAP(() => {
  gsap.to(...)
}, { scope: ref })
```
- Auto-cleanup on unmount
- Selectors scoped to ref
- Re-runs on dependency change

### ❌ Forgetting motion-safe
```tsx
useGSAP(() => {
  // animates regardless of user preference — fails a11y audit
  gsap.from(...)
})
```

### ✅ Always check
```tsx
const reduce = useReducedMotion()

useGSAP(() => {
  if (reduce) return // or render final state
  gsap.from(...)
}, { scope: ref, dependencies: [reduce] })
```

### ❌ Pinning without proper start/end
```tsx
scrollTrigger: { pin: true } // breaks layout
```

### ✅ Always set boundaries
```tsx
scrollTrigger: {
  pin: true,
  start: 'top top',
  end: '+=2000', // explicit end
  pinSpacing: true,
}
```

### ❌ Animating layout properties
```tsx
gsap.to('.box', { width: 200 }) // janky
```

### ✅ Animate transforms only
```tsx
gsap.to('.box', { scaleX: 2 }) // GPU-accelerated
```

## Refresh on dynamic content

If content loads after initial render (Sanity data, lazy components):

```tsx
useEffect(() => {
  ScrollTrigger.refresh()
}, [data])
```

Or use `markers: process.env.NODE_ENV === 'development'` to debug visually.

## Cleanup verification

`useGSAP` with `scope` handles cleanup automatically. To verify:
1. Navigate away from section
2. Open DevTools → check `ScrollTrigger.getAll().length` — should not grow indefinitely
3. If growing → check that scope is set correctly

## Performance limit

- Maximum **5 ScrollTriggers per section**
- Maximum **20 ScrollTriggers per page**
- Use `scrub: 1` (smoothing 1s) instead of `scrub: true` for buttery scroll
- Avoid `markers: true` in production (visible debug markers)
