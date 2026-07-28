import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { MotionConfig } from 'motion/react'
import App from './App'

/**
 * Build-time render of a single route. The output is baked into a real HTML
 * file per route so GitHub Pages answers 200 with content already in the body,
 * rather than 404 with an empty shell.
 */
export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </StaticRouter>,
  )
}

export {
  ROUTES,
  NOT_FOUND_META,
  SITE_URL,
  OG_IMAGE,
  personSchema,
  websiteSchema,
} from './data/seo'
