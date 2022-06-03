import { useQuery, useMutation, useQueryClient } from "react-query";
import { Divider, Flex } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { fetchProfile, updateProfile } from "../../queries/Profile";
import { LoadingTopBar } from "../../components/LoadingTopBar";
import { useSpam } from "../../hooks/useSpam";
import { ErrorButton } from "../../components/ErrorButton";
import { useWindowSize } from "../../hooks/useWindowSize";
import { GridAvatars } from "../../components/profile/GridAvatars";
import { Profile } from "../../components/profile/Profile";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Index = () => {
  const queryClient = useQueryClient();
  const { isLoading, data, isSuccess, isError, refetch } = useQuery(
    "profile",
    fetchProfile
  );
  const mutation = useMutation(updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries("profile");
    },
  });
  const [isSpam, handleSpam] = useSpam({
    duration: 60,
    limit: 6,
    waiting: 180,
  });

  const [avatarSelected, setAvatarSelected] = useState<number>(data?.avatar);

  const onSave = useCallback(
    (username, kta_team) => {
      handleSpam();
      if (isSpam) return;
      if (
        (avatarSelected === data.avatar || avatarSelected === undefined) &&
        username === data.name &&
        (kta_team === data.kta_team ||
          kta_team === undefined ||
          kta_team === null ||
          kta_team === "")
      )
        return;
      try {
        const payload = {
          name: username !== data.name ? username : null,
          kta_team: kta_team !== data.kta_team ? kta_team : null,
          avatar: avatarSelected !== data.avatar ? avatarSelected : null,
        };

        if (username.length < 2) return;
        if (username.length > 12) return;
        if (
          payload.name === null &&
          payload.kta_team === null &&
          payload.avatar === null
        )
          return;

        mutation.mutate(payload);
      } catch (e) {
        console.log(e);
      }
    },
    [isSpam, avatarSelected, data, handleSpam]
  );

  if (isLoading) {
    return <LoadingTopBar />;
  }
  if (isError || !data) {
    return (
      <Flex width="100%" justifyContent="center" alignItems="center">
        <ErrorButton refetch={refetch} />
      </Flex>
    );
  }
  if (isSuccess && data) {
    return (
      <Flex mt={10} direction="column" width="100%" paddingX={7}>
        <Profile
          data={data}
          onSubmit={onSave}
          avatar={avatarSelected}
          isLoading={mutation.isLoading}
        />
        <Divider m={5} />
        <GridAvatars
          av={{
            onSelect: setAvatarSelected,
            selected: avatarSelected,
            avatars: data?.avatars,
          }}
        />
      </Flex>
    );
  }
  return <></>;
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "profile"])),
    },
  };
}

export default Index;
