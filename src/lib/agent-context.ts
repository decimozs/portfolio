import { getCollection } from "astro:content";
import { parse as parseYaml } from "yaml";
import resumeYamlRaw from "../../resume/data.yaml?raw";

type ResumeProfile = {
  name: string;
  location: string;
  portfolio_url: string;
  github_url: string;
  linkedin_url: string;
};

type ResumeExperience = {
  title: string;
  org: string;
  date: string;
  bullets: string[];
};

type ResumeActivity = {
  name: string;
  role: string;
  date: string;
  bullets: string[];
};

type ResumeSkill = {
  label: string;
  value: string;
};

type ResumeEducation = {
  school: string;
  date: string;
  program: string;
  awards: string[];
};

type ResumeData = {
  profile: ResumeProfile;
  experience: ResumeExperience[];
  activities: ResumeActivity[];
  skills: ResumeSkill[];
  education: ResumeEducation[];
};

const resumeData = parseYaml(resumeYamlRaw) as ResumeData;

function formatList(items: string[] | undefined): string {
  return items?.filter(Boolean).join(", ") || "Not specified";
}

async function formatContributionsContext(): Promise<string | null> {
  const contributions = await getCollection("companyContributions");
  if (!contributions.length) return null;

  return contributions
    .map(
      (item) =>
        `- ${item.data.company}:\n${item.data.contributions.map((c) => `  - ${c}`).join("\n")}`,
    )
    .join("\n");
}

function formatProfile(): string {
  const profile = resumeData.profile;
  return `${profile.name}${profile.location ? `, ${profile.location}` : ""}
Portfolio: ${profile.portfolio_url ?? "Not specified"}
GitHub: ${profile.github_url ?? "Not specified"}
LinkedIn: ${profile.linkedin_url ?? "Not specified"}`;
}

function formatExperience(): string {
  return resumeData.experience
    .map(
      (experience) =>
        `- ${experience.title} at ${experience.org} (${experience.date})\n${experience.bullets.map((b) => `  - ${b}`).join("\n")}`,
    )
    .join("\n");
}

async function formatProjects(): Promise<string> {
  const works = await getCollection("works");
  return works
    .map((work) => {
      const links = [
        work.data.link,
        ...(work.data.highlights?.map((h) => h.href) ?? []),
      ].filter(Boolean);
      const awards = work.data.awards?.map(
        (a) => `${a.place}, ${a.event} (${a.date})`,
      );
      return `- ${work.data.title} (${work.data.date.toISOString().slice(0, 10)}): ${work.data.description} Technologies: ${formatList(work.data.category)} Links: ${formatList(links)} Awards: ${formatList(awards)} Highlights: ${formatList(work.data.highlights?.map((h) => h.text))}`;
    })
    .join("\n");
}

async function formatNotebooks(): Promise<string> {
  const notebooks = await getCollection("notebooks");
  return notebooks
    .map(
      (notebook) =>
        `- ${notebook.data.title} (${notebook.data.date.toISOString().slice(0, 10)}): ${notebook.data.description} Topics: ${formatList(notebook.data.category)} Links: ${formatList(notebook.data.links.map((l) => l.href))}`,
    )
    .join("\n");
}

function formatActivities(): string {
  return resumeData.activities
    .map(
      (activity) =>
        `- ${activity.name}${activity.role ? `, ${activity.role}` : ""}${activity.date ? ` (${activity.date})` : ""}\n${activity.bullets.map((b) => `  - ${b}`).join("\n")}`,
    )
    .join("\n");
}

function formatSkills(): string {
  return resumeData.skills
    .map((skill) => `- ${skill.label}: ${skill.value}`)
    .join("\n");
}

function formatEducation(): string {
  return resumeData.education
    .map(
      (item) =>
        `- ${item.school}${item.program ? `, ${item.program}` : ""} (${item.date}). Awards: ${formatList(item.awards)}`,
    )
    .join("\n");
}

export async function getAgentContext(): Promise<string> {
  const [projects, notebooks, contributionsText] = await Promise.all([
    formatProjects(),
    formatNotebooks(),
    formatContributionsContext(),
  ]);

  return `BEGIN PORTFOLIO FACTS

PROFILE
${formatProfile()}

EXPERIENCE
${formatExperience()}

PROJECTS
${projects}

NOTEBOOKS AND EXPERIMENTS
${notebooks}

ACTIVITIES
${formatActivities()}

SKILLS
${formatSkills()}

EDUCATION
${formatEducation()}

COMPANY CONTRIBUTIONS
${contributionsText ?? "No contributions documented."}
Company contributions listed above may span multiple roles at the same company.

END PORTFOLIO FACTS`;
}
