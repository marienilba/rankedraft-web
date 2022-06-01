import {
  Flex,
  IconButton,
  Stack,
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchSpectator } from "../../queries/Ladder";
import { useInView } from "react-intersection-observer";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { RiEyeFill, RiEyeLine } from "react-icons/ri";
import { useRef } from "react";
import { ErrorButton } from "../ErrorButton";
import { LobbyLine } from "./LobbyLine";
import { useTranslation } from "next-i18next";

export const Spectator = () => {
  const { t } = useTranslation(["ranked"]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const btnRef = useRef();
  const { ref: UpButtonRef, inView: UpButtonInView } = useInView();
  const { isLoading, data, isSuccess, isError, refetch } = useQuery(
    "spectator",
    fetchSpectator,
    {
      enabled: false,
    }
  );

  return (
    <Flex>
      <Tooltip
        label={t("lobbies.tooltip")}
        openDelay={500}
        closeDelay={0}
        closeOnClick
        closeOnEsc
        closeOnMouseDown
      >
        <IconButton
          aria-label="Show lobbies"
          icon={isDark ? <RiEyeLine /> : <RiEyeFill />}
          ref={btnRef}
          onClick={() => {
            refetch();
            onOpen();
          }}
        />
      </Tooltip>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{t("lobbies.title")}</DrawerHeader>
          <DrawerBody>
            {isError && <ErrorButton refetch={refetch} />}
            {/* {isLoading && <LoadingTopBar />} Dont work coz parent is relative */}
            {isSuccess && (
              <Flex alignItems="center">
                <div ref={UpButtonRef}></div>
                <Stack>
                  {data.map((lobby, idx) => {
                    return (
                      <LobbyLine
                        key={`lobby-${lobby.id}-line-${idx}`}
                        lobby={lobby}
                        position={idx}
                      />
                    );
                  })}
                </Stack>
                <Flex>
                  <IconButton
                    hidden={UpButtonInView}
                    colorScheme="green"
                    aria-label="Remonter haut de page"
                    icon={<ArrowUpIcon />}
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  />
                </Flex>
              </Flex>
            )}

            <Stack direction="row"></Stack>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Fermer
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
