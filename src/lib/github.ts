type GithubContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

export type GithubContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type GithubContributionWeek = {
  days: GithubContributionDay[];
};

export type GithubContributions = {
  total: number;
  allTimeTotal: number;
  weeks: GithubContributionWeek[];
};

type GithubContributionCalendarResponse = {
  data?: {
    user?: {
      createdAt: string;
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              date: string;
              contributionCount: number;
              contributionLevel: GithubContributionLevel;
            }>;
          }>;
        };
      };
    };
  };
  errors?: unknown[];
};

type GithubContributionCacheEntry = {
  data: GithubContributions;
  expiresAt: number;
};

const cacheTtlMs = 1000 * 60 * 60 * 6;
const fetchTimeoutMs = import.meta.env.DEV ? 1500 : 4000;
const contributionCache = new Map<string, GithubContributionCacheEntry>();
const pendingRequests = new Map<string, Promise<GithubContributions | null>>();
const githubHeaders = (token: string): HeadersInit => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
  "User-Agent": "marlonmartin-portfolio",
});

const contributionLevels: Record<
  GithubContributionLevel,
  GithubContributionDay["level"]
> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

function resolveGithubToken(): string | undefined {
  const token = import.meta.env.GITHUB_TOKEN?.trim();

  if (!token) {
    return undefined;
  }

  return token
    .replace(/^GITHUB_TOKEN=/, "")
    .replace(/^['"]|['"]$/g, "")
    .trim();
}

function getGithubErrorMessages(errors: unknown[] | undefined): string[] {
  return (errors ?? [])
    .map((error) => {
      if (typeof error === "object" && error !== null && "message" in error) {
        const message = (error as { message?: unknown }).message;
        return typeof message === "string" ? message : undefined;
      }

      return undefined;
    })
    .filter((message): message is string => Boolean(message));
}

async function getGithubResponseError(response: Response): Promise<string> {
  const body = await response.text().catch(() => "");

  if (!body) {
    return "No response body";
  }

  try {
    const parsed = JSON.parse(body) as { message?: unknown };
    return typeof parsed.message === "string"
      ? parsed.message
      : "Unknown GitHub error";
  } catch {
    return body.slice(0, 160);
  }
}

export async function getGithubContributions(
  username: string,
): Promise<GithubContributions | null> {
  const token = resolveGithubToken();

  if (!token) {
    console.warn("GitHub contributions unavailable: missing GITHUB_TOKEN");
    return null;
  }

  const cached = contributionCache.get(username);
  const now = Date.now();

  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  const pendingRequest = pendingRequests.get(username);

  if (pendingRequest) {
    return pendingRequest;
  }

  const request = fetchGithubContributions(username, token, cached?.data);
  pendingRequests.set(username, request);

  try {
    return await request;
  } finally {
    pendingRequests.delete(username);
  }
}

async function fetchGithubContributions(
  username: string,
  token: string,
  staleData?: GithubContributions,
): Promise<GithubContributions | null> {
  const abortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort(), fetchTimeoutMs);

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      signal: abortController.signal,
      headers: githubHeaders(token),
      body: JSON.stringify({
        query: `
          query Contributions($username: String!) {
            user(login: $username) {
              createdAt
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                      contributionLevel
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { username },
      }),
    });

    if (!response.ok) {
      console.warn("GitHub contributions request failed", {
        status: response.status,
        statusText: response.statusText,
        error: await getGithubResponseError(response),
      });
      return staleData ?? null;
    }

    const result =
      (await response.json()) as GithubContributionCalendarResponse;
    const calendar =
      result.data?.user?.contributionsCollection?.contributionCalendar;
    const createdAt = result.data?.user?.createdAt;

    if (
      result.errors ||
      !calendar ||
      !createdAt ||
      calendar.weeks.length === 0
    ) {
      console.warn("GitHub contributions returned no calendar", {
        errors: getGithubErrorMessages(result.errors),
        hasCalendar: Boolean(calendar),
        hasCreatedAt: Boolean(createdAt),
        weeks: calendar?.weeks.length ?? 0,
      });
      return staleData ?? null;
    }

    const allTimeTotal = await fetchGithubAllTimeContributionTotal(
      username,
      token,
      new Date(createdAt),
      staleData?.allTimeTotal ?? calendar.totalContributions,
    );

    const data = {
      total: calendar.totalContributions,
      allTimeTotal,
      weeks: calendar.weeks.map((week) => ({
        days: week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: contributionLevels[day.contributionLevel],
        })),
      })),
    };

    contributionCache.set(username, {
      data,
      expiresAt: Date.now() + cacheTtlMs,
    });

    return data;
  } catch (error) {
    console.warn("GitHub contributions fetch crashed", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return staleData ?? null;
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchGithubAllTimeContributionTotal(
  username: string,
  token: string,
  createdAt: Date,
  fallback: number,
): Promise<number> {
  if (Number.isNaN(createdAt.getTime())) {
    return fallback;
  }

  try {
    const totals = await Promise.all(
      getContributionYearRanges(createdAt).map(async ({ from, to }) => {
        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: githubHeaders(token),
          body: JSON.stringify({
            query: `
              query ContributionsTotal($username: String!, $from: DateTime!, $to: DateTime!) {
                user(login: $username) {
                  contributionsCollection(from: $from, to: $to) {
                    contributionCalendar {
                      totalContributions
                    }
                  }
                }
              }
            `,
            variables: { username, from, to },
          }),
        });

        if (!response.ok) {
          throw new Error("GitHub contribution total request failed.");
        }

        const result =
          (await response.json()) as GithubContributionCalendarResponse;

        if (result.errors) {
          throw new Error("GitHub contribution total returned errors.");
        }

        return (
          result.data?.user?.contributionsCollection?.contributionCalendar
            ?.totalContributions ?? 0
        );
      }),
    );

    return totals.reduce((sum, total) => sum + total, 0);
  } catch {
    return fallback;
  }
}

function getContributionYearRanges(
  createdAt: Date,
): Array<{ from: string; to: string }> {
  const now = new Date();
  const startYear = createdAt.getUTCFullYear();
  const endYear = now.getUTCFullYear();
  const ranges: Array<{ from: string; to: string }> = [];

  for (let year = startYear; year <= endYear; year += 1) {
    const from =
      year === startYear ? createdAt : new Date(Date.UTC(year, 0, 1));
    const to =
      year === endYear
        ? now
        : new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999));

    ranges.push({ from: from.toISOString(), to: to.toISOString() });
  }

  return ranges;
}
