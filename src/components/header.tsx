"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <div className={`mb-4 ${pathname === "/" && "lg:mt-[5vh]"}`}>
      {pathname === "/" && (
        <div>
          <Image
            src="/me.jpg"
            alt="Marlon Martin"
            width={150}
            height={150}
            preload
            className="rounded-md mb-4"
          />
        </div>
      )}
      <Link href="/">Marlon Martin</Link>
      <div className="lg:flex lg:items-center lg:justify-between">
        {pathname === "/" ? (
          <p className="text-lg">
            engineering{" "}
            <Link
              href="https://www.binspire.space/"
              target="_blank"
              referrerPolicy="no-referrer"
              className=" hover:underline"
            >
              @binspire
            </Link>{" "}
          </p>
        ) : (
          <p className="text-lg">{`Projects I’ve worked on`}</p>
        )}
        {pathname === "/" && (
          <div className="hidden text-lg lg:flex lg:flex-row lg:gap-2">
            <Link href="/works" className="hover:underline w-fit">
              Works
            </Link>
            <p>/</p>
            <Link
              href="/resume.pdf"
              target="_blank"
              referrerPolicy="no-referrer"
              className="hover:underline w-fit"
            >
              Resume
            </Link>
            <p>/</p>
            <Link
              href="https://www.linkedin.com/in/decimomartin/"
              target="_blank"
              referrerPolicy="no-referrer"
              className="hover:underline w-fit"
            >
              LinkedIn
            </Link>
            <p>/</p>
            <Link
              href="https://github.com/decimozs"
              target="_blank"
              referrerPolicy="no-referrer"
              className="hover:underline w-fit"
            >
              GitHub
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
