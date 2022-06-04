import { Divider, Flex, Heading, Stack, Wrap, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Navigation } from "../../components/navigation/Navigation";
import { PageHeading } from "../../components/PageHeading";
import { Confidentialite } from "../../containers/Confidentialite";
import { useWindowSize } from "../../hooks/useWindowSize";

const Index = () => {
  return (
    <Flex>
      <Navigation />
      <Confidentialite />
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
