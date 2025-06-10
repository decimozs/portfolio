import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SquareText({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          data-square
          className={cn(
            "bg-muted text-muted-foreground flex size-5 items-center justify-center rounded text-xs font-medium",
            className,
          )}
          aria-hidden="true"
        >
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>Version 4 Portfolio</p>
      </TooltipContent>
    </Tooltip>
  );
}
