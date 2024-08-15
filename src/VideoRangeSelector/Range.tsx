import React, { useRef, useCallback, useState } from "react";
import { DndContext, DragMoveEvent } from "@dnd-kit/core";
import {
  restrictToHorizontalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { useVideoRangeSelector } from "./VideoRangeSelectorContext";
import { SideHandle } from "./SideHandle";
import { CenterHandle } from "./CenterHandle";
import { useMouse } from "./hooks/useMouse";
import { usePixelsPerMillisecond } from "./hooks/usePixelsPerMillisecond";
import { formatTime } from "./utils/formatTime";
import { RangeProps } from "./types";
import { cn } from "./utils/cn";

export const Range: React.FC<RangeProps> = ({
  thumbnailUrl,
  containerClassName,
  overlayLeftClassName,
  overlayRightClassName,
  leftHandleClassName,
  rightHandleClassName,
  centerHandleClassName,
}) => {
  const { start, end, videoDuration, maxDuration, updateRange } =
    useVideoRangeSelector();
  const timelineWidthRef = useRef<HTMLDivElement>(null);
  const mouse = useMouse(timelineWidthRef);
  const pixelsPerMillisecond = usePixelsPerMillisecond(
    timelineWidthRef,
    videoDuration
  );
  const [initial, setInitial] = useState({ start, end });

  const handleDragStart = useCallback(() => {
    setInitial({ start, end });
  }, [start, end]);

  const handleDragMove = useCallback(
    (event: DragMoveEvent) => {
      const { id } = event.active;

      if (!timelineWidthRef.current || pixelsPerMillisecond === 0) return;

      const timelineRect = timelineWidthRef.current.getBoundingClientRect();
      const offsetX = mouse.x - timelineRect.left;

      let newStart = start;
      let newEnd = end;

      if (id === "left-handle") {
        newStart = Math.max(0, Math.round(offsetX / pixelsPerMillisecond));
        if (maxDuration && end - newStart > maxDuration) {
          newStart = end - maxDuration;
        }
        newStart = Math.min(newStart, end - 1000); // Ensure a minimum duration
      } else if (id === "right-handle") {
        newEnd = Math.min(
          videoDuration,
          Math.round(offsetX / pixelsPerMillisecond)
        );
        if (maxDuration && newEnd - start > maxDuration) {
          newEnd = start + maxDuration;
        }
        newEnd = Math.max(newEnd, start + 1000); // Ensure a minimum duration
      } else if (id === "center-handle") {
        const delta = Math.round(event.delta.x / pixelsPerMillisecond);
        newStart = Math.max(0, initial.start + delta);
        newEnd = Math.min(videoDuration, initial.end + delta);

        if (maxDuration && newEnd - newStart > maxDuration) {
          if (delta > 0) {
            newEnd = newStart + maxDuration;
          } else {
            newStart = newEnd - maxDuration;
          }
        }
      }

      // Ensure the selection doesn't exceed videoDuration
      if (newEnd > videoDuration) {
        newEnd = videoDuration;
        if (maxDuration) {
          newStart = Math.max(0, newEnd - maxDuration);
        }
      }

      updateRange(newStart, newEnd);
    },
    [
      start,
      end,
      initial,
      pixelsPerMillisecond,
      maxDuration,
      videoDuration,
      mouse.x,
      updateRange,
    ]
  );

  return (
    <div className={cn("vrs-timeline-container", containerClassName)}>
      <div className="vrs-timeline">
        <div ref={timelineWidthRef} className="vrs-timeline-inner">
          {/* ... (overlay and thumbnail code) ... */}
          <div
            className={cn("vrs-overlay vrs-overlay-left", overlayLeftClassName)}
            style={{
              width: `${(start / videoDuration) * 100}%`,
            }}
          />
          <div
            className={cn(
              "vrs-overlay vrs-overlay-right",
              overlayRightClassName
            )}
            style={{
              width: `${(1 - end / videoDuration) * 100}%`,
            }}
          />
          <div
            className="vrs-thumbnail"
            style={{
              backgroundImage: `url(${thumbnailUrl})`,
              backgroundSize: "contain",
            }}
          />
          <DndContext
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
          >
            <SideHandle
              id="left-handle"
              left={`${(start / videoDuration) * 100}%`}
              width="5px"
              className={cn("vrs-handle-left", leftHandleClassName)}
              label={formatTime(start)}
            />
            <SideHandle
              id="right-handle"
              left={`calc(${(end / videoDuration) * 100}% - 6px)`}
              width="5px"
              className={cn("vrs-handle-right", rightHandleClassName)}
              label={formatTime(end)}
            />
            <CenterHandle
              id="center-handle"
              left={`${(start / videoDuration) * 100}%`}
              width={`${((end - start) / videoDuration) * 100}%`}
              label={formatTime(end - start)}
              className={cn(centerHandleClassName)}
            />
          </DndContext>
        </div>
      </div>
    </div>
  );
};
