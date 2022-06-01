import { Flex, Heading } from "@chakra-ui/react";
import { useTheme } from "../../../hooks/useTheme";

export const Hero = () => {
  const { invert } = useTheme();
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      bgGradient={`linear(to-r, ${invert[100]} , ${invert[300]})`}
      bgClip="text"
    >
      <Heading>Ranked Draft</Heading>
    </Flex>
  );
};
