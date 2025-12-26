"use client";

import { useLayoutStore } from "@/store/layout-store";
import Chatbot from "./chatbot";
import Header from "./header";
import SelectMenu from "./select-menu";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSidebarOpen } = useLayoutStore();

  return (
    <main
      className={`p-6 text-2xl flex flex-col justify-between lg:w-[750px] ${isSidebarOpen ? "" : "lg:mx-auto"}`}
    >
      <SelectMenu />
      <Header />
      {children}
      <Chatbot />
    </main>
  );
}
