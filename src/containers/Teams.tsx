import { Stack, Divider, Wrap, WrapItem } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useQuery } from "react-query";
import { ErrorButton } from "../components/ErrorButton";
import { LoadingTopBar } from "../components/LoadingTopBar";
import { PageHeading } from "../components/PageHeading";
import { TeamActions } from "../components/team/TeamActions";
import { TeamCard } from "../components/team/TeamCard";
import { getTeams } from "../queries/Team";
import { Container } from "./Container";

export const Teams = () => {
  const { t } = useTranslation(["teams", "common"]);
  const { isLoading, data, isSuccess, isError, refetch } = useQuery(
    "team",
    getTeams
  );

  return (
    <Container>
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
    </Container>
  );
};
