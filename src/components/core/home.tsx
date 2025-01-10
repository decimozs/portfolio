import Contacts from "@/components/core/contacts";
import Separator from "@/components/ui/separator";
import React from "react";
import CurrentTime from "@/components/dynamic/current-time";
import Bio from "./bio";

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
