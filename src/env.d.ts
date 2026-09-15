/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GITHUB_TOKEN?: string;
  readonly ANTHROPIC_API_KEY?: string;
  readonly MODEL?: string;
  readonly POSTHOG_API_KEY?: string;
  readonly POSTHOG_PROJECT_ID?: string;
  readonly POSTHOG_HOST?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
