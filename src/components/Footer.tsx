import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { profile } from '../data/content'
import Magnetic from './Magnetic'
import { resetScroll } from '../hooks/useSmoothScroll'

function useLocalClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: profile.timezone,
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const time = useLocalClock()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], ['-8%', '4%'])

  return (
    <footer ref={ref} className="relative mt-32 overflow-hidden">
      <motion.div style={{ x }} className="pointer-events-none select-none">
        <span
          className="display-wide block text-[19vw] leading-[0.78] font-bold whitespace-nowrap"
          style={{
            WebkitTextStroke: '1px color-mix(in oklab, var(--color-bone) 13%, transparent)',
            color: 'transparent',
          }}
          aria-hidden="true"
        >
          {profile.short}&nbsp;·&nbsp;{profile.short}
        </span>
      </motion.div>

      <div className="gutter border-bone/8 mt-10 border-t">
        <div className="flex flex-col gap-8 py-9 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="label text-faint">Elsewhere</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="rule-link text-mute hover:text-bone text-[0.95rem] transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:text-right">
            <p className="label text-faint">{profile.location}</p>
            <p className="text-bone/80 mt-4 font-mono text-[0.95rem] tabular-nums">
              {time}
              <span className="text-citron animate-blink ml-1">_</span>
            </p>
          </div>

          <div className="md:text-right">
            <p className="label text-faint">Navigate</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
              {[
                { to: '/', label: 'Index' },
                { to: '/work', label: 'Work' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="rule-link text-mute hover:text-bone text-[0.95rem] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-bone/8 flex items-center justify-between border-t py-6">
          <p className="label text-faint">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <Magnetic strength={10}>
            <button
              onClick={resetScroll}
              data-cursor="Top"
              className="label text-faint hover:text-citron flex items-center gap-2 transition-colors"
            >
              Back to top
              <span aria-hidden="true">↑</span>
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  )
}
