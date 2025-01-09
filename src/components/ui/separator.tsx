import React from "react";

export default function Separator({ classname }: { classname?: string }) {
  return (
    <span className={`block w-full h-[1px] bg-accent ${classname}`}></span>
  );
}
