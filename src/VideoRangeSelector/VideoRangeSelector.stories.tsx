import type { Meta, StoryObj } from "@storybook/react";

import { VideoRangeSelector } from ".";
import { Range } from "./Range";
import { RangeInputs } from "./RangeInputs";
import { RangeProps, VideoRangeSelectorProps } from "./types";

type VideoStoryComponentProps = VideoRangeSelectorProps & RangeProps;

const StoryComponent = (props: VideoStoryComponentProps): JSX.Element => {
  return (
    <VideoRangeSelector {...props}>
      <Range thumbnailUrl={props.thumbnailUrl} />
      <RangeInputs />
    </VideoRangeSelector>
  );
};

const meta: Meta<VideoStoryComponentProps> = {
  title: "Demos/VideoRangeSelector",
  component: StoryComponent,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `
        <VideoRangeSelector
      videoDuration={videoDuration}
      onRangeChange={onRangeChange}
      startSelection={startSelection}
      endSelection={endSelection}
      maxDuration={maxDuration}
      onRangeChange: (start: number, end: number) => {}
>
  <Range thumbnailUrl={thumbnailUrl} />
  <RangeInputs />
</VideoRangeSelector>
    `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    videoDuration: {
      description: "Duration video in milliseconds",
      control: {
        type: "number",
      },
    },
    startSelection: {
      description: "Start selection in milliseconds",
      control: {
        type: "number",
      },
    },
    endSelection: {
      description: "End selection in milliseconds",
      control: {
        type: "number",
      },
    },
    thumbnailUrl: {
      description: "Thumbnail URL",
      control: {
        type: "text",
      },
    },
    onRangeChange: {
      description: "Callback function",
      control: {
        type: "object",
      },
    },
    maxDuration: {
      description: "Max duration of selection in milliseconds",
      control: {
        type: "number",
      },
    },
  },
};

export default meta;

type Story = StoryObj<VideoStoryComponentProps>;

export const SimpleSample: Story = {
  args: {
    videoDuration: 20000,
    startSelection: 0,
    endSelection: 7000,
    thumbnailUrl: "http://i3.ytimg.com/vi/U-JWN7AoNGQ/hqdefault.jpg",
    theme: {
      colors: {
        // overlay: "rgba(0, 255, 0, 0.3)",
        // primary: "#00ff00",
      },
    },
    overlayRightClassName: "custom",
  },
  parameters: {
    docs: {
      source: {
        code: `
        <VideoRangeSelector
  videoDuration={videoDuration}
  onRangeChange={onRangeChange}
  startSelection={startSelection}
  endSelection={endSelection}
  onRangeChange: (start: number, end: number) => {}
>
  <Range thumbnailUrl={thumbnailUrl} />
  <RangeInputs />
</VideoRangeSelector>
    `,
      },
    },
  },
};

export const WithMaxDuration = {
  args: {
    maxDuration: 10000,
    videoDuration: 20000,
    startSelection: 0,
    endSelection: 7000,
    thumbnailUrl: "http://i3.ytimg.com/vi/U-JWN7AoNGQ/hqdefault.jpg",
  },
  parameters: {
    docs: {
      source: {
        code: `
        <VideoRangeSelector
  videoDuration={videoDuration}
  onRangeChange={onRangeChange}
  startSelection={startSelection}
  endSelection={endSelection}
  maxDuration={maxDuration}
  onRangeChange: (start: number, end: number) => {}
>
  <Range thumbnailUrl={thumbnailUrl} />
  <RangeInputs />
</VideoRangeSelector>
    `,
      },
    },
  },
};
