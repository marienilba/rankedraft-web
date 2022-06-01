import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Divider, Flex, Heading, Stack } from "@chakra-ui/react";
import { AutoCompleteSettings } from "../../components/settings/AutoCompleteSettings";
import { ImportFromTsv } from "../../components/settings/ImportFromTsv";
import { DeleteHistories } from "../../components/settings/DeleteHistories";
import { ThemeSettings } from "../../components/settings/ThemeSettings";
import { SwitchRankedVisibility } from "../../components/settings/SwitchRankedVisibility";
import { SwitchRankedSfx } from "../../components/settings/SwitchRankedSfx";
import { PageHeading } from "../../components/PageHeading";
import { SwitchLocale } from "../../components/settings/SwitchLocale";
import { useTranslation } from "next-i18next";

const Index = () => {
  const { t } = useTranslation(["settings", "common"]);
  return (
    <Flex marginY={10} direction="column" width="100%" paddingX={7}>
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
    </Flex>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "settings"])),
    },
  };
}

export default Index;
