import { Flex } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GlobalBackground } from "../components/navigation/GlobalBackground";
import { useTheme } from "../hooks/useTheme";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";
import { paramsToObject } from "../utils/HelpersFunction";
import { Loading } from "../components/Loading";
import { Background } from "../components/sign/Background";
import { Sign } from "../containers/Sign";
import { Showing } from "../containers/Showing";

const Index = () => {
  const { t } = useTranslation(["home"]);
  const { backgroundColor } = useTheme({ invert: true, variant: "info" });
  const { isDark, theme } = useTheme();
  const [isRedirect, setIsRedirect] = useState(false);

  const { asPath } = useRouter();

  useEffect(() => {
    try {
      const params = paramsToObject(asPath.split("#")[1]);
      if (params) {
        const { access_token } = params;
        if (access_token) setIsRedirect(true);
      }
    } catch (error) {}
  }, []);

  return (
    <>
      <Flex width="100%" height="100vh" {...backgroundColor}>
        <GlobalBackground />
        {isRedirect && <Loading />}
        <Flex bgColor={isDark ? theme[500] : theme[700]} flex={0.9}>
          <Background />
        </Flex>
        <Sign />
      </Flex>
      <Showing />
    </>
  );
};

export async function getServerSideProps({ locale, req, res }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "home"])),
    },
  };
}

export default Index;
