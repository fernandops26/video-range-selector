import React, { createContext, useContext, useState, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import { formatTime, parseTime } from "./utils";
import {
  VideoRangeSelectorContextProps,
  VideoRangeSelectorProviderProps,
} from "./types";

const VideoRangeSelectorContext = createContext<
  VideoRangeSelectorContextProps | undefined
>(undefined);

export const VideoRangeSelectorProvider: React.FC<
  VideoRangeSelectorProviderProps
> = ({
  children,
  videoDuration,
  onRangeChange,
  startSelection,
  endSelection,
  maxDuration,
}) => {
  const [start, setStart] = useState(startSelection);
  const [end, setEnd] = useState(endSelection);
  const [startInput, setStartInput] = useState(formatTime(startSelection));
  const [endInput, setEndInput] = useState(formatTime(endSelection));

  const debouncedOnRangeChange = useDebouncedCallback(
    (start: number, end: number) => {
      onRangeChange(start, end);
    },
    100
  );

  const updateRange = useCallback(
    (newStart: number, newEnd: number) => {
      setStart(newStart);
      setEnd(newEnd);
      setStartInput(formatTime(newStart));
      setEndInput(formatTime(newEnd));
      debouncedOnRangeChange(newStart, newEnd);
    },
    [debouncedOnRangeChange]
  );

  const handleInputChange = useCallback(
    (type: "start" | "end", value: string) => {
      if (type === "start") {
        setStartInput(value);
      } else {
        setEndInput(value);
      }
    },
    []
  );

  const applyTimeChange = useCallback(
    (type: "start" | "end", value: string) => {
      const timeInMilliseconds = parseTime(value);
      let newStart = start;
      let newEnd = end;

      if (type === "start") {
        newStart = Math.max(0, Math.min(timeInMilliseconds, end - 1000));
        if (maxDuration && end - newStart > maxDuration) {
          newStart = end - maxDuration;
        }
      } else {
        newEnd = Math.min(
          videoDuration,
          Math.max(timeInMilliseconds, start + 1000)
        );
        if (maxDuration && newEnd - start > maxDuration) {
          newEnd = start + maxDuration;
        }
      }

      updateRange(newStart, newEnd);
    },
    [start, end, maxDuration, videoDuration, updateRange]
  );

  const contextValue: VideoRangeSelectorContextProps = {
    start,
    end,
    startInput,
    endInput,
    videoDuration,
    maxDuration,
    updateRange,
    handleInputChange,
    applyTimeChange,
  };

  return (
    <VideoRangeSelectorContext.Provider value={contextValue}>
      {children}
    </VideoRangeSelectorContext.Provider>
  );
};

export const useVideoRangeSelector = () => {
  const context = useContext(VideoRangeSelectorContext);
  if (!context) {
    throw new Error(
      "useVideoRangeSelector must be used within a VideoRangeSelectorProvider"
    );
  }
  return context;
};
