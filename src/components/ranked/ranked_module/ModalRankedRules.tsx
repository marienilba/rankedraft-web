import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

export const ModalRankedRules = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation(["ranked", "common"]);

  return (
    <>
      <Link textAlign="center" as="sup" fontSize="xs" onClick={onOpen}>
        {t("module.respect_rules")}
      </Link>
      <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> {t("module.rules.title")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text>{t("module.rules.1")}</Text>
            <Text fontWeight={600}>{t("module.rules.2")}</Text>
            <Text>{t("module.rules.3")}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
