import { Flex, Stack, Divider, Heading } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { PageHeading } from "../components/PageHeading";
import { AutoCompleteSettings } from "../components/settings/AutoCompleteSettings";
import { DeleteHistories } from "../components/settings/DeleteHistories";
import { ImportFromTsv } from "../components/settings/ImportFromTsv";
import { SwitchLocale } from "../components/settings/SwitchLocale";
import { SwitchRankedSfx } from "../components/settings/SwitchRankedSfx";
import { SwitchRankedVisibility } from "../components/settings/SwitchRankedVisibility";
import { ThemeSettings } from "../components/settings/ThemeSettings";
import { Container } from "./Container";

export const Settings = () => {
  const { t } = useTranslation(["settings", "common"]);

  return (
    <Container>
      <Stack>
        <PageHeading>{t("page.settings", { ns: "common" })}</PageHeading>
      </Stack>
      <Divider marginY={5} marginX={5} />
      <Stack>
        <ThemeSettings />
        <SwitchLocale />
        <Heading fontSize="3xl">{t("page.history", { ns: "common" })}</Heading>
        <Stack pl={5}>
          <AutoCompleteSettings />
          <ImportFromTsv />
          <DeleteHistories />
        </Stack>
        <Heading fontSize="3xl">{t("page.ranked", { ns: "common" })}</Heading>
        <Stack pl={5}>
          <SwitchRankedVisibility />
          <SwitchRankedSfx />
        </Stack>
      </Stack>
    </Container>
  );
};
