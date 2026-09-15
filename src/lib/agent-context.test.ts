import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { parse as parseYaml } from "yaml";
import { getAgentContext } from "@/lib/agent-context";

const resumeDataPath = fileURLToPath(
  new URL("../../resume/data.yaml", import.meta.url),
);
const resumeData = parseYaml(readFileSync(resumeDataPath, "utf-8")) as {
  profile: { name: string };
  experience: { title: string }[];
};

describe("getAgentContext", () => {
  it("wraps the context in BEGIN/END markers", async () => {
    const context = await getAgentContext();
    expect(context.startsWith("BEGIN PORTFOLIO FACTS")).toBe(true);
    expect(context.endsWith("END PORTFOLIO FACTS")).toBe(true);
  });

  it("includes every expected section header", async () => {
    const context = await getAgentContext();
    for (const header of [
      "PROFILE",
      "EXPERIENCE",
      "PROJECTS",
      "NOTEBOOKS AND EXPERIMENTS",
      "ACTIVITIES",
      "SKILLS",
      "EDUCATION",
      "COMPANY CONTRIBUTIONS",
    ]) {
      expect(context).toContain(header);
    }
  });

  it("never includes the dropped Principles section", async () => {
    const context = await getAgentContext();
    expect(context).not.toContain("PRINCIPLES");
  });

  it("sources the profile and experience from resume/data.yaml", async () => {
    const context = await getAgentContext();
    expect(context).toContain(resumeData.profile.name);
    for (const experience of resumeData.experience) {
      expect(context).toContain(experience.title);
    }
  });

  it("memoizes the built context across calls", async () => {
    const first = await getAgentContext();
    const second = await getAgentContext();
    expect(first).toBe(second);
  });
});
