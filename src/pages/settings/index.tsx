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
import { Navigation } from "../../containers/Navigation";
import { Settings } from "../../containers/Settings";

const Index = () => {
  return (
    <Flex>
      <Navigation />
      <Settings />
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
