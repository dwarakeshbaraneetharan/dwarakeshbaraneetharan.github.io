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
      { label: 'Repository', href: 'https://github.com/dwarakeshbaraneetharan/warrant' },
    ],
  },
  {
    slug: 'lumen',
    index: '03',
    title: 'Lumen',
    kicker: 'Real-time spectral renderer',
    year: '2025',
    role: 'Author',
    stack: ['WebGPU', 'WGSL', 'TypeScript'],
    blurb:
      'A browser path tracer that samples wavelengths rather than RGB triples, so dispersion and thin-film interference come out of the physics for free.',
    accent: 'coral',
    seed: 47,
    metrics: [
      { value: '60fps', label: 'at 1440p' },
      { value: '32', label: 'spectral bands' },
      { value: '0', label: 'plugins required' },
    ],
    overview:
      'Most real-time renderers cheat colour: they trace three channels and bolt on a rainbow when they need one. Lumen traces a stratified sample of the visible spectrum instead. Combining a hero-wavelength sampler with a spatiotemporal reservoir resampler keeps the variance low enough to converge inside a single frame budget, entirely inside a browser tab.',
    contributions: [
      'Wrote the full WGSL path-tracing kernel, including a wavefront scheduler for divergent rays.',
      'Implemented hero-wavelength spectral sampling with multiple importance sampling across bands.',
      'Built a ReSTIR-style temporal reservoir pass that reuses samples across frames without ghosting.',
      'Shipped an in-browser scene editor with hot-reloading materials.',
    ],
    links: [
      { label: 'Live demo', href: 'https://github.com/' },
      { label: 'Repository', href: 'https://github.com/' },
    ],
  },
  {
    slug: 'cadence',
    index: '04',
    title: 'Cadence',
    kicker: 'Tensor scheduling compiler',
    year: '2025',
    role: 'Research engineer',
    stack: ['MLIR', 'C++', 'Python'],
    blurb:
      'Treats kernel scheduling as an integer program with a learned warm start, finding tilings that beat hand-tuned libraries on irregular shapes.',
    accent: 'citron',
    seed: 63,
    metrics: [
      { value: '1.7x', label: 'median speedup' },
      { value: '90s', label: 'to schedule' },
      { value: '240', label: 'kernels evaluated' },
    ],
    overview:
      'Vendor libraries are excellent on the shapes their authors anticipated and mediocre everywhere else. Cadence formulates tiling, fusion and vectorisation choices as a single mixed-integer program over an MLIR dialect, then uses a small graph neural network to warm-start the solver so the search terminates in about ninety seconds rather than overnight.',
    contributions: [
      'Defined an MLIR dialect capturing loop nests, memory hierarchy and legal fusion boundaries.',
      'Encoded the scheduling search as a mixed-integer program with symmetry-breaking constraints.',
      'Trained a graph neural network on 240 kernels to predict strong incumbent solutions.',
      'Benchmarked against cuBLAS and oneDNN across irregular batch and sequence shapes.',
    ],
    links: [{ label: 'Paper draft', href: 'https://github.com/' }],
  },
  {
    slug: 'tessera',
    index: '05',
    title: 'Tessera',
    kicker: 'Aperiodic tiling studio',
    year: '2024',
    role: 'Author',
    stack: ['WebGL', 'Rust/WASM'],
    blurb:
      'An interactive studio for substitution tilings — Penrose, Ammann–Beenker, and the einstein hat — that renders millions of tiles without dropping a frame.',
    accent: 'violet',
    seed: 83,
    metrics: [
      { value: '4M', label: 'tiles rendered' },
      { value: '11', label: 'tiling families' },
      { value: '<1ms', label: 'substitution step' },
    ],
    overview:
      'Aperiodic tilings are one of the few places where a picture really is the proof. Tessera generates substitution tilings in a Rust core compiled to WebAssembly, streams them into instanced WebGL draw calls, and lets you zoom continuously through the hierarchy while the substitution rule regenerates detail underneath you.',
    contributions: [
      'Implemented cut-and-project and substitution generators for eleven tiling families.',
      'Built a level-of-detail scheme that regenerates local patches instead of the whole plane.',
      'Wrote an instanced WebGL renderer that batches millions of tiles into a handful of draw calls.',
      'Added an export path to SVG and plotter-ready G-code.',
    ],
    links: [
      { label: 'Live demo', href: 'https://github.com/' },
      { label: 'Repository', href: 'https://github.com/' },
    ],
  },
  {
    slug: 'orbit',
    index: '06',
    title: 'Orbit',
    kicker: 'Campus scheduling solver',
    year: '2024',
    role: 'Author',
    stack: ['Python', 'OR-Tools', 'Postgres'],
    blurb:
      'A constraint solver that rebuilt a 900-section course timetable and gave four thousand students back roughly a week of dead time each semester.',
    accent: 'coral',
    seed: 101,
    metrics: [
      { value: '900', label: 'sections' },
      { value: '4,100', label: 'students served' },
      { value: '−23%', label: 'schedule gaps' },
    ],
    overview:
      'Timetabling is the classic NP-hard problem that everybody solves badly by hand. Orbit models room capacity, instructor availability, prerequisite chains and student preference as a weighted constraint satisfaction problem, then runs a large-neighbourhood search that repairs an existing timetable instead of rebuilding it from nothing — which matters, because nobody wants their Tuesday moved.',
    contributions: [
      'Modelled hard and soft scheduling constraints in CP-SAT with lexicographic objectives.',
      'Designed a large-neighbourhood search that keeps 85% of the prior timetable stable.',
      'Built an ingestion pipeline over the registrar export with a Postgres-backed audit trail.',
      'Ran a preference survey with 4,100 students to weight the soft objective.',
    ],
    links: [{ label: 'Case study', href: 'https://github.com/' }],
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
