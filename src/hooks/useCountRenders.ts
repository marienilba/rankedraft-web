import { useRef } from "react";

export const useCountRenders = (component?: string): void => {
  const renders = useRef(0);
  console.log(
    `renders${component ? " in " + component : ""}:`,
    renders.current++
  );
};
