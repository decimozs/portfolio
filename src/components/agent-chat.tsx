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
import { starterPrompts } from "@/lib/constant";
import { saveSurfacePreference } from "@/lib/surface-preference";
import { MarkdownMessage } from "./markdown-message";

const MAX_INPUT_LENGTH = 2000;
const FIRST_TURN_EXIT_MS = 160;
const FIRST_TURN_ENTER_MS = 320;
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

function SurfaceToggle() {
  return (
    <div className="flex w-[205px] flex-row gap-1 bg-accent p-1 text-sm">
      <a
        href="/"
        onClick={() => saveSurfacePreference("web")}
        className="flex-1 px-3 py-1 text-center text-muted-foreground transition-colors duration-200 hover:text-black"
      >
        Web
      </a>
      <a
        href="/agent"
        onClick={() => saveSurfacePreference("agent")}
        className="flex-1 bg-white px-3 py-1 text-center text-black transition-colors duration-200"
      >
        Agent
      </a>
    </div>
  );
}

export function AgentChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firstTurnPhase, setFirstTurnPhase] = useState<
    "idle" | "exiting" | "entering" | "active"
  >("idle");
  const scrollRef = useRef<HTMLDivElement>(null);
  const firstTurnTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const clearFirstTurnTimeout = useCallback(() => {
    if (firstTurnTimeoutRef.current) {
      clearTimeout(firstTurnTimeoutRef.current);
      firstTurnTimeoutRef.current = null;
    }
  }, []);

  // Restore persisted chat after mount (hydration-safe: SSR renders empty).
  useEffect(() => {
    const stored = loadMessages();
    if (stored.length > 0) {
      setMessages(stored);
    }
  }, []);

  useEffect(() => clearFirstTurnTimeout, [clearFirstTurnTimeout]);

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
    clearFirstTurnTimeout();
    setMessages([]);
    setError(null);
    setFirstTurnPhase("idle");
    clearMessages();
  }, [clearFirstTurnTimeout]);

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
      const isFirstTurn = messages.length === 0;

      setInput("");
      setError(null);
      setLoading(true);

      if (isFirstTurn) {
        clearFirstTurnTimeout();
        setFirstTurnPhase("exiting");
        await new Promise((resolve) => {
          firstTurnTimeoutRef.current = setTimeout(resolve, FIRST_TURN_EXIT_MS);
        });
      }

      saveMessages(nextMessages);
      setMessages([...nextMessages, { role: "assistant", content: "" }]);

      if (isFirstTurn) {
        setFirstTurnPhase("entering");
        requestAnimationFrame(() => {
          setFirstTurnPhase("active");
          firstTurnTimeoutRef.current = setTimeout(() => {
            setFirstTurnPhase("idle");
            firstTurnTimeoutRef.current = null;
          }, FIRST_TURN_ENTER_MS);
        });
      }

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
          saveMessages([
            ...nextMessages,
            { role: "assistant", content: assistantContent },
          ]);
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
          saveMessages([
            ...nextMessages,
            { role: "assistant", content: "No response returned." },
          ]);
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
        saveMessages(nextMessages);
        setMessages((prev) => prev.slice(0, -1));
        if (isFirstTurn) {
          clearFirstTurnTimeout();
          setFirstTurnPhase("idle");
        }
      } finally {
        setLoading(false);
        requestAnimationFrame(scrollToBottom);
      }
    },
    [clearFirstTurnTimeout, loading, messages, scrollToBottom],
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      void sendMessage(input);
    },
    [input, sendMessage],
  );

  const hasMessages = messages.length > 0;
  const isFirstTurnEntering =
    firstTurnPhase === "entering" || firstTurnPhase === "active";
  const activeTransitionClass =
    firstTurnPhase === "entering"
      ? "opacity-0 translate-y-3"
      : "opacity-100 translate-y-0";
  const emptyTransitionClass =
    firstTurnPhase === "exiting"
      ? "-translate-y-4 scale-[0.99] opacity-0"
      : "translate-y-0 scale-100 opacity-100";

  const inputForm = (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-row items-end bg-white transition-[gap] duration-200 ease-out motion-reduce:transition-none ${loading ? "gap-0" : "gap-2"} ${hasMessages ? "shrink-0 pt-2 pb-1" : "w-full"}`}
    >
      <label htmlFor="agent-input" className="sr-only">
        Message the agent
      </label>
      <div className="relative min-w-0 flex-1">
        <input
          id="agent-input"
          type="text"
          value={input}
          maxLength={MAX_INPUT_LENGTH}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask me anything about Marlon"
          disabled={loading}
          className="h-12 w-full bg-accent px-4 py-2 pr-11 leading-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:opacity-60"
        />
        {loading ? (
          <Loader2
            className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 animate-spin text-muted-foreground"
            aria-label="Loading response"
          />
        ) : null}
      </div>
      <div
        className={`shrink-0 overflow-hidden transition-all duration-200 ease-out motion-reduce:transition-none ${loading ? "w-0 opacity-0" : "w-[76px] opacity-100"}`}
      >
        <button
          type="submit"
          disabled={loading || input.trim().length === 0}
          tabIndex={loading ? -1 : undefined}
          className="flex h-12 w-full items-center justify-center bg-accent px-4 py-2 leading-none transition-colors duration-200 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:opacity-60"
          aria-label="Send message"
          aria-hidden={loading}
        >
          Send
        </button>
      </div>
    </form>
  );

  return (
    <div
      className={`flex h-full min-h-0 w-full ${hasMessages ? "flex-col" : "items-center justify-center"}`}
    >
      {hasMessages ? (
        <>
          <div
            className={`mb-3 flex shrink-0 flex-row items-center justify-between gap-4 transition-all duration-300 ease-out motion-reduce:transform-none motion-reduce:transition-none ${isFirstTurnEntering ? activeTransitionClass : ""}`}
          >
            <SurfaceToggle />
            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              aria-label="Clear conversation"
              className="cursor-pointer text-muted-foreground transition-colors duration-200 hover:text-black disabled:opacity-60"
            >
              Clear
            </button>
          </div>

          <div
            ref={scrollRef}
            className={`flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pb-4 transition-all duration-300 ease-out motion-reduce:transform-none motion-reduce:transition-none ${isFirstTurnEntering ? activeTransitionClass : ""}`}
            data-lenis-prevent
            aria-live="polite"
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={
                  message.role === "user"
                    ? `${CARD_CLASS} max-w-[85%] self-end`
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
            ))}
          </div>

          {error ? (
            <p className="shrink-0 text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          <div
            className={`shrink-0 transition-all duration-300 ease-out motion-reduce:transform-none motion-reduce:transition-none ${isFirstTurnEntering ? activeTransitionClass : ""}`}
          >
            {inputForm}
          </div>
        </>
      ) : (
        <div
          className={`flex w-full max-w-2xl flex-col items-center gap-5 transition-all duration-200 ease-out motion-reduce:transform-none motion-reduce:transition-none ${emptyTransitionClass}`}
        >
          <SurfaceToggle />
          <p className="max-w-lg text-center text-muted-foreground">
            Ask my agent about my projects, experience, notebooks, and technical
            background.
          </p>

          <div className="flex w-full flex-row flex-wrap justify-center gap-2 text-center text-sm">
            {starterPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => void sendMessage(prompt)}
                disabled={loading}
                className="w-fit bg-accent px-4 py-2 transition-colors duration-200 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:opacity-40"
              >
                {prompt}
              </button>
            ))}
          </div>

          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          {inputForm}
        </div>
      )}
    </div>
  );
}
