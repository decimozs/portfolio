import { ArrowUpRight } from "lucide-react";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { useIsLaptop } from "@/hooks/use-is-laptop";
import {
  type MessagePart,
  useChatBridgeStore,
} from "@/store/chat-bridge-store";
import { useLayoutStore } from "@/store/layout-store";

interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function SelectMenu() {
  const isLaptop = useIsLaptop();
  const [selection, setSelection] = useState<string | undefined>();
  const [position, setPosition] = useState<Position | undefined>();
  const [inputValue, setInputValue] = useState("");
  const { toggleSidebar, isSidebarOpen } = useLayoutStore();
  const { setPendingMessage } = useChatBridgeStore();

  const menuRef = useRef<HTMLDivElement>(null);

  function onSelectStart(e: Event) {
    const target = e.target as Node;

    if (menuRef.current?.contains(target)) {
      return;
    }

    setSelection(undefined);
    setInputValue("");
  }

  function onSelectEnd(event: MouseEvent | Event) {
    const activeSelection = document.getSelection();
    const text = activeSelection?.toString();

    if (menuRef.current && menuRef.current.contains(event.target as Node)) {
      return;
    }

    if (!activeSelection || !text) {
      setSelection(undefined);
      return;
    }

    setSelection(text);

    const rect = activeSelection.getRangeAt(0).getBoundingClientRect();

    setPosition({
      x: rect.right + window.scrollX,
      y: rect.top + window.scrollY,
      width: rect.width,
      height: rect.height,
    });
  }

  useEffect(() => {
    document.addEventListener("selectstart", onSelectStart);
    document.addEventListener("mouseup", onSelectEnd);

    return () => {
      document.removeEventListener("selectstart", onSelectStart);
      document.removeEventListener("mouseup", onSelectEnd);
    };
  }, [selection]);

  const askDecimo = () => {
    if (!selection) return;

    const cleanedSelection = selection.trim().replace(/\n/g, " ");

    const messageParts: MessagePart[] = inputValue.trim()
      ? [
          { type: "label", value: "Context" },
          { type: "text", value: inputValue },
          { type: "quote", value: cleanedSelection },
        ]
      : [
          { type: "label", value: "Question" },
          { type: "text", value: "Can you explain what this means?" },
          { type: "quote", value: cleanedSelection },
        ];

    console.log(messageParts);

    setPendingMessage(messageParts);

    setInputValue("");
    setSelection(undefined);

    if (!isSidebarOpen) {
      toggleSidebar();
    }

    if (!isLaptop) return null;
  };

  return (
    <div role="dialog" aria-labelledby="share" aria-haspopup="dialog">
      {selection && position && (
        <div
          ref={menuRef}
          className="
            absolute -top-2 left-0 w-[600px] bg-white m-0 z-99 select-none"
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          }}
        >
          <div className="flex flex-col gap-2 p-4 border border-accent bg-white">
            <p>Ask Agent</p>
            <div className="flex flex-row items-center gap-2">
              <textarea
                className="w-full border border-accent px-4 py-2"
                placeholder="Explain this..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onMouseDown={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    askDecimo();
                  }
                }}
              />
              <button
                className="cursor-pointer bg-accent flex items-center justify-center mb-auto w-[60px] h-[50px]"
                type="submit"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={askDecimo}
              >
                <ArrowUpRight size={25} />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <p>Highlighted Text</p>
              <p className="text-lg px-4 py-2 bg-accent w-fit break-all">
                {selection}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
