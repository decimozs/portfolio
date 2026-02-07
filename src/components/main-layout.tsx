"use client";

import { usePathname } from "next/navigation";
import OverflowEffect from "./overflow-effect";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <OverflowEffect>
      <main
        className={`p-6 text-2xl flex flex-col ${pathname === "/" && "justify-center xl:h-screen"} xl:items-center lg:w-191.25 lg:mx-auto`}
      >
        {children}
      </main>
    </OverflowEffect>
  );
}
