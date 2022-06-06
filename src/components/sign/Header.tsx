import { Box, Flex, Heading, Img } from "@chakra-ui/react";
import { useTheme } from "../../hooks/useTheme";

export const Header = () => {
  const { isDark, theme } = useTheme();
  return (
    <>
      <Flex
        boxSize="64px"
        _hover={{ backgroundColor: theme[100], cursor: "pointer" }}
        alignItems="center"
        justifyContent="center"
        borderRadius="full"
      >
        <Box boxSize="48px">
          <Img src={"/icons/sword.png"} />
        </Box>
      </Flex>
      <Flex
        bgGradient={
          isDark
            ? "linear(to-l, brand.100, brand.200)"
            : "linear(to-l, brand.700, brand.600)"
        }
        textShadow="dark-lg"
        bgClip="text"
      >
        <Heading fontSize="7xl">RankeDraft</Heading>
      </Flex>
    </>
  );
};
