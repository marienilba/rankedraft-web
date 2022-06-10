import { Wrap, Link, Flex } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useTheme } from "../../hooks/useTheme";
import NextLink from "next/link";
export const Footer = () => {
  const { t } = useTranslation(["sign"]);
  const { backgroundColor } = useTheme({
    variant: "secondary",
  });
  return (
    <Flex
      {...backgroundColor}
      justifyContent="center"
      borderTopRadius={20}
      marginTop={20}
    >
      <Wrap justify="space-around" padding={4} maxWidth="560px" align="center">
        <NextLink href="/tos" passHref>
          <Link color="twitter.500">{t("TermOfUse")}</Link>
        </NextLink>
        <NextLink href="/privacy" passHref>
          <Link color="twitter.500">{t("PrivacyPolicy")}</Link>
        </NextLink>
        <NextLink href="/contribute" passHref>
          <Link color="twitter.500">Contacts</Link>
        </NextLink>
      </Wrap>
    </Flex>
  );
};
