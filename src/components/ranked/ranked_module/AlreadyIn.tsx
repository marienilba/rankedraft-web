import { RepeatIcon } from "@chakra-ui/icons";
import { Stack, IconButton, Button, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

export const AlreadyIn = ({
  onRetry,
  onForfeit,
  isAuth,
}: {
  onRetry: () => void;
  onForfeit: () => void;
  isAuth: boolean;
}) => {
  const { t } = useTranslation(["ranked", "common"]);
  return (
    <>
      <Text as="samp" pl={3} color="red.800" fontSize="xs" fontWeight={800}>
        {t("module.already_in")}
      </Text>
      <Stack direction="row" spacing={2}>
        <IconButton
          onClick={onRetry}
          aria-label="Ressayer"
          icon={<RepeatIcon />}
        />
        <Button
          colorScheme="red"
          disabled={!isAuth}
          onClick={onForfeit}
          maxWidth="160px"
          minWidth="80px"
        >
          {t("module.logout")}
        </Button>
      </Stack>
    </>
  );
};
