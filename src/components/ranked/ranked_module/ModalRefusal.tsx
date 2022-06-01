import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export const ModalRefusal = ({
  onRefusal,
  isOpen,
  onClose,
}: {
  onRefusal: () => void;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Êtes-vous sur de vouloir refuser ?</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          Le refus peut-être sanctionner par des pénalitées et avertissements
          s'il est occassioné de manière fréquentes ou pratiquant un abus.
        </ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            fontSize={10}
            variant="outline"
            colorScheme="red"
            onClick={onRefusal}
          >
            ❌ Oui, refuser
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
