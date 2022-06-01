import {
  ModalOverlay,
  useDisclosure,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Flex,
  Stack,
  Input,
  Heading,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { deleteHistories } from "../../queries/History";
import useInput from "../../hooks/useInput";
import { useUser } from "../../hooks/useUser";
import { useTranslation } from "next-i18next";

export const DeleteHistories = () => {
  const { t } = useTranslation(["settings", "common"]);
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [secure] = useInput();

  const queryClient = useQueryClient();
  const mutation = useMutation(deleteHistories, {
    onSuccess: () => {
      queryClient.invalidateQueries(["history"]);
    },
  });

  const handleDelete = () => {
    mutation.mutate();
    onClose();
  };

  useEffect(() => {
    if (isOpen) secure.onChange("");
  }, [isOpen]);
  return (
    <Stack>
      <Heading fontSize="2xl">{t("delete_histories")}</Heading>
      <Flex>
        <Button onClick={onOpen} colorScheme="red">
          {t("delete", { ns: "common" })}
        </Button>
        {user && (
          <Modal
            isCentered
            isOpen={isOpen}
            onClose={onClose}
            motionPreset="slideInBottom"
          >
            <ModalOverlay
              bg="none"
              backdropFilter="auto"
              backdropInvert="80%"
              backdropBlur="2px"
            />
            <ModalContent>
              <ModalHeader>{t("delete_histories_warning_title")}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack>
                  <Text>{t("delete_histories_warning_message")}</Text>
                  <Input placeholder={t("email_check_input")} {...secure} />
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Stack direction="row">
                  <Button
                    colorScheme="red"
                    onClick={handleDelete}
                    isDisabled={secure.value !== user.user_metadata.email}
                    isLoading={mutation.isLoading}
                  >
                    {t("delete", { ns: "common" })}
                  </Button>
                  <Button onClick={onClose}>
                    {t("quit", { ns: "common" })}
                  </Button>
                </Stack>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Flex>
    </Stack>
  );
};
