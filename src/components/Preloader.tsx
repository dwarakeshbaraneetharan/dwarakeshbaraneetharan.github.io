import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { profile } from '../data/content'

const KEY = 'db-intro-played'

/**
 * First-visit curtain: a count to 100 behind the name, then the panel splits
 * open. Plays once per browser session so navigating back isn't tedious.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion()
  const [show, setShow] = useState(true)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!show) {
      onDone()
      return
    }
    if (reduced) {
      sessionStorage.setItem(KEY, '1')
      setShow(false)
      onDone()
      return
    }

    const total = 1500
    const started = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const p = Math.min(1, (now - started) / total)
      // Ease so the counter sprints then settles.
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else {
        sessionStorage.setItem(KEY, '1')
        setTimeout(() => {
          setShow(false)
          onDone()
        }, 260)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [show, reduced, onDone])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="bg-void fixed inset-0 z-[120] flex flex-col justify-between"
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.95, ease: [0.83, 0, 0.17, 1] }}
        >
          <div className="gutter flex flex-1 flex-col justify-center">
            <motion.div
              className="overflow-hidden"
              exit={{ y: -60, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
            >
              <motion.h1
                className="display-narrow text-[clamp(2rem,7vw,5.5rem)] font-medium"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {profile.name}
              </motion.h1>
            </motion.div>

            <motion.p
              className="label text-faint mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Computer Science &nbsp;·&nbsp; Mathematics
            </motion.p>
          </div>

          <div className="gutter flex items-end justify-between pb-8">
            <span className="label text-faint">Loading</span>
            <span className="display-wide text-citron text-[clamp(3rem,12vw,9rem)] leading-none font-medium tabular-nums">
              {String(count).padStart(3, '0')}
            </span>
          </div>

          <motion.div
            className="bg-citron h-px origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: count / 100 }}
            transition={{ ease: 'linear', duration: 0.1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
