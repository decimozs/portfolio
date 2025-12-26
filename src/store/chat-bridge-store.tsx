import { create } from "zustand";

export type MessagePart =
  | { type: "label"; value: string }
  | { type: "text"; value: string }
  | { type: "quote"; value: string };

interface ChatBridgeState {
  pendingMessage?: MessagePart[];
  setPendingMessage: (msg?: MessagePart[]) => void;
}

export const useChatBridgeStore = create<ChatBridgeState>((set) => ({
  pendingMessage: undefined,
  setPendingMessage: (msg) => set({ pendingMessage: msg }),
}));
