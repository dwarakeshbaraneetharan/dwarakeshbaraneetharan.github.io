import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'motion/react'

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  accent: boolean
}) {
  const opacity = useTransform(progress, range, [0.2, 1])
  const blur = useTransform(progress, range, ['blur(2.5px)', 'blur(0px)'])
  return (
    <motion.span
      style={{ opacity, filter: blur }}
      className={`mr-[0.26em] inline-block ${accent ? 'text-citron' : ''}`}
    >
      {children}
    </motion.span>
  )
}

type Props = {
  text: string
  /** Words wrapped in *asterisks* are lit in citron. */
  className?: string
}

/**
 * A paragraph that resolves word by word as it passes through the viewport.
 */
export default function ScrollLede({ text, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'end 0.75'],
  })

  const words = text.split(' ')

  if (reduced) {
    return (
      <p ref={ref} className={className}>
        {words.map((w) => w.replaceAll('*', '')).join(' ')}
      </p>
    )
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const accent = word.startsWith('*')
        return (
          <Word
            key={`${word}-${i}`}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1.6) / words.length]}
            accent={accent}
          >
            {word.replaceAll('*', '')}
          </Word>
        )
      })}
    </p>
  )
}
