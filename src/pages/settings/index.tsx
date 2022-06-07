import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Navigation } from "../../containers/Navigation";
import { Settings } from "../../containers/Settings";
import { Layout } from "../../components/Layout";

const Index = () => {
  return (
    <Layout>
      <Navigation />
      <Settings />
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "settings"])),
    },
  };
}

export default Index;
