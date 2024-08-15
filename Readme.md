# video-range-selector

A React library for selecting a specific range within a video timeline. The library provides a customizable and intuitive interface for users to select start and end times for video segments.

## Features

- Customizable: Modify the appearance and behavior using props.
- Intuitive Interface: Drag handles for selecting start and end times.
- Dynamic: Adjusts to varying video durations with pixel-to-millisecond scaling.

## Installation

Install the library via npm, yarn, pnpm:

```bash
npm install video-range-selector
```

## Components

### VideoRangeSelector

Props:

- videoDuration (number, required): The total duration of the video in milliseconds.
- onRangeChange (function, required): Callback function that receives the updated start and end times.
- startSelection (number, required): The initial start time for the selection in milliseconds.
- endSelection (number, required): The initial end time for the selection in milliseconds.
- licenseKey (string): License key for using the component on production.
- maxDuration (number, optional): Maximum duration that can be selected.
- theme (object, optional): Custom theme to apply styles. Can include primary and overlay colors.

### Range

A component that displays the selectable range on the video timeline.

Props:

- thumbnailUrl (string, required): URL of the video thumbnail to be displayed in the range selector.
- containerClassName (string, optional): Custom class name for the range container.
- overlayLeftClassName (string, optional): Custom class name for the left overlay.
- overlayRightClassName (string, optional): Custom class name for the right overlay.
- leftHandleClassName (string, optional): Custom class name for the left handle.
- rightHandleClassName (string, optional): Custom class name for the right handle.
- centerHandleClassName (string, optional): Custom class name for the center handle.

### RangeInputs

A component that provides input fields for manually entering the start and end times.

Props:

- containerClassName (string, optional): Custom class name for the input container.
- inputClassName (string, optional): Custom class name for the input fields.

## Basic Usage

Here’s a basic example of how to use the video-range-selector components:

```tsx
import { VideoRangeSelector, Range, RangeInputs } from "video-range-selector";

const MyComponent = () => {
  const videoDuration = 120000; // 2 minutes in milliseconds
  const [startSelection, setStartSelection] = useState(5000); // 5 seconds
  const [endSelection, setEndSelection] = useState(70000); // 1 minute 10 seconds
  const thumbnailUrl = "thumbnail-url";

  const handleRangeChange = (start: number, end: number) => {
    setStartSelection(start);
    setEndSelection(end);
  };

  return (
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
};
```

## License

This library requires a license key for use in commercial applications. Please obtain a license key from [Your License Provider] and include it in the licenseKey prop.

## Support

For questions, issues, or feature requests, please contact jf.palacios.sz@gmail.com.
