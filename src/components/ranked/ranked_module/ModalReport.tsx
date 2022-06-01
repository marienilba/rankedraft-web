import { HamburgerIcon, NotAllowedIcon, BellIcon } from "@chakra-ui/icons";
import {
  Box,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  RadioGroup,
  Stack,
  Radio,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useCallback, useState } from "react";

export const ModalReport = ({
  onForfeit,
  nameOf,
}: {
  onForfeit: () => void;
  nameOf: string;
}) => {
  const { t } = useTranslation(["ranked", "common"]);
  const {
    isOpen: isSignalOpen,
    onOpen: onSignalOpen,
    onClose: onSignalClose,
  } = useDisclosure();
  const [signalValue, setSignalValue] = useState<string | null>(null);
  const onReport = useCallback(() => {
    setSignalValue(null);
    onSignalClose();
  }, []);

  return (
    <>
      <Box position="absolute" top={1} right={1}>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem icon={<NotAllowedIcon />} onClick={onForfeit}>
              {t("module.forfeit")}
            </MenuItem>
            <MenuItem icon={<BellIcon />} onClick={onSignalOpen}>
              {t("module.report")}
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Modal isOpen={isSignalOpen} onClose={onSignalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {t("module.report_modal.title", { username: nameOf })}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RadioGroup onChange={setSignalValue} value={signalValue}>
              <Stack direction="column">
                <Radio value="1">{t("module.report_modal.toxic")}</Radio>
                <Radio value="2">{t("module.report_modal.AFK")}</Radio>
                <Radio value="3">{t("module.report_modal.unrespect")}</Radio>
              </Stack>
            </RadioGroup>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onReport} disabled={!signalValue}>
              {t("module.report")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
