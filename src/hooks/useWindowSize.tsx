import { useBreakpointValue } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import { useDevice } from "./useDevice";

export const WindowContext = createContext<any>(undefined);

export const WindowContextProvider = (props) => {
  const size = useBreakpointValue({
    base: "base",
    md: "md",
    lg: "lg",
    xl: "xl",
    sm: "sm",
  });
  const { isDesktop } = useDevice();
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

  const value = {
    size,
    isScreen:
      isDesktop || size === "lg" || size === "xl" || windowSize.width >= 1020,
    isPad:
      size === "md" ||
      size === "sm" ||
      (windowSize.width < 1020 && windowSize.width > 640),
    isMobile: !isDesktop || (size === "base" && windowSize.width <= 640),
  };

  return <WindowContext.Provider value={value} {...props} />;
};

export const useWindowSize = () => {
  const context = useContext(WindowContext);
  if (context === undefined) {
    throw new Error(`useTitle must be used within a WindowContextProvider.`);
  }
  return context;
};
