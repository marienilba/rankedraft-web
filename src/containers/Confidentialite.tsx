import { Divider, Heading, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { PageHeading } from "../components/PageHeading";
import { useWindowSize } from "../hooks/useWindowSize";
import { Container } from "./Container";

export const Confidentialite = () => {
  const { t } = useTranslation(["cgu"]);
  const { isMobile } = useWindowSize();

  return (
    <Container>
      <PageHeading>{t("policy")}</PageHeading>
      <Divider margin={5} />
      <Stack paddingX={isMobile ? 2 : 7}>
        <Heading fontSize="3xl">{t("confidentialite.1")}</Heading>
        <Stack>
          <Text textAlign="justify">{t("confidentialite.1-1")}</Text>
        </Stack>
        <Heading fontSize="3xl">{t("confidentialite.2")}</Heading>
        <Stack>
          <Text textAlign="justify">{t("confidentialite.2-1")}</Text>
        </Stack>
        <Heading fontSize="3xl">{t("confidentialite.3")}</Heading>
        <Stack>
          <Text textAlign="justify">{t("confidentialite.3-1")}</Text>
        </Stack>
      </Stack>
    </Container>
  );
};
