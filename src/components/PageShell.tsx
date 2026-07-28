import type { ReactNode } from 'react'
import { motion } from 'motion/react'

/** Per-route entrance. Paired with AnimatePresence mode="wait" in App. */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.main>
  )
}
