import { Link } from 'react-router-dom'
import SplitText from '../components/SplitText'
import Reveal from '../components/Reveal'
import Magnetic from '../components/Magnetic'

export default function NotFound() {
  return (
    <section className="gutter flex min-h-[80svh] flex-col justify-center py-40">
      <Reveal variant="fade">
        <span className="label text-citron">Error 404</span>
      </Reveal>
      <SplitText
        as="h1"
        immediate
        delay={0.15}
        text="Undefined"
        className="display-wide mt-6 text-[clamp(3rem,14vw,11rem)] leading-[0.85] font-semibold"
      />
      <Reveal variant="up" delay={0.3}>
        <p className="text-mute mt-8 max-w-[42ch] text-[1.05rem] leading-relaxed">
          This path is not in the domain. The function is otherwise total — try
          one of these instead.
        </p>
      </Reveal>
      <Reveal variant="up" delay={0.4}>
        <div className="mt-10 flex flex-wrap gap-4">
          {[
            { to: '/', label: 'Index' },
            { to: '/work', label: 'Work' },
            { to: '/about', label: 'About' },
            { to: '/contact', label: 'Contact' },
          ].map((l) => (
            <Magnetic key={l.to} strength={12}>
              <Link
                to={l.to}
                className="border-bone/15 hover:border-citron hover:text-citron inline-block rounded-full border px-6 py-3 text-[0.92rem] transition-colors duration-500"
              >
                {l.label}
              </Link>
            </Magnetic>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
