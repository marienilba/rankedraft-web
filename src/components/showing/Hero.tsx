import { Flex, Heading, useColorMode } from "@chakra-ui/react";
import { useWindowSize } from "../../hooks/useWindowSize";

export const Hero = ({ title }: { title: string }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const { isMobile, isPad, isScreen } = useWindowSize();

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      bgGradient={
        isDark
          ? "linear(to-l, brand.100, brand.200)"
          : "linear(to-l, brand.700, brand.600)"
      }
      textShadow="dark-lg"
      bgClip="text"
    >
      <Heading fontSize={isMobile ? "16vw" : isPad ? "12vw" : "8vw"}>
        {title}
      </Heading>
    </Flex>
  );
};
