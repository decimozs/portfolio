"use client";

import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <main
      className={`p-6 text-2xl flex flex-col ${pathname === "/" && "justify-center"} lg:items-center md:h-screen lg:w-[765px] lg:mx-auto`}
    >
      {children}
    </main>
  );
}
