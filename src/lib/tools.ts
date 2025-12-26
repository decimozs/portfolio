import { tool } from "ai";
import z from "zod/v4";
import { socialItems } from "./constant";

export const listSocialsTool = tool({
  description: "List social media profiles for Marlon Martin",
  inputSchema: z.object({}),
  execute: async ({}) => ({
    data: JSON.stringify(socialItems),
  }),
});
