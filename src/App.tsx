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
import { SITE_URL, metaFor } from './data/seo'

/** Keep a singleton head tag in step with the current route. */
function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

export default function App() {
  const location = useLocation()
  const [ready, setReady] = useState(false)
  useSmoothScroll()

  useEffect(() => {
    resetScroll()

    // The prerendered HTML already carries the right tags for a cold load;
    // this keeps them honest across client-side navigation.
    const meta = metaFor(location.pathname)
    const url = `${SITE_URL}${meta.path === '/' ? '/' : meta.path}`
    document.title = meta.title
    setMeta('meta[name="description"]', 'content', meta.description)
    setMeta('link[rel="canonical"]', 'href', url)
    setMeta('meta[property="og:title"]', 'content', meta.title)
    setMeta('meta[property="og:description"]', 'content', meta.description)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[name="twitter:title"]', 'content', meta.title)
    setMeta('meta[name="twitter:description"]', 'content', meta.description)
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
        <AnimatePresence mode="wait">
          <PageShell key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home ready={ready} />} />
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
