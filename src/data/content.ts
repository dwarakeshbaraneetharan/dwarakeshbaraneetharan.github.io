/**
 * Placeholder content. Everything here is invented scaffolding — swap the copy,
 * links and project write-ups for the real thing when you're ready.
 */

export const profile = {
  name: 'Dwarakesh Baraneetharan',
  short: 'Dwarakesh',
  initials: 'DB',
  role: 'Computer Scientist & Mathematician',
  tagline: 'I build systems at the edge of theory and practice.',
  location: 'New York, NY',
  timezone: 'America/New_York',
  email: 'hello@dwarakesh.com',
  intro:
    'I am nineteen. I just finished a double degree in Computer Science and Mathematics at the University of Maryland, and in a month I start my M.S. in Computer Science at Columbia. Three years, two departments, and a standing argument with myself about which one is the real one.',
  socials: [
    { label: 'GitHub', href: 'https://github.com/dwarakeshbaraneetharan' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dwarakeshb/' },
    { label: 'Email', href: 'mailto:hello@dwarakesh.com' },
  ],
} as const

export const marqueeTerms = [
  'Distributed Systems',
  'Numerical Analysis',
  'Compilers',
  'Spectral Graph Theory',
  'GPU Programming',
  'Probabilistic Methods',
  'Type Systems',
  'Convex Optimization',
  'Randomized Algorithms',
  'Machine Learning',
]

export type Project = {
  slug: string
  index: string
  title: string
  kicker: string
  year: string
  role: string
  stack: string[]
  blurb: string
  accent: 'citron' | 'violet' | 'coral'
  /** Deterministic seed for the generative card artwork. */
  seed: number
  metrics: { value: string; label: string }[]
  overview: string
  contributions: string[]
  links: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    slug: 'quarantine',
    index: '01',
    title: 'Quarantine',
    kicker: 'Flaky-test detective',
    year: '2026',
    role: 'Author',
    stack: ['TypeScript', 'Cloudflare Workers', 'D1', 'Hono'],
    blurb:
      'A serverless service that analyzes GitHub Actions history to find tests that pass and fail on the same commit, estimating true rerun costs.',
    accent: 'citron',
    seed: 11,
    metrics: [
      { value: '100%', label: 'serverless' },
      { value: '0', label: 'false positives' },
      { value: '95%', label: 'Wilson interval' },
    ],
    overview:
      'Teams know they have flaky tests, but “this test failed before” does not distinguish a flake from a fixed bug. Quarantine ingests JUnit artifacts from GitHub Actions and detects pass/nonpass reversals only when the canonical test, commit SHA, and execution fingerprint exactly match. It then ranks these conflicts by statistically cautious Wilson lower bounds and their estimated CI compute waste.',
    contributions: [
      'Built a full-stack Cloudflare Workers application using Hono and D1 (SQLite).',
      'Implemented impact-first ranking with Wilson lower bounds and explicit insufficient-data states.',
      'Designed an at-least-once queue ingestion pipeline with D1 leases and idempotent artifact processing.',
      'Added PKCE OAuth, identity-bound AES-GCM token encryption, and CSRF checks for secure public repository onboarding.',
    ],
    links: [
      { label: 'Live Demo', href: 'https://quarantine.dwarakesh.com' },
      { label: 'Repository', href: 'https://github.com/dwarakeshbaraneetharan/quarantine' },
    ],
  },
  {
    slug: 'warrant',
    index: '02',
    title: 'Warrant',
    kicker: 'Evaluated RAG engine',
    year: '2026',
    role: 'Author',
    stack: ['Python', 'FastAPI', 'SciFact', 'SentenceTransformers'],
    blurb:
      'A claim verification system over scientific abstracts that enforces grounded citations and gates CI on retrieval quality.',
    accent: 'violet',
    seed: 29,
    metrics: [
      { value: '0.94', label: 'nDCG@5' },
      { value: '0.88', label: 'Recall@5' },
      { value: '100%', label: 'grounded citations' },
    ],
    overview:
      'LLMs hallucinate, especially on scientific literature. Warrant addresses this by grounding generations in retrieved evidence from the SciFact corpus. More importantly, it treats retrieval as an engineering problem: the pipeline uses a hybrid BM25 and dense embedding search with Reciprocal Rank Fusion (RRF), re-ranked by a domain-specific biomedical cross-encoder. The CI pipeline fails if retrieval metrics (nDCG, Recall) regress against human judgments.',
    contributions: [
      'Implemented a hybrid retrieval pipeline using BM25, SentenceTransformers, and a MedCPT cross-encoder.',
      'Built a rigorous evaluation harness that scores retrieval against the human-annotated SciFact benchmark.',
      'Configured GitHub Actions to gate pull requests on retrieval quality regressions (nDCG@5, Recall@5).',
      'Enforced strict citation constraints on the LLM generation step to ensure all claims are verifiable.',
    ],
    links: [
      { label: 'Live Demo', href: 'https://warrant-197958039317.us-central1.run.app' },
      { label: 'Repository', href: 'https://github.com/dwarakeshbaraneetharan/warrant' },
    ],
  },
]

export type TimelineEntry = {
  period: string
  title: string
  org: string
  detail: string
  tag: string
}

export const timeline: TimelineEntry[] = [
  {
    period: 'Sep 2026 →',
    title: 'M.S. Computer Science',
    org: 'Columbia University',
    detail:
      'Incoming. Planning a concentration in systems and machine learning, with a detour into the theory sequence because it would be rude not to.',
    tag: 'Next',
  },
  {
    period: '2023 — 2026',
    title: 'B.S. Computer Science + B.S. Mathematics',
    org: 'University of Maryland',
    detail:
      'Double degree completed in three years. Coursework across distributed systems, compilers, measure theory, numerical PDEs and combinatorics.',
    tag: 'Education',
  },
  {
    period: 'Summer 2025',
    title: 'Software Engineering Intern',
    org: 'Infrastructure team, placeholder company',
    detail:
      'Worked on the storage layer of a multi-tenant query engine. Cut tail latency on the hot path by rethinking how the buffer pool handled eviction under skew.',
    tag: 'Industry',
  },
  {
    period: '2024 — 2026',
    title: 'Undergraduate Researcher',
    org: 'UMD Applied Mathematics',
    detail:
      'Studied spectral methods for high-dimensional PDEs and what happens to their error bounds when you replace the solver with a neural surrogate.',
    tag: 'Research',
  },
  {
    period: '2024 — 2026',
    title: 'Teaching Assistant, Algorithms',
    org: 'UMD Department of Computer Science',
    detail:
      'Ran weekly discussion sections for roughly 120 students across four semesters. Rewrote the amortised analysis notes, which were, frankly, overdue.',
    tag: 'Teaching',
  },
]

export const capabilities = [
  {
    title: 'Systems',
    body: 'Distributed storage, consensus, and the unglamorous work of making a hot loop respect the memory hierarchy.',
    items: ['Rust', 'C++', 'Go', 'gRPC', 'Postgres', 'Kubernetes'],
  },
  {
    title: 'Mathematics',
    body: 'Convex optimisation, spectral graph theory, probability and numerical analysis — used as tools, not decoration.',
    items: ['Optimisation', 'Probability', 'Numerical PDEs', 'Combinatorics'],
  },
  {
    title: 'Machine Learning',
    body: 'Training and, more often, making training cheaper. Compilers, kernels, and the scheduling problems underneath.',
    items: ['PyTorch', 'MLIR', 'CUDA', 'Triton', 'JAX'],
  },
  {
    title: 'Interfaces',
    body: 'Real-time graphics and interactive tools, because a system you can see is a system you can debug.',
    items: ['WebGPU', 'WebGL', 'TypeScript', 'React', 'WASM'],
  },
]

export const facts = [
  { value: '19', label: 'years old' },
  { value: '2', label: 'degrees' },
  { value: '3', label: 'years' },
  { value: '∞', label: 'open tabs' },
]
