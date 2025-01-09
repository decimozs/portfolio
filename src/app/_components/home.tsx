import Contacts from "@/components/core/contacts";
import Separator from "@/components/ui/separator";
import React from "react";
import Bio from "./bio";
import CurrentTime from "@/components/core/current-time";

export default function Home() {
  return (
    <main className="px-4 grid grid-cols-1 gap-4">
      <Bio />
      <Separator classname="lg:w-[500px]" />
      <Contacts />
      <CurrentTime />
    </main>
  );
}
