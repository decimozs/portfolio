"use client";

import OverflowEffect from "./overflow-effect";

export default function MainLayout({
  children,
  pathname,
}: {
  children: React.ReactNode;
  pathname: string;
}) {
  return (
    <OverflowEffect>
      <main className="p-6 text-2xl flex flex-col xl:grid xl:grid-cols-[250px_1fr] xl:gap-20 xl:max-w-7xl xl:mx-auto min-h-screen items-start">
        {children}
      </main>
    </OverflowEffect>
  );
}
