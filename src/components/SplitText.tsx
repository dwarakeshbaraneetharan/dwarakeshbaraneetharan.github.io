import { motion, useReducedMotion } from 'motion/react'

type Props = {
  text: string
  className?: string
  /** Per-unit stagger, in seconds. */
  stagger?: number
  delay?: number
  /** Characters read as individual letters; words keep ligatures intact. */
  by?: 'char' | 'word'
  /** Play immediately (hero) instead of waiting for the viewport. */
  immediate?: boolean
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
}

/**
 * Slides each glyph up from behind a clipping mask. The visible spans are
 * hidden from assistive tech; the wrapper carries the real string.
 */
export default function SplitText({
  text,
  className,
  stagger = 0.028,
  delay = 0,
  by = 'char',
  immediate = false,
  as = 'span',
}: Props) {
  const reduced = useReducedMotion()
  const Tag = motion[as]

  if (reduced) return <Tag className={className}>{text}</Tag>

  const words = text.split(' ')
  let unit = 0

  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      {...(immediate
        ? { animate: 'shown' }
        : { whileInView: 'shown', viewport: { once: true, margin: '-10%' } })}
    >
      {words.map((word, wi) => (
        <span
          key={`${word}-${wi}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.12em', marginBottom: '-0.12em' }}
        >
          {(by === 'char' ? [...word] : [word]).map((piece, ci) => {
            const i = unit++
            return (
              <motion.span
                key={`${piece}-${ci}`}
                className="inline-block"
                variants={{
                  hidden: { y: '110%', rotate: 4 },
                  shown: { y: '0%', rotate: 0 },
                }}
                transition={{
                  duration: 1,
                  delay: delay + i * stagger,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {piece}
              </motion.span>
            )
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}
