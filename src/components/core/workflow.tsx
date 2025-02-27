import { workflowItems } from "@/utils/constants";
import React from "react";

type WorkflowType = {
  tool: string;
  name: string;
};

const WorkflowItem = ({ tool, name }: WorkflowType) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <p>{tool}</p>
      <p>—</p>
      <p>{name}</p>
    </div>
  );
};

export default function Workflow() {
  return (
    <>
      <p>Workflow</p>
      <div className="text-accent">
        {workflowItems.map((item, index) => (
          <WorkflowItem tool={item.tool} name={item.name} key={index + 1} />
        ))}
      </div>
    </>
  );
}
