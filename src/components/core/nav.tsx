"use client";

import { navItems } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Nav({ className }: { className: string }) {
  const pathname = usePathname();

  return (
    <div className={className}>
      {navItems.map((item, index) => (
        <Link
          href={item.href}
          key={index + 1}
          className={
            pathname === item.href
              ? "text-secondary"
              : "text-accent hover:text-secondary transition duration-300 ease-in-out"
          }
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
