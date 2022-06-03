import { RankedModule } from "../../components/ranked/RankedModule";
import { Divider, Flex, Heading } from "@chakra-ui/react";
import { Ladder } from "../../components/ranked/Ladder";
import { Spectator } from "../../components/ranked/Spectator";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useDevice } from "../../hooks/useDevice";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { ParsedUrlQuery } from "querystring";
import { IncomingMessage, ServerResponse } from "http";
import { GetServerSidePropsResult, PreviewData } from "next";

const Index = ({ ip }) => {
  const { t } = useTranslation(["ranked", "common"]);
  const { isMobile } = useDevice();
  return (
    <Flex mt={10} direction="column" w="100%" paddingX={7}>
      {isMobile ? (
        <Heading textAlign="center" fontSize="xl" mt={5}>
          {t("deprecated")}
        </Heading>
      ) : (
        <RankedModule ip={ip} />
      )}

      <Divider margin={5} />
      <Flex justifyContent="center" position="relative">
        <Ladder />
        <Flex position="absolute" right={0}>
          <Spectator />
        </Flex>
      </Flex>
    </Flex>
  );
};

type CustomGetServerSideProps<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = (
  context: GetServerSidePropsContext<Q>
) => Promise<GetServerSidePropsResult<P>>;

type GetServerSidePropsContext<Q extends ParsedUrlQuery = ParsedUrlQuery> = {
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
  };
  res: ServerResponse;
  params?: Q;
  query: ParsedUrlQuery;
  preview?: boolean;
  previewData?: PreviewData;
  resolvedUrl: string;
  locale: string; // This is where the magic happens.
  locales?: string[];
  defaultLocale?: string;
};

export const getServerSideProps: CustomGetServerSideProps = async ({
  req,
  locale,
}) => {
  const ip = req.headers["x-real-ip"] || req.connection.remoteAddress;
  return {
    props: {
      ip,
      ...(await serverSideTranslations(locale, ["common", "ranked"])),
    },
  };
};

export default Index;
