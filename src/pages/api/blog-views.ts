import type { APIRoute } from "astro";
import { resolveRuntimeEnv } from "@/lib/agent-runtime";

export const prerender = false;

type PostHogQueryResponse = {
  results?: Array<Array<number | string>>;
};

const cacheHeaders = {
  "Cache-Control": "public, max-age=60, s-maxage=300",
};

export const GET: APIRoute = async ({ request }) => {
  const slug = new URL(request.url).searchParams.get("slug");

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    return new Response(JSON.stringify({ views: null }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...cacheHeaders },
    });
  }

  const runtimeEnv = await resolveRuntimeEnv();
  const apiKey = runtimeEnv.POSTHOG_API_KEY;
  const projectId = runtimeEnv.POSTHOG_PROJECT_ID;
  const host = (runtimeEnv.POSTHOG_HOST ?? "https://us.posthog.com").replace(
    /\/$/,
    "",
  );

  if (!apiKey || !projectId) {
    return new Response(JSON.stringify({ views: null }), {
      headers: { "Content-Type": "application/json", ...cacheHeaders },
    });
  }

  const query = `
    SELECT count() AS views
    FROM events
    WHERE event = 'blog_viewed'
      AND properties.blog_slug = '${slug}'
  `;

  try {
    const response = await fetch(`${host}/api/projects/${projectId}/query/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: { kind: "HogQLQuery", query },
      }),
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ views: null }), {
        status: 502,
        headers: { "Content-Type": "application/json", ...cacheHeaders },
      });
    }

    const data = (await response.json()) as PostHogQueryResponse;
    const rawViews = data.results?.[0]?.[0];
    const views = Number(rawViews);

    return new Response(
      JSON.stringify({ views: Number.isFinite(views) ? views : null }),
      { headers: { "Content-Type": "application/json", ...cacheHeaders } },
    );
  } catch {
    return new Response(JSON.stringify({ views: null }), {
      status: 502,
      headers: { "Content-Type": "application/json", ...cacheHeaders },
    });
  }
};
