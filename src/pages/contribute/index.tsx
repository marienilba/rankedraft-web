import { Flex } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Navigation } from "../../containers/Navigation";
import { Contribute } from "../../containers/Contribute";

const Index = () => {
  return (
    <Flex>
      <Navigation />
      <Contribute />
    </Flex>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "contribute"])),
    },
  };
}

export default Index;
