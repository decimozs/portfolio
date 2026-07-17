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
  weeks: GithubContributionWeek[];
};

type GithubContributionCalendarResponse = {
  data?: {
    user?: {
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

export async function getGithubContributions(
  username: string,
): Promise<GithubContributions | null> {
  const token = import.meta.env.GITHUB_TOKEN;

  if (!token) {
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
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query Contributions($username: String!) {
            user(login: $username) {
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
      return staleData ?? null;
    }

    const result =
      (await response.json()) as GithubContributionCalendarResponse;
    const calendar =
      result.data?.user?.contributionsCollection?.contributionCalendar;

    if (result.errors || !calendar || calendar.weeks.length === 0) {
      return staleData ?? null;
    }

    const data = {
      total: calendar.totalContributions,
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
  } catch {
    return staleData ?? null;
  } finally {
    clearTimeout(timeout);
  }
}
