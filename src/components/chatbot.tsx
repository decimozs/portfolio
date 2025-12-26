"use client";

import { useChat } from "@ai-sdk/react";
import { ArrowUpRight, Minimize2, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { parseUserMessage } from "@/lib/utils";
import { useChatBridgeStore } from "@/store/chat-bridge-store";
import { useLayoutStore } from "@/store/layout-store";
import Markdown from "./markdown";

export default function Chatbot() {
  const [input, setInput] = React.useState("");
  const {
    messages,
    sendMessage,
    status,
    error,
    setMessages,
    clearError,
    stop,
  } = useChat();
  const showStreamingPulse = status === "submitted";
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const { toggleSidebar, isSidebarOpen } = useLayoutStore();
  const toggleChatbot = isSidebarOpen ? "fixed" : "hidden";
  const isInputEmpty = input.trim().length === 0;
  const { pendingMessage, setPendingMessage } = useChatBridgeStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    if (!pendingMessage) return;

    const text = pendingMessage
      .map((part) => {
        if (part.type === "label") return `__LABEL__${part.value}`;
        if (part.type === "quote") return `__QUOTE__${part.value}`;
        return `__TEXT__${part.value}`;
      })
      .join("\n");

    sendMessage({ text });

    setPendingMessage(undefined);
  }, [pendingMessage, sendMessage, setPendingMessage]);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, status]);

  React.useEffect(() => {
    console.log(messages);
  }, [messages]);

  React.useLayoutEffect(() => {
    if (isSidebarOpen) {
      requestAnimationFrame(() => {
        scrollToBottom();
      });
    }
  }, [isSidebarOpen]);

  const toggleOpen = () => {
    toggleSidebar();
  };

  return (
    <div className="select-none">
      <button
        className="cursor-pointer rounded-full bg-white size-12 fixed bottom-4 right-4 border-2 border-accent md:hidden"
        onClick={toggleOpen}
      >
        <Image
          src="/cartoon.jpg"
          alt="chatbot logo"
          width={100}
          height={100}
          className="relative rounded-full"
        />
      </button>
      <button
        className="hidden cursor-pointer text-muted-foreground bg-white p-4 hover:text-black hover:under md:block md:fixed md:bottom-0 md:right-0"
        onClick={toggleOpen}
      >
        Agent
      </button>
      <div
        className={`${toggleChatbot} select-none z-50 top-0 right-0 h-screen w-full bg-white p-4 flex flex-col gap-4 text-lg lg:text-2xl lg:w-[800px] lg:border lg:border-l-accent`}
      >
        <div className="flex flex-row items-center justify-between md:w-[500px] md:mx-auto lg:w-full lg:mx-0">
          <div className="flex flex-row items-center gap-4">
            <p>{messages.length === 0 ? "Agent" : "Decimo"}</p>
            {messages.length > 0 && (
              <>
                <p>/</p>
                <button
                  onClick={() => {
                    stop();
                    clearError();
                    setMessages([]);
                  }}
                >
                  <p className="cursor-pointer hover:underline">Clear Chat</p>
                </button>
              </>
            )}
          </div>
          <Minimize2
            size={20}
            onClick={toggleOpen}
            className="cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto flex-1 md:w-[500px] md:mx-auto lg:mx-0 lg:w-full">
          {messages.length > 0 ? (
            messages.map((message) => {
              return (
                <div key={message.id} className="whitespace-pre-wrap">
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <div
                            className="flex flex-col"
                            key={`${message.id}-${i}`}
                          >
                            {message.role !== "user" && (
                              <div className="grid grid-cols-[40px_1fr] gap-4">
                                <div className="size-10">
                                  <Image
                                    src="/cartoon.jpg"
                                    alt="chatbot logo"
                                    width={100}
                                    height={100}
                                    className="relative rounded-full mt-1"
                                  />
                                </div>
                                <div className="mr-14">
                                  <Markdown content={part.text} />
                                </div>
                              </div>
                            )}

                            {message.role === "user" && (
                              <div className="flex flex-row items-center justify-end text-right">
                                <div
                                  key={`${message.id}-${i}`}
                                  className="px-4 py-2 bg-accent ml-14"
                                >
                                  <div className="flex flex-col gap-2">
                                    {parseUserMessage(part.text).map(
                                      (chunk, idx) => {
                                        switch (chunk.type) {
                                          case "label":
                                            return (
                                              <p
                                                key={idx}
                                                className="text-sm uppercase opacity-60"
                                              >
                                                {chunk.value}
                                              </p>
                                            );

                                          case "quote":
                                            return (
                                              <blockquote
                                                key={idx}
                                                className="border-l-4 border-black pl-4 italic opacity-90 break-all"
                                              >
                                                “{chunk.value}”
                                              </blockquote>
                                            );

                                          default:
                                            return (
                                              <p key={idx}>{chunk.value}</p>
                                            );
                                        }
                                      },
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              );
            })
          ) : (
            <div className="flex flex-col gap-4 items-center justify-center h-full text-center -mt-12">
              <div className="w-full lg:w-[500px]">
                <p className="text-2xl mb-2">Hello, I'm Decimo!</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage({ text: input });
                    setInput("");
                  }}
                  className="w-full mt-auto grid grid-cols-[1fr_55px] gap-2 md:w-[500px] md:mx-auto lg:mx-0 lg:w-full"
                >
                  <textarea
                    className="w-full border border-accent px-4 py-2 mb-auto"
                    value={input}
                    placeholder="Ask me anything about Marlon"
                    onChange={(e) => setInput(e.currentTarget.value)}
                    disabled={status === "submitted"}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (!input.trim()) return;
                        sendMessage({ text: input });
                        setInput("");
                      }
                    }}
                  />
                  <button
                    className="cursor-pointer bg-accent flex items-center justify-center mb-auto w-[50px] h-[50px]"
                    type="submit"
                    disabled={isInputEmpty}
                  >
                    <ArrowUpRight
                      size={25}
                      className={`${isInputEmpty && "text-black"}`}
                    />
                  </button>
                </form>
              </div>
              <div className="text-sm flex flex-row gap-2 flex-wrap items-center justify-center">
                <button
                  className="px-4 py-2 bg-accent cursor-pointer"
                  onClick={() =>
                    sendMessage({ text: "Summarize his portfolio" })
                  }
                >
                  Summarize his portfolio
                </button>
                <button
                  className="px-4 py-2 bg-accent cursor-pointer"
                  onClick={() =>
                    sendMessage({ text: "What are Marlon's skills?" })
                  }
                >
                  What is his most relevant works?
                </button>
                <button
                  className="px-4 py-2 bg-accent cursor-pointer"
                  onClick={() =>
                    sendMessage({ text: "What are Marlon's socials?" })
                  }
                >
                  What is his socials?
                </button>
              </div>
            </div>
          )}

          {showStreamingPulse && (
            <div className="grid grid-cols-[40px_1fr] gap-4">
              <div className="size-10">
                <Image
                  src="/cartoon.jpg"
                  alt="chatbot logo"
                  width={100}
                  height={100}
                  className="relative rounded-full mt-1"
                />
              </div>
              <div className="text-black -mt-1">
                <p className="animate-pulse text-2xl font-bold rounded-full">
                  ...
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="grid grid-cols-[40px_1fr] gap-4">
              <div className="size-10">
                <Image
                  src="/cartoon.jpg"
                  alt="chatbot logo"
                  width={100}
                  height={100}
                  className="relative rounded-full mt-1"
                />
              </div>
              <div>
                <p>Decimo is currently offline.</p>
                <p>
                  I apologize for the inconvenience. While the system is being
                  resolved, you can explore the portfolio directly.
                </p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
        {messages.length > 0 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage({ text: input });
              setInput("");
            }}
            className="w-full mt-auto grid grid-cols-[1fr_55px] gap-2 md:w-[500px] md:mx-auto lg:mx-0 lg:w-full"
          >
            <textarea
              className="w-full border border-accent px-4 py-2 mb-auto"
              value={input}
              placeholder="Ask me anything about Marlon"
              onChange={(e) => setInput(e.currentTarget.value)}
              disabled={status === "submitted"}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (!input.trim()) return;
                  sendMessage({ text: input });
                  setInput("");
                }
              }}
            />
            {status === "submitted" ? (
              <button
                className="cursor-pointer bg-accent flex items-center justify-center mb-auto w-[50px] h-[50px]"
                type="button"
                onClick={() => stop()}
              >
                <X size={25} />
              </button>
            ) : (
              <button
                className="cursor-pointer bg-accent flex items-center justify-center mb-auto w-[50px] h-[50px]"
                type="submit"
                disabled={isInputEmpty}
              >
                <ArrowUpRight
                  size={25}
                  className={`${isInputEmpty && "text-black"}`}
                />
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
