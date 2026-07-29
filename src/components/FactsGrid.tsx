import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { facts } from '../data/content'

function Counter({ target, isDecimal }: { target: number; isDecimal: boolean }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setVal(target)
      return
    }

    let start: number | null = null
    const duration = 1200 // ms

    function step(timestamp: number) {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(eased * target)

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setVal(target)
      }
    }

    requestAnimationFrame(step)
  }, [inView, target, reduced])

  return (
    <span ref={ref}>
      {isDecimal ? val.toFixed(2) : Math.round(val)}
    </span>
  )
}

export default function FactsGrid() {
  return (
    <div className="mt-16 flex justify-center">
      <div className="grid w-full max-w-3xl grid-cols-2 gap-3.5 md:grid-cols-4">
        {facts.map((f, i) => {
          const numValue = parseFloat(f.value)
          const isDecimal = f.value.includes('.')

          return (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="border-bone/10 bg-ink/65 hover:border-citron/45 hover:bg-ink/90 relative overflow-hidden rounded-2xl border px-5 py-7 text-center backdrop-blur-md transition-colors duration-300 shadow-xl group"
            >
              <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-citron/5 blur-xl group-hover:bg-citron/18 transition-all duration-500" />
              <div className="display-wide text-citron group-hover:text-citron-deep text-[clamp(1.9rem,3.8vw,2.8rem)] leading-none font-semibold transition-colors duration-300">
                <Counter target={numValue} isDecimal={isDecimal} />
              </div>
              <div className="label text-faint group-hover:text-bone/85 mt-3.5 transition-colors duration-300">
                {f.label}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
