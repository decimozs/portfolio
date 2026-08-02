import {
  POLICY_CLASSIFIER_PROMPT,
  type PolicyClassification,
  parsePolicyClassification,
} from "@/lib/agent-governance";

type AnthropicMessageResponse = {
  content?: Array<{ text?: string }>;
};

const ANTHROPIC_ENDPOINT = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";

function getAnthropicHeaders(apiKey: string): HeadersInit {
  return {
    "anthropic-version": ANTHROPIC_VERSION,
    "content-type": "application/json",
    "x-api-key": apiKey,
  };
}

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
  const response = await fetch(ANTHROPIC_ENDPOINT, {
    method: "POST",
    headers: getAnthropicHeaders(apiKey),
    body: JSON.stringify({
      model,
      max_tokens: 256,
      system: POLICY_CLASSIFIER_PROMPT,
      messages: [{ role: "user", content: message }],
    }),
  });

  if (!response.ok) {
    return null;
  }

  const result = (await response.json()) as AnthropicMessageResponse;
  const content = result.content
    ?.filter((block) => typeof block.text === "string")
    .map((block) => block.text)
    .join("");
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
  return fetch(ANTHROPIC_ENDPOINT, {
    method: "POST",
    headers: getAnthropicHeaders(apiKey),
    body: JSON.stringify({
      model,
      max_tokens: 2048,
      stream: true,
      system: messages.find((message) => message.role === "system")?.content,
      messages: messages
        .filter((message) => message.role !== "system")
        .map(({ role, content }) => ({ role, content })),
    }),
  });
}

export function streamAnthropic(upstream: Response): Response {
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
          const events = buffer.split("\n\n");
          buffer = events.pop() ?? "";

          for (const event of events) {
            const data = event
              .split("\n")
              .find((line) => line.startsWith("data: "))
              ?.slice("data: ".length);
            if (!data) {
              continue;
            }
            try {
              const parsed = JSON.parse(data) as {
                delta?: { type?: string; text?: string };
              };
              const content =
                parsed.delta?.type === "text_delta"
                  ? parsed.delta.text
                  : undefined;
              if (content) {
                controller.enqueue(
                  encoder.encode(sanitizeAssistantContent(content)),
                );
              }
            } catch {
              // Ignore malformed SSE events.
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
