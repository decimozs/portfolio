import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

const works = defineCollection({
  loader: file("src/content/works.json"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    link: z.string().url(),
    category: z.array(z.string()),
    date: z.string().transform((str: string) => new Date(str)),
    highlights: z
      .array(
        z.object({
          text: z.string(),
          href: z.string().url(),
        }),
      )
      .optional(),
    awards: z
      .array(
        z.object({
          place: z.string(),
          event: z.string(),
          date: z.string(),
          role: z.string(),
        }),
      )
      .optional(),
  }),
});

const experience = defineCollection({
  loader: file("src/content/experience.json"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    company: z.string(),
    startDate: z.string().transform((str: string) => new Date(str)),
    endDate: z
      .string()
      .transform((str: string) => new Date(str))
      .optional(),
  }),
});

const notebooks = defineCollection({
  loader: file("src/content/notebooks.json"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    links: z.array(
      z.object({
        label: z.string(),
        href: z.string().url(),
      }),
    ),
    category: z.array(z.string()),
    date: z.string().transform((str: string) => new Date(str)),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
  }),
});

export const collections = {
  works: works,
  experience: experience,
  notebooks: notebooks,
  blog: blog,
};
