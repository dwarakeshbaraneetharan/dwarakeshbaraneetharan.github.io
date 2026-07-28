# dwarakesh.com

Personal portfolio. Live at **[www.dwarakesh.com](https://www.dwarakesh.com)**.

> All copy, projects and metrics are currently **placeholder content**. Swap them
> out in `src/data/content.ts` — that one file drives every page.

## Stack

| Concern     | Choice                                                    |
| ----------- | --------------------------------------------------------- |
| Build       | Vite 8                                                     |
| UI          | React 19 + TypeScript                                      |
| Styling     | Tailwind CSS v4 (CSS-first `@theme` config)                |
| Animation   | Motion for React                                           |
| Scrolling   | Lenis                                                      |
| Routing     | React Router (with a `404.html` fallback for GitHub Pages) |
| Hosting     | GitHub Pages behind Cloudflare                             |

## The theme

A custom palette called **Citrine Void**: a violet-cast near-black lit by acid
citron, with electric violet as a secondary and coral used sparingly. Type pairs
Bricolage Grotesque (display), Instrument Serif (italic accents), Inter Tight
(body) and JetBrains Mono (labels). Tokens live in the `@theme` block at the top
of `src/index.css`.

Nothing on the site is a stored image:

- **`Backdrop.tsx`** — a full-viewport WebGL field. Domain-warped simplex noise
  in a hand-written fragment shader, graded to the palette, leaning toward the
  cursor and shifting as you scroll.
- **`ProjectGlyph.tsx`** — each project's artwork is a harmonograph (two damped
  oscillators per axis) generated deterministically from that project's `seed`.
- **`Attractor.tsx`** — a live Clifford strange attractor on the About page.
  Two orbits, drifting parameters, and hover bends `a` and `b`.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
```

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages. Two things keep the custom domain working:

- `public/CNAME` contains `www.dwarakesh.com` and is copied into every build.
- `vite.config.ts` writes `dist/404.html` as a copy of `index.html`, so deep
  links such as `/work/helix` are handled by the client-side router.

Cloudflare proxies the domain (four `A` records for the apex plus a `www`
CNAME), with SSL/TLS set to **Full**.

## Editing content

- **Projects, timeline, capabilities, bio** — `src/data/content.ts`
- **Colours, type scale, motion easings** — the `@theme` block in `src/index.css`
- **Page structure** — `src/pages/`

Everything respects `prefers-reduced-motion`: the shader renders a single static
frame, the custom cursor is disabled, and reveals resolve instantly.
