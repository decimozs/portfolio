import Link from "next/link";
import type { Highlight } from "@/lib/constant";
import { projectItems } from "@/lib/constant";

export function ProjectDescription({
  description,
  highlight,
}: {
  description: string;
  highlight: Highlight[];
}) {
  const texts = highlight.map((h) => h.text);
  const parts = description.split(new RegExp(`(${texts.join("|")})`, "g"));

  return (
    <p>
      {parts.map((part, idx) => {
        const match = highlight.find((h) => h.text === part);
        const key = `${part}-${idx}`;
        return match ? (
          <Link
            key={key}
            href={match.href}
            target="_blank"
            referrerPolicy="no-referrer"
            className="italic text-muted-foreground hover:text-black hover:underline"
          >
            {part}
          </Link>
        ) : (
          <span key={key}>{part}</span>
        );
      })}
    </p>
  );
}

export default function Works() {
  return (
    <div className="flex flex-col gap-6">
      {projectItems.map((item) => (
        <div className="flex flex-col gap-4" key={item.title}>
          <Link
            href={item.link}
            target="_blank"
            referrerPolicy="no-referrer"
            className="w-fit hover:underline"
          >
            {item.title}
          </Link>
          <ProjectDescription
            description={item.description}
            highlight={item.highlights || []}
          />
          <div className="text-sm flex flex-row gap-2 flex-wrap">
            {item.category.map((cat) => (
              <p key={cat} className="px-4 py-2 bg-accent">
                {cat}
              </p>
            ))}
          </div>
        </div>
      ))}
      <div className="flex flex-col gap-4 mt-4 lg:mb-5">
        <p>
          View more on{" "}
          <Link
            href="https://github.com/decimozs"
            target="_blank"
            referrerPolicy="no-referrer"
            className="inline-block"
          >
            <span className="cursor-pointer text-muted-foreground hover:underline hover:text-black transition-colors">
              @github/decimozs
            </span>
          </Link>{" "}
          to check what I'm building.
        </p>

        <p>
          You can also deep dive into my{" "}
          <Link href="/resume.pdf" target="_blank" className="inline-block">
            <span className="cursor-pointer text-muted-foreground hover:underline hover:text-black transition-colors">
              resume
            </span>
          </Link>{" "}
          to learn more about me or connect with me on{" "}
          <Link
            href="https://linkedin.com/in/decimomartin"
            target="_blank"
            className="inline-block"
          >
            <span className="cursor-pointer text-muted-foreground hover:underline hover:text-black transition-colors">
              @in/decimomartin
            </span>
          </Link>
          .
        </p>
        <p className="text-lg text-muted-foreground">
          © 2026 Marlon Martin. All rights reserved.
        </p>
      </div>
    </div>
  );
}
