import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "../../components/Layout";
import { Navigation } from "../../containers/Navigation";
import { Teams } from "../../containers/Teams";

const Index = () => {
  return (
    <Layout>
      <Navigation />
      <Teams />
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "teams"])),
    },
  };
}

export default Index;
