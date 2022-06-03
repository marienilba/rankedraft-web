import { Switch, Wrap, WrapItem, Text, Flex } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  fetchProfileVisibility,
  updateProfileVisibility,
} from "../../queries/Profile";
import { useSpam } from "../../hooks/useSpam";
import { ErrorButton } from "../ErrorButton";
import { LoadingTopBar } from "../LoadingTopBar";
import { useTranslation } from "next-i18next";

export const SwitchRankedVisibility = () => {
  const { t } = useTranslation(["settings", "common"]);
  const queryClient = useQueryClient();
  const { isLoading, data, isSuccess, isError, refetch } = useQuery(
    ["visibility"],
    fetchProfileVisibility,
    {
      refetchOnReconnect: false,
    }
  );

  const [isSpam, handleSpam] = useSpam({
    duration: 30,
    limit: 4,
    waiting: 600,
  });

  const mutation = useMutation(updateProfileVisibility, {
    onSuccess: (res) => {
      queryClient.setQueryData(["visibility"], { visible: res });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSwitch = () => {
    if (!isSuccess) return;
    if (!data) return;
    if (mutation.isLoading) return;
    if (mutation.isError) return;
    handleSpam();
    if (isSpam) return;

    mutation.mutate(!data.visible);
  };

  return (
    <>
      {(isLoading || mutation.isLoading) && <LoadingTopBar />}
      {isError && (
        <Flex>
          <ErrorButton refetch={refetch} />
        </Flex>
      )}
      {!isError && (
        <Wrap>
          <WrapItem>
            <Switch
              onChange={handleSwitch}
              isDisabled={isLoading || isError}
              isChecked={data?.visible}
              defaultChecked
              colorScheme="green"
              size="lg"
            />
          </WrapItem>
          <WrapItem alignItems="center">
            <Text fontSize="sm">{t("switch_visible")}</Text>
          </WrapItem>
        </Wrap>
      )}
    </>
  );
};
