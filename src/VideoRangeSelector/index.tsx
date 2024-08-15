import "./VideoRangeSelector.css";

import React, { useEffect } from "react";
import { VideoRangeSelectorProvider } from "./VideoRangeSelectorContext";
import { VideoRangeSelectorProps } from "./types";
import { formatTime } from "./utils";
import { defaultTheme, ThemeProvider } from "./ThemeContext";
import { validateLicense } from "./utils/validateLicense";

export const VideoRangeSelector: React.FC<VideoRangeSelectorProps> = ({
  children,
  videoDuration,
  onRangeChange,
  startSelection,
  endSelection,
  maxDuration,
  theme,
  licenseKey,
}) => {
  const globalVars: React.CSSProperties & Record<string, string> = {
    "--vrs-color-primary":
      theme?.colors?.primary ?? defaultTheme.colors.primary ?? "",
    "--vrs-color-overlay":
      theme?.colors?.overlay ?? defaultTheme.colors.overlay ?? "",
  };

  useEffect(() => {
    validateLicense(licenseKey);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <VideoRangeSelectorProvider
        videoDuration={videoDuration}
        onRangeChange={onRangeChange}
        startSelection={startSelection}
        endSelection={endSelection}
        maxDuration={maxDuration}
      >
        <div
          data-testid="video-range-selector"
          className="vrs-container"
          style={globalVars}
        >
          {maxDuration && (
            <div className="vrs-max-duration">
              max: {formatTime(maxDuration)}
            </div>
          )}
          {children}
        </div>
      </VideoRangeSelectorProvider>
    </ThemeProvider>
  );
};
