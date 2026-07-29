export const profile = {
  name: "Dwarakesh Baraneetharan",
  short: "Dwarakesh",
  initials: "DB",
  role: "Software Engineer & Data Scientist",
  tagline:
    "Building resilient distributed systems, data infrastructure, and intelligent algorithms.",
  location: "New York, NY",
  timezone: "America/New_York",
  email: "dwarakesh.b@columbia.edu",
  intro:
    "I recently graduated from the University of Maryland with dual B.S. degrees in Computer Science and Mathematics, completing the four-year program in two years. I am currently pursuing an M.S. in Computer Science at Columbia University. My engineering background spans data architecture for defense contractors, computer vision research for surgical planning, and writing real-time control software for autonomous Mars rovers.",
  socials: [
    { label: "GitHub", href: "https://github.com/dwarakeshbaraneetharan" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dwarakeshb/" },
    { label: "Email", href: "mailto:dwarakesh.b@columbia.edu" },
  ],
} as const;

export const marqueeTerms = [
  "Distributed Systems",
  "Data Engineering",
  "Machine Learning",
  "Computer Vision",
  "Cloud Architecture",
  "Robotics (ROS 2)",
  "Systems Engineering",
  "Predictive Modeling",
  "REST APIs",
  "Algorithms",
];

export type Project = {
  slug: string;
  index: string;
  title: string;
  kicker: string;
  year: string;
  role: string;
  stack: string[];
  blurb: string;
  accent: "citron" | "violet" | "coral";
  /** Deterministic seed for the generative card artwork. */
  seed: number;
  metrics: { value: string; label: string }[];
  overview: string;
  contributions: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "quarantine",
    index: "01",
    title: "Quarantine",
    kicker: "Flaky-test detective",
    year: "2026",
    role: "Author",
    stack: ["TypeScript", "Cloudflare Workers", "D1", "Hono"],
    blurb:
      "A serverless service that analyzes GitHub Actions history to find tests that pass and fail on the same commit, estimating true rerun costs.",
    accent: "citron",
    seed: 11,
    metrics: [
      { value: "100%", label: "serverless" },
      { value: "0", label: "false positives" },
      { value: "95%", label: "Wilson interval" },
    ],
    overview:
      "Teams know they have flaky tests, but “this test failed before” does not distinguish a flake from a fixed bug. Quarantine ingests JUnit artifacts from GitHub Actions and detects pass/nonpass reversals only when the canonical test, commit SHA, and execution fingerprint exactly match. It then ranks these conflicts by statistically cautious Wilson lower bounds and their estimated CI compute waste.",
    contributions: [
      "Built a full-stack Cloudflare Workers application using Hono and D1 (SQLite).",
      "Implemented impact-first ranking with Wilson lower bounds and explicit insufficient-data states.",
      "Designed an at-least-once queue ingestion pipeline with D1 leases and idempotent artifact processing.",
      "Added PKCE OAuth, identity-bound AES-GCM token encryption, and CSRF checks for secure public repository onboarding.",
    ],
    links: [
      { label: "Live Demo", href: "https://quarantine.dwarakesh.com" },
      {
        label: "Repository",
        href: "https://github.com/dwarakeshbaraneetharan/quarantine",
      },
    ],
  },
  {
    slug: "warrant",
    index: "02",
    title: "Warrant",
    kicker: "Evaluated RAG engine",
    year: "2026",
    role: "Author",
    stack: ["Python", "FastAPI", "SciFact", "SentenceTransformers"],
    blurb:
      "A claim verification system over scientific abstracts that enforces grounded citations and gates CI on retrieval quality.",
    accent: "violet",
    seed: 29,
    metrics: [
      { value: "0.94", label: "nDCG@5" },
      { value: "0.88", label: "Recall@5" },
      { value: "100%", label: "grounded citations" },
    ],
    overview:
      "LLMs hallucinate, especially on scientific literature. Warrant addresses this by grounding generations in retrieved evidence from the SciFact corpus. More importantly, it treats retrieval as an engineering problem: the pipeline uses a hybrid BM25 and dense embedding search with Reciprocal Rank Fusion (RRF), re-ranked by a domain-specific biomedical cross-encoder. The CI pipeline fails if retrieval metrics (nDCG, Recall) regress against human judgments.",
    contributions: [
      "Implemented a hybrid retrieval pipeline using BM25, SentenceTransformers, and a MedCPT cross-encoder.",
      "Built a rigorous evaluation harness that scores retrieval against the human-annotated SciFact benchmark.",
      "Configured GitHub Actions to gate pull requests on retrieval quality regressions (nDCG@5, Recall@5).",
      "Enforced strict citation constraints on the LLM generation step to ensure all claims are verifiable.",
    ],
    links: [
      {
        label: "Live Demo",
        href: "https://warrant-197958039317.us-central1.run.app",
      },
      {
        label: "Repository",
        href: "https://github.com/dwarakeshbaraneetharan/warrant",
      },
    ],
  },
  {
    slug: "capitalbikeroute",
    index: "03",
    title: "CapitalBikeRoute+",
    kicker: "Constrained micromobility routing",
    year: "2025",
    role: "Author",
    stack: ["Rust", "Python", "FastAPI", "Redis"],
    blurb:
      "A real-time routing engine that formulates the 45-minute bikeshare rental limit as a resource-constrained shortest path problem.",
    accent: "coral",
    seed: 47,
    metrics: [
      { value: "50ms", label: "p99 latency" },
      { value: "O(V log V)", label: "routing complexity" },
      { value: "Live", label: "GBFS sync" },
    ],
    overview:
      "Capital Bikeshare imposes strict 45-minute limits on single rentals, making cross-city commutes logistically painful. Instead of chaining naive API calls, CapitalBikeRoute+ treats this as a resource-constrained shortest path problem. It maintains a live spatial graph of the DC metro area, ingests General Bikeshare Feed Specification (GBFS) updates into Redis to monitor dock availability, and uses a modified graph search in Rust to find the optimal sequence of intermediate docking stations that minimizes overall travel time without violating the rental window.",
    contributions: [
      "Formulated multi-leg routing as a constrained graph search, dynamically penalizing full or empty stations.",
      "Built a streaming ingestion pipeline in Python to keep the dock availability graph synchronized with live GBFS feeds.",
      "Implemented the core routing kernel in Rust to ensure p99 query latencies remain under 50ms.",
      "Exposed the routing engine via a scalable FastAPI backend.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/dwarakeshbaraneetharan" },
    ],
  },
];

export type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  detail: string;
  tag: string;
};

export const timeline: TimelineEntry[] = [
  {
    period: "Sep 2026 → Dec 2027",
    title: "M.S. Computer Science",
    org: "Columbia University",
    detail:
      "Coursework focusing on Networks, Hyperscale & AI Infrastructure, NLP, and Advanced Algorithms.",
    tag: "Next",
  },
  {
    period: "Sep 2024 — Jul 2026",
    title: "Integration Team Lead",
    org: "UMD Loop (University Rover Challenge)",
    detail:
      "Directed a 7-engineer team spanning 6 software subsystems. Authored the ros2_control hardware abstraction layer to synchronize high-level Python vision pipelines with real-time C++ motor controllers for a semi-autonomous Mars rover.",
    tag: "Robotics",
  },
  {
    period: "Aug 2024 — May 2026",
    title: "B.S. Computer Science & Mathematics",
    org: "University of Maryland, College Park",
    detail:
      "Dual degrees in CS (Data Science track) and Math (Statistics track), completed in two years. College Park Scholar (Science, Technology, and Society). 3.75 GPA.",
    tag: "Education",
  },
  {
    period: "May 2025 — Aug 2025",
    title: "Data Engineering Intern",
    org: "Aquil Systems Inc.",
    detail:
      "Architected an automated ETL pipeline extracting REST API payloads into a structured SQL data warehouse, feeding 15+ D3.js visualisations. Built a load-testing harness to validate 1000 RPS sustained throughput.",
    tag: "Industry",
  },
  {
    period: "Dec 2024 — Jan 2025",
    title: "Computer Vision Intern",
    org: "IIT Madras Healthcare Technology Innovation Centre",
    detail:
      "Re-architected a PyTorch-based medical image segmentation pipeline for spinal surgery planning. Accelerated execution by 78% (from 4 hours to 53 minutes) through memory optimizations and parallelized batching, maintaining 99.97% accuracy.",
    tag: "Research",
  },
];

export const capabilities = [
  {
    title: "Cloud & Data Engineering",
    body: "Designing high-throughput ingestion pipelines, reliable data warehouses, and the scalable infrastructure to support them.",
    items: ["AWS", "Snowflake", "Docker", "REST APIs", "SQL", "Redis"],
  },
  {
    title: "Machine Learning & Vision",
    body: "Training predictive models and optimizing heavy inference pipelines for computer vision and NLP workloads.",
    items: ["PyTorch", "TensorFlow", "OpenCV", "YOLOv5", "Pandas"],
  },
  {
    title: "Systems & Robotics",
    body: "Writing tight control loops, concurrent backends, and low-latency hardware integrations.",
    items: ["C++", "Rust", "Python", "Java", "ROS 2"],
  },
  {
    title: "Mathematics",
    body: "Applying theoretical foundations to solve practical optimization and algorithmic challenges.",
    items: ["Statistics", "Data Science", "Cryptography", "Real Analysis"],
  },
];

export const facts = [
  { value: "3.75", label: "GPA" },
  { value: "2", label: "B.S. degrees" },
  { value: "∞", label: "tabs open", isInfinite: true },
  { value: "2", label: "years (B.S.)" },
];
