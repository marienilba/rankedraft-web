import { Flex, Heading, Stack, Button, Spacer } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useCallback } from "react";
import { ModalRefusal } from "./ModalRefusal";

export const Confirm = ({
  onConfirm,
  hasAccepted,
  isOpen,
  onOpen,
  onClose,
}: {
  onConfirm: (n: number) => void;
  hasAccepted: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  const { t } = useTranslation(["ranked", "common"]);

  const onRefusal = () => {
    onClose();
    onConfirm(0);
  };

  return (
    <Flex direction="column" alignItems="center" width="100%">
      <Heading fontSize="5vw">🔎</Heading>
      <Heading fontSize="2xl">Adversaire trouvé !</Heading>
      <Flex direction="row" mt={5} width="100%">
        <Flex flex={10} justifyContent="center" marginStart={20}>
          <Stack direction="row" spacing={5}>
            <Button
              isLoading={hasAccepted}
              fontSize={10}
              variant="solid"
              colorScheme="teal"
              onClick={() => onConfirm(1)}
            >
              ✔️ {t("module.accept")}
            </Button>
            <Spacer />
            {!hasAccepted && (
              <Button
                fontSize={10}
                variant="outline"
                colorScheme="red"
                onClick={onOpen}
              >
                ❌ {t("module.refuse")}
              </Button>
            )}
          </Stack>
        </Flex>
        <Spacer />
      </Flex>
      <ModalRefusal onRefusal={onRefusal} isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
