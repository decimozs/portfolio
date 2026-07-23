type Knowledge = {
  person: {
    name: string;
    location?: string;
    email?: string;
    phone?: string;
    portfolio?: string;
    github?: string;
    linkedin?: string;
  };
  experiences?: Array<{
    id?: string;
    role: string;
    company: string;
    type?: string;
    startDate?: string;
    endDate?: string;
  }>;
  projects?: Array<{
    id?: string;
    name: string;
    technologies?: string[];
    date?: string;
    description?: string;
    link?: string;
    awards?: Array<{
      event: string;
      role?: string;
      place?: string;
      date?: string;
    }>;
    highlights?: Array<{
      text: string;
      href: string;
    }>;
    chunks?: string[];
  }>;
  notebooks?: Array<{
    id?: string;
    title: string;
    type?: string;
    date?: string;
    description?: string;
    categories?: string[];
    links?: Array<{
      label: string;
      href: string;
    }>;
    chunks?: string[];
  }>;
  activities?: Array<{
    id?: string;
    name: string;
    role?: string;
    date?: string;
  }>;
  skills?: Array<{
    category: string;
    items: string[];
  }>;
  education?: Array<{
    id?: string;
    school: string;
    degree?: string;
    startDate?: string;
    endDate?: string;
    awards?: string[];
  }>;
  principles?: Array<{
    id?: string;
    title: string;
    category: string;
    summary: string;
    beliefs?: string[];
    practices?: string[];
    relatedProjects?: string[];
    relatedNotebooks?: string[];
    chunks?: string[];
  }>;
};

type NormalizedKnowledge = {
  person: Knowledge["person"] & { id: string; key: string };
  experiences: Array<
    Required<
      Pick<NonNullable<Knowledge["experiences"]>[number], "role" | "company">
    > & {
      id: string;
      sourceId?: string;
      key: string;
      companyKey: string;
      type?: string;
      startDate?: string;
      endDate?: string;
    }
  >;
  projects: Array<
    Required<Pick<NonNullable<Knowledge["projects"]>[number], "name">> & {
      id: string;
      sourceId?: string;
      key: string;
      technologies: Array<{ name: string; key: string }>;
      links: Array<{ label: string; href: string }>;
      awards: Array<{
        key: string;
        event: string;
        role?: string;
        place?: string;
        date?: string;
      }>;
      highlights: Array<{ key: string; text: string; href: string }>;
      chunks: Array<{ id: string; text: string }>;
      date?: string;
      description?: string;
    }
  >;
  notebooks: Array<{
    id: string;
    sourceId?: string;
    key: string;
    title: string;
    type?: string;
    date?: string;
    description?: string;
    topics: Array<{ key: string; name: string }>;
    links: Array<{ label: string; href: string }>;
    chunks: Array<{ id: string; text: string }>;
  }>;
  activities: Array<
    Required<Pick<NonNullable<Knowledge["activities"]>[number], "name">> & {
      id: string;
      sourceId?: string;
      key: string;
      role?: string;
      date?: string;
    }
  >;
  skills: Array<{
    key: string;
    name: string;
    category: string;
    categoryKey: string;
  }>;
  education: Array<
    Required<Pick<NonNullable<Knowledge["education"]>[number], "school">> & {
      id: string;
      sourceId?: string;
      key: string;
      degree?: string;
      startDate?: string;
      endDate?: string;
      awards: Array<{ key: string; name: string }>;
    }
  >;
  principles: Array<{
    id: string;
    sourceId?: string;
    key: string;
    title: string;
    category: string;
    categoryKey: string;
    summary: string;
    beliefs: Array<{ key: string; text: string }>;
    practices: Array<{ key: string; text: string }>;
    relatedProjects: string[];
    relatedNotebooks: string[];
    chunks: Array<{ id: string; text: string }>;
  }>;
};

const knowledgePath = "src/data/agent/knowledge.json";
let database = process.env.NEO4J_DATABASE || undefined;
let queryApiUrl = process.env.NEO4J_QUERY_API_URL;

type QueryResult = {
  data?: {
    fields?: string[];
    values?: unknown[][];
  };
};

const constraints = [
  "CREATE CONSTRAINT person_id IF NOT EXISTS FOR (n:Person) REQUIRE n.id IS UNIQUE",
  "CREATE CONSTRAINT project_id IF NOT EXISTS FOR (n:Project) REQUIRE n.id IS UNIQUE",
  "CREATE CONSTRAINT experience_id IF NOT EXISTS FOR (n:Experience) REQUIRE n.id IS UNIQUE",
  "CREATE CONSTRAINT activity_id IF NOT EXISTS FOR (n:Activity) REQUIRE n.id IS UNIQUE",
  "CREATE CONSTRAINT education_id IF NOT EXISTS FOR (n:Education) REQUIRE n.id IS UNIQUE",
  "CREATE CONSTRAINT company_key IF NOT EXISTS FOR (n:Company) REQUIRE n.key IS UNIQUE",
  "CREATE CONSTRAINT technology_key IF NOT EXISTS FOR (n:Technology) REQUIRE n.key IS UNIQUE",
  "CREATE CONSTRAINT skill_key IF NOT EXISTS FOR (n:Skill) REQUIRE n.key IS UNIQUE",
  "CREATE CONSTRAINT skill_category_key IF NOT EXISTS FOR (n:SkillCategory) REQUIRE n.key IS UNIQUE",
  "CREATE CONSTRAINT award_key IF NOT EXISTS FOR (n:Award) REQUIRE n.key IS UNIQUE",
  "CREATE CONSTRAINT highlight_key IF NOT EXISTS FOR (n:Highlight) REQUIRE n.key IS UNIQUE",
  "CREATE CONSTRAINT link_href IF NOT EXISTS FOR (n:Link) REQUIRE n.href IS UNIQUE",
  "CREATE CONSTRAINT notebook_id IF NOT EXISTS FOR (n:Notebook) REQUIRE n.id IS UNIQUE",
  "CREATE CONSTRAINT topic_key IF NOT EXISTS FOR (n:Topic) REQUIRE n.key IS UNIQUE",
  "CREATE CONSTRAINT principle_id IF NOT EXISTS FOR (n:Principle) REQUIRE n.id IS UNIQUE",
  "CREATE CONSTRAINT belief_key IF NOT EXISTS FOR (n:Belief) REQUIRE n.key IS UNIQUE",
  "CREATE CONSTRAINT practice_key IF NOT EXISTS FOR (n:Practice) REQUIRE n.key IS UNIQUE",
  "CREATE CONSTRAINT chunk_id IF NOT EXISTS FOR (n:Chunk) REQUIRE n.id IS UNIQUE",
];

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required.`);
  }
  return value;
}

function slug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/\+/g, " plus ")
    .replace(/#/g, " sharp ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function defined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

function assertUnique(label: string, values: string[]): void {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }
    seen.add(value);
  }

  if (duplicates.size > 0) {
    throw new Error(`${label} has duplicates: ${[...duplicates].join(", ")}`);
  }
}

function normalizeKnowledge(knowledge: Knowledge): NormalizedKnowledge {
  const personKey = slug(knowledge.person.name);
  const projects = (knowledge.projects ?? []).map((project) => {
    const key = slug(project.name);
    const id = `project:${key}`;
    const technologies = (project.technologies ?? []).map((name) => ({
      name,
      key: slug(name),
    }));
    const generatedChunk = [project.name, project.date, project.description]
      .filter(defined)
      .join(". ");
    const chunkTexts =
      project.chunks && project.chunks.length > 0
        ? project.chunks
        : [generatedChunk].filter(Boolean);

    return {
      ...project,
      id,
      sourceId: project.id,
      key,
      name: project.name,
      technologies,
      links: project.link ? [{ label: project.name, href: project.link }] : [],
      awards: (project.awards ?? []).map((award) => ({
        ...award,
        key: slug(
          [project.name, award.event, award.place, award.date]
            .filter(defined)
            .join(" "),
        ),
      })),
      highlights: (project.highlights ?? []).map((highlight) => ({
        ...highlight,
        key: slug([project.name, highlight.text].join(" ")),
      })),
      chunks: chunkTexts.map((text, index) => ({
        id: `chunk:${id}:${index + 1}`,
        text,
      })),
    };
  });

  const notebooks = (knowledge.notebooks ?? []).map((notebook) => {
    const key = slug(notebook.title);
    const id = `notebook:${key}`;
    const generatedChunk = [notebook.title, notebook.date, notebook.description]
      .filter(defined)
      .join(". ");
    const chunkTexts =
      notebook.chunks && notebook.chunks.length > 0
        ? notebook.chunks
        : [generatedChunk].filter(Boolean);

    return {
      ...notebook,
      id,
      sourceId: notebook.id,
      key,
      title: notebook.title,
      topics: (notebook.categories ?? []).map((name) => ({
        key: slug(name),
        name,
      })),
      links: notebook.links ?? [],
      chunks: chunkTexts.map((text, index) => ({
        id: `chunk:${id}:${index + 1}`,
        text,
      })),
    };
  });

  const experiences = (knowledge.experiences ?? []).map((experience) => {
    const companyKey = slug(experience.company);
    const key = slug(
      [experience.company, experience.role, experience.startDate]
        .filter(defined)
        .join(" "),
    );

    return {
      ...experience,
      id: `experience:${key}`,
      sourceId: experience.id,
      key,
      companyKey,
      role: experience.role,
      company: experience.company,
    };
  });

  const activities = (knowledge.activities ?? []).map((activity) => {
    const key = slug([activity.name, activity.date].filter(defined).join(" "));
    return {
      ...activity,
      id: `activity:${key}`,
      sourceId: activity.id,
      key,
      name: activity.name,
    };
  });

  const skills = (knowledge.skills ?? []).flatMap((group) =>
    group.items.map((name) => ({
      key: slug(name),
      name,
      category: group.category,
      categoryKey: slug(group.category),
    })),
  );

  const education = (knowledge.education ?? []).map((item) => {
    const key = slug([item.school, item.degree].filter(defined).join(" "));
    return {
      ...item,
      id: `education:${key}`,
      sourceId: item.id,
      key,
      school: item.school,
      awards: (item.awards ?? []).map((name) => ({ key: slug(name), name })),
    };
  });

  const principles = (knowledge.principles ?? []).map((principle) => {
    const key = slug(principle.title);
    const id = `principle:${key}`;
    const generatedChunk = [
      principle.title,
      principle.category,
      principle.summary,
    ]
      .filter(defined)
      .join(". ");
    const chunkTexts =
      principle.chunks && principle.chunks.length > 0
        ? principle.chunks
        : [generatedChunk].filter(Boolean);

    return {
      ...principle,
      id,
      sourceId: principle.id,
      key,
      categoryKey: slug(principle.category),
      beliefs: (principle.beliefs ?? []).map((text) => ({
        key: slug([principle.title, text].join(" ")),
        text,
      })),
      practices: (principle.practices ?? []).map((text) => ({
        key: slug([principle.title, text].join(" ")),
        text,
      })),
      relatedProjects: principle.relatedProjects ?? [],
      relatedNotebooks: principle.relatedNotebooks ?? [],
      chunks: chunkTexts.map((text, index) => ({
        id: `chunk:${id}:${index + 1}`,
        text,
      })),
    };
  });

  assertUnique(
    "projects",
    projects.map((project) => project.id),
  );
  assertUnique(
    "notebooks",
    notebooks.map((notebook) => notebook.id),
  );
  assertUnique(
    "experiences",
    experiences.map((experience) => experience.id),
  );
  assertUnique(
    "activities",
    activities.map((activity) => activity.id),
  );
  assertUnique(
    "education",
    education.map((item) => item.id),
  );
  assertUnique(
    "skills",
    skills.map((skill) => skill.key),
  );
  assertUnique(
    "principles",
    principles.map((principle) => principle.id),
  );

  return {
    person: {
      ...knowledge.person,
      id: `person:${personKey}`,
      key: personKey,
    },
    projects,
    notebooks,
    experiences,
    activities,
    skills,
    education,
    principles,
  };
}

function resolveQueryApiUrl(): string {
  if (queryApiUrl) {
    return queryApiUrl;
  }

  const uri = requireEnv("NEO4J_URI");
  const url = new URL(uri.replace(/^neo4j\+s:/, "https:"));
  const databaseId = url.hostname.split(".")[0];
  const databasePath = database ?? databaseId;
  return `https://${url.hostname}/db/${databasePath}/query/v2`;
}

async function run(query: string, parameters = {}): Promise<QueryResult> {
  const username = requireEnv("NEO4J_USERNAME");
  const password = requireEnv("NEO4J_PASSWORD");

  try {
    const response = await fetch(resolveQueryApiUrl(), {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
      },
      body: JSON.stringify({ statement: query, parameters }),
    });

    const text = await response.text();
    if (!response.ok) {
      throw new Error(text || `${response.status} ${response.statusText}`);
    }

    return JSON.parse(text) as QueryResult;
  } catch (error) {
    if (
      database &&
      error instanceof Error &&
      error.message.toLowerCase().includes("database does not exist")
    ) {
      console.warn(
        `Database '${database}' does not exist. Retrying with default database.`,
      );
      const uri = requireEnv("NEO4J_URI");
      const url = new URL(uri.replace(/^neo4j\+s:/, "https:"));
      const databaseId = url.hostname.split(".")[0];
      database = undefined;
      queryApiUrl = `https://${url.hostname}/db/${databaseId}/query/v2`;
      return run(query, parameters);
    }

    throw error;
  }
}

async function createConstraints(): Promise<void> {
  for (const constraint of constraints) {
    await run(constraint);
  }
}

async function clearManagedGraph(): Promise<void> {
  await run(`
    MATCH (n)
    WHERE any(label IN labels(n) WHERE label IN [
      "Person", "Project", "Experience", "Company", "Technology", "Activity",
      "Skill", "SkillCategory", "Education", "Award", "Chunk", "Link",
      "Highlight", "Notebook", "Topic", "Principle", "Belief", "Practice"
    ])
    DETACH DELETE n
  `);
}

async function ingest(knowledge: NormalizedKnowledge): Promise<void> {
  await run(
    `
    MERGE (p:Person {id: $person.id})
    SET p += $person, p.updatedAt = datetime()
    `,
    { person: knowledge.person },
  );

  await run(
    `
    MATCH (person:Person {id: $personId})
    UNWIND $experiences AS experience
    MERGE (e:Experience {id: experience.id})
    SET e += experience, e.updatedAt = datetime()
    MERGE (c:Company {key: experience.companyKey})
    SET c.name = experience.company, c.updatedAt = datetime()
    MERGE (person)-[:HAS_EXPERIENCE]->(e)
    MERGE (e)-[:AT_COMPANY]->(c)
    `,
    { personId: knowledge.person.id, experiences: knowledge.experiences },
  );

  await run(
    `
    UNWIND range(0, size($experiences) - 2) AS index
    MATCH (current:Experience {id: $experiences[index].id})
    MATCH (next:Experience {id: $experiences[index + 1].id})
    MERGE (current)-[:NEXT_EXPERIENCE]->(next)
    `,
    { experiences: knowledge.experiences },
  );

  await run(
    `
    MATCH (person:Person {id: $personId})
    UNWIND $projects AS project
    MERGE (p:Project {id: project.id})
    SET p.name = project.name,
        p.key = project.key,
        p.sourceId = project.sourceId,
        p.date = project.date,
        p.description = project.description,
        p.updatedAt = datetime()
    MERGE (person)-[:BUILT]->(p)
    WITH p, project
    UNWIND project.technologies AS technology
    MERGE (t:Technology {key: technology.key})
    SET t.name = technology.name, t.updatedAt = datetime()
    MERGE (p)-[:USES]->(t)
    `,
    { personId: knowledge.person.id, projects: knowledge.projects },
  );

  await run(
    `
    UNWIND $projects AS project
    MATCH (p:Project {id: project.id})
    UNWIND project.links AS link
    MERGE (l:Link {href: link.href})
    SET l.label = link.label, l.updatedAt = datetime()
    MERGE (p)-[:HAS_LINK]->(l)
    `,
    { projects: knowledge.projects },
  );

  await run(
    `
    UNWIND $projects AS project
    MATCH (p:Project {id: project.id})
    UNWIND project.awards AS award
    MERGE (a:Award {key: award.key})
    SET a.event = award.event,
        a.role = award.role,
        a.place = award.place,
        a.date = award.date,
        a.name = coalesce(award.place + " - " + award.event, award.event),
        a.updatedAt = datetime()
    MERGE (p)-[:RECEIVED_AWARD]->(a)
    `,
    { projects: knowledge.projects },
  );

  await run(
    `
    UNWIND $projects AS project
    MATCH (p:Project {id: project.id})
    UNWIND project.highlights AS highlight
    MERGE (h:Highlight {key: highlight.key})
    SET h.text = highlight.text,
        h.href = highlight.href,
        h.updatedAt = datetime()
    MERGE (p)-[:HAS_HIGHLIGHT]->(h)
    `,
    { projects: knowledge.projects },
  );

  await run(
    `
    UNWIND $projects AS project
    MATCH (p:Project {id: project.id})
    UNWIND project.chunks AS chunk
    MERGE (c:Chunk {id: chunk.id})
    SET c.text = chunk.text,
        c.sourceType = "project",
        c.sourceId = project.id,
        c.updatedAt = datetime()
    MERGE (c)-[:DESCRIBES]->(p)
    `,
    { projects: knowledge.projects },
  );

  await run(
    `
    MATCH (person:Person {id: $personId})
    UNWIND $notebooks AS notebook
    MERGE (n:Notebook {id: notebook.id})
    SET n.title = notebook.title,
        n.key = notebook.key,
        n.sourceId = notebook.sourceId,
        n.type = notebook.type,
        n.date = notebook.date,
        n.description = notebook.description,
        n.updatedAt = datetime()
    MERGE (person)-[:EXPLORED]->(n)
    `,
    { personId: knowledge.person.id, notebooks: knowledge.notebooks },
  );

  await run(
    `
    UNWIND $notebooks AS notebook
    MATCH (n:Notebook {id: notebook.id})
    UNWIND notebook.topics AS topic
    MERGE (t:Topic {key: topic.key})
    SET t.name = topic.name, t.updatedAt = datetime()
    MERGE (n)-[:IN_TOPIC]->(t)
    `,
    { notebooks: knowledge.notebooks },
  );

  await run(
    `
    MATCH (person:Person {id: $personId})
    UNWIND $principles AS principle
    MERGE (p:Principle {id: principle.id})
    SET p.title = principle.title,
        p.key = principle.key,
        p.sourceId = principle.sourceId,
        p.category = principle.category,
        p.summary = principle.summary,
        p.updatedAt = datetime()
    MERGE (person)-[:FOLLOWS]->(p)
    MERGE (topic:Topic {key: principle.categoryKey})
    SET topic.name = principle.category, topic.updatedAt = datetime()
    MERGE (p)-[:IN_TOPIC]->(topic)
    `,
    { personId: knowledge.person.id, principles: knowledge.principles },
  );

  await run(
    `
    UNWIND $principles AS principle
    MATCH (p:Principle {id: principle.id})
    UNWIND principle.beliefs AS belief
    MERGE (b:Belief {key: belief.key})
    SET b.text = belief.text, b.updatedAt = datetime()
    MERGE (p)-[:HAS_BELIEF]->(b)
    `,
    { principles: knowledge.principles },
  );

  await run(
    `
    UNWIND $principles AS principle
    MATCH (p:Principle {id: principle.id})
    UNWIND principle.practices AS practice
    MERGE (practiceNode:Practice {key: practice.key})
    SET practiceNode.text = practice.text, practiceNode.updatedAt = datetime()
    MERGE (p)-[:USES_PRACTICE]->(practiceNode)
    `,
    { principles: knowledge.principles },
  );

  await run(
    `
    UNWIND $principles AS principle
    MATCH (p:Principle {id: principle.id})
    UNWIND principle.relatedProjects AS projectId
    MATCH (project:Project {id: projectId})
    MERGE (p)-[:RELATED_TO]->(project)
    `,
    { principles: knowledge.principles },
  );

  await run(
    `
    UNWIND $principles AS principle
    MATCH (p:Principle {id: principle.id})
    UNWIND principle.relatedNotebooks AS notebookId
    MATCH (notebook:Notebook {id: notebookId})
    MERGE (p)-[:RELATED_TO]->(notebook)
    `,
    { principles: knowledge.principles },
  );

  await run(
    `
    UNWIND $principles AS principle
    MATCH (p:Principle {id: principle.id})
    UNWIND principle.chunks AS chunk
    MERGE (c:Chunk {id: chunk.id})
    SET c.text = chunk.text,
        c.sourceType = "principle",
        c.sourceId = principle.id,
        c.updatedAt = datetime()
    MERGE (c)-[:DESCRIBES]->(p)
    `,
    { principles: knowledge.principles },
  );

  await run(
    `
    UNWIND $notebooks AS notebook
    MATCH (n:Notebook {id: notebook.id})
    UNWIND notebook.links AS link
    MERGE (l:Link {href: link.href})
    SET l.label = link.label, l.updatedAt = datetime()
    MERGE (n)-[:HAS_LINK]->(l)
    `,
    { notebooks: knowledge.notebooks },
  );

  await run(
    `
    UNWIND $notebooks AS notebook
    MATCH (n:Notebook {id: notebook.id})
    UNWIND notebook.chunks AS chunk
    MERGE (c:Chunk {id: chunk.id})
    SET c.text = chunk.text,
        c.sourceType = "notebook",
        c.sourceId = notebook.id,
        c.updatedAt = datetime()
    MERGE (c)-[:DESCRIBES]->(n)
    `,
    { notebooks: knowledge.notebooks },
  );

  await run(
    `
    MATCH (person:Person {id: $personId})
    UNWIND $activities AS activity
    MERGE (a:Activity {id: activity.id})
    SET a += activity, a.updatedAt = datetime()
    MERGE (person)-[:PARTICIPATED_IN]->(a)
    `,
    { personId: knowledge.person.id, activities: knowledge.activities },
  );

  await run(
    `
    MATCH (person:Person {id: $personId})
    UNWIND $skills AS skill
    MERGE (category:SkillCategory {key: skill.categoryKey})
    SET category.name = skill.category, category.updatedAt = datetime()
    MERGE (s:Skill {key: skill.key})
    SET s.name = skill.name, s.updatedAt = datetime()
    MERGE (s)-[:IN_CATEGORY]->(category)
    MERGE (person)-[:HAS_SKILL]->(s)
    `,
    { personId: knowledge.person.id, skills: knowledge.skills },
  );

  await run(
    `
    MATCH (person:Person {id: $personId})
    UNWIND $education AS education
    MERGE (e:Education {id: education.id})
    SET e.school = education.school,
        e.degree = education.degree,
        e.sourceId = education.sourceId,
        e.startDate = education.startDate,
        e.endDate = education.endDate,
        e.updatedAt = datetime()
    MERGE (person)-[:STUDIED_AT]->(e)
    WITH e, education
    UNWIND education.awards AS award
    MERGE (a:Award {key: award.key})
    SET a.name = award.name, a.updatedAt = datetime()
    MERGE (e)-[:RECEIVED_AWARD]->(a)
    `,
    { personId: knowledge.person.id, education: knowledge.education },
  );
}

async function printCounts(): Promise<void> {
  const result = await run(
    `
    MATCH (n)
    WHERE any(label IN labels(n) WHERE label IN [
      "Person", "Project", "Experience", "Company", "Technology", "Activity",
      "Skill", "SkillCategory", "Education", "Award", "Chunk", "Link",
      "Highlight", "Notebook", "Topic", "Principle", "Belief", "Practice"
    ])
    UNWIND labels(n) AS label
    WITH label, count(*) AS count
    RETURN label, count
    ORDER BY label
    `,
  );

  console.log("Neo4j graph counts:");
  const fields = result.data?.fields ?? [];
  const labelIndex = fields.indexOf("label");
  const countIndex = fields.indexOf("count");
  for (const row of result.data?.values ?? []) {
    console.log(`- ${row[labelIndex]}: ${row[countIndex]}`);
  }
}

async function main(): Promise<void> {
  const raw = await Bun.file(knowledgePath).json();
  const knowledge = normalizeKnowledge(raw as Knowledge);

  await run("RETURN 1 AS ok");
  await createConstraints();
  await clearManagedGraph();
  await ingest(knowledge);
  await printCounts();
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
