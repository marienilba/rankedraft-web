import { useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function useWindowSize() {
  const size = useBreakpointValue({
    base: "base",
    md: "md",
    lg: "lg",
    xl: "xl",
    sm: "sm",
  });

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return {
    size,
    isScreen: size === "lg" || size === "xl" || windowSize.width >= 1020,
    isPad:
      size === "md" ||
      size === "sm" ||
      (windowSize.width < 1020 && windowSize.width > 640),
    isMobile: size === "base" && windowSize.width <= 640,
  };
}
