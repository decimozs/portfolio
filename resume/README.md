# Resume

Source of truth for `/resume.pdf`.

- `data.yaml` — all content (experience, projects, skills, education). Edit this.
- `resume.typ` — layout only. No need to touch for content changes.

## Local build

```bash
bun run resume:build   # one-off compile to public/resume.pdf
bun run resume:watch   # recompile on save
```

## Auto-deploy

Pushing a change under `resume/**` to `main` triggers
`.github/workflows/resume.yml`, which recompiles `public/resume.pdf` and
commits it back to `main`. That commit then goes through the site's normal
Cloudflare Pages deploy, so `/resume.pdf` stays in sync automatically.
