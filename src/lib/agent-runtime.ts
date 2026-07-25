export type RuntimeEnv = {
  OLLAMA_API_KEY?: string;
  OLLAMA_MODEL?: string;
  NEO4J_URI?: string;
  NEO4J_USERNAME?: string;
  NEO4J_PASSWORD?: string;
  NEO4J_DATABASE?: string;
  NEO4J_QUERY_API_URL?: string;
};

export type AgentGraphConfig = {
  uri?: string;
  username?: string;
  password?: string;
  database?: string;
  queryApiUrl?: string;
};

const DEFAULT_MODEL = "minimax-m2.5:cloud";

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
  return runtimeEnv.OLLAMA_API_KEY ?? import.meta.env.OLLAMA_API_KEY;
}

export function resolveModel(runtimeEnv: RuntimeEnv): string {
  return (
    runtimeEnv.OLLAMA_MODEL ?? import.meta.env.OLLAMA_MODEL ?? DEFAULT_MODEL
  );
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
