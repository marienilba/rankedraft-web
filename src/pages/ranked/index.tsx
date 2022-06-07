import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Flex } from "@chakra-ui/react";
import { Navigation } from "../../containers/Navigation";
import { Ranked } from "../../containers/Ranked";
import { Layout } from "../../components/Layout";

const Index = () => {
  return (
    <Layout>
      <Navigation />
      <Ranked />
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "ranked"])),
    },
  };
}

export default Index;
