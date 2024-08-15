export const parseTime = (timeString: string): number => {
  const seconds = parseFloat(timeString);
  return isNaN(seconds) ? 0 : Math.round(seconds * 1000);
};
