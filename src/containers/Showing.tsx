import { Divider, Heading } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { CardIntroduction } from "../components/showing/CardIntroduction";
import { Header } from "../components/showing/Header";
import { Container } from "./Container";

export const Showing = () => {
  const { t } = useTranslation(["home"]);

  return (
    <Container>
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
    </Container>
  );
};
