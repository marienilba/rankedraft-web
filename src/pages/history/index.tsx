import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Navigation } from "../../containers/Navigation";
import { History } from "../../containers/History";
import { Layout } from "../../components/Layout";

const Index = () => {
  return (
    <Layout>
      <Navigation />
      <History />
    </Layout>
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
