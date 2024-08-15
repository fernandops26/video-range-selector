import React from "react";
import { cn } from "./utils/cn";
import { InputProps } from "./types";

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return <input className={cn(className)} {...props} />;
};
