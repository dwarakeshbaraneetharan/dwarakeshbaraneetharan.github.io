import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type Props = {
  children: ReactNode
  /** `mask` wipes the block up from behind a clip; `up` just floats it in. */
  variant?: 'up' | 'mask' | 'fade' | 'scale'
  delay?: number
  className?: string
  once?: boolean
}

export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  className,
  once = true,
}: Props) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  const states = {
    up: {
      hidden: { y: 44, opacity: 0 },
      shown: { y: 0, opacity: 1 },
    },
    mask: {
      hidden: { clipPath: 'inset(100% 0% 0% 0%)', y: 24, opacity: 1 },
      shown: { clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1 },
    },
    fade: {
      hidden: { opacity: 0 },
      shown: { opacity: 1 },
    },
    scale: {
      hidden: { scale: 0.94, opacity: 0 },
      shown: { scale: 1, opacity: 1 },
    },
  }[variant]

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, margin: '-12% 0px -12% 0px' }}
      variants={states}
      transition={{
        duration: 0.95,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
