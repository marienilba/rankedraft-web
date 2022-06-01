import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { useRef, useEffect, useCallback } from "react";
import { useQueryClient, useQuery, useMutation } from "react-query";
import useIncrementation from "../../hooks/useIncrementation";
import { ModalDraft } from "./ModalDraft";
import {
  fetchHistory,
  deleteHistory,
  HistoryLine as Draft,
} from "../../queries/History";
import { LoadingTopBar } from "../LoadingTopBar";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useTranslation } from "next-i18next";

export const DraftView = ({
  isOpen,
  onClose,
  draft,
}: {
  isOpen: boolean;
  onClose: () => void;
  draft: Draft;
}) => {
  const { t } = useTranslation(["history", "common"]);
  const modalRef: any = useRef(null);
  const { isScreen } = useWindowSize();

  const queryClient = useQueryClient();
  const { isLoading, data, isSuccess, isError } = useQuery(
    ["history", draft.id],
    () => fetchHistory(draft.id)
  );

  const [confirmation] = useIncrementation(0);
  const mutation = useMutation(
    () => {
      return deleteHistory(draft.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["history"]);
      },
    }
  );

  const handleOnSave = useCallback(() => {
    if (modalRef.current && draft.id) {
      modalRef.current.edit();
      onClose();
    }
  }, [modalRef, draft]);

  const handleDelete = useCallback(() => {
    if (confirmation.value >= 1) {
      onClose();
      mutation.mutate();
    } else {
      confirmation.inc();
    }
  }, [confirmation]);

  useEffect(() => confirmation.reset(), [isOpen]);

  if (!draft) {
    return <></>;
  }

  return (
    <>
      {isLoading && <LoadingTopBar />}
      {isSuccess && (
        <Modal
          blockScrollOnMount={true}
          closeOnOverlayClick={false}
          isOpen={isOpen}
          onClose={onClose}
          isCentered={isScreen}
          size={isScreen ? "6xl" : "full"}
          motionPreset="slideInBottom"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Draft</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ModalDraft ref={modalRef} predraft={{ ...data, id: draft.id }} />
            </ModalBody>
            <ModalFooter>
              <Flex w="100%">
                <Button
                  variant="solid"
                  colorScheme="green"
                  onClick={handleOnSave}
                  mr={4}
                >
                  {t("edit", { ns: "common" })}
                </Button>
                <Button
                  variant="solid"
                  colorScheme="pink"
                  onClick={handleDelete}
                >
                  {confirmation.value < 1
                    ? t("delete", { ns: "common" })
                    : t("confirm", { ns: "common" })}
                </Button>
                <Spacer />
                <Button variant="ghost" mr={3} onClick={onClose}>
                  {t("quit", { ns: "common" })}
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
