export const YisWhatPercentOfX = (y: number, x: number) => {
  if (x === 0) return 100;
  return (y / x) * 100;
};

export const makeArrayOfRange = <T>(limit: number[]): T[] => {
  return Array.apply(null, Array(Math.abs(limit[1] - limit[0] + 1))).map(
    (_: any, i: number) => {
      return null;
    }
  );
};
