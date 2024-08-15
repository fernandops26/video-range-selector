import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "./utils/cn";
import { CenterHandleProps } from "./types";

export const CenterHandle: React.FC<CenterHandleProps> = ({
  id,
  left,
  width,
  label,
  className,
}) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  const style = {
    left,
    width: width ?? "5px",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={"vrs-handle"}
      {...listeners}
      {...attributes}
    >
      {label && <span className="vrs-handle-label">{label}</span>}
      <div className={cn("vrs-handle-center", className)} />
    </div>
  );
};
