import { useColorMode } from "@chakra-ui/react";

export const GlobalBackground = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <style jsx global>{`
      html {
        background: ${isDark ? "#000000" : "#FFFFFF"};
      }
    `}</style>
  );
};
