import { Divider, Flex, Heading, Stack, Wrap, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PageHeading } from "../../components/PageHeading";

const Index = () => {
  const { t } = useTranslation(["cgu"]);

  return (
    <Flex mt={10} direction="column" w="100%" paddingX={7}>
      <PageHeading>{t("policy")}</PageHeading>
      <Divider margin={5} />
      <Stack paddingX={7}>
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
    </Flex>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "cgu"])),
    },
  };
}

export default Index;
