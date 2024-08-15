import React from "react";
import { useVideoRangeSelector } from "./VideoRangeSelectorContext";
import { Input } from "./Input";
import { RangeInputsProps } from "./types";
import { cn } from "./utils/cn";

export const RangeInputs: React.FC<RangeInputsProps> = ({
  containerClassName,
  inputClassName,
}) => {
  const { startInput, endInput, handleInputChange, applyTimeChange } =
    useVideoRangeSelector();

  return (
    <div className={cn("vrs-input-container", containerClassName)}>
      <Input
        value={startInput}
        onChange={(e) => handleInputChange("start", e.target.value)}
        onBlur={() => applyTimeChange("start", startInput)}
        onKeyDown={(e) => {
          if (e.key === "Enter") applyTimeChange("start", startInput);
        }}
        className={cn("vrs-input vrs-input-start", inputClassName)}
      />
      <Input
        value={endInput}
        onChange={(e) => handleInputChange("end", e.target.value)}
        onBlur={() => applyTimeChange("end", endInput)}
        onKeyDown={(e) => {
          if (e.key === "Enter") applyTimeChange("end", endInput);
        }}
        className={cn("vrs-input vrs-input-end", inputClassName)}
      />
    </div>
  );
};
