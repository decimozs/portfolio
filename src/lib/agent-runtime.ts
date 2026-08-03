export type RuntimeEnv = {
  ANTHROPIC_API_KEY?: string;
  MODEL?: string;
  NEO4J_URI?: string;
  NEO4J_USERNAME?: string;
  NEO4J_PASSWORD?: string;
  NEO4J_DATABASE?: string;
  NEO4J_QUERY_API_URL?: string;
  POSTHOG_API_KEY?: string;
  POSTHOG_PROJECT_ID?: string;
  POSTHOG_HOST?: string;
};

export type AgentGraphConfig = {
  uri?: string;
  username?: string;
  password?: string;
  database?: string;
  queryApiUrl?: string;
};

const DEFAULT_MODEL = "claude-haiku-4-5-20251001";

export async function resolveRuntimeEnv(): Promise<RuntimeEnv> {
  if (import.meta.env.DEV) {
    return import.meta.env;
  }

  try {
    const workerModule = (await import(
      /* @vite-ignore */ "cloudflare:workers"
    )) as { env?: RuntimeEnv };
    return workerModule.env ?? import.meta.env;
  } catch {
    return import.meta.env;
  }
}

export function resolveApiKey(runtimeEnv: RuntimeEnv): string | undefined {
  return runtimeEnv.ANTHROPIC_API_KEY ?? import.meta.env.ANTHROPIC_API_KEY;
}

export function resolveModel(runtimeEnv: RuntimeEnv): string {
  return runtimeEnv.MODEL ?? import.meta.env.MODEL ?? DEFAULT_MODEL;
}

export function resolveGraphConfig(runtimeEnv: RuntimeEnv): AgentGraphConfig {
  return {
    uri: runtimeEnv.NEO4J_URI ?? import.meta.env.NEO4J_URI,
    username: runtimeEnv.NEO4J_USERNAME ?? import.meta.env.NEO4J_USERNAME,
    password: runtimeEnv.NEO4J_PASSWORD ?? import.meta.env.NEO4J_PASSWORD,
    database: runtimeEnv.NEO4J_DATABASE ?? import.meta.env.NEO4J_DATABASE,
    queryApiUrl:
      runtimeEnv.NEO4J_QUERY_API_URL ?? import.meta.env.NEO4J_QUERY_API_URL,
  };
}
