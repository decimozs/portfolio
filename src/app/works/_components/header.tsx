"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header() {
  const pathname = usePathname();

  if (pathname !== "/works") {
    return null;
  }

  return (
    <div>
      <Link href="/">
        <p>Marlon Martin</p>
      </Link>
      <div className="flex flex-row gap-1 text-accent">
        <Link href="/">
          <p>Index</p>
        </Link>
        <p>—</p>
        <p>Works</p>
      </div>
    </div>
  );
}
