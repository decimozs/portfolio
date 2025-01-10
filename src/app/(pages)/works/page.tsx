"use client";

import { workItems } from "@/utils/constants";
import Link from "next/link";
import React, { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import FilterWork from "@/components/dynamic/filter-works";
import { useState, useEffect } from "react";
import { ProjectType } from "@/utils/types";
import { useRouter } from "next/navigation";

export default function Works() {
  const [works, setWorks] = useState<ProjectType[]>(workItems);

  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page") || "1";
  const currentPage = parseInt(pageParam, 10);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = works.slice(startIndex, endIndex);

  const totalPages = Math.ceil(works.length / itemsPerPage);

  const selectedFilter = searchParams.get("filter");

  const router = useRouter();
  const pathname = usePathname();

  const handlePrevPage = () => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("page", (currentPage - 1).toString());
    router.push(`${pathname}?${currentParams.toString()}`);
  };

  const handleNextPage = () => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("page", (currentPage + 1).toString());
    router.push(`${pathname}?${currentParams.toString()}`);
  };

  useEffect(() => {
    if (!selectedFilter) {
      setWorks(workItems.filter((item) => item.type.includes("Relevant")));
    } else if (selectedFilter === "archives") {
      setWorks(workItems.filter((item) => item.type.includes("Archives")));
    } else if (selectedFilter === "case studies") {
      setWorks(workItems.filter((item) => item.type.includes("Case Study")));
    } else {
      setWorks(workItems);
    }
  }, [selectedFilter]);

  return (
    <Suspense>
      <div className="mt-[59px]">
        <FilterWork />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {currentItems.map((item) => (
            <div className="flex flex-col gap-4" key={item.id}>
              <Link href={`/works/${item.id}`} className="relative">
                <div className="h-[300px] w-full bg-accent flex items-center justify-center hover:bg-support transition duration-700 ease-in-out will-change-[background-color]">
                  <p className="text-primary text-[7rem] lg:text-[10rem]">
                    {item.banner}
                  </p>
                </div>
              </Link>
              <div className="text-accent grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="text-[1.25rem]">
                  <p className="text-black">{item.category}</p>
                  <p>{item.title}</p>
                  <p>@{item.name}</p>
                  <p className="hidden md:block md:mt-4 md:text-[1rem]">
                    {item.createdAt}
                  </p>
                </div>
                <div className="text-[1.25rem]">
                  <p>{item.header}</p>
                </div>
                <div className="md:hidden">
                  <p>{item.createdAt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center my-10 text-accent">
          {currentPage > 1 && (
            <svg
              onClick={() => handlePrevPage()}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-move-left text-accent hover:text-secondary transition duration-300 cursor-pointer"
            >
              <path d="M6 8L2 12L6 16" />
              <path d="M2 12H22" />
            </svg>
          )}
          <p>
            Page {currentPage} of {totalPages}
          </p>
          {currentPage < totalPages && (
            <svg
              onClick={() => handleNextPage()}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-move-right text-accent hover:text-secondary transition duration-300 cursor-pointer"
            >
              <path d="M18 8L22 12L18 16" />
              <path d="M2 12H22" />
            </svg>
          )}
        </div>
      </div>
    </Suspense>
  );
}
