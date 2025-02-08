"use client";

import { navItems } from "@/utils/constants";
import { LinkType } from "@/utils/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ href, label }: LinkType) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={
        pathname === href
          ? "text-secondary"
          : "text-accent hover:text-secondary transition duration-300 ease-in-out"
      }
    >
      {label}
    </Link>
  );
};

const NavItem = () => {
  return (
    <>
      {navItems.map((item, index) => (
        <NavLink href={item.href} key={index + 1} label={item.label} />
      ))}
    </>
  );
};

export default function Nav({ className }: { className: string }) {
  return (
    <div className={className}>
      <NavItem />
    </div>
  );
}
