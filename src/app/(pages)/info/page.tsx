import Profile from "@/components/core/profile";
import { seo } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...seo,
};

export default function Info() {
  return (
    <main className="mt-[4.5rem]">
      <Profile />
    </main>
  );
}
