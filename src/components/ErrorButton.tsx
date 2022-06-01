import { Button, Stack, Text, useBoolean } from "@chakra-ui/react";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { IoReloadOutline } from "react-icons/io5";
import { useSpam } from "../hooks/useSpam";
export const ErrorButton = ({ refetch }) => {
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
      <Text fontSize="sm">Oops, il y a eu un problème</Text>
      <Button
        leftIcon={<IoReloadOutline />}
        size="md"
        onClick={handleRefetch}
        isLoading={isLoading}
      >
        Réessayer
      </Button>
    </Stack>
  );
};
