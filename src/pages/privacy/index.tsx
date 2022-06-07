import { Flex } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "../../components/Layout";
import { Privacy } from "../../containers/Privacy";

const Index = () => {
  return (
    <Layout>
      <Privacy />
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "tos"])),
    },
  };
}

export default Index;
