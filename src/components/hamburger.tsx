"use client";

import { navItems, socialItems } from "@/lib/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Hamburger() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleMenu = () => setOpen((prev) => !prev);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
      <div className="fixed top-6 right-6 z-50 xl:hidden">
        <button
          className="flex flex-col gap-1 p-4 bg-accent"
          onClick={toggleMenu}
        >
          <span className="block h-[2px] w-5 bg-black" />
          <span className="block h-[2px] w-5 bg-black" />
        </button>
      </div>

      <div className="hidden fixed top-0 left-0 p-6 text-2xl xl:block">
        <div className="flex flex-col gap-6 mt-1">
          <div className="flex flex-col gap-1">
            <p className="text-sm">Nav</p>
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.id}
                className={`w-fit transition-all duration-300 ease-in-out ${
                  pathname === item.href
                    ? "cursor-default"
                    : "text-muted-foreground cursor-pointer hover:text-black"
                }`}
                target={item.id === "resume" ? "_blank" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm">Socials</p>
            {socialItems.map((item) => (
              <Link
                href={item.href}
                className="text-muted-foreground w-fit transition-all duration-300 ease-in-out hover:text-black"
                key={item.id}
                target="_blank"
                referrerPolicy="no-referrer"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed top-0 left-0 w-full h-screen z-40 bg-white p-6 text-2xl xl:hidden">
          <div className="flex flex-col gap-6 mt-1">
            <div className="flex flex-col gap-1">
              <p className="text-sm">Nav</p>
              {navItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.id}
                  className={`w-fit ${pathname === item.href ? "cursor-default" : "text-muted-foreground cursor-pointer"}`}
                  onClick={toggleMenu}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm">Socials</p>
              {socialItems.map((item) => (
                <Link
                  href={item.href}
                  className="text-muted-foreground w-fit"
                  target="_blank"
                  referrerPolicy="no-referrer"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
