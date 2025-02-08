import { statusItems } from "@/utils/constants";
import React from "react";

export default function Status() {
  return (
    <>
      <p>Status</p>

      <div className="flex flex-col text-accent gap-2">
        {statusItems.map((item, index) => (
          <p key={index + 1}>{item}</p>
        ))}
      </div>
    </>
  );
}
