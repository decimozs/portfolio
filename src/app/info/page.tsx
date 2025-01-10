import { seo } from "@/lib/seo";
import Bio from "./_components/bio";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...seo,
};

export default function Info() {
  return (
    <main className="mt-[4.5rem]">
      <Bio />
    </main>
  );
}
