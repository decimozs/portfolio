"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { socialItems } from "@/lib/constant";

export default function Links() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-4 flex-1">
      {socialItems.map((item) => (
        <div key={item.social}>
          <Link
            href={item.link}
            target="_blank"
            referrerPolicy="no-referrer"
            className="text-muted-foreground hover:underline hover:text-black cursor-pointer"
          >
            {item.label}
          </Link>
        </div>
      ))}

      <div className="fixed left-6 bottom-6 flex flex-col gap-2 md:hidden">
        {pathname !== "/" && (
          <Link href="/" className="hover:underline w-fit">
            Index
          </Link>
        )}
        <Link
          href="/works"
          className={`hover:underline w-fit ${pathname === "/works" && "underline"}`}
        >
          Works
        </Link>
        <Link
          href="/links"
          className={`hover:underline w-fit ${pathname === "/links" && "underline"}`}
        >
          Links
        </Link>
        <Link
          href="/resume.pdf"
          target="_blank"
          referrerPolicy="no-referrer"
          className="hover:underline w-fit"
        >
          Resume
        </Link>
      </div>
    </div>
  );
}
