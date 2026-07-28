import { useEffect } from 'react'
import Lenis from 'lenis'

let instance: Lenis | null = null

/** Jump to the top without the smoothing easing all the way down the page. */
export function resetScroll() {
  instance?.scrollTo(0, { immediate: true, force: true })
  window.scrollTo(0, 0)
}

export function scrollToSelector(selector: string) {
  const el = document.querySelector(selector)
  if (!el) return
  if (instance) instance.scrollTo(el as HTMLElement, { offset: -80 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    })
    instance = lenis

    let raf = 0
    const frame = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      instance = null
    }
  }, [])
}
