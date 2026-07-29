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

function InfiniteTabsCounter() {
  const [val, setVal] = useState('0')
  const [overflowList, setOverflowList] = useState<string[]>([])
  const [resolved, setResolved] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setVal('∞')
      setResolved(true)
      return
    }

    let count = 0
    const list: string[] = []

    const interval = setInterval(() => {
      count++
      if (count <= 14) {
        const fakeNum = Math.floor(Math.pow(1.85, count) * (15 + Math.random() * 80))
        const str = fakeNum > 99999 ? '999,999+' : fakeNum.toLocaleString()
        setVal(str)
        list.push(str)
        setOverflowList([...list.slice(-5)])
      } else {
        clearInterval(interval)
        setVal('∞')
        setResolved(true)
      }
    }, 70)

    return () => clearInterval(interval)
  }, [inView, reduced])

  return (
    <div ref={ref} className="relative flex items-center justify-center overflow-visible">
      {/* Overflowing floating digits bursting outside */}
      {!resolved && (
        <div className="pointer-events-none absolute -inset-10 flex items-center justify-center overflow-visible">
          {overflowList.map((item, idx) => (
            <motion.span
              key={`${item}-${idx}`}
              initial={{ opacity: 0.8, y: 0, scale: 0.8, x: 0 }}
              animate={{
                opacity: 0,
                y: (idx % 2 === 0 ? -1 : 1) * (20 + idx * 12),
                x: (idx % 3 === 0 ? -1 : 1) * (15 + idx * 10),
                scale: 1.3,
              }}
              transition={{ duration: 0.55 }}
              className="font-mono text-citron/60 absolute text-xs font-semibold whitespace-nowrap"
            >
              {item}
            </motion.span>
          ))}
        </div>
      )}

      {/* Main Infinity / Slot Machine Display */}
      <motion.span
        className="inline-block"
        animate={
          resolved
            ? {
                scale: [1, 1.18, 1],
                rotate: [0, 6, -6, 0],
              }
            : { scale: [1, 1.06, 1] }
        }
        transition={
          resolved
            ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.1, repeat: Infinity }
        }
      >
        {val}
      </motion.span>

      {/* Quirky "+1 tab" particle popping up periodically */}
      {resolved && (
        <motion.span
          initial={{ opacity: 0, scale: 0, y: 4 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [-2, -22, -32],
            scale: [0.6, 1.1, 0.9],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.4 }}
          className="bg-citron/20 border-citron/60 text-citron pointer-events-none absolute -top-5 -right-3 rounded-full border px-2 py-0.5 font-mono text-[0.6rem] font-bold shadow-[0_0_12px_rgba(215,255,62,0.4)]"
        >
          +1 tab
        </motion.span>
      )}
    </div>
  )
}

export default function FactsGrid() {
  return (
    <div className="mt-16 flex justify-center">
      <div className="grid w-full max-w-3xl grid-cols-2 gap-3.5 md:grid-cols-4">
        {facts.map((f, i) => {
          const isInfinite = 'isInfinite' in f && f.isInfinite
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
                {isInfinite ? (
                  <InfiniteTabsCounter />
                ) : (
                  <Counter target={numValue} isDecimal={isDecimal} />
                )}
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
