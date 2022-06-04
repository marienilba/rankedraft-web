import { useInfiniteQuery } from "react-query";
import { Flex } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Navigation } from "../../components/navigation/Navigation";
import { History } from "../../containers/History";

const Index = () => {
  return (
    <Flex>
      <Navigation />
      <History />
    </Flex>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "history", "stats"])),
    },
  };
}

export default Index;
