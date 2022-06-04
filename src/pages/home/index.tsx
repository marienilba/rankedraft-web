import { Flex } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Navigation } from "../../components/navigation/Navigation";
import { Home } from "../../containers/Home";

const Index = () => {
  return (
    <Flex>
      <Navigation />
      <Home />
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
