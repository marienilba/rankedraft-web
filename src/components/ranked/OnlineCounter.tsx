import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useQuery } from "react-query";
import { fetchQueueCount } from "../../queries/Matchmaking";

export const OnlineCounter = ({ shouldIncrement }) => {
  const { t } = useTranslation(["ranked"]);
  const { data, isSuccess, isError } = useQuery("queue", fetchQueueCount, {
    refetchOnWindowFocus: true,
    staleTime: 2 * 60 * 1000,
  });

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Box
        boxSize="1.25rem"
        bgGradient={
          !isError
            ? "radial(whatsapp.500, whatsapp.300)"
            : "radial(red.500, red.300)"
        }
        borderRadius="full"
      />
      <Text>{t("module.online")}</Text>
      {isSuccess && <Text>{data.count || 0 + shouldIncrement ? 1 : 0}</Text>}
    </Stack>
  );
};
