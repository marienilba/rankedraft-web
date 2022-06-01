import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { Heading, Stack, Flex, Button, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

export const ThemeSettings = () => {
  const { t } = useTranslation(["settings"]);
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <>
      <Heading fontSize="3xl">{t("theme")}</Heading>
      <Stack pl={5}>
        <Flex>
          <Button
            leftIcon={!isDark ? <SunIcon /> : <MoonIcon />}
            colorScheme="green"
            onClick={toggleColorMode}
          >
            {colorMode}
          </Button>
        </Flex>
      </Stack>
    </>
  );
};
