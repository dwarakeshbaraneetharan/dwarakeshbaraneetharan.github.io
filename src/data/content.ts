export const profile = {
  name: "Dwarakesh Baraneetharan",
  short: "Dwarakesh",
  initials: "DB",
  role: "Software Engineer & Data Scientist",
  tagline:
    "Building robust data pipelines, intelligent systems, and scalable infrastructure.",
  location: "New York, NY",
  timezone: "America/New_York",
  email: "dwarakesh.b@columbia.edu",
  intro:
    "I recently graduated from the University of Maryland with dual B.S. degrees in Computer Science and Mathematics, and I am currently pursuing an M.S. in Computer Science at Columbia University. My experience spans data engineering for defense contractors, computer vision research for surgical planning, and leading software integration for autonomous Mars rovers.",
  socials: [
    { label: "GitHub", href: "https://github.com/dwarakeshbaraneetharan" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dwarakeshb/" },
    { label: "Email", href: "mailto:dwarakesh.b@columbia.edu" },
  ],
} as const;

export const marqueeTerms = [
  "Data Engineering",
  "Machine Learning",
  "Computer Vision",
  "Cloud Architecture",
  "Robotics (ROS 2)",
  "Systems Engineering",
  "Full-Stack Development",
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
    kicker: "Bikeshare route optimizer",
    year: "2025",
    role: "Author",
    stack: ["Python", "Tkinter", "GeoPy", "OpenRouteService API"],
    blurb:
      "A route optimizer for Capital Bikeshare that mitigates 45-minute rental limits by dynamically calculating optimal intermediate docking stations.",
    accent: "coral",
    seed: 47,
    metrics: [
      { value: "45m", label: "rental constraint" },
      { value: "100%", label: "GBFS integration" },
      { value: "Live", label: "map rendering" },
    ],
    overview:
      "Capital Bikeshare imposes strict 45-minute limits on single rentals, making longer cross-city commutes logistically difficult. CapitalBikeRoute+ solves this by acting as a smart navigation layer. It consumes live GBFS feeds to find active docks, uses haversine distance heuristics to prune the search space, and queries the OpenRouteService API to generate multi-leg routes that keep the rider under the penalty threshold.",
    contributions: [
      "Developed a multi-leg routing algorithm to bypass strict 45-minute interval limits.",
      "Integrated real-time General Bikeshare Feed Specification (GBFS) data for live station status.",
      "Built a desktop GUI using Tkinter with embedded Folium maps for interactive visualization.",
      "Used GeoPy and haversine distance filtering to aggressively prune the graph before external API routing.",
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
      "Led a team of 7 engineers overseeing 6 software subsystems. Built the ros2_control layer synchronizing Python vision with C++ controllers for a semi-autonomous Mars rover.",
    tag: "Robotics",
  },
  {
    period: "Aug 2024 — May 2026",
    title: "B.S. Computer Science & Mathematics",
    org: "University of Maryland, College Park",
    detail:
      "Dual degrees in CS (Data Science track) and Math (Statistics track). College Park Scholar (Science, Technology, and Society). 3.75 GPA.",
    tag: "Education",
  },
  {
    period: "May 2025 — Aug 2025",
    title: "Data Engineering Intern",
    org: "Aquil Systems Inc.",
    detail:
      "Architected a 5-stage pipeline scraping REST APIs into SQL to feed 15+ D3.js visualizations. Built a load-testing framework validating 1000 RPS throughput.",
    tag: "Industry",
  },
  {
    period: "Dec 2024 — Jan 2025",
    title: "Computer Vision Intern",
    org: "IIT Madras Healthcare Technology Innovation Centre",
    detail:
      "Optimized a medical image segmentation pipeline for spinal surgery planning, cutting execution time by 78% (from 4 hours to 53 minutes) while maintaining 99.97% accuracy.",
    tag: "Research",
  },
];

export const capabilities = [
  {
    title: "Cloud & Data Engineering",
    body: "Building scalable ingestion pipelines, structured data warehouses, and resilient infrastructure.",
    items: ["AWS", "Snowflake", "Docker", "REST APIs", "SQL"],
  },
  {
    title: "Machine Learning & Vision",
    body: "Training models and optimizing inference pipelines for medical imaging and object detection.",
    items: ["PyTorch", "TensorFlow", "OpenCV", "YOLOv5", "Pandas"],
  },
  {
    title: "Systems & Robotics",
    body: "Developing tight control loops, hardware integration, and full-stack web applications.",
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
  { value: "2", label: "cloud certs" },
  { value: "1st", label: "Technica hackathon" },
];
