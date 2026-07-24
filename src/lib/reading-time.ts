const WORDS_PER_MINUTE = 200;

export function getReadingTime(content: string): string {
  const words = content
    .replace(/---[\s\S]*?---/, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`~\-[\]()]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const minutes = Math.max(1, Math.ceil(words.length / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}
