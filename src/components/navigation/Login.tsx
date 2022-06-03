import { Button, Flex, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { FcGoogle } from "react-icons/fc";
import { useWindowSize } from "../../hooks/useWindowSize";

export const Login = ({ signIn }) => {
  const { isPad } = useWindowSize();

  if (isPad) {
    return (
      <Flex
        marginY={4}
        alignItems="center"
        direction="column"
        width="100%"
        position="absolute"
        bottom="10px"
        left="40px"
      >
        <GoogleButton isPad={isPad} signIn={signIn} />
      </Flex>
    );
  }
  return (
    <Flex marginY={4} alignItems="center" direction="column" width="100%">
      <GoogleButton isPad={isPad} signIn={signIn} />
    </Flex>
  );
};

const GoogleButton = ({ isPad, signIn }) => {
  const { t } = useTranslation(["common"]);

  return (
    <Button
      leftIcon={<FcGoogle size="24px" />}
      onClick={signIn}
      borderRadius={50}
      paddingY={8}
      paddingX={!isPad ? 12 : 6}
      backgroundColor="#FFFFFF"
      color="brand.600"
      fontFamily="roboto"
      fontWeight={500}
      _hover={{ backgroundColor: "#E8E8E8" }}
      _active={{ backgroundColor: "#D4D4D4" }}
    >
      {t("login")}
    </Button>
  );
};
