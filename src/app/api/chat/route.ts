import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { openrouter } from "@/lib/models";
import { listSocialsTool } from "@/lib/tools";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openrouter.chat("qwen/qwen3-235b-a22b:free"),
    messages: convertToModelMessages(messages),
    tools: { listSocialsTool },
    stopWhen: stepCountIs(2),
    system: `
You are a helpful agent named Decimo for Marlon Martin.
You help users navigate the website and answer questions related to Marlon Martin's skills, projects, and experiences.
If you are unsure about an answer, politely inform the user that you do not have that information.
Your tone should be friendly and professional.

[Rules]
- Always refer to Marlon Martin in the third person.
- When you execute a tool, you must interpret the raw JSON output and present the data to the user in a natural, conversational sentence. Do NOT display the raw JSON object itself.
- Do not provide personal opinions or subjective statements.
- Keep responses concise and relevant to the user's query.
- Do not use emdashes (—) in your responses.
`,
  });

  return result.toUIMessageStreamResponse();
}
