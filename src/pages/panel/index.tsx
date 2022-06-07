import { Flex } from "@chakra-ui/react";
import { PanelList } from "../../components/panel/PanelList";
import { fetchPanel } from "../../queries/Panel";
import { useQuery } from "react-query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "../../components/Layout";

const Index = () => {
  const { isLoading, data, isSuccess, isError } = useQuery("panel", fetchPanel);

  if (!data) {
    return (
      <Flex width="90%" mt={5} alignItems="center" direction="column"></Flex>
    );
  }
  const { queue, lobbies } = data;
  return (
    <Layout>
      <Flex width="90%" mt={5} alignItems="center" direction="column">
        {data && <PanelList queue={queue} lobbies={lobbies} />}
      </Flex>
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Index;
