import type { Metadata } from "next";
import { experienceItems } from "@/lib/constant";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "A detailed overview of Marlon Martin's professional experience, including roles, responsibilities, and achievements across various industries and positions.",
};

export default function Experience() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {experienceItems.map((item) => (
        <div className="flex flex-col gap-4" key={item.title}>
          <div className="flex flex-row justify-between">
            <div>
              <p className="w-fit">{item.title}</p>
              <p className="">{item.company}</p>
              <div className="flex flex-row mt-1 gap-2 text-sm lg:hidden">
                <p>
                  {item.startDate.toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p>-</p>
                <p>
                  {item.endDate !== undefined
                    ? item.endDate.toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : "Present"}
                </p>
              </div>
            </div>
            <div className="hidden lg:flex flex-row mt-1 gap-2 text-sm">
              <p>
                {item.startDate.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p>-</p>
              <p>
                {item.endDate !== undefined
                  ? item.endDate.toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                  : "Present"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 text-sm">
            {item.description.map((desc) => (
              <p key={desc} className="px-4 py-2 bg-accent">
                {desc}
              </p>
            ))}
          </div>
        </div>
      ))}
      <p className="text-lg text-muted-foreground">
        © 2026 Marlon Martin. All rights reserved.
      </p>
    </div>
  );
}
