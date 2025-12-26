"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { projectItems } from "@/lib/constant";
import { type Highlight } from "@/lib/constant";

function ProjectDescription({
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
      {parts.map((part, index) => {
        const match = highlight.find((h) => h.text === part);

        return match ? (
          <Link
            key={index}
            href={match.href}
            target="_blank"
            referrerPolicy="no-referrer"
            className="italic text-muted-foreground hover:text-black hover:underline"
          >
            {part}
          </Link>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </p>
  );
}

export default function Works() {
  const pathname = usePathname();

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
      <div className="mt-4 -mb-6">
        <Link
          href="https://github.com/decimozs"
          target="_blank"
          referrerPolicy="no-referrer"
        >
          View more on{" "}
          <span className="cursor-pointer text-muted-foreground hover:underline hover:text-black">
            @github/decimozs
          </span>{" "}
        </Link>
      </div>
      <div>
        <div className="flex flex-col gap-2 md:hidden">
          {pathname !== "/" && (
            <Link href="/" className="hover:underline w-fit">
              Index
            </Link>
          )}
          <Link
            href="/works"
            className={`hover:underline w-fit ${pathname === "/works" && "underline"}`}
          >
            Works
          </Link>
          <Link
            href="/links"
            className={`hover:underline w-fit ${pathname === "/links" && "underline"}`}
          >
            Links
          </Link>
          <Link
            href="/resume.pdf"
            target="_blank"
            referrerPolicy="no-referrer"
            className="hover:underline w-fit"
          >
            Resume
          </Link>
        </div>
      </div>
    </div>
  );
}
