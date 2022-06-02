import { Button, Flex, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { FcGoogle } from "react-icons/fc";
import { useTheme } from "../../hooks/useTheme";
import { useWindowSize } from "../../hooks/useWindowSize";

export const Login = ({ signIn }) => {
  const { colorMode } = useColorMode();
  const { isPad } = useWindowSize();
  const { t } = useTranslation(["common"]);
  const { color } = useTheme({ invert: false });
  const { backgroundColor } = useTheme({ invert: true });
  const { backgroundColor: hoverBackgroundColor } = useTheme({
    variant: "secondary",
    invert: true,
  });

  const isDark = colorMode === "dark";

  return (
    <Flex marginY={4} alignItems="center" direction="column" width="100%">
      <Button
        width="90%"
        leftIcon={!isPad && <FcGoogle />}
        onClick={signIn}
        borderRadius={50}
        paddingY={8}
        paddingX={!isPad ? 12 : 6}
        {...backgroundColor}
        {...color}
        _hover={{ ...hoverBackgroundColor }}
        _active={{ bg: isDark ? "gray.300" : "gray.700" }}
      >
        {!isPad ? t("login") : <FcGoogle />}
      </Button>
    </Flex>
  );
};
