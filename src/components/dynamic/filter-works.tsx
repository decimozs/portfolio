"use client";

import { Suspense, useEffect, useState } from "react";
import Separator from "../ui/separator";
import { workItems } from "@/utils/constants";
import { useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [currentFilterStage, setCurrentFilterStage] =
    useState("Relevant Works");
  const [filterButtonLabel, setFilterButtonLabel] = useState("Change");
  const [filteredWork, setFilteredWork] = useState<string>("relevant works");

  const router = useRouter();

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen((prev) => !prev);
    setFilterButtonLabel(isFilterMenuOpen ? "Change" : "Close");
  };

  const updateFilterStage = (stage: string) => {
    setCurrentFilterStage(stage);
    setIsFilterMenuOpen(false);
    setFilterButtonLabel(isFilterMenuOpen ? "Change" : "Close");
    if (stage === "Relevant Works") {
      router.push("/works");
    } else {
      router.push(`/works?filter=${stage.toLowerCase()}`);
    }
  };

  const allWorkCount = workItems.length;

  const relevantWorkCount = workItems.filter((item) =>
    item.type.includes("Relevant"),
  ).length;

  const caseStudyWorkCount = workItems.filter((item) =>
    item.type.includes("Case Study"),
  ).length;

  const archiveCount = workItems.filter((item) =>
    item.type.includes("Archives"),
  ).length;

  const searchParams = useSearchParams();
  const selectedFilter = searchParams.get("filter");

  useEffect(() => {
    if (selectedFilter === "archives") {
      setFilteredWork("archives");
      setCurrentFilterStage("Archives");
    } else if (selectedFilter === "case studies") {
      setFilteredWork("case studies");
      setCurrentFilterStage("Case Studies");
    } else if (selectedFilter === "all works") {
      setFilteredWork("all works");
      setCurrentFilterStage("All Works");
    } else {
      setFilteredWork("relevant works");
      setCurrentFilterStage("Relevant Works");
    }
  }, [filteredWork, selectedFilter]);

  return (
    <div className="fixed bottom-0 left-0 p-4 w-full bg-primary z-50">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <p>Filter</p>
          <p>—</p>
          <p>{currentFilterStage}</p>
        </div>
        <button onClick={toggleFilterMenu} className="cursor-pointer">
          {filterButtonLabel}
        </button>
      </div>
      {isFilterMenuOpen && (
        <div className="mt-4">
          <Separator />
          <div className="flex flex-col gap-1 mt-4">
            {[
              { label: "Relevant Works", count: relevantWorkCount },
              { label: "All Works", count: allWorkCount },
              { label: "Case Studies", count: caseStudyWorkCount },
              { label: "Archives", count: archiveCount },
            ].map((item) => (
              <button
                key={item.label}
                className="flex flex-row items-center justify-between"
                onClick={() => updateFilterStage(item.label)}
              >
                <div className="flex flex-row gap-3 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`lucide lucide-move-right ${
                      filteredWork === item.label.toLowerCase()
                        ? "block"
                        : "hidden"
                    }`}
                  >
                    <path d="M18 8L22 12L18 16" />
                    <path d="M2 12H22" />
                  </svg>
                  <p
                    className={
                      filteredWork === item.label.toLowerCase()
                        ? ""
                        : "text-accent"
                    }
                  >
                    {item.label}
                  </p>
                </div>
                <p
                  className={
                    filteredWork === item.label.toLowerCase()
                      ? ""
                      : "text-accent"
                  }
                >
                  {item.count} Works
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function FilterWork() {
  return (
    <Suspense>
      <Filter />
    </Suspense>
  );
}
