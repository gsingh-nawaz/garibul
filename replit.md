# Garibul Singh Portfolio

An AI & Automation Engineer portfolio website with a dark industrial aesthetic — cinematic hero, Three.js neural lattice, horizontal scroll project showcase, terminal-inspired contact form, and full animation suite.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/portfolio run dev` — run the portfolio frontend
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite (artifacts/portfolio), Framer Motion, Three.js + React Three Fiber + Drei, GSAP + ScrollTrigger, Lenis
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/portfolio/src/pages/Home.tsx` — main single-page layout, all sections wired
- `artifacts/portfolio/src/components/` — section components (Navbar, Hero, Showcase, Core, About, Services, Contact)
- `artifacts/portfolio/src/components/3d/` — Three.js scenes (HeroScene, CoreScene)
- `artifacts/portfolio/src/index.css` — theme variables (dark industrial, Cobalt + Phosphor Green)
- `lib/api-spec/openapi.yaml` — API contract (health + contact submission)
- `lib/db/src/schema/contact.ts` — contact_submissions table schema
- `artifacts/api-server/src/routes/contact.ts` — POST /api/contact route

## Architecture decisions

- Three.js scenes are lazy-loaded via React.lazy + Suspense with a WebGL availability check before mount — prevents sandbox/no-GPU environments from crashing the whole page
- WebGLErrorBoundary class component wraps all Canvas elements as a secondary safety net
- Contact form wired to useSubmitContact (Orval-generated mutation) → stores to PostgreSQL
- GSAP ScrollTrigger handles horizontal scroll pinning for the project showcase on desktop; mobile gets vertical stacked cards
- Lenis smooth scroll initialized in a top-level useEffect and torn down on unmount

## Product

Single-page portfolio for Garibul Singh, AI & Automation Engineer. Sections: Hero (neural lattice + cinematic headline), Project Showcase (4 system cards), Interactive Core (3D icosahedron), About (bio + stats + skills), Services (4 glassmorphism cards), Contact (terminal form → DB storage).

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Three.js WebGL will not render in the Replit sandboxed preview iframe (no GPU access). It renders correctly in a real browser. The site degrades gracefully via isWebGLAvailable() check.
- Always run `pnpm --filter @workspace/api-spec run codegen` after changing openapi.yaml before using updated types.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
