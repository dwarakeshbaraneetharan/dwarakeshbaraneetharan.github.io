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
 * Infinite ticker whose speed and direction smoothly track scroll velocity
 * without juddering or discrete direction flips.
 */
export default function Marquee({
  items,
  baseVelocity = -1.2,
  className,
}: Props) {
  const reduced = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)

  // Smooth out raw scroll velocity with spring physics
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300,
  })

  // Map scroll speed to a continuous velocity delta
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4.5], {
    clamp: false,
  })

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)

  useAnimationFrame((_, delta) => {
    if (reduced) return

    const dt = delta / 1000
    const vFactor = velocityFactor.get()

    // Smooth continuous velocity coupling:
    // At rest: baseVelocity (-1.2%/s)
    // Scrolling down (vFactor > 0): accelerates smoothly to the left
    // Scrolling up (vFactor < 0): decelerates and smoothly reverses to the right
    const moveBy = (baseVelocity - vFactor * 1.4) * dt

    baseX.set(baseX.get() + moveBy)
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
