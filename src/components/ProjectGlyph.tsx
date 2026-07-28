import { useMemo } from 'react'
import { motion, useReducedMotion } from 'motion/react'

/** Deterministic PRNG so a given seed always draws the same figure. */
function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const ACCENTS = {
  citron: 'var(--color-citron)',
  violet: 'var(--color-violet)',
  coral: 'var(--color-coral)',
} as const

type Props = {
  seed: number
  accent: keyof typeof ACCENTS
  className?: string
}

/**
 * A harmonograph: two damped oscillators per axis. Every project gets its own
 * curve from its seed, so the artwork is unique but never a stored asset.
 */
export default function ProjectGlyph({ seed, accent, className }: Props) {
  const reduced = useReducedMotion()

  const paths = useMemo(() => {
    const rand = mulberry32(seed)
    const freq = () => Math.round(1 + rand() * 5) + (rand() < 0.4 ? 0.01 : 0)
    const layers: string[] = []

    for (let layer = 0; layer < 3; layer++) {
      const f = [freq(), freq(), freq(), freq()]
      const ph = [rand() * 6.28, rand() * 6.28, rand() * 6.28, rand() * 6.28]
      const dmp = [0.002, 0.0022, 0.0019, 0.0024].map((d) => d * (1 + rand()))
      const amp = 46 - layer * 9

      let d = ''
      const steps = 900
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * 150
        const x =
          100 +
          amp * Math.sin(f[0] * t + ph[0]) * Math.exp(-dmp[0] * t) +
          amp * 0.55 * Math.sin(f[1] * t + ph[1]) * Math.exp(-dmp[1] * t)
        const y =
          100 +
          amp * Math.sin(f[2] * t + ph[2]) * Math.exp(-dmp[2] * t) +
          amp * 0.55 * Math.sin(f[3] * t + ph[3]) * Math.exp(-dmp[3] * t)
        d += `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`
      }
      layers.push(d)
    }
    return layers
  }, [seed])

  const stroke = ACCENTS[accent]

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id={`glow-${seed}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.16" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="92" fill={`url(#glow-${seed})`} />
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={i === 0 ? stroke : 'var(--color-bone)'}
          strokeWidth={i === 0 ? 0.5 : 0.3}
          strokeOpacity={i === 0 ? 0.85 : 0.22 - i * 0.05}
          strokeLinecap="round"
          initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
          whileInView={reduced ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{
            duration: 2.6,
            delay: i * 0.22,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
    </svg>
  )
}
