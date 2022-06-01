import { useColorMode } from "@chakra-ui/react";
import { useCallback } from "react";

type Options = {
  variant?: "primary" | "secondary" | "info";
  invert?: boolean;
};
export function useTheme(options?: Options) {
  const { colorMode } = useColorMode();
  const colors = {
    100: "#FFFFFF",
    200: "#F5F8FA",
    300: "#E1E8ED",
    400: "#AAB8C2",
    500: "#657786",
    600: "#14171A",
    700: "#000000",
  };
  const getCodeColors = useCallback(
    (value: number) => {
      if (!options?.invert) {
        if (options?.variant === "primary")
          return colorMode === "dark" ? colors[800 - value] : colors[0 + value];
        if (options?.variant === "secondary")
          return colorMode === "dark"
            ? colors[700 - value]
            : colors[100 + value];
        return colorMode === "dark" ? colors[800 - value] : colors[0 + value];
      } else {
        if (options?.variant === "primary")
          return colorMode !== "dark" ? colors[800 - value] : colors[0 + value];
        if (options?.variant === "secondary")
          return colorMode !== "dark"
            ? colors[700 - value]
            : colors[100 + value];
        return colorMode !== "dark" ? colors[800 - value] : colors[0 + value];
      }
    },
    [colorMode, options]
  );

  const getColors = useCallback(
    (value: number) => {
      return colorMode === "dark"
        ? `brand.${800 - value}`
        : `brand.${0 + value}`;
    },
    [colorMode]
  );

  const getNegativeColors = useCallback(
    (value: number) => {
      return colorMode !== "dark"
        ? `brand.${800 - value}`
        : `brand.${0 + value}`;
    },
    [colorMode]
  );

  const getBg = useCallback(() => {
    if (!options?.invert) {
      if (options?.variant === "primary")
        return colorMode === "dark" ? "brand.700" : "brand.100";
      if (options?.variant === "secondary")
        return colorMode === "dark" ? "brand.600" : "brand.200";
      if (options?.variant === "info")
        return colorMode === "dark" ? "brand.600" : "brand.300";
      return colorMode === "dark" ? "brand.700" : "brand.100";
    } else {
      if (options?.variant === "primary")
        return colorMode !== "dark" ? "brand.700" : "brand.100";
      if (options?.variant === "secondary")
        return colorMode !== "dark" ? "brand.600" : "brand.200";
      if (options?.variant === "info")
        return colorMode === "dark" ? "brand.600" : "brand.300";
      return colorMode !== "dark" ? "brand.700" : "brand.100";
    }
  }, [colorMode, options]);

  return {
    backgroundColor: { backgroundColor: getBg() },
    color: { color: getBg() },
    isDark: colorMode === "dark",
    theme: {
      100: getColors(100),
      200: getColors(200),
      300: getColors(300),
      400: getColors(400),
      500: getColors(500),
      600: getColors(600),
      700: getColors(700),
    },
    invert: {
      100: getNegativeColors(100),
      200: getNegativeColors(200),
      300: getNegativeColors(300),
      400: getNegativeColors(400),
      500: getNegativeColors(500),
      600: getNegativeColors(600),
      700: getNegativeColors(700),
    },
    colors: colors,
    code: {
      100: getCodeColors(100),
      200: getCodeColors(200),
      300: getCodeColors(300),
      400: getCodeColors(400),
      500: getCodeColors(500),
      600: getCodeColors(600),
      700: getCodeColors(700),
    },
  };
}
