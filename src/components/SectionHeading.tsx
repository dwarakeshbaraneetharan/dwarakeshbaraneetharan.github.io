import type { ReactNode } from 'react'
import Reveal from './Reveal'
import SplitText from './SplitText'

type Props = {
  index: string
  label: string
  title: string
  children?: ReactNode
}

export default function SectionHeading({ index, label, title, children }: Props) {
  return (
    <div className="border-bone/8 flex flex-col gap-6 border-t pt-6 md:flex-row md:items-end md:justify-between">
      <div>
        <Reveal variant="fade">
          <div className="flex items-center gap-3">
            <span className="label text-citron">{index}</span>
            <span className="bg-bone/15 h-px w-10" />
            <span className="label text-faint">{label}</span>
          </div>
        </Reveal>
        <SplitText
          as="h2"
          by="word"
          stagger={0.05}
          text={title}
          className="display-wide mt-6 max-w-[18ch] text-[clamp(2rem,5vw,4rem)] font-semibold"
        />
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </div>
  )
}
