import type { APIRoute } from "astro";
import { handleAgentRequest, methodNotAllowedResponse } from "@/lib/agent-turn";

export const prerender = false;

export const POST: APIRoute = ({ request }) => handleAgentRequest(request);

export const ALL: APIRoute = () => methodNotAllowedResponse();
