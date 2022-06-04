import { Flex } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Navigation } from "../../components/navigation/Navigation";
import { Profile } from "../../containers/Profile";

const Index = () => {
  return (
    <Flex>
      <Navigation />
      <Profile />
    </Flex>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "profile"])),
    },
  };
}

export default Index;
