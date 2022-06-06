import { Flex, Stack, Box, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useWindowSize } from "../../hooks/useWindowSize";

export const NavigationMenuLink = ({
  children,
  title,
  link,
  onClick,
}: {
  children: ReactNode;
  title: string;
  link?: string;
  onClick?: () => void;
}) => {
  const { backgroundColor } = useTheme({ variant: "secondary" });
  const { isScreen, isMobile } = useWindowSize();
  const { pathname } = useRouter();

  if (link) {
    return (
      <Flex>
        <NextLink href={link} passHref>
          <Link style={{ textDecoration: "none" }} onClick={onClick}>
            <Stack
              direction="row"
              alignItems="center"
              borderRadius={50}
              _hover={{ ...backgroundColor, cursor: "pointer" }}
              justifyContent="flex-start"
              paddingX={4}
              paddingY={2}
              spacing={5}
            >
              <Box>{children}</Box>
              {(isScreen || isMobile) && (
                <Heading
                  fontWeight={pathname === link ? 700 : 400}
                  letterSpacing={pathname === link ? -0.9 : 0}
                  size="md"
                >
                  {title}
                </Heading>
              )}
            </Stack>
          </Link>
        </NextLink>
      </Flex>
    );
  }

  return (
    <Flex>
      <Stack
        direction="row"
        alignItems="center"
        borderRadius={50}
        _hover={{
          ...backgroundColor,
          cursor: "pointer",
        }}
        justifyContent="flex-start"
        paddingX={4}
        paddingY={2}
        spacing={5}
      >
        <Box>{children}</Box>
        {(isScreen || isMobile) && (
          <Heading fontWeight={400} size="md">
            {title}
          </Heading>
        )}
      </Stack>
    </Flex>
  );
};
