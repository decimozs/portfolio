import {
  POLICY_CLASSIFIER_PROMPT,
  type PolicyClassification,
  parsePolicyClassification,
} from "@/lib/agent-governance";

type OllamaChatResponse = {
  message?: { content?: string };
};

const OLLAMA_ENDPOINT = "https://ollama.com/api/chat";

function sanitizeAssistantContent(content: string): string {
  return content
    .replace(/—/g, "-")
    .replace(/```/g, "")
    .replace(/`/g, "")
    .replace(/\|/g, " ")
    .replace(/<\/?script\b[^>]*>/gi, "[removed]");
}

export async function classifyMessage({
  apiKey,
  model,
  message,
}: {
  apiKey: string;
  model: string;
  message: string;
}): Promise<PolicyClassification | null> {
  const response = await fetch(OLLAMA_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      stream: false,
      format: "json",
      messages: [
        { role: "system", content: POLICY_CLASSIFIER_PROMPT },
        { role: "user", content: message },
      ],
    }),
  });

  if (!response.ok) {
    return null;
  }

  const result = (await response.json()) as OllamaChatResponse;
  const content = result.message?.content;
  if (!content) {
    return null;
  }

  return parsePolicyClassification(content, message);
}

export async function requestAgentCompletionStream({
  apiKey,
  model,
  messages,
}: {
  apiKey: string;
  model: string;
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>;
}): Promise<Response> {
  return fetch(OLLAMA_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      stream: true,
      messages,
    }),
  });
}

export function streamOllama(upstream: Response): Response {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body?.getReader();
      if (!reader) {
        controller.close();
        return;
      }

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.length === 0) {
              continue;
            }
            try {
              const parsed = JSON.parse(trimmed) as {
                message?: { content?: string };
                done?: boolean;
              };
              const content = parsed.message?.content;
              if (content) {
                controller.enqueue(
                  encoder.encode(sanitizeAssistantContent(content)),
                );
              }
            } catch {
              // ignore malformed lines
            }
          }
        }
      } catch {
        controller.enqueue(encoder.encode("\n[stream interrupted]"));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
