import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { profile, projects } from '../data/content'
import SplitText from '../components/SplitText'
import Reveal from '../components/Reveal'
import ProjectGlyph from '../components/ProjectGlyph'
import Magnetic from '../components/Magnetic'

const accentText = {
  citron: 'text-citron',
  violet: 'text-violet',
  coral: 'text-coral',
} as const

/**
 * A dense index of every project. Hovering a row floats that project's
 * harmonograph next to the cursor and dims everything else.
 */
function Index() {
  const [hovered, setHovered] = useState<number | null>(null)
  const wrap = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 26, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 200, damping: 26, mass: 0.6 })

  const onMove = (e: React.PointerEvent) => {
    const r = wrap.current?.getBoundingClientRect()
    if (!r) return
    x.set(e.clientX - r.left)
    y.set(e.clientY - r.top)
  }

  const active = hovered !== null ? projects[hovered] : null

  return (
    <div
      ref={wrap}
      className="relative"
      onPointerMove={onMove}
      onPointerLeave={() => setHovered(null)}
    >
      <ul className="border-bone/8 border-t">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Reveal variant="fade" delay={i * 0.04}>
              <Link
                to={`/work/${p.slug}`}
                data-cursor="Open"
                onPointerEnter={() => setHovered(i)}
                className="group border-bone/8 relative block border-b py-7 sm:py-9"
              >
                <motion.div
                  animate={{
                    x: hovered === i ? 16 : 0,
                    opacity: hovered === null || hovered === i ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 sm:gap-x-8"
                >
                  <span
                    className={`label transition-colors duration-500 ${
                      hovered === i ? accentText[p.accent] : 'text-faint'
                    }`}
                  >
                    {p.index}
                  </span>

                  <div className="min-w-0">
                    <h3 className="display-narrow text-[clamp(1.6rem,4.6vw,3.2rem)] leading-[1.05] font-medium">
                      {p.title}
                    </h3>
                    <p className="text-mute group-hover:text-bone/70 mt-2 max-w-[62ch] text-[0.92rem] leading-relaxed transition-colors duration-500 lg:pr-16">
                      {p.blurb}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <li
                          key={s}
                          className="border-bone/10 text-faint rounded-full border px-2.5 py-0.5 font-mono text-[0.62rem] tracking-wide"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex shrink-0 items-baseline gap-6 pl-4">
                    <span className="text-mute hidden text-[0.92rem] md:block">
                      {p.kicker}
                    </span>
                    <span className="label text-faint hidden sm:block">{p.year}</span>
                    <span
                      aria-hidden="true"
                      className="text-faint group-hover:text-citron transition-all duration-500 group-hover:translate-x-1 lg:hidden"
                    >
                      →
                    </span>
                  </div>
                </motion.div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active && (
          <motion.div
            key={active.slug}
            className="pointer-events-none absolute top-0 left-0 z-20 hidden lg:block"
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="border-bone/10 bg-ink/80 -translate-x-1/2 -translate-y-1/2 rounded-3xl border p-3 backdrop-blur-2xl">
              <ProjectGlyph
                seed={active.seed}
                accent={active.accent}
                className="size-56"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Work() {
  return (
    <>
      <header className="gutter pt-40 pb-16">
        <Reveal variant="fade">
          <div className="flex items-center gap-3">
            <span className="label text-citron">Work</span>
            <span className="bg-bone/15 h-px w-10" />
            <span className="label text-faint">Six selected projects</span>
          </div>
        </Reveal>
        <SplitText
          as="h1"
          by="word"
          immediate
          delay={0.2}
          stagger={0.06}
          text="Systems, solvers and things that render."
          className="display-wide mt-8 max-w-[15ch] text-[clamp(2.6rem,9vw,7.5rem)] font-semibold"
        />
        <Reveal variant="up" delay={0.4}>
          <p className="text-mute mt-10 max-w-[52ch] text-[1.05rem] leading-relaxed">
            Everything below is placeholder content while the real write-ups get
            finished. The shape is right, though: a problem worth the effort, a
            decision I had to defend, and a number that says whether it worked.
          </p>
        </Reveal>
      </header>

      <section className="gutter pb-24">
        <Index />
      </section>

      <section className="gutter pb-24">
        <Reveal variant="mask">
          <div className="border-bone/10 bg-ink/55 relative overflow-hidden rounded-[2rem] border px-7 py-14 backdrop-blur-xl sm:px-12">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(60% 120% at 85% 0%, rgba(138,107,255,0.18), transparent 65%)',
              }}
            />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="label text-faint">Not on this list</span>
                <h2 className="display-wide mt-5 max-w-[16ch] text-[clamp(1.8rem,4.5vw,3.2rem)] font-semibold">
                  There is always something half-finished.
                </h2>
                <p className="text-mute mt-5 max-w-[46ch] leading-relaxed">
                  Smaller experiments live on GitHub — solvers, shaders and
                  whatever a problem set turned into that week.
                </p>
              </div>
              <Magnetic strength={14}>
                <a
                  href={profile.socials[0].href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Open"
                  className="border-bone/18 hover:border-citron hover:text-citron inline-flex shrink-0 items-center gap-2 rounded-full border px-7 py-3.5 text-[0.94rem] transition-colors duration-500"
                >
                  GitHub <span aria-hidden="true">↗</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
