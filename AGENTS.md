# AGENTS.md – Agentic Coding Guidelines

Use this playbook to match the maintainer's expectations when editing the portfolio.

## 1. Project Snapshot
- Next.js 16, React 19, TypeScript, Tailwind v4, shadcn/ui, Bun package manager.
- Repo root: `/home/decimo/portfolio/portfolio`. All paths below are relative to this directory.
- Hosting assumptions: static export is not used; rely on `next build` + `next start` semantics.

## 2. Directory Landmarks
- `src/app` – App Router entrypoints (`page.tsx`, `layout.tsx`, section routes, global styles).
- `src/components` – UI primitives plus shadcn-generated components; colocate stories/demos nearby.
- `src/lib` – Utilities (`utils.ts`, `seo.ts`, `constant.ts`).
- `src/hooks` – Custom hooks only; no shared state containers elsewhere.
- Config roots: `biome.json`, `tsconfig.json`, `lefthook.yml`, `next.config.ts`, `components.json`.

## 3. Commands & Tooling
- Install deps: `bun install --frozen-lockfile` (CI uses the same flag).
- Dev server: `bun run dev` → http://localhost:3000.
- Production build: `bun run build`; preview with `bun run start`.
- Format: `bun run format`; lint: `bun run lint`; combined health check: `bun run check` (run before every commit/push).
- Pre-push helper: `bun run prepush` mirrors CI (format + lint + check).
- Tests are not yet authored; when adding Vitest tests run `bun vitest run` and for a single file use `bun vitest run src/path/to/file.test.ts`.

## 4. Git Workflow Expectations
- Git hooks powered by Lefthook run Biome checks on staged files; let them finish and fix surfaced issues locally.
- Never rewrite history for others; avoid `git push --force` unless a maintainer asks.
- Keep commits scoped; run `bun run check` before staging to avoid hook failures.

## 5. Continuous Integration Awareness
- `.github/workflows/ci.yml` defines two jobs: `build` (bun install → bun run build) and `quality` (Biome CI mode).
- Match CI locally by executing `bun run build` and `bun run check` when touching framework-level code.

## 6. Dependencies & Polyfills
- Core runtime: modern browsers + Node 20+. Avoid features needing polyfills unless Next.js already ships them.
- Styling relies on Tailwind v4 tokens; do not reintroduce legacy directives (`@tailwind base` etc.).

## 7. Formatting & Static Analysis
- Biome enforces formatting, linting, and import ordering. Do not fight the tool; rerun formatters after structural edits.
- Prefer ASCII characters unless a file already contains Unicode (e.g., typography samples).
- Keep files focused; extract helpers into `src/lib` or `src/components` instead of large monoliths.

## 8. TypeScript Discipline
- Entire codebase is strict TypeScript; never fall back to `.js` or implicit `any`.
- Annotate public function signatures, component props, and exported helpers.
- Favor `type` aliases for object shapes; use `interface` only when extension via `extends` is intentional.
- Use literal types and discriminated unions for component variants instead of enums unless serialization is required.
- Prefer `unknown` over `any` for untrusted data; narrow via type guards in utilities.

## 9. Imports & Module Structure
- Path alias `@/*` maps to `src/*`; always use it instead of long relative chains.
- Import order enforced by Biome: (1) React/Next, (2) external npm packages, (3) alias imports, (4) relative imports, (5) type-only imports with the `type` modifier.
- Group side-effect imports (CSS/fonts) at the very top and keep them minimal.
- Never use default exports for hooks/utilities unless the pattern already exists; named exports ease tree-shaking.

## 10. Naming Conventions
- Components: PascalCase files + exports (e.g., `HeroSection.tsx`).
- Hooks: camelCase with `use` prefix, one hook per file when possible.
- Utilities/constants: camelCase or SCREAMING_SNAKE_CASE for shared config; keep filenames kebab-case unless exporting a React component.
- Pages under `src/app` follow folder routing; keep route segment names lowercase and descriptive.

## 11. Component Authoring Patterns
- Default to server components; add `"use client"` only when a hook, event handler, or browser API demands it.
- Keep components small; lift reusable visuals into `src/components/ui` and compose them in route files.
- Always merge class names via `cn()` from `@/lib/utils` to avoid conflicting Tailwind tokens.
- Accept `className` passthrough props on reusable components and forward refs when wrapping buttons/inputs.

## 12. Tailwind & Styling Guidance
- Tailwind v4 uses CSS variables under the hood; stick with official token classes and avoid arbitrary color literals unless necessary.
- Follow the zinc-centric palette already present; introduce new scales only after checking for clashes in `globals.css`.
- Use CSS modules or inline styles only when Tailwind cannot express the requirement; otherwise stay consistent.
- Animations should be purposeful (page transitions, staggered reveals). Keep them declared via Tailwind utility classes or small keyframes in `globals.css`.

## 13. State, Data, and Async Workflows
- Prefer Server Components + `async` functions for data fetching inside `src/app` routes.
- Client state should live inside hooks; avoid prop drilling by introducing focused hooks (e.g., `usePrefersReducedMotion`).
- When fetching, wrap calls in utilities and surface typed results; consider caching with `react` `cache()` if the pattern emerges.
- Handle loading placeholders (skeletons) using lightweight components under `src/components` for reuse.

## 14. Error Handling Expectations
- Wrap async client logic in `try/catch`; return fallback UI instead of letting components throw unhandled errors.
- Log developer-facing errors via `console.error`; avoid exposing stack traces to the UI.
- Provide friendly messages or states (e.g., “Something went wrong, please retry”) for user-visible surfaces.
- Validate inputs early; prefer zod or lightweight schema helpers when forms are introduced.

## 15. Accessibility & Semantics
- Favor semantic tags (`header`, `main`, `section`, `nav`) and maintain proper heading hierarchy.
- Icon-only buttons require `aria-label`; interactive SVGs need `role="img"` and descriptive titles.
- Ensure focus states remain visible after Tailwind overrides; rely on `focus-visible` utilities instead of removing outlines.
- Support keyboard navigation and respect reduced-motion preferences when adding animations.

## 16. Testing & QA Notes
- No automated tests ship yet, but new code should be written with Vitest + React Testing Library in mind.
- Suggested workflow: create `*.test.ts(x)` beside the unit under test, then run `bun vitest run src/feature/foo.test.ts` for tight loops.
- Before opening a PR: `bun run check`, optional targeted `bun vitest run`, then `bun run build` to ensure Next compiles.

## 17. Performance Mindset
- Avoid next/image misuse: always provide `width`, `height`, and `alt`, and leverage `priority` sparingly.
- Debounce expensive effects, memoize derived data when components become slow, and lean on React Server Components to limit bundle weight.
- Prefer streaming-friendly patterns in `src/app` (loading.tsx, error.tsx) when building new routes.

## 18. Documentation & Comments
- Comment only when intent is non-obvious (algorithmic nuance, design trade-off). Remove stale comments once the code is clear.
- Update this AGENTS guide when introducing new tooling, routes, or rules so future agents stay aligned.

## 19. Cursor / Copilot Rules
- No `.cursor/rules` or `.github/copilot-instructions.md` files exist presently; follow this AGENTS guide as the source of truth.

## 20. Final Checklist Before Hand-off
- ✅ Code formatted via Biome (`bun run format` or hook output clean).
- ✅ `bun run check` passes locally.
- ✅ Relevant builds/tests executed (`bun run build`, targeted `bun vitest run ...`).
- ✅ Explained changes clearly in PR/commit message, referencing affected routes/components.
- ✅ Left hooks/CI green with no skipped steps.

Operating with these guardrails keeps contributions consistent and CI-friendly. Update this document whenever tooling or expectations evolve so every agent starts from the same reliable baseline.

## 21. Runbook: Adding Features
- Start by reading relevant route/component files under `src/app` to mirror tone and structure.
- Create new UI primitives under `src/components/ui` when multiple surfaces will reuse them.
- Update `src/lib/seo.ts` when introducing new pages so metadata stays centralized.
- Extend `src/lib/constants.ts` for reusable copy or data sets rather than inlining JSON in components.
- When touching navigation, confirm header/footer links remain synchronized across server + client components.

## 22. Runbook: Styling Updates
- Inspect `src/app/globals.css` before introducing new CSS variables; prefer layering on existing tokens.
- For Tailwind additions, rely on semantic class names (e.g., `bg-surface/80`) instead of arbitrary hex codes.
- Review responsive behavior with devtools at 360px, 768px, and 1280px breakpoints; adjust using Tailwind's `sm`/`md`/`lg` prefixes.
- Keep animations accessible: pair `motion-safe` utilities with any `animate-` classes applied globally.

## 23. Runbook: Data Fetching & SEO
- Server components can `await` data directly; avoid client-side waterfalls when SSR is available.
- Use `cache()` from React when fetching static data to let Next dedupe requests during render.
- Update `generateMetadata` exports in route segments when copy or imagery changes.
- Ensure Open Graph images exist and reference optimized assets under `public/`.

## 24. Troubleshooting
- `bun run dev` fails immediately → clear `.next/` and rerun `bun install --frozen-lockfile`.
- Styling looks inconsistent → ensure CLI output confirms Tailwind v4 config; rerun `bun run format` if class order drifts.
- Biome errors on commit → use `bun run format && bun run lint` locally, then restage files; hooks rerun automatically.
- Build fails in CI but not locally → confirm using Bun `>=1.1` and rerun `bun run build` without `NEXT_TELEMETRY_DISABLED`.

## 25. Security & Secrets
- Never commit `.env*` files or tokens; the repo intentionally keeps configuration via environment variables.
- Use placeholder strings (e.g., `process.env.NEXT_PUBLIC_...`) in code and document required keys in PR descriptions.
- Review diffs for accidental credential exposure before pushing.

## 26. Documentation Expectations
- Update `README.md` when CLI commands, environment variables, or project positioning change.
- Keep this `AGENTS.md` aligned with actual tooling; outdated guidance is worse than none.
- Document any new scripts added to `package.json`/`bunfig.toml` directly under Commands & Tooling.

## 27. Review Checklist (Quick Reference)
- Files located under correct directories and respect alias imports.
- Types exported for any new utility or component props.
- Tailwind class lists contain no duplicates and leverage `cn()`.
- Components remain pure and idempotent unless using client-side hooks.
- Tests (if added) colocated with implementation and runnable via `bun vitest run path/to/file.test.ts`.

## 28. Future-Proofing Notes
- Prefer configuration-driven approaches (data arrays, maps) so sections scale without structural rewrites.
- When adding motion, derive delays/durations from shared constants for easier tuning.
- Keep asset sizes small; optimize SVGs before committing.
- Monitor Next.js release notes; breaking changes often affect the App Router and metadata exports first.
