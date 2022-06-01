import {
  Switch,
  useBoolean,
  Wrap,
  WrapItem,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
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
  const [switchStatus, setSwitchStatus] = useBoolean(true);
  const { isLoading, data, isSuccess, isError, refetch } = useQuery(
    ["ladder/visibility"],
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
    onSuccess: (data) => {
      setSwitchStatus.toggle();
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

    mutation.mutate(!switchStatus);
  };

  useEffect(() => {
    if (data) {
      if (data.visible) setSwitchStatus.on();
      else setSwitchStatus.off();
    }
  }, [data, isSuccess]);
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
              isChecked={switchStatus}
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
