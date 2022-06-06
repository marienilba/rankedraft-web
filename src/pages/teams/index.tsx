import { Flex } from "@chakra-ui/react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Navigation } from "../../containers/Navigation";
import { Teams } from "../../containers/Teams";

const Index = () => {
  return (
    <Flex>
      <Navigation />
      <Teams />
    </Flex>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "teams"])),
    },
  };
}

export default Index;
