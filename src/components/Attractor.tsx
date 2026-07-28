import { useEffect, useRef } from 'react'

/**
 * A Clifford attractor, iterated live:
 *
 *   x' = sin(a·y) + c·cos(a·x)
 *   y' = sin(b·x) + d·cos(b·y)
 *
 * Two orbits run at once with slightly different parameters — one citron, one
 * violet — and their parameters drift, so the figure never quite repeats.
 * Hovering nudges a and b, which reshapes the whole attractor.
 */
export default function Attractor({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let raf = 0
    let running = false
    let warmup = 0
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }

    // Both orbits stay inside the chaotic parameter window; they differ only in
    // where they are along the drift, so the two figures never coincide.
    const orbits = [
      { x: 0.1, y: 0.1, color: 'rgba(215,255,62,0.15)', phase: 0, rate: 1 },
      { x: -0.1, y: 0.2, color: 'rgba(138,107,255,0.12)', phase: 3.4, rate: 1.43 },
    ]

    const clear = () => {
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = '#0a0910'
      ctx.fillRect(0, 0, w, h)
      warmup = 0
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      w = Math.max(1, Math.floor(rect.width * dpr))
      h = Math.max(1, Math.floor(rect.height * dpr))
      canvas.width = w
      canvas.height = h
      clear()
    }

    const step = (time: number) => {
      const t = time / 1000
      warmup++

      pointer.x += (pointer.tx - pointer.x) * 0.05
      pointer.y += (pointer.ty - pointer.y) * 0.05

      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = 'rgba(10,9,16,0.045)'
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'

      const cx = w / 2
      const cy = h / 2

      for (const orbit of orbits) {
        const p = t * 0.07 * orbit.rate + orbit.phase
        const a = -1.7 + 0.42 * Math.sin(p) + pointer.x * 0.34
        const b = 1.8 + 0.36 * Math.cos(p * 0.83) + pointer.y * 0.3
        const c = -1.9 + 0.3 * Math.sin(p * 0.61)
        const d = -0.4 + 0.5 * Math.cos(p * 0.47)

        // The orbit is bounded by |x| <= 1 + |c| and |y| <= 1 + |d|, so scale
        // each axis independently or the figure sits in a letterboxed strip.
        const sx = (w * 0.47) / (1 + Math.abs(c))
        const sy = (h * 0.47) / (1 + Math.abs(d))

        ctx.fillStyle = orbit.color
        let { x, y } = orbit

        // The first frames are still spiralling in from the seed point, so burn
        // them off rather than streaking a transient across the figure.
        const skip = warmup < 4 ? 900 : 0

        for (let i = 0; i < 5200 + skip; i++) {
          const nx = Math.sin(a * y) + c * Math.cos(a * x)
          const ny = Math.sin(b * x) + d * Math.cos(b * y)
          x = nx
          y = ny
          if (i >= skip) ctx.fillRect(cx + x * sx, cy + y * sy, 1, 1)
        }

        orbit.x = x
        orbit.y = y
      }

      if (running && !still) raf = requestAnimationFrame(step)
    }

    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      pointer.tx = ((e.clientX - r.left) / r.width) * 2 - 1
      pointer.ty = ((e.clientY - r.top) / r.height) * 2 - 1
    }

    const onLeave = () => {
      pointer.tx = 0
      pointer.ty = 0
    }

    // Only burn cycles while the figure is on screen, and start from a blank
    // canvas each time so a frozen frame never lingers.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true
          clear()
          if (still) for (let k = 0; k < 90; k++) step(k * 16)
          else raf = requestAnimationFrame(step)
        } else if (!entry.isIntersecting && running) {
          running = false
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0.05 },
    )

    resize()
    io.observe(canvas)
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', onPointer)
    canvas.addEventListener('pointerleave', onLeave)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', onPointer)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className={className}
      role="img"
      aria-label="An animated Clifford strange attractor rendered as a point cloud"
    />
  )
}
