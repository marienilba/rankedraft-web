import { Flex, Divider } from "@chakra-ui/react";
import { useState, useCallback } from "react";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { ErrorButton } from "../components/ErrorButton";
import { LoadingTopBar } from "../components/LoadingTopBar";
import { GridAvatars } from "../components/profile/GridAvatars";
import { useSpam } from "../hooks/useSpam";
import { fetchProfile, updateProfile } from "../queries/Profile";
import { Profile as ProfileComponent } from "../components/profile/Profile";
import { Container } from "./Container";

export const Profile = () => {
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
    limit: 15,
    waiting: 180,
  });

  const [avatarSelected, setAvatarSelected] = useState<number>(data?.avatar);

  const onSave = useCallback(
    (username) => {
      handleSpam();
      if (isSpam) return;
      if (
        (avatarSelected === data.avatar || avatarSelected === undefined) &&
        username === data.name
      )
        return;
      try {
        const payload = {
          name: username !== data.name ? username : null,
          avatar: avatarSelected !== data.avatar ? avatarSelected : null,
        };

        if (username.length < 2) return;
        if (username.length > 12) return;
        if (payload.name === null && payload.avatar === null) return;

        mutation.mutate(payload);
      } catch (e) {
        console.log(e);
      }
    },
    [isSpam, avatarSelected, data, handleSpam]
  );

  return (
    <Container>
      {isLoading && <LoadingTopBar />}
      {isError && <ErrorButton refetch={refetch} />}
      {isSuccess && data && (
        <>
          <ProfileComponent
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
        </>
      )}
    </Container>
  );
};
