import {
  Stack,
  Button,
  Flex,
  Divider,
  Heading,
  Wrap,
  useBoolean,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useUser } from "../../hooks/useUser";
import { useCookiesConsent } from "../CookiesConsent";

export const SignInWithProvider = ({ method }) => {
  const { t } = useTranslation(["sign", "common"]);
  const { signInWithProvider } = useUser();
  const { cookiesConsent } = useCookiesConsent();

  return (
    <Stack alignItems="center">
      <Wrap justify="center" padding={1}>
        <Button
          isDisabled={!cookiesConsent}
          onClick={async () => {
            return await signInWithProvider("google");
          }}
          borderRadius="full"
          leftIcon={<FcGoogle />}
          backgroundColor="#FFFFFF"
          color="brand.600"
          fontFamily="roboto"
          fontWeight={500}
          _hover={{ backgroundColor: "#E8E8E8" }}
          _active={{ backgroundColor: "#D4D4D4" }}
        >
          {method === "signIn"
            ? t("SignInWithProvider", { provider: "Google" })
            : t("SignUpWithProvider", { provider: "Google" })}
        </Button>
        <Button
          isDisabled={!cookiesConsent}
          onClick={async () => {
            return await signInWithProvider("discord");
          }}
          borderRadius="full"
          leftIcon={<FaDiscord />}
          backgroundColor="#2C2F33"
          color="brand.100"
          fontFamily="roboto"
          fontWeight={500}
          _hover={{ backgroundColor: "#23272A" }}
          _active={{ backgroundColor: "#181A1C" }}
        >
          {method === "signIn"
            ? t("SignInWithProvider", { provider: "Discord" })
            : t("SignUpWithProvider", { provider: "Discord" })}
        </Button>
      </Wrap>
      <Flex alignItems="center" width="100%">
        <Divider />
        <Heading marginX={6} fontSize="lg">
          {t("linking.or", { ns: "common" })}
        </Heading>
        <Divider />
      </Flex>
    </Stack>
  );
};
