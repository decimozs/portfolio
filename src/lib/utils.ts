import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseUserMessage(text: string) {
  return text.split("\n").map((line) => {
    if (line.startsWith("__LABEL__")) {
      return { type: "label", value: line.replace("__LABEL__", "") };
    }
    if (line.startsWith("__QUOTE__")) {
      return { type: "quote", value: line.replace("__QUOTE__", "") };
    }
    return { type: "text", value: line.replace("__TEXT__", "") };
  });
}
