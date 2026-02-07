import { notebookItems } from "@/lib/constant";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notebooks",
  description:
    "A collection of Marlon Martin's notebooks, showcasing his thoughts, ideas, and insights on various topics, including technology, design, and personal reflections.",
};

export default function Notebooks() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-1 gap-4">
        {notebookItems.map((item) => (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-between">
                <p>{item.title}</p>
                <p className="hidden xl:block text-sm">
                  {item.date.toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <p>{item.description}</p>
            </div>
            <div className="text-sm">
              {item.link.map((source) => (
                <div>
                  <Link
                    href={source.href}
                    className="text-muted-foreground w-fit transition-all duration-300 ease-in-out hover:text-black"
                    target="_blank"
                    referrerPolicy="no-referrer"
                  >
                    {source.label}
                  </Link>
                </div>
              ))}
            </div>
            <div className="text-sm flex flex-row gap-2 flex-wrap">
              {item.category.map((cat) => (
                <p key={cat} className="px-4 py-2 bg-accent">
                  {cat}
                </p>
              ))}
            </div>
            <div className="flex flex-row items-center justify-between text-sm">
              <p className="xl:hidden">
                {item.date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
        <p className="text-lg text-muted-foreground">
          © 2026 Marlon Martin. All rights reserved.
        </p>
      </div>
    </div>
  );
}
