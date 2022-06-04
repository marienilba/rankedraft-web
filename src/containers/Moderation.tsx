import { Button, Divider, Flex, Input, Stack } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useState, useCallback } from "react";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { PageHeading } from "../components/PageHeading";
import useInput from "../hooks/useInput";
import { Profile } from "../components/moderation/Profile";
import { fetchProfiles, editProfile } from "../queries/Moderation";
import { Container } from "./Container";
import { ErrorButton } from "../components/ErrorButton";
import { LoadingTopBar } from "../components/LoadingTopBar";

export const Moderation = () => {
  const { t } = useTranslation(["moderation", "common"]);
  const [pseudos] = useInput("");
  const [names, setNames] = useState("");
  const queryClient = useQueryClient();
  const { data, isError, isSuccess, isLoading, refetch } = useQuery(
    ["moderation", names],
    fetchProfiles
  );
  const mutation = useMutation(editProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries(["moderation", names]);
    },
  });
  const handleSearch = useCallback(() => {
    setNames(pseudos.value);
  }, [pseudos]);

  const handleApply = useCallback(
    (
      avatar: number,
      resetElo: boolean,
      role: string,
      ban: number,
      user_id: string
    ) => {
      mutation.mutate({ avatar, elo: resetElo ? 1000 : 0, ban, role, user_id });
    },
    [data, isSuccess, isError]
  );

  return (
    <Container>
      <PageHeading>{t("page.moderation", { ns: "common" })}</PageHeading>
      <Stack direction="row" mt={5}>
        <Flex>
          <Input
            placeholder={t("username", { ns: "common" })}
            {...pseudos}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </Flex>
        <Button onClick={handleSearch}>{t("search", { ns: "common" })}</Button>
      </Stack>
      <Divider margin={5} />
      {isLoading && <LoadingTopBar />}
      {isError && <ErrorButton refetch={refetch} />}
      {isSuccess && (
        <Stack>
          {data.map((profile, index) => {
            return (
              <Profile
                profile={profile}
                key={`moderation-profile-line-${index}`}
                onApply={handleApply}
              />
            );
          })}
        </Stack>
      )}
    </Container>
  );
};
