import { Button, Flex, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useWindowSize } from "../../hooks/useWindowSize";

export const Login = ({ signIn }) => {
  const { colorMode } = useColorMode();
  const { isPad } = useWindowSize();
  const { t } = useTranslation(["common"]);

  const isDark = colorMode === "dark";
  const [isAwait, setIsAwait] = useState(false);
  // AVOID FLASHING
  useEffect(() => {
    const Await = setTimeout(() => {
      setIsAwait(true);
    }, 200);

    return () => {
      clearTimeout(Await);
    };
  }, []);

  return (
    <Flex
      marginY={4}
      alignItems="center"
      direction="column"
      width="100%"
      paddingX={4}
    >
      <Button
        hidden={!isAwait}
        width="100%"
        leftIcon={!isPad && <FcGoogle />}
        onClick={signIn}
        borderRadius={50}
        paddingY={8}
        paddingX={!isPad ? 12 : 6}
        bg={isDark ? "gray.100" : "gray.800"}
        color={isDark ? "gray.900" : "gray.100"}
        _hover={{ bg: isDark ? "gray.200" : "gray.900" }}
        _active={{ bg: isDark ? "gray.300" : "gray.700" }}
      >
        {!isPad ? t("login") : <FcGoogle />}
      </Button>
    </Flex>
  );
};
