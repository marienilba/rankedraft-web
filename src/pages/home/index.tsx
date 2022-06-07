import { Box, Flex } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Navigation } from "../../containers/Navigation";
import { Header } from "../../components/showing/Header";
import { SVG } from "../../components/sign/Background";
import { News } from "../../containers/News";
import { Layout } from "../../components/Layout";

const Index = () => {
  return (
    <Layout>
      <Navigation />
      <Flex direction="column" width="100%" marginTop={2}>
        <Flex width="100%" alignItems="center" direction="column">
          <Flex
            position="relative"
            width="100%"
            overflow="hidden"
            height="30vh"
            padding={4}
          >
            <Flex
              backgroundImage={`url(${SVG});`}
              backgroundSize="60px"
              backgroundRepeat="repeat"
              w="100%"
              h="auto"
            />
          </Flex>
          <Box position="absolute" marginTop={8}>
            <Header />
          </Box>
        </Flex>
        <News />
      </Flex>
    </Layout>
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
