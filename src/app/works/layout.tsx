import { seo } from "@/lib/seo";
import { Metadata } from "next";
import React, { ReactNode, Suspense } from "react";

export const metadata: Metadata = {
  ...seo,
};

export default function WorksLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <main className="p-4">{children}</main>
    </Suspense>
  );
}
