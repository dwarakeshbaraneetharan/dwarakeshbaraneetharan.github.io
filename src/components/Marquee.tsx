import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { useRef } from 'react'

const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

type Props = {
  items: string[]
  baseVelocity?: number
  className?: string
}

/**
 * Infinite ticker whose speed and direction are pushed around by how fast
 * (and which way) you're scrolling.
 */
export default function Marquee({
  items,
  baseVelocity = -2.2,
  className,
}: Props) {
  const reduced = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smooth = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const factor = useTransform(smooth, [-1200, 0, 1200], [4, 1, -4], {
    clamp: false,
  })
  const direction = useRef(1)

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)

  useAnimationFrame((_, delta) => {
    if (reduced) return
    let move = direction.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    move += move * Math.abs(f)
    baseX.set(baseX.get() + move)
  })

  const row = [...items, ...items, ...items, ...items]

  return (
    <div className={`edge-fade w-full overflow-hidden ${className ?? ''}`}>
      <motion.div className="flex w-max flex-nowrap" style={{ x }}>
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="display-narrow flex items-center gap-[clamp(1.4rem,3vw,3rem)] pr-[clamp(1.4rem,3vw,3rem)] text-[clamp(1.5rem,4vw,3.4rem)] font-medium tracking-[-0.02em] whitespace-nowrap"
          >
            <span className={i % 3 === 1 ? 'text-citron' : 'text-bone/55'}>
              {item}
            </span>
            <span className="text-violet/60 text-[0.42em]">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
