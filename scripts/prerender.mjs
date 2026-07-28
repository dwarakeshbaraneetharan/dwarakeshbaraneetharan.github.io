/**
 * Turns the SPA into one real HTML file per route.
 *
 * GitHub Pages has no rewrite rules, so an unknown path falls through to
 * 404.html — served, critically, with a 404 status. Search engines treat that
 * as missing and refuse to index the URL no matter what renders afterwards.
 * Writing dist/work/index.html and friends means every route answers 200, with
 * its content and metadata already in the markup.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'

const {
  render,
  ROUTES,
  NOT_FOUND_META,
  SITE_URL,
  OG_IMAGE,
  personSchema,
  websiteSchema,
  profile,
  projects,
  timeline,
  capabilities,
} = await import('../dist-ssr/entry-server.js')

const dist = resolve(import.meta.dirname, '..', 'dist')
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const SEO_BLOCK = /<!--seo-->[\s\S]*?<!--\/seo-->/
const ROOT_DIV = '<div id="root"></div>'

if (!SEO_BLOCK.test(template)) throw new Error('index.html is missing the <!--seo--> block')
if (!template.includes(ROOT_DIV)) throw new Error('index.html is missing the root div')

const esc = (s) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// JSON-LD sits in a script tag, so the only character that can break out is `<`.
const jsonLd = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c')

function seoBlock({ title, description, url, schemas = [], noindex = false }) {
  const t = esc(title)
  const d = esc(description)
  const lines = [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    `<link rel="canonical" href="${url}" />`,
    noindex ? `<meta name="robots" content="noindex, follow" />` : null,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Dwarakesh Baraneetharan" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Dwarakesh Baraneetharan — systems at the edge of theory and practice." />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    ...schemas.map((s) => `<script type="application/ld+json">${jsonLd(s)}</script>`),
  ].filter(Boolean)

  return `<!--seo-->\n    ${lines.join('\n    ')}\n    <!--/seo-->`
}

function page({ meta, url, renderPath, schemas, noindex }) {
  const body = render(renderPath ?? meta.path)
  return template
    .replace(SEO_BLOCK, () =>
      seoBlock({ title: meta.title, description: meta.description, url, schemas, noindex }),
    )
    .replace(ROOT_DIV, () => `<div id="root">${body}</div>`)
}

function write(relPath, html) {
  const file = join(dist, relPath)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
  return `${relPath} (${(html.length / 1024).toFixed(1)} kB)`
}

const written = []

for (const meta of ROUTES) {
  const url = `${SITE_URL}${meta.path}`
  // The person is the subject of the site; say so on the two pages that are
  // actually about them rather than sprinkling it everywhere.
  const schemas =
    meta.path === '/'
      ? [websiteSchema(), personSchema()]
      : meta.path === '/about'
        ? [personSchema()]
        : []

  const html = page({ meta, url, schemas })

  if (meta.path === '/') {
    written.push(write('index.html', html))
  } else {
    // A bare directory makes GitHub Pages 301 /work to /work/, which leaves the
    // canonical pointing at a URL that redirects. Shipping work.html alongside
    // work/index.html means both shapes answer 200 and agree on the canonical.
    written.push(write(`${meta.path}.html`, html))
    written.push(write(`${meta.path}/index.html`, html))
  }
}

// Genuine misses still land here, and this one really should carry a 404.
written.push(
  write(
    '404.html',
    page({
      meta: NOT_FOUND_META,
      url: `${SITE_URL}/404`,
      renderPath: '/__not_found__',
      noindex: true,
    }),
  ),
)

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...ROUTES.map(
    (r) =>
      `  <url><loc>${SITE_URL}${r.path}</loc><priority>${r.path === '/' ? '1.0' : r.path.startsWith('/work/') ? '0.6' : '0.8'}</priority></url>`,
  ),
  '</urlset>',
  '',
].join('\n')
writeFileSync(join(dist, 'sitemap.xml'), sitemap)

/**
 * llms.txt — a plain-text brief for agents and answer engines, per the
 * llmstxt.org convention. Cloudflare's Markdown for Agents does the same job at
 * the edge but needs a paid plan; this is the free, origin-side equivalent and
 * costs one file.
 */
const llms = [
  `# ${profile.name}`,
  '',
  `> ${profile.role}. ${profile.tagline} Based in ${profile.location}.`,
  '',
  profile.intro,
  '',
  '## Education',
  '',
  ...timeline.map((t) => `- **${t.title}**, ${t.org} (${t.period}) — ${t.detail}`),
  '',
  '## Projects',
  '',
  ...projects.map(
    (p) => `- [${p.title}](${SITE_URL}/work/${p.slug}) — ${p.kicker}. ${p.blurb}`,
  ),
  '',
  '## Focus areas',
  '',
  ...capabilities.map((c) => `- **${c.title}**: ${c.body}`),
  '',
  '## Pages',
  '',
  ...ROUTES.map((r) => `- [${r.title}](${SITE_URL}${r.path}): ${r.description}`),
  '',
  '## Contact',
  '',
  ...profile.socials.map((s) => `- ${s.label}: ${s.href}`),
  '',
].join('\n')
writeFileSync(join(dist, 'llms.txt'), llms)

console.log(`prerendered ${written.length} pages:`)
for (const w of written) console.log(`  ${w}`)
console.log(`  sitemap.xml (${ROUTES.length} urls)`)
console.log(`  llms.txt (${(llms.length / 1024).toFixed(1)} kB)`)
