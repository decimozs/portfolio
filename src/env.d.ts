/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GITHUB_TOKEN?: string;
  readonly OLLAMA_API_KEY?: string;
  readonly OLLAMA_MODEL?: string;
  readonly NEO4J_URI?: string;
  readonly NEO4J_USERNAME?: string;
  readonly NEO4J_PASSWORD?: string;
  readonly NEO4J_DATABASE?: string;
  readonly NEO4J_QUERY_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
