import { Divider, Flex, Stack, Button, Input } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { PageHeading } from "../../components/PageHeading";
import useInput from "../../hooks/useInput";
import { useCallback, useState } from "react";
import { editProfile, fetchProfiles } from "../../queries/Moderation";
import { Profile } from "../../components/moderation/Profile";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Index = () => {
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
    <Flex mt={10} direction="column" w="100%" paddingX={7}>
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
    </Flex>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "moderation"])),
    },
  };
}

export default Index;
