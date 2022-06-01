import { Button, Stack, Text, useBoolean } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { IoReloadOutline } from "react-icons/io5";
import { useSpam } from "../hooks/useSpam";
export const ErrorButton = ({ refetch }) => {
  const { t } = useTranslation(["common"]);
  const [isSpam, handleSpam] = useSpam({ duration: 10, limit: 5, waiting: 30 });
  const [isLoading, setIsLoading] = useBoolean();
  const loader: MutableRefObject<NodeJS.Timeout> = useRef(null);
  const handleRefetch = useCallback(() => {
    handleSpam();
    if (isSpam) return;
    refetch();
    loader.current = setTimeout(() => {
      setIsLoading.on();
    }, 2000);
  }, [isSpam]);
  useEffect(() => {
    return () => {
      if (loader.current) clearTimeout(loader.current);
    };
  }, []);
  return (
    <Stack justifyContent="center" alignItems="center" marginY={5}>
      <Text fontSize="sm">{t("error_happen")}</Text>
      <Button
        leftIcon={<IoReloadOutline />}
        size="md"
        onClick={handleRefetch}
        isLoading={isLoading}
      >
        {t("retry")}
      </Button>
    </Stack>
  );
};
