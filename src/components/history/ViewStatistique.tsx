import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
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
import Link from "next/link";
import { MdQueryStats } from "react-icons/md";
import { Options } from "../../queries/History";
import { ModalStats } from "../stats/ModalStats";

export const ViewStatistique = ({
  options,
  search,
  isFetching,
}: {
  options: Options;
  search: {
    compo: number[][];
    respect_order: boolean;
  };
  isFetching: boolean;
}) => {
  const { t } = useTranslation(["common"]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    pseudo,
    team_id,
    map_id,
    result,
    letter,
    is_kta,
    initiative,
    start_date,
    end_date,
  } = options;
  const { compo, respect_order } = search;
  const link = `/stats/?pseudo=${pseudo ?? ""}&team_id=${
    team_id ?? ""
  }&map_id=${map_id ?? ""}&result=${result ?? ""}&letter=${
    letter ?? ""
  }&is_kta=${is_kta ?? ""}&initiative=${initiative ?? ""}&start_date=${
    start_date ?? ""
  }&end_date=${end_date ?? ""}&compo=${
    compo !== null ? JSON.stringify(compo) : ""
  }&respect_order=${respect_order ?? ""}`;

  return (
    <>
      <Button
        onClick={() => {
          !isFetching && onOpen();
        }}
        leftIcon={<MdQueryStats />}
      >
        {t("page.stats")}
      </Button>

      <Modal
        blockScrollOnMount
        closeOnOverlayClick={true}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="scale"
        size="full"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("page.stats")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ModalStats options={options} search={search} />
          </ModalBody>
          <ModalFooter>
            <Link href={link}>
              <Button
                isDisabled
                variant="outline"
                mr={3}
                rightIcon={<ExternalLinkIcon />}
                colorScheme="green"
              >
                {t("page.more")}..
              </Button>
            </Link>
            <Button variant="outline" mr={3} onClick={onClose}>
              {t("quit")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
