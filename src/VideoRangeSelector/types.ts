import { RefObject } from "react";

export interface SideHandleProps {
  id: string;
  left?: string;
  label?: string;
  width?: string;
  className?: string;
}

export interface CenterHandleProps {
  id: string;
  left: string;
  width?: string;
  label?: string;
  className?: string;
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export type TimeType = "start" | "end";

export type UsePixelsPerMillisecondHook = (
  ref: RefObject<HTMLDivElement>,
  videoDuration: number
) => number;

export interface VideoRangeSelectorContextProps {
  start: number;
  end: number;
  startInput: string;
  endInput: string;
  videoDuration: number;
  maxDuration?: number;
  updateRange: (newStart: number, newEnd: number) => void;
  handleInputChange: (type: "start" | "end", value: string) => void;
  applyTimeChange: (type: "start" | "end", value: string) => void;
}

export interface Theme {
  colors: {
    primary?: string;
    overlay?: string;
  };
}

export interface VideoRangeSelectorProviderProps {
  children: React.ReactNode;
  videoDuration: number;
  onRangeChange: (start: number, end: number) => void;
  startSelection: number;
  endSelection: number;
  maxDuration?: number;
  theme?: Partial<Theme>;
}

// Update the existing VideoRangeSelectorProps
export interface VideoRangeSelectorProps
  extends VideoRangeSelectorProviderProps {
  licenseKey?: string;
}

export interface RangeProps {
  thumbnailUrl: string;
  containerClassName?: string;
  overlayLeftClassName?: string;
  overlayRightClassName?: string;
  leftHandleClassName?: string;
  rightHandleClassName?: string;
  centerHandleClassName?: string;
}

export interface RangeInputsProps {
  containerClassName?: string;
  inputClassName?: string;
}
