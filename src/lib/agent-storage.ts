import { maskSensitiveText } from "@/lib/agent-governance";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

const STORAGE_KEY = "agent-chat:v1";
const STORAGE_VERSION = 1;
const MAX_STORED_MESSAGES = 50;

type StoredChat = {
  version: number;
  updatedAt: number;
  messages: ChatMessage[];
};

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const candidate = value as { role?: unknown; content?: unknown };
  return (
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string"
  );
}

export function loadMessages(): ChatMessage[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as Partial<StoredChat>;
    if (
      !parsed ||
      parsed.version !== STORAGE_VERSION ||
      !Array.isArray(parsed.messages)
    ) {
      return [];
    }

    return sanitizeMessages(parsed.messages.filter(isChatMessage)).slice(
      -MAX_STORED_MESSAGES,
    );
  } catch {
    return [];
  }
}

export function saveMessages(messages: ChatMessage[]): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const payload: StoredChat = {
      version: STORAGE_VERSION,
      updatedAt: Date.now(),
      messages: sanitizeMessages(messages).slice(-MAX_STORED_MESSAGES),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // storage unavailable or quota exceeded - fail silently
  }
}

function sanitizeMessages(messages: ChatMessage[]): ChatMessage[] {
  return messages.map((message) => ({
    ...message,
    content:
      message.role === "user"
        ? maskSensitiveText(message.content).text
        : message.content,
  }));
}

export function clearMessages(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
