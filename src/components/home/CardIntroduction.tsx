import {
  Fade,
  Stack,
  Img,
  Flex,
  Heading,
  useColorMode,
  StackDirection,
} from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { useTheme } from "../../hooks/useTheme";

interface CardIntroductionProps {
  heading: string;
  path: string;
  spacing?: number;
  marginTop?: number;
  marginBottom?: number;
  direction?: StackDirection;
}
export const CardIntroduction = ({
  heading,
  path,
  spacing,
  marginTop,
  marginBottom,
  direction,
}: CardIntroductionProps) => {
  const { ref, inView } = useInView();
  const { colorMode } = useColorMode();
  const { code } = useTheme({ invert: true });
  return (
    <Fade in={inView} ref={ref}>
      <Stack
        direction={direction === undefined ? "row" : direction}
        spacing={spacing}
        marginTop={marginTop}
        marginBottom={marginBottom}
        justifyContent="center"
      >
        <Flex justifyContent="center" alignItems="center" direction="column">
          <Heading>{heading}</Heading>
        </Flex>

        <Img
          src={`/assets/${path}.${colorMode}.png`}
          maxWidth="50%"
          borderRadius={5}
          boxShadow={`2px 0px 33px -30px ${code[100]}`}
          alignSelf="center"
        />
      </Stack>
    </Fade>
  );
};
