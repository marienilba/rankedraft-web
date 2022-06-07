import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "../../components/Layout";
import { Contribute } from "../../containers/Contribute";

const Index = () => {
  return (
    <Layout>
      <Contribute />
    </Layout>
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
