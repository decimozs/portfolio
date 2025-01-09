"use client";

import ReactMarkdown from "react-markdown";
import React from "react";
import { ProjectType } from "@/utils/types";
import Link from "next/link";
import Separator from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export default function WorkView({ work }: { work: ProjectType }) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col gap-4 mb-12 lg:items-center lg:justify-center lg:w-full lg:mb-0">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-1 lg:w-[1000px] lg:overflow-auto">
        <div className="h-[300px] w-full bg-accent flex items-center justify-center">
          <p className="text-primary text-[7rem] lg:text-[10rem]">
            {work.banner}
          </p>
        </div>

        <div className="text-accent flex flex-col gap-4">
          <div className="text-[1.25rem] md:text-[2rem]">
            <p className="text-black">{work.name}</p>
            <p>{work.title}</p>
            <p>{work.category}</p>
            <p>{work.createdAt}</p>
          </div>

          <Separator />

          <div className="grid grid-cols-1 gap-4 text-black text-[1.25rem] md:text-[2rem]">
            <p className="mb-4">Description</p>
            <p className="">{work.header}</p>

            <Separator
              classname={`grid grid-cols-1 gap-4 ${work.description === "" || null || undefined ? "hidden" : "block"}`}
            />

            <div
              className={`grid grid-cols-1 gap-4 text-[1.2rem] lg:text-[2rem] ${work.description === "" || null || undefined ? "hidden" : "block"}`}
            >
              <p className="mb-4">Case Study</p>
              <ReactMarkdown>{work.description}</ReactMarkdown>
            </div>

            <Separator />
            <div className="mb-16 lg:mb-0 text-black text-[1.25rem] md:text-[2rem]">
              <p className="mb-8">Technologies</p>
              <div>
                {work.technologies.map((item, index) => (
                  <p
                    key={index + 1}
                    className="text-accent hover:text-secondary transition duration-300 mr-auto cursor-pointer"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="fixed bottom-0 left-0 p-4 bg-primary w-full text-black flex flex-row-reverse justify-between lg:static lg:p-0 lg:mt-40">
            <Link href={work.source} target="_blank">
              Open Source
            </Link>
            <button
              className="lg:fixed lg:top-4 lg:left-4"
              onClick={() => handleBack()}
            >
              <p className="text-accent hover:text-secondary transition duration-300 ease-in-out">
                Back
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
