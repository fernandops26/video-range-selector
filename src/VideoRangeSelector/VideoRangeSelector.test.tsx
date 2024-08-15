import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { VideoRangeSelector } from ".";
import { Range } from "./Range";
import { RangeInputs } from "./RangeInputs";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe("VideoRangeSelector", () => {
  it("should render the component", () => {
    const videoDuration = 1000;
    const handleRangeChange = (): void => {};
    // const selectionRange = { start: 0, end: 0 };
    const startSelection = 0;
    const endSelection = 0;
    const thumbnailUrl = "https://example.com/thumbnail.jpg";

    const { getByTestId } = render(
      <VideoRangeSelector
        videoDuration={videoDuration}
        onRangeChange={handleRangeChange}
        startSelection={startSelection}
        endSelection={endSelection}
        licenseKey="0000-0000-0000-0000"
      >
        <Range thumbnailUrl={thumbnailUrl} />
        <RangeInputs />
      </VideoRangeSelector>
    );

    const videoRangeSelector = getByTestId("video-range-selector");

    expect(videoRangeSelector).toBeInTheDocument();

    expect(videoRangeSelector).toHaveClass("vrs-container");
  });
});
