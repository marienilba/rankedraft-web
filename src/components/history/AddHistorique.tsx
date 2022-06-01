import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useRef } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { ModalDraft } from "../draft/ModalDraft";
import { TeamsList } from "../list/TeamsList";

export const AddHistorique = ({ onSelect }) => {
  const { t } = useTranslation(["history", "common"]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isScreen } = useWindowSize();

  const modalRef: any = useRef(null);
  const handleOnSave = () => {
    if (modalRef.current) {
      modalRef.current.save();
      onClose();
    }
  };

  return (
    <Stack direction="row">
      <Button leftIcon={<PlusSquareIcon />} onClick={onOpen} variant="solid">
        {t("add_new")}
      </Button>
      <TeamsList onSelect={onSelect} options={{ save: true }} />
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
          <ModalHeader>{t("module.new_draft")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ModalDraft predraft={null} ref={modalRef} />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              {t("quit", { ns: "common" })}
            </Button>
            <Button variant="solid" colorScheme="green" onClick={handleOnSave}>
              {t("save", { ns: "common" })}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};
