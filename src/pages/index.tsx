import { Divider, Flex, Heading } from "@chakra-ui/react";
import { CardIntroduction } from "../components/home/CardIntroduction";
import { TipsTricks } from "../components/home/TipsTricks";
import { Header } from "../components/home/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { PageHeading } from "../components/PageHeading";

const Index = () => {
  const { t } = useTranslation(["home"]);
  return (
    <Flex mt={10} direction="column" w="100%" paddingX={7}>
      <PageHeading> </PageHeading>
      <Header />
      <Divider marginTop={5} marginBottom="16" />
      <Heading textAlign="center">{t("draft_history")}</Heading>
      <CardIntroduction
        path="draft"
        heading={t("add_3_clicks")}
        spacing={8}
        marginTop={5}
        direction="row-reverse"
      />
      <CardIntroduction
        path="search"
        heading={t("search_in")}
        marginTop={5}
        direction="column"
      />
      <Heading textAlign="center" marginBottom={3} marginTop="16">
        {t("ranked_matchs")}
      </Heading>
      <CardIntroduction
        path="ranked"
        heading={t("search_opp")}
        spacing={8}
        marginTop={8}
        direction="row"
      />

      <CardIntroduction
        path="ladder"
        heading={t("classement")}
        spacing={8}
        marginTop={5}
        direction="column"
      />

      <Divider marginTop={5} marginBottom="16" />
      <TipsTricks />
    </Flex>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home"])),
    },
  };
}

export default Index;
