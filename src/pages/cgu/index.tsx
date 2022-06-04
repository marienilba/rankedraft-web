import { Flex } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Navigation } from "../../components/navigation/Navigation";
import { Cgu } from "../../containers/Cgu";

const Index = () => {
  return (
    <Flex>
      <Navigation />
      <Cgu />
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
