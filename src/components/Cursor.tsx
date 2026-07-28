import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

type Mode = { active: boolean; label: string }

/**
 * Two-part pointer: an exact citron dot plus a ring that lags behind it and
 * swells over anything interactive. Elements can set `data-cursor="Open"` to
 * print a word inside the ring.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState<Mode>({ active: false, label: '' })
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 380, damping: 34, mass: 0.55 })
  const ringY = useSpring(y, { stiffness: 380, damping: 34, mass: 0.55 })
  const dotX = useSpring(x, { stiffness: 1300, damping: 60, mass: 0.3 })
  const dotY = useSpring(y, { stiffness: 1300, damping: 60, mass: 0.3 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const coarseOrReduced =
      !fine.matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (coarseOrReduced) return

    setEnabled(true)
    document.body.classList.add('has-custom-cursor')

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)

      const el = (e.target as Element | null)?.closest?.(
        'a, button, [data-cursor], input, textarea, summary',
      )
      if (el) {
        setMode({
          active: true,
          label: el.getAttribute('data-cursor') ?? '',
        })
      } else {
        setMode((m) => (m.active ? { active: false, label: '' } : m))
      }
    }

    const leave = () => setVisible(false)

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)

    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      <motion.div
        className="absolute top-0 left-0 grid place-items-center rounded-full border"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: mode.active ? (mode.label ? 84 : 56) : 34,
          height: mode.active ? (mode.label ? 84 : 56) : 34,
          borderColor: mode.active
            ? 'rgba(215,255,62,0.85)'
            : 'rgba(245,242,236,0.28)',
          backgroundColor: mode.active
            ? 'rgba(215,255,62,0.10)'
            : 'rgba(215,255,62,0)',
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
      >
        <motion.span
          className="label text-citron"
          animate={{ opacity: mode.label ? 1 : 0, scale: mode.label ? 1 : 0.7 }}
          transition={{ duration: 0.18 }}
        >
          {mode.label}
        </motion.span>
      </motion.div>

      <motion.div
        className="bg-citron absolute top-0 left-0 rounded-full"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: mode.active ? 0 : 6,
          height: mode.active ? 0 : 6,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  )
}
