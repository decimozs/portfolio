export type RuntimeEnv = {
  ANTHROPIC_API_KEY?: string;
  MODEL?: string;
  POSTHOG_API_KEY?: string;
  POSTHOG_PROJECT_ID?: string;
  POSTHOG_HOST?: string;
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
