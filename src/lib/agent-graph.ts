type Neo4jConfig = {
  uri?: string;
  username?: string;
  password?: string;
  queryApiUrl?: string;
};

type QueryResponse = {
  data?: {
    fields?: string[];
    values?: unknown[][];
  };
};

type PersonContext = {
  name?: string;
  location?: string;
  portfolio?: string;
  github?: string;
  linkedin?: string;
};

type ProjectContext = {
  name?: string;
  date?: string;
  description?: string;
  technologies?: string[];
  links?: string[];
  awards?: string[];
  highlights?: string[];
};

type NotebookContext = {
  title?: string;
  type?: string;
  date?: string;
  description?: string;
  topics?: string[];
  links?: string[];
};

type PrincipleContext = {
  title?: string;
  category?: string;
  summary?: string;
  beliefs?: string[];
  practices?: string[];
  relatedProjects?: string[];
  relatedNotebooks?: string[];
};

type ExperienceContext = {
  role?: string;
  company?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
};

type ActivityContext = {
  name?: string;
  role?: string;
  date?: string;
};

type SkillCategoryContext = {
  category?: string;
  skills?: string[];
};

type EducationContext = {
  school?: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
  awards?: string[];
};

function getQueryApiUrls(config: Neo4jConfig): string[] {
  const urls = config.queryApiUrl ? [config.queryApiUrl] : [];
  if (!config.uri) {
    return urls;
  }

  const url = new URL(config.uri.replace(/^neo4j\+s:/, "https:"));
  const databaseId = url.hostname.split(".")[0];
  const derivedUrl = `https://${url.hostname}/db/${databaseId}/query/v2`;
  if (!urls.includes(derivedUrl)) {
    urls.push(derivedUrl);
  }

  return urls;
}

async function runQuery<T>(
  config: Neo4jConfig,
  statement: string,
  field: string,
): Promise<T[]> {
  const urls = getQueryApiUrls(config);
  if (urls.length === 0 || !config.username || !config.password) {
    return [];
  }

  for (const url of urls) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Basic ${btoa(`${config.username}:${config.password}`)}`,
      },
      body: JSON.stringify({ statement }),
    }).catch(() => null);

    if (!response?.ok) {
      continue;
    }

    const result = (await response.json()) as QueryResponse;
    const fieldIndex = result.data?.fields?.indexOf(field) ?? -1;
    if (fieldIndex === -1) {
      continue;
    }

    return (result.data?.values ?? [])
      .map((row) => row[fieldIndex] as T | undefined)
      .filter((value): value is T => value !== undefined && value !== null);
  }

  return [];
}

function formatList(items: string[] | undefined): string {
  return items?.filter(Boolean).join(", ") || "Not specified";
}

export async function getAgentGraphContext(
  config: Neo4jConfig,
): Promise<string | null> {
  const [
    people,
    projects,
    notebooks,
    principles,
    experiences,
    activities,
    skillCategories,
    education,
  ] = await Promise.all([
    runQuery<PersonContext>(
      config,
      `
        MATCH (p:Person)
        RETURN p {
          .name,
          .location,
          .portfolio,
          .github,
          .linkedin
        } AS person
        LIMIT 1
        `,
      "person",
    ),
    runQuery<ProjectContext>(
      config,
      `
        MATCH (p:Project)
        OPTIONAL MATCH (p)-[:USES]->(t:Technology)
        OPTIONAL MATCH (p)-[:HAS_LINK]->(l:Link)
        OPTIONAL MATCH (p)-[:RECEIVED_AWARD]->(a:Award)
        OPTIONAL MATCH (p)-[:HAS_HIGHLIGHT]->(h:Highlight)
        WITH p,
          collect(DISTINCT t.name) AS technologies,
          collect(DISTINCT l.href) AS links,
          collect(DISTINCT a.name) AS awards,
          collect(DISTINCT h.text) AS highlights
        RETURN p {
          .name,
          .date,
          .description,
          technologies: technologies,
          links: links,
          awards: awards,
          highlights: highlights
        } AS project
        ORDER BY p.name
        `,
      "project",
    ),
    runQuery<NotebookContext>(
      config,
      `
        MATCH (n:Notebook)
        OPTIONAL MATCH (n)-[:IN_TOPIC]->(t:Topic)
        OPTIONAL MATCH (n)-[:HAS_LINK]->(l:Link)
        WITH n,
          collect(DISTINCT t.name) AS topics,
          collect(DISTINCT l.href) AS links
        RETURN n {
          .title,
          .type,
          .date,
          .description,
          topics: topics,
          links: links
        } AS notebook
        ORDER BY n.date DESC
        `,
      "notebook",
    ),
    runQuery<PrincipleContext>(
      config,
      `
        MATCH (p:Principle)
        OPTIONAL MATCH (p)-[:HAS_BELIEF]->(b:Belief)
        OPTIONAL MATCH (p)-[:USES_PRACTICE]->(practice:Practice)
        OPTIONAL MATCH (p)-[:RELATED_TO]->(project:Project)
        OPTIONAL MATCH (p)-[:RELATED_TO]->(notebook:Notebook)
        WITH p,
          collect(DISTINCT b.text) AS beliefs,
          collect(DISTINCT practice.text) AS practices,
          collect(DISTINCT project.name) AS relatedProjects,
          collect(DISTINCT notebook.title) AS relatedNotebooks
        RETURN p {
          .title,
          .category,
          .summary,
          beliefs: beliefs,
          practices: practices,
          relatedProjects: relatedProjects,
          relatedNotebooks: relatedNotebooks
        } AS principle
        ORDER BY p.category, p.title
        `,
      "principle",
    ),
    runQuery<ExperienceContext>(
      config,
      `
        MATCH (e:Experience)-[:AT_COMPANY]->(c:Company)
        RETURN e {
          .role,
          .type,
          .startDate,
          .endDate,
          company: c.name
        } AS experience
        ORDER BY e.startDate
        `,
      "experience",
    ),
    runQuery<ActivityContext>(
      config,
      `
        MATCH (a:Activity)
        RETURN a {
          .name,
          .role,
          .date
        } AS activity
        ORDER BY a.date
        `,
      "activity",
    ),
    runQuery<SkillCategoryContext>(
      config,
      `
        MATCH (s:Skill)-[:IN_CATEGORY]->(category:SkillCategory)
        WITH category, collect(s.name) AS skills
        RETURN {
          category: category.name,
          skills: skills
        } AS skillCategory
        ORDER BY category.name
        `,
      "skillCategory",
    ),
    runQuery<EducationContext>(
      config,
      `
        MATCH (e:Education)
        OPTIONAL MATCH (e)-[:RECEIVED_AWARD]->(a:Award)
        WITH e, collect(a.name) AS awards
        RETURN e {
          .school,
          .degree,
          .startDate,
          .endDate,
          awards: awards
        } AS education
        ORDER BY e.startDate
        `,
      "education",
    ),
  ]);

  const person = people[0];
  if (!person && projects.length === 0 && experiences.length === 0) {
    return null;
  }

  return `RETRIEVED PORTFOLIO CONTEXT FROM NEO4J

PROFILE
${person?.name ?? "Marlon Martin"}${person?.location ? `, ${person.location}` : ""}
Portfolio: ${person?.portfolio ?? "Not specified"}
GitHub: ${person?.github ?? "Not specified"}
LinkedIn: ${person?.linkedin ?? "Not specified"}

EXPERIENCE
${experiences
  .map(
    (experience) =>
      `- ${experience.role ?? "Role"} at ${experience.company ?? "Company"} (${experience.startDate ?? "?"} - ${experience.endDate ?? "?"}${experience.type ? `, ${experience.type}` : ""})`,
  )
  .join("\n")}

PROJECTS
${projects
  .map(
    (project) =>
      `- ${project.name ?? "Project"} (${project.date ?? "No date"}): ${project.description ?? "No description"} Technologies: ${formatList(project.technologies)} Links: ${formatList(project.links)} Awards: ${formatList(project.awards)} Highlights: ${formatList(project.highlights)}`,
  )
  .join("\n")}

NOTEBOOKS AND EXPERIMENTS
${notebooks
  .map(
    (notebook) =>
      `- ${notebook.title ?? "Notebook"} (${notebook.date ?? "No date"}${notebook.type ? `, ${notebook.type}` : ""}): ${notebook.description ?? "No description"} Topics: ${formatList(notebook.topics)} Links: ${formatList(notebook.links)}`,
  )
  .join("\n")}

PRINCIPLES AND ENGINEERING PHILOSOPHY
${principles
  .map(
    (principle) =>
      `- ${principle.title ?? "Principle"} (${principle.category ?? "General"}): ${principle.summary ?? "No summary"} Beliefs: ${formatList(principle.beliefs)} Practices: ${formatList(principle.practices)} Related Projects: ${formatList(principle.relatedProjects)} Related Notebooks: ${formatList(principle.relatedNotebooks)}`,
  )
  .join("\n")}

ACTIVITIES
${activities
  .map(
    (activity) =>
      `- ${activity.name ?? "Activity"}${activity.role ? `, ${activity.role}` : ""}${activity.date ? ` (${activity.date})` : ""}`,
  )
  .join("\n")}

SKILLS
${skillCategories
  .map(
    (category) =>
      `- ${category.category ?? "Skills"}: ${formatList(category.skills)}`,
  )
  .join("\n")}

EDUCATION
${education
  .map(
    (item) =>
      `- ${item.school ?? "School"}${item.degree ? `, ${item.degree}` : ""} (${item.startDate ?? "?"} - ${item.endDate ?? "?"}). Awards: ${formatList(item.awards)}`,
  )
  .join("\n")}`;
}
