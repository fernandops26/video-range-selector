import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "./utils/cn";
import { SideHandleProps } from "./types";

export const SideHandle: React.FC<SideHandleProps> = ({
  id,
  left,
  width,
  className,
}) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  const style: React.CSSProperties = {
    left,
    width: width || "5px",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`vrs-handle`}
      {...listeners}
      {...attributes}
    >
      <div className={cn("vrs-handle-side", className)} />
    </div>
  );
};
