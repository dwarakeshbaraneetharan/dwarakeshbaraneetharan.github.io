import { useEffect, useState } from 'react'
import { profile } from '../data/content'
import SplitText from '../components/SplitText'
import Reveal from '../components/Reveal'
import Magnetic from '../components/Magnetic'

const openTo = [
  'Research collaborations',
  'Systems + ML internships',
  'Reading groups',
  'Anything with a hard constraint',
]

function useCopy(value: string) {
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(id)
  }, [copied])
  return {
    copied,
    copy: async () => {
      try {
        await navigator.clipboard.writeText(value)
        setCopied(true)
      } catch {
        setCopied(false)
      }
    },
  }
}

export default function Contact() {
  const { copied, copy } = useCopy(profile.email)

  return (
    <>
      <header className="gutter pt-40 pb-12">
        <Reveal variant="fade">
          <div className="flex items-center gap-3">
            <span className="label text-citron">Contact</span>
            <span className="bg-bone/15 h-px w-10" />
            <span className="label text-faint">Usually replies within a day</span>
          </div>
        </Reveal>
        <SplitText
          as="h1"
          by="word"
          immediate
          delay={0.2}
          stagger={0.06}
          text="Send me a problem."
          className="display-wide mt-8 text-[clamp(2.8rem,10vw,8rem)] font-semibold"
        />
        <Reveal variant="up" delay={0.35}>
          <p className="text-mute mt-8 max-w-[48ch] text-[1.05rem] leading-relaxed">
            Research, internships, a paper you think I should read, or a bug that
            has been bothering you for three weeks — all equally welcome.
          </p>
        </Reveal>
      </header>

      <section className="gutter pb-20">
        <Reveal variant="mask">
          <div className="border-bone/10 bg-ink/70 relative overflow-hidden rounded-[2rem] border backdrop-blur-xl">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(60% 120% at 20% 0%, rgba(215,255,62,0.12), transparent 65%)',
              }}
            />
            <a
              href={`mailto:${profile.email}`}
              data-cursor="Email"
              className="group relative block px-7 py-14 sm:px-12 sm:py-20"
            >
              <span className="label text-faint">Primary channel</span>
              <span className="display-narrow group-hover:text-citron mt-6 block text-[clamp(1.6rem,6.5vw,4.6rem)] leading-none font-medium break-all transition-colors duration-500">
                {profile.email}
              </span>
              <span className="bg-citron mt-8 block h-px origin-left scale-x-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </a>
            <div className="border-bone/8 relative flex items-center justify-between border-t px-7 py-5 sm:px-12">
              <span className="label text-faint">
                {copied ? 'Copied to clipboard' : 'Or copy it'}
              </span>
              <button
                onClick={copy}
                data-cursor={copied ? 'Done' : 'Copy'}
                className="label border-bone/15 hover:border-citron hover:text-citron rounded-full border px-4 py-2 transition-colors duration-400"
              >
                {copied ? '✓ Copied' : 'Copy address'}
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="gutter grid gap-14 pb-32 lg:grid-cols-2">
        <div>
          <Reveal variant="fade">
            <h2 className="label text-faint border-bone/8 border-t pt-6">
              Channels
            </h2>
          </Reveal>
          <ul className="mt-8">
            {profile.socials.map((s, i) => (
              <Reveal key={s.label} variant="up" delay={i * 0.05}>
                <li className="border-bone/8 border-b">
                  <Magnetic strength={6}>
                    <a
                      href={s.href}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      data-cursor="Open"
                      className="group flex items-center justify-between py-5"
                    >
                      <span className="display-narrow group-hover:text-citron text-[clamp(1.3rem,3vw,2rem)] font-medium transition-colors duration-400">
                        {s.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-faint group-hover:text-citron translate-x-0 transition-all duration-400 group-hover:translate-x-1"
                      >
                        ↗
                      </span>
                    </a>
                  </Magnetic>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div>
          <Reveal variant="fade">
            <h2 className="label text-faint border-bone/8 border-t pt-6">
              Currently open to
            </h2>
          </Reveal>
          <ul className="mt-8 space-y-4">
            {openTo.map((o, i) => (
              <Reveal key={o} variant="up" delay={i * 0.05}>
                <li className="flex items-baseline gap-4">
                  <span className="text-citron font-mono text-xs">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-bone/85 text-[1.05rem]">{o}</span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal variant="up" delay={0.25}>
            <div className="border-bone/8 bg-ink/55 mt-10 rounded-2xl border p-6 backdrop-blur-md">
              <p className="label text-faint">A note</p>
              <p className="text-mute mt-4 leading-relaxed">
                Moving to New York in September for Columbia. If you are in the
                city and working on something in systems, compilers or applied
                mathematics, I would like to hear about it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
