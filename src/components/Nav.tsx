import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react'
import { profile } from '../data/content'
import Magnetic from './Magnetic'

const links = [
  { to: '/work', label: 'Work', no: '01' },
  { to: '/about', label: 'About', no: '02' },
  { to: '/contact', label: 'Contact', no: '03' },
]

export default function Nav() {
  const { pathname } = useLocation()
  const { scrollY, scrollYProgress } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setSolid(y > 24)
    setHidden(y > prev && y > 240 && !open)
  })

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.documentElement.classList.toggle('lenis-stopped', open)
    return () => document.documentElement.classList.remove('lenis-stopped')
  }, [open])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? '-105%' : '0%' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`gutter flex items-center justify-between py-5 transition-colors duration-500 ${
            solid && !open
              ? 'border-b border-bone/8 bg-void/55 backdrop-blur-xl'
              : 'border-b border-transparent'
          }`}
        >
          <Magnetic strength={10}>
            <Link
              to="/"
              className="group flex items-center gap-3"
              aria-label={`${profile.name} — home`}
            >
              <span className="relative grid size-9 place-items-center">
                <motion.span
                  className="border-bone/25 absolute inset-0 rounded-full border"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
                  style={{ borderTopColor: 'var(--color-citron)' }}
                />
                <span className="font-mono text-[0.68rem] font-medium tracking-tight">
                  {profile.initials}
                </span>
              </span>
              <span className="hidden sm:block">
                <span className="block text-[0.9rem] leading-tight font-medium tracking-tight">
                  {profile.short}
                </span>
                <span className="label text-faint block pt-1">
                  CS &amp; Math
                </span>
              </span>
            </Link>
          </Magnetic>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const active = pathname.startsWith(l.to)
              return (
                <Magnetic key={l.to} strength={8}>
                  <Link
                    to={l.to}
                    className="relative block px-4 py-2 text-[0.92rem] tracking-tight"
                  >
                    <span
                      className={
                        active ? 'text-bone' : 'text-mute hover:text-bone transition-colors'
                      }
                    >
                      {l.label}
                    </span>
                    {active && (
                      <motion.span
                        layoutId="nav-pip"
                        className="bg-citron absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full"
                        transition={{ type: 'spring', stiffness: 500, damping: 34 }}
                      />
                    )}
                  </Link>
                </Magnetic>
              )
            })}
            <Magnetic strength={12}>
              <a
                href={`mailto:${profile.email}`}
                data-cursor="Say hi"
                className="border-bone/15 hover:border-citron hover:text-citron ml-3 block rounded-full border px-5 py-2 text-[0.88rem] tracking-tight transition-colors duration-400"
              >
                Get in touch
              </a>
            </Magnetic>
          </nav>

          <button
            className="relative z-50 flex size-10 flex-col items-end justify-center gap-1.5 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <motion.span
              className="bg-bone block h-px"
              animate={{ width: open ? 22 : 22, rotate: open ? 45 : 0, y: open ? 3 : 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="bg-bone block h-px"
              animate={{ width: open ? 22 : 14, rotate: open ? -45 : 0, y: open ? -3 : 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>
        </div>

        <motion.div
          className="bg-citron h-px origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="bg-void/96 fixed inset-0 z-40 backdrop-blur-2xl md:hidden"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
          >
            <div className="gutter flex h-full flex-col justify-center pb-16">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.18 + i * 0.07,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    to={l.to}
                    className="border-bone/8 flex items-baseline gap-4 border-b py-5"
                  >
                    <span className="label text-faint">{l.no}</span>
                    <span className="display-narrow text-[clamp(2.4rem,13vw,4rem)] font-medium">
                      {l.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href={`mailto:${profile.email}`}
                className="text-citron font-mono mt-10 text-sm tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {profile.email}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
