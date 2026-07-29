import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { profile, timeline } from '../data/content'
import SplitText from '../components/SplitText'
import Reveal from '../components/Reveal'
import Attractor from '../components/Attractor'
import ScrollLede from '../components/ScrollLede'
import SectionHeading from '../components/SectionHeading'

const colophon = [
  ['Framework', 'React 19 + Vite'],
  ['Motion', 'Motion for React + Lenis'],
  ['Backdrop', 'Hand-written GLSL, domain-warped simplex noise'],
  ['Artwork', 'Harmonographs generated per project seed'],
  ['Type', 'Bricolage Grotesque · Instrument Serif · JetBrains Mono'],
  ['Hosting', 'GitHub Pages behind Cloudflare'],
]

function Timeline() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.75', 'end 0.7'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <ol ref={ref} className="relative mt-14 pl-8 sm:pl-14">
      <div className="bg-bone/8 absolute top-2 bottom-2 left-0 w-px sm:left-2" />
      <motion.div
        className="bg-citron absolute top-2 bottom-2 left-0 w-px origin-top sm:left-2"
        style={{ scaleY }}
      />

      {timeline.map((e, i) => (
        <li key={e.title} className="relative pb-14 last:pb-0">
          <Reveal variant="up" delay={i * 0.04}>
            <span className="border-citron bg-void absolute top-2 -left-8 size-2.5 -translate-x-1/2 rounded-full border sm:-left-12" />
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="label text-citron">{e.period}</span>
              <span className="label text-faint">{e.tag}</span>
            </div>
            <h3 className="display-narrow mt-3 text-[clamp(1.35rem,3vw,2.1rem)] font-medium">
              {e.title}
            </h3>
            <p className="text-bone/70 mt-1.5 text-[0.98rem]">{e.org}</p>
            <p className="text-mute mt-4 max-w-[58ch] leading-relaxed">{e.detail}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}

export default function About() {
  return (
    <>
      <section className="gutter pt-36 pb-20">
        <Reveal variant="fade">
          <div className="flex items-center gap-3">
            <span className="label text-citron">About</span>
            <span className="bg-bone/15 h-px w-10" />
            <span className="label text-faint">Who is doing the typing</span>
          </div>
        </Reveal>

        <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="space-y-8">
            <SplitText
              as="h1"
              by="word"
              immediate
              delay={0.2}
              stagger={0.05}
              text="A proof and a fast implementation are often the same idea."
              className="display-wide text-[clamp(2.4rem,6vw,5.2rem)] font-semibold leading-[0.95]"
            />
            <Reveal variant="up" delay={0.1}>
              <p className="text-lede leading-relaxed">{profile.intro}</p>
            </Reveal>
            <Reveal variant="up" delay={0.16}>
              <p className="text-mute leading-relaxed">
                Most of what I enjoy sits in the gap between the two disciplines: a
                bound that tells you a data structure cannot be faster, a cache line
                that says the bound was optimistic, and the work of reconciling
                them. I like building tools other people can poke at, which is why
                so much of what I write ends up rendering something.
              </p>
            </Reveal>
            <Reveal variant="up" delay={0.22}>
              <p className="text-mute leading-relaxed">
                Away from a terminal I read a great deal of analysis I do not fully
                understand yet, play chess badly and quickly, and keep a running
                list of problems I intend to come back to.
              </p>
            </Reveal>
          </div>

          <Reveal variant="scale" className="w-full max-w-sm mx-auto lg:mx-0 lg:sticky lg:top-28">
            <figure className="border-bone/8 bg-void overflow-hidden rounded-[2rem] border shadow-2xl">
              <Attractor className="block aspect-square w-full" />
              <figcaption className="border-bone/8 text-faint border-t px-5 py-3.5 font-mono text-[0.68rem] leading-relaxed">
                <span className="text-citron">Clifford attractor</span> — x&prime; =
                sin(a·y) + c·cos(a·x), y&prime; = sin(b·x) + d·cos(b·y). Parameters
                drift over time. Hover to bend a and b.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="gutter py-[clamp(4rem,10vh,8rem)]">
        <ScrollLede
          className="display-narrow mx-auto max-w-[20ch] text-center text-[clamp(1.8rem,4.8vw,3.8rem)] leading-[1.1] font-medium tracking-[-0.03em]"
          text="Two years at *Maryland. Two degrees. One month until *Columbia."
        />
      </section>

      <section className="gutter pb-24">
        <SectionHeading index="01" label="Trajectory" title="Where I have been" />
        <Timeline />
      </section>

      <section className="gutter pb-28">
        <SectionHeading index="02" label="Colophon" title="How this site is made" />
        <dl className="border-bone/8 mt-12 border-t">
          {colophon.map(([k, v], i) => (
            <Reveal key={k} variant="fade" delay={i * 0.04}>
              <div className="border-bone/8 grid grid-cols-1 gap-1 border-b py-5 sm:grid-cols-[14rem_1fr] sm:gap-8">
                <dt className="label text-faint pt-1">{k}</dt>
                <dd className="text-bone/80 text-[0.98rem]">{v}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>
    </>
  )
}
