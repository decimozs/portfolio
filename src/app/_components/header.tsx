"use client";

import Nav from "@/components/core/nav";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";

const HeaderComponent = () => {
  const [filteredWorks, setFilteredWorks] = useState<string>("Relevant Works");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedFilter = searchParams.get("filter");

  useEffect(() => {
    if (selectedFilter === "archives") {
      setFilteredWorks("Archives");
    } else if (selectedFilter === "all works") {
      setFilteredWorks("Works");
    } else if (selectedFilter === "case studies") {
      setFilteredWorks("Case Studies");
    } else {
      setFilteredWorks("Relevant Works");
    }
  }, [selectedFilter]);

  if (pathname === "/info") {
    return (
      <div className="p-4 fixed top-0 left-0 flex flex-row justify-between bg-primary w-full z-50">
        <div>
          <Link href="/">
            <p>Marlon Martin</p>
          </Link>
          <div className="flex flex-row gap-1 text-accent">
            <Link href="/">
              <p>Index</p>
            </Link>
            <p>—</p>
            <p>Info</p>
          </div>
        </div>
        <Nav className="flex flex-row gap-4" />
      </div>
    );
  }

  if (pathname === "/works") {
    return (
      <div className="p-4 fixed top-0 left-0 flex flex-row justify-between bg-primary w-full z-50">
        <div>
          <Link href="/">
            <p>Marlon Martin</p>
          </Link>
          <div className="flex flex-row gap-1 text-accent">
            <Link href="/">
              <p>Index</p>
            </Link>
            <p>—</p>
            <p>{filteredWorks}</p>
          </div>
        </div>
        <Nav className="flex flex-row gap-4" />
      </div>
    );
  }

  if (pathname === "/") {
    return (
      <div className="p-4  flex flex-row justify-between bg-primary w-full z-50">
        <div>
          <Link href="/">
            <p>Marlon Martin</p>
          </Link>
          <Link href="/" className="text-accent">
            <p>Index</p>
          </Link>
        </div>
        <Nav className="flex flex-row gap-4" />
      </div>
    );
  }

  return null;
};

export default function Header() {
  return (
    <Suspense>
      <HeaderComponent />
    </Suspense>
  );
}
