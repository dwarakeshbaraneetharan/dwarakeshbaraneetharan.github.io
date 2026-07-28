/**
 * One source of truth for per-route metadata. The client uses it to keep
 * document.title in step with navigation; the prerender step bakes the same
 * values into the static HTML that crawlers and link unfurlers actually read.
 */
import { profile, projects } from './content'

export const SITE_URL = 'https://www.dwarakesh.com'
export const OG_IMAGE = `${SITE_URL}/og.png`

export type RouteMeta = {
  path: string
  title: string
  description: string
}

const STATIC_ROUTES: RouteMeta[] = [
  {
    path: '/',
    title: `${profile.name} — Computer Science & Mathematics`,
    description:
      'Dwarakesh Baraneetharan is a computer scientist and mathematician. B.S. in Computer Science and Mathematics from the University of Maryland, and an incoming M.S. in Computer Science at Columbia University.',
  },
  {
    path: '/work',
    title: `Work — ${profile.name}`,
    description:
      'Selected projects by Dwarakesh Baraneetharan, spanning distributed systems, numerical computing, machine learning and interface design.',
  },
  {
    path: '/about',
    title: `About — ${profile.name}`,
    description:
      'About Dwarakesh Baraneetharan: a nineteen-year-old computer scientist and mathematician working in the gap between what can be proved and what can be shipped.',
  },
  {
    path: '/contact',
    title: `Contact — ${profile.name}`,
    description:
      'Get in touch with Dwarakesh Baraneetharan about research, internships, collaboration or speaking.',
  },
]

export const PROJECT_ROUTES: RouteMeta[] = projects.map((p) => ({
  path: `/work/${p.slug}`,
  title: `${p.title} — ${profile.name}`,
  description: `${p.kicker}. ${p.blurb}`,
}))

export const ROUTES: RouteMeta[] = [...STATIC_ROUTES, ...PROJECT_ROUTES]

export const NOT_FOUND_META: RouteMeta = {
  path: '/404',
  title: `Not found — ${profile.name}`,
  description: 'This path is not part of the site.',
}

export function metaFor(pathname: string): RouteMeta {
  // Tolerate the trailing slash a static host may add to directory URLs.
  const clean =
    pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
  return ROUTES.find((r) => r.path === clean) ?? NOT_FOUND_META
}

/**
 * Schema.org Person. For a name query this is the strongest single signal a
 * personal site can send: it ties the domain to the entity and lists the
 * profiles Google should treat as the same person.
 */
export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    givenName: 'Dwarakesh',
    familyName: 'Baraneetharan',
    url: `${SITE_URL}/`,
    image: OG_IMAGE,
    jobTitle: profile.role,
    description: STATIC_ROUTES[0].description,
    email: `mailto:${profile.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'New York',
      addressRegion: 'NY',
      addressCountry: 'US',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Maryland',
      sameAs: 'https://en.wikipedia.org/wiki/University_of_Maryland,_College_Park',
    },
    knowsAbout: [
      'Computer Science',
      'Mathematics',
      'Distributed Systems',
      'Numerical Analysis',
      'Machine Learning',
      'Algorithms',
    ],
    // sameAs is how Google reconciles this site with the same person elsewhere,
    // so a bare domain is worse than nothing. Drop any placeholder that still
    // points at a service's front page rather than an actual profile.
    sameAs: profile.socials
      .map((s) => s.href)
      .filter((href) => href.startsWith('http') && new URL(href).pathname.length > 1),
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: profile.name,
    url: `${SITE_URL}/`,
    inLanguage: 'en-US',
    author: { '@type': 'Person', name: profile.name },
  }
}
