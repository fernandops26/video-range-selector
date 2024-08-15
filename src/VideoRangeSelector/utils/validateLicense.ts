export const validateLicense = (licenseKey?: string): void => {
  if (!licenseKey) {
    console.error("Please provide a valid license key");
  }

  if (licenseKey === "0000-0000-0000-0000") {
    console.warn(
      "videoRangeSelector: " +
        licenseKey +
        " license key is not valid for production use"
    );
  }
};
