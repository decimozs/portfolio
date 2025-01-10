<<<<<<< HEAD:src/app/info/page.tsx
import { seo } from "@/lib/seo";
import Bio from "./_components/bio";
=======
import Profile from "@/components/core/profile";
>>>>>>> main:src/app/(pages)/info/page.tsx
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
