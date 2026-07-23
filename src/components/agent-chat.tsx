import { Loader2 } from "lucide-react";
import {
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { maskSensitiveText } from "@/lib/agent-governance";
import {
  type ChatMessage,
  clearMessages,
  loadMessages,
  saveMessages,
} from "@/lib/agent-storage";
import { MarkdownMessage } from "./markdown-message";

const MAX_INPUT_LENGTH = 2000;
const CARD_CLASS =
  "px-4 py-2 bg-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400";

const THINKING_PHRASES = [
  "Thinking",
  "Getting Marlon's info",
  "Digging through projects",
  "Reviewing his experience",
  "Skimming the notebooks",
  "Recalling the details",
  "Connecting the dots",
  "Consulting the portfolio",
];

function ThinkingIndicator() {
  const [phrase, setPhrase] = useState(() => THINKING_PHRASES[0]);

  useEffect(() => {
    const pick = () => {
      const next =
        THINKING_PHRASES[Math.floor(Math.random() * THINKING_PHRASES.length)];
      setPhrase(next);
    };
    pick();
    const interval = setInterval(pick, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <p
      className="text-muted-foreground animate-pulse [animation-duration:1.5s]"
      aria-live="polite"
    >
      {phrase}…
    </p>
  );
}

export function AgentChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Restore persisted chat after mount (hydration-safe: SSR renders empty).
  useEffect(() => {
    const stored = loadMessages();
    if (stored.length > 0) {
      setMessages(stored);
    }
  }, []);

  // Persist stable turns, skipping an in-flight empty assistant bubble.
  useEffect(() => {
    if (loading) {
      return;
    }
    const last = messages[messages.length - 1];
    if (last && last.role === "assistant" && last.content.length === 0) {
      return;
    }
    saveMessages(messages);
  }, [messages, loading]);

  const handleClear = useCallback(() => {
    setMessages([]);
    setError(null);
    clearMessages();
  }, []);

  const scrollToBottom = useCallback(() => {
    const node = scrollRef.current;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (trimmed.length === 0 || loading) {
        return;
      }

      const sanitized = maskSensitiveText(trimmed).text;

      const nextMessages: ChatMessage[] = [
        ...messages,
        { role: "user", content: sanitized },
      ];

      setMessages([...nextMessages, { role: "assistant", content: "" }]);
      setInput("");
      setError(null);
      setLoading(true);
      requestAnimationFrame(scrollToBottom);

      try {
        const response = await fetch("/api/agent", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: nextMessages }),
        });

        if (!response.ok || !response.body) {
          const detail = await response.json().catch(() => null);
          throw new Error(detail?.error ?? "The agent could not respond.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          assistantContent += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: assistantContent,
            };
            return updated;
          });
          scrollToBottom();
        }

        if (assistantContent.trim().length === 0) {
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: "No response returned.",
            };
            return updated;
          });
        }
      } catch (err) {
        console.error("Agent request failed", err);
        setError(
          err instanceof Error ? err.message : "The agent could not respond.",
        );
        setMessages((prev) => prev.slice(0, -1));
      } finally {
        setLoading(false);
        requestAnimationFrame(scrollToBottom);
      }
    },
    [loading, messages, scrollToBottom],
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      void sendMessage(input);
    },
    [input, sendMessage],
  );

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (typeof detail === "string") {
        void sendMessage(detail);
      }
    };

    window.addEventListener("agent:prompt", handler);
    return () => window.removeEventListener("agent:prompt", handler);
  }, [sendMessage]);

  return (
    <div className="flex flex-col h-full min-h-0 w-full">
      <div className="shrink-0 mb-1 flex flex-row items-center justify-between gap-4">
        <p>Agent</p>
        {messages.length > 0 ? (
          <button
            type="button"
            onClick={handleClear}
            disabled={loading}
            aria-label="Clear conversation"
            className="underline-animate cursor-pointer"
          >
            Clear
          </button>
        ) : null}
      </div>
      <div
        ref={scrollRef}
        className={`flex flex-col gap-3 ${messages.length === 0 ? "flex-1 lg:flex-none" : "flex-1"} min-h-0 overflow-y-auto pb-4`}
        data-lenis-prevent
        aria-live="polite"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col gap-2 text-muted-foreground">
            <p>
              Ask my agent about my projects, experience, notebooks, and
              technical background.
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={
                message.role === "user"
                  ? `${CARD_CLASS} self-end max-w-[85%]`
                  : "max-w-[85%]"
              }
            >
              {message.role === "user" ? (
                <p className="whitespace-pre-wrap">{message.content}</p>
              ) : message.content ? (
                <MarkdownMessage content={message.content} />
              ) : (
                <ThinkingIndicator />
              )}
            </div>
          ))
        )}
      </div>

      {error ? (
        <p className="text-sm text-red-600 shrink-0" role="alert">
          {error}
        </p>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="flex flex-row gap-2 items-end shrink-0 pt-2 pb-1 bg-white"
      >
        <label htmlFor="agent-input" className="sr-only">
          Message the agent
        </label>
        <input
          id="agent-input"
          type="text"
          value={input}
          maxLength={MAX_INPUT_LENGTH}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask me anything about Marlon"
          disabled={loading}
          className="flex-1 min-w-0 px-4 py-2 bg-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading || input.trim().length === 0}
          className="shrink-0 px-4 py-2 bg-accent transition-colors duration-200 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:opacity-60 flex items-center justify-center h-full"
          aria-label="Send message"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          ) : (
            "Send"
          )}
        </button>
      </form>
    </div>
  );
}
