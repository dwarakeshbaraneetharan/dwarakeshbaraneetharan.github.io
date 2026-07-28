import { useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { AnimatePresence } from 'motion/react'

import Backdrop from './components/Backdrop'
import Chrome from './components/Chrome'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Footer from './components/Footer'
import PageShell from './components/PageShell'
import Preloader from './components/Preloader'

import Home from './pages/Home'
import Work from './pages/Work'
import ProjectDetail from './pages/ProjectDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

import { resetScroll, useSmoothScroll } from './hooks/useSmoothScroll'
import { projects } from './data/content'

const TITLES: Record<string, string> = {
  '/': 'Dwarakesh Baraneetharan — CS & Mathematics',
  '/work': 'Work — Dwarakesh Baraneetharan',
  '/about': 'About — Dwarakesh Baraneetharan',
  '/contact': 'Contact — Dwarakesh Baraneetharan',
}

function titleFor(pathname: string) {
  const fixed = TITLES[pathname]
  if (fixed) return fixed

  const slug = pathname.startsWith('/work/') ? pathname.slice(6) : null
  const project = slug ? projects.find((p) => p.slug === slug) : undefined
  if (project) return `${project.title} — Dwarakesh Baraneetharan`

  // Anything else falls through to the NotFound route.
  return 'Not found — Dwarakesh Baraneetharan'
}

export default function App() {
  const location = useLocation()
  const [ready, setReady] = useState(false)
  useSmoothScroll()

  useEffect(() => {
    resetScroll()
    document.title = titleFor(location.pathname)
  }, [location.pathname])

  const onIntroDone = useCallback(() => setReady(true), [])

  return (
    <>
      <Backdrop />
      <Chrome />
      <Cursor />
      <Preloader onDone={onIntroDone} />

      <a
        href="#main"
        className="focus:bg-citron focus:text-void sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[130] focus:rounded-full focus:px-5 focus:py-2"
      >
        Skip to content
      </a>

      <Nav />

      <div id="main" data-ready={ready}>
        <AnimatePresence mode="wait" initial={false}>
          <PageShell key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageShell>
        </AnimatePresence>
      </div>

      <Footer />
    </>
  )
}
