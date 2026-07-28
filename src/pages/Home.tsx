import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { capabilities, facts, marqueeTerms, profile, projects } from '../data/content'
import SplitText from '../components/SplitText'
import Reveal from '../components/Reveal'
import Marquee from '../components/Marquee'
import ScrollLede from '../components/ScrollLede'
import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import Magnetic from '../components/Magnetic'

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '26%'])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      ref={ref}
      className="gutter relative flex min-h-[100svh] flex-col justify-between pt-32 pb-10"
    >
      <motion.div
        style={reduced ? undefined : { y, opacity }}
        className="flex flex-1 flex-col justify-center"
      >
        <Reveal variant="fade" delay={0.15}>
          <div className="border-bone/12 bg-ink/40 inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex size-1.5">
              <span className="bg-citron absolute inline-flex size-full animate-ping rounded-full opacity-60" />
              <span className="bg-citron relative inline-flex size-1.5 rounded-full" />
            </span>
            <span className="label text-bone/75 text-[0.62rem] tracking-[0.16em] sm:text-[0.6875rem] sm:tracking-[0.24em]">
              Incoming M.S. CS · Columbia · Sep 2026
            </span>
          </div>
        </Reveal>

        <div className="mt-[clamp(2rem,7vh,5rem)]">
          <SplitText
            as="h1"
            immediate
            delay={0.35}
            stagger={0.035}
            text="Dwarakesh"
            className="display-wide block text-[clamp(3.2rem,15vw,13rem)] leading-[0.82] font-semibold"
          />
          <div className="mt-[0.1em] flex flex-wrap items-end gap-x-8 gap-y-4 md:pl-[8vw]">
            <SplitText
              as="span"
              immediate
              delay={0.62}
              stagger={0.028}
              text="Baraneetharan"
              className="display-narrow text-bone/45 block text-[clamp(1.8rem,8vw,6.4rem)] leading-[0.85] font-light"
            />
          </div>
        </div>

        <motion.div
          className="mt-[clamp(2rem,6vh,4rem)] flex max-w-4xl flex-col gap-6 sm:flex-row sm:items-start sm:justify-between"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-lede max-w-[34ch] leading-snug">
            I build systems at the edge of{' '}
            <span className="font-serif text-citron text-[1.18em] italic">theory</span> and{' '}
            <span className="font-serif text-violet text-[1.18em] italic">practice</span>.
          </p>
          <dl className="grid shrink-0 grid-cols-2 gap-x-10 gap-y-3 sm:pt-1">
            <div>
              <dt className="label text-faint">Discipline</dt>
              <dd className="mt-1.5 text-[0.95rem]">CS &amp; Mathematics</dd>
            </div>
            <div>
              <dt className="label text-faint">Based in</dt>
              <dd className="mt-1.5 text-[0.95rem]">{profile.location}</dd>
            </div>
          </dl>
        </motion.div>
      </motion.div>

      <motion.div
        className="border-bone/8 flex items-end justify-between border-t pt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="label text-faint">Scroll to explore</span>
        <motion.span
          className="bg-citron/70 block h-10 w-px origin-top"
          animate={reduced ? undefined : { scaleY: [0, 1, 0], y: [0, 0, 40] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="label text-faint hidden sm:block">
          {new Date().getFullYear()} — Portfolio
        </span>
      </motion.div>
    </section>
  )
}

export default function Home() {
  const featured = projects.slice(0, 3)

  return (
    <>
      <Hero />

      <section className="border-bone/8 border-y py-7">
        <Marquee items={marqueeTerms} />
      </section>

      <section className="gutter py-[clamp(5rem,14vh,10rem)]">
        <ScrollLede
          className="display-narrow mx-auto max-w-[22ch] text-[clamp(1.9rem,5.2vw,4.2rem)] leading-[1.08] font-medium tracking-[-0.03em]"
          text="I am nineteen. I finished a *double *degree in computer science and *mathematics at Maryland in three years, and I start a master's at *Columbia in a month."
        />

        <Reveal variant="up" className="mt-16 flex justify-center">
          <div className="grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl md:grid-cols-4">
            {facts.map((f) => (
              <div
                key={f.label}
                className="bg-ink/65 outline-bone/8 px-5 py-7 text-center outline backdrop-blur-md"
              >
                <div className="display-wide text-citron text-[clamp(1.7rem,3.4vw,2.6rem)] leading-none font-semibold">
                  {f.value}
                </div>
                <div className="label text-faint mt-3">{f.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="gutter py-[clamp(3rem,8vh,6rem)]">
        <SectionHeading index="01" label="Selected work" title="Things I have built">
          <Magnetic>
            <Link
              to="/work"
              data-cursor="All"
              className="border-bone/15 hover:border-citron hover:text-citron inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[0.92rem] transition-colors duration-500"
            >
              View all six
              <span aria-hidden="true">→</span>
            </Link>
          </Magnetic>
        </SectionHeading>

        <div className="mt-14 grid gap-6">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      <section className="gutter py-[clamp(4rem,10vh,8rem)]">
        <SectionHeading index="02" label="Capabilities" title="What I reach for" />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} variant="up" delay={i * 0.06}>
              <article className="border-bone/8 bg-ink/55 hover:border-bone/16 group h-full rounded-2xl border p-7 backdrop-blur-md transition-colors duration-500 sm:p-9">
                <div className="flex items-baseline justify-between">
                  <h3 className="display-narrow text-[clamp(1.5rem,2.6vw,2rem)] font-medium">
                    {c.title}
                  </h3>
                  <span className="label text-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-mute mt-4 text-[0.98rem] leading-relaxed">{c.body}</p>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {c.items.map((item) => (
                    <li
                      key={item}
                      className="border-bone/10 text-bone/65 group-hover:border-citron/25 rounded-full border px-3 py-1 font-mono text-[0.66rem] tracking-wide transition-colors duration-500"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="gutter py-[clamp(5rem,14vh,10rem)]">
        <Reveal variant="mask">
          <div className="border-bone/10 bg-ink/60 relative overflow-hidden rounded-[2rem] border px-7 py-16 text-center backdrop-blur-xl sm:px-12 sm:py-24">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(70% 100% at 50% 120%, rgba(138,107,255,0.20), transparent 70%)',
              }}
            />
            <p className="label text-faint relative">Open to conversations</p>
            <h2 className="display-wide relative mx-auto mt-7 max-w-[14ch] text-[clamp(2.2rem,7vw,5.5rem)] font-semibold">
              Let&rsquo;s build something{' '}
              <span className="font-serif text-citron italic">unreasonable</span>.
            </h2>
            <div className="relative mt-12 flex flex-wrap items-center justify-center gap-4">
              <Magnetic strength={18}>
                <a
                  href={`mailto:${profile.email}`}
                  data-cursor="Email"
                  className="bg-citron text-void inline-flex items-center gap-2 rounded-full px-8 py-4 text-[0.95rem] font-medium"
                >
                  {profile.email}
                </a>
              </Magnetic>
              <Magnetic strength={14}>
                <Link
                  to="/contact"
                  className="border-bone/18 hover:border-bone/40 inline-flex items-center gap-2 rounded-full border px-8 py-4 text-[0.95rem] transition-colors duration-500"
                >
                  All channels
                  <span aria-hidden="true">→</span>
                </Link>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
