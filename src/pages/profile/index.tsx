import { Flex } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "../../components/Layout";
import { Navigation } from "../../containers/Navigation";
import { Profile } from "../../containers/Profile";

const Index = () => {
  return (
    <Layout>
      <Navigation />
      <Profile />
    </Layout>
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
