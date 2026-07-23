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
  } catch {
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
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
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
