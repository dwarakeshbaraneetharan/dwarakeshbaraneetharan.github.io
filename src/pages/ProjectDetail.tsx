import { Link, useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { projects } from '../data/content'
import SplitText from '../components/SplitText'
import Reveal from '../components/Reveal'
import ProjectGlyph from '../components/ProjectGlyph'
import Magnetic from '../components/Magnetic'
import NotFound from './NotFound'

const accentText = {
  citron: 'text-citron',
  violet: 'text-violet',
  coral: 'text-coral',
} as const

export default function ProjectDetail() {
  const { slug } = useParams()
  const reduced = useReducedMotion()
  const i = projects.findIndex((p) => p.slug === slug)

  if (i === -1) return <NotFound />

  const project = projects[i]
  const next = projects[(i + 1) % projects.length]

  return (
    <>
      <header className="gutter pt-36 pb-10">
        <Reveal variant="fade">
          <Link
            to="/work"
            className="rule-link text-mute hover:text-bone label inline-flex items-center gap-2 transition-colors"
          >
            <span aria-hidden="true">←</span> All work
          </Link>
        </Reveal>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Reveal variant="fade" delay={0.1}>
              <div className="flex flex-wrap items-center gap-3">
                <span className={`label ${accentText[project.accent]}`}>
                  {project.index} / {project.kicker}
                </span>
                <span className="bg-bone/15 h-px w-8" />
                <span className="label text-faint">{project.year}</span>
              </div>
            </Reveal>

            <SplitText
              as="h1"
              immediate
              delay={0.2}
              stagger={0.045}
              text={project.title}
              className="display-wide mt-6 text-[clamp(3rem,11vw,9rem)] leading-[0.86] font-semibold"
            />

            <Reveal variant="up" delay={0.35}>
              <p className="text-lede mt-8 max-w-[44ch] leading-snug">
                {project.blurb}
              </p>
            </Reveal>
          </div>

          <motion.div
            className="relative mx-auto w-full max-w-md"
            initial={reduced ? undefined : { opacity: 0, scale: 0.9 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="border-bone/8 bg-ink/55 rounded-[2rem] border p-6 backdrop-blur-xl">
              <ProjectGlyph
                seed={project.seed}
                accent={project.accent}
                className="animate-drift aspect-square w-full"
              />
            </div>
          </motion.div>
        </div>
      </header>

      <section className="gutter">
        <div className="border-bone/8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border md:grid-cols-4">
          {[
            ...project.metrics.map((m) => ({ value: m.value, label: m.label })),
            { value: project.role, label: 'my role' },
          ]
            .slice(0, 4)
            .map((m, k) => (
              <Reveal key={m.label} variant="up" delay={k * 0.06}>
                <div className="bg-ink/60 outline-bone/8 h-full px-5 py-8 outline backdrop-blur-md">
                  <div className="display-wide text-[clamp(1.4rem,3vw,2.3rem)] leading-none font-semibold">
                    {m.value}
                  </div>
                  <div className="label text-faint mt-3">{m.label}</div>
                </div>
              </Reveal>
            ))}
        </div>
      </section>

      <section className="gutter grid gap-16 py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal variant="fade">
            <h2 className="label text-faint">Overview</h2>
          </Reveal>
          <Reveal variant="up" delay={0.08}>
            <div className="mt-8 space-y-3">
              <p className="label text-faint">Stack</p>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li
                    key={s}
                    className="border-bone/10 text-bone/70 rounded-full border px-3 py-1 font-mono text-[0.68rem]"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {project.links.length > 0 && (
            <Reveal variant="up" delay={0.14}>
              <div className="mt-10 space-y-3">
                <p className="label text-faint">Links</p>
                <ul className="space-y-2">
                  {project.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="Open"
                        className="rule-link text-bone/85 hover:text-citron text-[0.98rem] transition-colors"
                      >
                        {l.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>

        <div>
          <Reveal variant="up">
            <p className="text-bone/85 text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.7]">
              {project.overview}
            </p>
          </Reveal>

          <div className="mt-14">
            <Reveal variant="fade">
              <h2 className="label text-faint border-bone/8 border-t pt-6">
                What I did
              </h2>
            </Reveal>
            <ol className="mt-8 space-y-6">
              {project.contributions.map((c, k) => (
                <Reveal key={c} variant="up" delay={k * 0.05}>
                  <li className="border-bone/6 flex gap-5 border-b pb-6">
                    <span className={`label shrink-0 pt-1.5 ${accentText[project.accent]}`}>
                      {String(k + 1).padStart(2, '0')}
                    </span>
                    <span className="text-mute leading-relaxed">{c}</span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="gutter pb-10">
        <Reveal variant="mask">
          <Link
            to={`/work/${next.slug}`}
            data-cursor="Next"
            className="group border-bone/8 bg-ink/55 hover:border-bone/20 block rounded-[2rem] border p-8 backdrop-blur-xl transition-colors duration-500 sm:p-12"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="label text-faint">Next project</span>
                <h3 className="display-wide mt-4 text-[clamp(2rem,6vw,4.2rem)] font-semibold">
                  {next.title}
                </h3>
                <p className="text-mute mt-2">{next.kicker}</p>
              </div>
              <Magnetic strength={16}>
                <span className="border-bone/15 group-hover:border-citron group-hover:text-citron grid size-16 shrink-0 place-items-center rounded-full border text-xl transition-colors duration-500">
                  →
                </span>
              </Magnetic>
            </div>
          </Link>
        </Reveal>
      </section>
    </>
  )
}
