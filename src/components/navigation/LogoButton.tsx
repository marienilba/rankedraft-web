import { Box, Flex, Img, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useTheme } from "../../hooks/useTheme";

export const LogoButton = () => {
  const { theme } = useTheme();

  return (
    <Flex
      boxSize="54px"
      _hover={{ backgroundColor: theme[200], cursor: "pointer" }}
      alignItems="center"
      justifyContent="center"
      borderRadius={50}
    >
      <NextLink href="/" passHref>
        <Link>
          <Box boxSize="32px">
            <Img src={"/icons/sword.png"} />
          </Box>
        </Link>
      </NextLink>
    </Flex>
  );
};
