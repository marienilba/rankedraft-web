import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "../../components/Layout";
import { Tos } from "../../containers/Tos";

const Index = () => {
  return (
    <Layout>
      <Tos />
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
