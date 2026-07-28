import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react'
import type { Project } from '../data/content'
import ProjectGlyph from './ProjectGlyph'

const accentText = {
  citron: 'text-citron',
  violet: 'text-violet',
  coral: 'text-coral',
} as const

export default function ProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduced = useReducedMotion()

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rx = useSpring(useTransform(py, [-1, 1], [7, -7]), {
    stiffness: 220,
    damping: 22,
  })
  const ry = useSpring(useTransform(px, [-1, 1], [-9, 9]), {
    stiffness: 220,
    damping: 22,
  })
  const gx = useTransform(px, [-1, 1], [32, 68])
  const gy = useTransform(py, [-1, 1], [32, 68])
  const sheen = useTransform(
    [gx, gy],
    ([x, y]: number[]) =>
      `radial-gradient(46% 60% at ${x}% ${y}%, rgba(215,255,62,0.10), transparent 70%)`,
  )

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduced) return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    px.set((e.clientX - (r.left + r.width / 2)) / (r.width / 2))
    py.set((e.clientY - (r.top + r.height / 2)) / (r.height / 2))
  }

  const reset = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, y: 60 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
    >
      <Link
        ref={ref}
        to={`/work/${project.slug}`}
        data-cursor="View"
        onPointerMove={onMove}
        onPointerLeave={reset}
        className="group relative block"
      >
        <motion.div
          style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
          className="border-bone/8 bg-ink/62 hover:border-bone/18 relative overflow-hidden rounded-[1.75rem] border backdrop-blur-xl transition-colors duration-500"
        >
          {/* Pointer-tracked sheen */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: sheen }}
          />

          <div className="relative grid gap-6 p-7 sm:p-9 md:grid-cols-[1fr_auto] md:items-end">
            <div style={{ transform: 'translateZ(40px)' }}>
              <div className="flex items-center gap-3">
                <span className="label text-faint">{project.index}</span>
                <span className="bg-bone/12 h-px w-8" />
                <span className={`label ${accentText[project.accent]}`}>
                  {project.kicker}
                </span>
              </div>

              <h3 className="display-wide mt-5 text-[clamp(2.1rem,5.2vw,3.6rem)] font-semibold">
                {project.title}
              </h3>

              <p className="text-mute mt-4 max-w-[46ch] text-[0.98rem] leading-relaxed">
                {project.blurb}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="border-bone/10 text-mute rounded-full border px-3 py-1 font-mono text-[0.66rem] tracking-wide"
                  >
                    {s}
                  </span>
                ))}
                <span className="label text-faint ml-auto hidden sm:block">
                  {project.year}
                </span>
              </div>
            </div>

            <div
              className="relative -mx-2 md:mx-0 md:size-52 lg:size-60"
              style={{ transform: 'translateZ(70px)' }}
            >
              <ProjectGlyph
                seed={project.seed}
                accent={project.accent}
                className="size-full transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[18deg] group-hover:scale-105"
              />
            </div>
          </div>

          {/* Wipe rule along the bottom edge */}
          <span className="bg-citron absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
        </motion.div>
      </Link>
    </motion.div>
  )
}
