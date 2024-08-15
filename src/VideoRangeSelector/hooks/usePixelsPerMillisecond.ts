import { useState, useEffect, useCallback } from "react";
import { UsePixelsPerMillisecondHook } from "../types";

export const usePixelsPerMillisecond: UsePixelsPerMillisecondHook = (
  ref,
  videoDuration
) => {
  const [pixelsPerMs, setPixelsPerMs] = useState(0);

  const calculatePixelsPerMs = useCallback(() => {
    if (ref.current) {
      return ref.current.offsetWidth / videoDuration;
    }
    return 0;
  }, [ref, videoDuration]);

  useEffect(() => {
    setPixelsPerMs(calculatePixelsPerMs());

    const handleResize = () => {
      setPixelsPerMs(calculatePixelsPerMs());
    };

    window.addEventListener("resize", handleResize);

    // Use ResizeObserver for more precise tracking of the component's size
    const resizeObserver = new ResizeObserver(handleResize);
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
    };
  }, [ref, videoDuration, calculatePixelsPerMs]);

  return pixelsPerMs;
};
