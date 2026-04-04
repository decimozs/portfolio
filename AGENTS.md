# AGENTS.md – Agentic Coding Guidelines

Use this playbook to match the maintainer's expectations when editing the portfolio.

## 1. Project Snapshot
- Astro 6.x, React 19, TypeScript, Tailwind v4, Bun package manager.
- Repo root: `/home/decimo/portfolio/portfolio`. All paths below are relative to this directory.
- Hosting: Cloudflare Pages (static output via `astro build`).

## 2. Directory Landmarks
- `src/pages` – Astro page routes (`index.astro`, `works.astro`, `experience.astro`, `notebooks.astro`).
- `src/layouts` – Page layouts (`Layout.astro`).
- `src/components` – UI components (React `.tsx`, Astro `.astro`).
- `src/lib` – Utilities (`utils.ts`, `seo.ts`, `constant.ts`).
- `src/content` – Content collections (`works.json`, `experience.json`, `notebooks.json`).
- `src/styles` – Global styles (`globals.css`).
- Config roots: `biome.json`, `astro.config.mjs`, `tsconfig.json`, `lefthook.yml`.

## 3. Commands & Tooling
- Install deps: `bun install --frozen-lockfile` (CI uses the same flag).
- Dev server: `bun run dev` → http://localhost:4321.
- Production build: `bun run build`; preview with `bun run preview`.
- Format: `bun run format`; lint: `bun run lint`; combined health check: `bun run check`.
- Biome CI (for CI/CD): `bun run biome ci` - must pass before push.
- Pre-push helper: `bun run prepush` mirrors CI (format + lint + check).
- Tests: Not yet authored. When adding Vitest, run `bun vitest run` or for single file: `bun vitest run src/path/to/file.test.ts`.

## 4. Git Workflow Expectations
- Git hooks powered by Lefthook run Biome checks on staged files; let them finish and fix surfaced issues locally.
- Never rewrite history for others; avoid `git push --force` unless a maintainer asks.
- Keep commits scoped; run `bun run check` before staging to avoid hook failures.

## 5. Continuous Integration Awareness
- `.github/workflows/ci.yml` defines two jobs: `build` (bun install → bun run build) and `quality` (Biome CI mode).
- Match CI locally by executing `bun run build` and `bun run check`.

## 6. Dependencies & Polyfills
- Core runtime: modern browsers + Node 22+. Avoid features needing polyfills unless Astro already ships them.
- Styling relies on Tailwind v4 tokens; do not reintroduce legacy directives.

## 7. Formatting & Static Analysis
- Biome enforces formatting, linting, and import ordering. Do not fight the tool; rerun formatters after structural edits.
- Prefer ASCII characters unless a file already contains Unicode.
- Keep files focused; extract helpers into `src/lib` or `src/components`.

## 8. TypeScript Discipline
- Entire codebase is strict TypeScript; never fall back to `.js` or implicit `any`.
- Annotate public function signatures, component props, and exported helpers.
- Favor `type` aliases for object shapes; use `interface` only when extension via `extends` is intentional.
- Use literal types and discriminated unions for component variants instead of enums.
- Prefer `unknown` over `any` for untrusted data; narrow via type guards.

## 9. Imports & Module Structure
- Path alias `@/*` maps to `src/*`; always use it instead of long relative chains.
- Import order: (1) React, (2) external npm packages, (3) alias imports, (4) relative imports, (5) type-only imports with `type` modifier.
- Group side-effect imports (CSS/fonts) at the very top and keep them minimal.
- Never use default exports for hooks/utilities; named exports ease tree-shaking.

## 10. Naming Conventions
- Components: PascalCase files + exports (e.g., `Header.tsx`, `Nav.astro`).
- Hooks: camelCase with `use` prefix, one hook per file when possible.
- Utilities/constants: camelCase or SCREAMING_SNAKE_CASE for shared config.
- Astro pages under `src/pages` follow folder routing; keep route segment names lowercase.

## 11. Component Authoring Patterns
- Default to server components; add `"use client"` only when a hook, event handler, or browser API demands it.
- Keep components small; lift reusable visuals into `src/components` and compose them in route files.
- Always merge class names via `cn()` from `@/lib/utils` to avoid conflicting Tailwind tokens.
- Accept `className` passthrough props on reusable components.

## 12. Tailwind & Styling Guidance
- Tailwind v4 uses CSS variables; stick with official token classes and avoid arbitrary color literals.
- Follow the zinc-centric palette; introduce new scales only after checking for clashes in `globals.css`.
- Use CSS modules or inline styles only when Tailwind cannot express the requirement.
- Animations should be purposeful; keep them declared via Tailwind utilities or small keyframes in `globals.css`.

## 13. State, Data, and Async Workflows
- Prefer Astro pages + data fetching in frontmatter.
- Client state should live inside hooks; avoid prop drilling.
- Handle loading placeholders using lightweight components.

## 14. Error Handling Expectations
- Wrap async client logic in `try/catch`; return fallback UI instead of unhandled errors.
- Log developer-facing errors via `console.error`; avoid exposing stack traces to the UI.
- Provide friendly messages or states for user-visible surfaces.

## 15. Accessibility & Semantics
- Favor semantic tags (`header`, `main`, `section`, `nav`) and maintain proper heading hierarchy.
- Icon-only buttons require `aria-label`; interactive SVGs need `role="img"`.
- Ensure focus states remain visible; rely on `focus-visible` utilities.
- Support keyboard navigation and respect reduced-motion preferences.

## 16. Security & Secrets
- Never commit `.env*` files or tokens; use environment variables.
- Use placeholder strings in code and document required keys in PR descriptions.
- Review diffs for accidental credential exposure before pushing.

## 17. Final Checklist Before Hand-off
- Code formatted via Biome (`bun run format` or hook output clean).
- `bun run check` passes locally.
- Build executed (`bun run build`).
- Explained changes clearly in commit message.
- No secrets or credentials in diffs.

## 18. Cursor / Copilot Rules
- No `.cursor/rules` or `.github/copilot-instructions.md` files exist; follow this AGENTS guide as the source of truth.

## 19. Troubleshooting
- `bun run dev` fails → clear `dist/` and rerun `bun install --frozen-lockfile`.
- Styling looks inconsistent → rerun `bun run format`.
- Biome CI fails → run `bun run biome check --write` to auto-fix, then `bun run biome ci`.
- Build fails in CI but not locally → verify using Bun >=1.1.

## 20. Code Style Quick Reference
- Use Biome for formatting/linting: run `bun run check` before commits.
- TypeScript strict mode: avoid `any`, use proper types.
- Tailwind: use semantic classes, avoid arbitrary values.
- Accessibility: semantic HTML, aria-labels, keyboard nav.
- Commits: conventional format (`feat:`, `fix:`, `docs:`, `refactor:`, `ui:`, etc.).

Operating with these guardrails keeps contributions consistent and CI-friendly. Update this document whenever tooling or expectations evolve.
