import {
  Flex,
  Heading,
  Stack,
  Divider,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getTeams } from "../../queries/Team";
import { LoadingTopBar } from "../../components/LoadingTopBar";
import { TeamCard } from "../../components/team/TeamCard";
import { TeamActions } from "../../components/team/TeamActions";
import { ErrorButton } from "../../components/ErrorButton";
import { PageHeading } from "../../components/PageHeading";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Index = () => {
  const { t } = useTranslation(["teams", "common"]);
  const { isLoading, data, isSuccess, isError, refetch } = useQuery(
    "team",
    getTeams
  );
  return (
    <Flex mt={10} direction="column" w="100%" paddingX={7}>
      <Stack>
        <PageHeading>{t("page.teams", { ns: "common" })}</PageHeading>
        <TeamActions />
      </Stack>
      <Divider marginY={5} marginX={5} />
      {isError && <ErrorButton refetch={refetch} />}
      {isLoading && <LoadingTopBar />}
      {isSuccess && data && data.length > 0 && (
        <Wrap>
          {data.map((team, idx) => {
            return (
              <WrapItem key={`team-${team.team_id}-${idx}`} padding={1}>
                <TeamCard team={team} />
              </WrapItem>
            );
          })}
        </Wrap>
      )}
    </Flex>
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
