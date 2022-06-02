import { CloseIcon, LinkIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Flex,
  IconButton,
  Input,
  Link,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { PROTOCOL } from "../../utils/Constants";
import { useTheme } from "../../hooks/useTheme";
import { useUser } from "../../hooks/useUser";
import { Hero } from "./ranked_module/Hero";
import { Logo } from "./ranked_module/Logo";
import { DraftUrlLink } from "./ranked_module/DraftUrlLink";
import { PlayersDisplay } from "./ranked_module/PlayersDisplay";
import { useRanked } from "../../hooks/useRanked";
import { ModalRankedRules } from "./ranked_module/ModalRankedRules";
import { ModalReport } from "./ranked_module/ModalReport";
import { AlreadyIn } from "./ranked_module/AlreadyIn";
import { Confirm } from "./ranked_module/Confirm";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useTranslation } from "next-i18next";

export const RankedModule = ({ ip }) => {
  const { user } = useUser();
  const { backgroundColor } = useTheme({ variant: "secondary" });
  const { isMobile } = useWindowSize();
  const { t } = useTranslation(["ranked", "common"]);

  const [
    handlers,
    step,
    players,
    alreadyIn,
    inQueue,
    hasAccepted,
    hisResult,
    invalidURL,
    draftURL,
    shouldSend,
  ] = useRanked(user, ip);

  const refusalModal = useDisclosure();

  return (
    <Flex marginTop={isMobile ? 10 : 0} direction="column">
      {isMobile && (
        <Flex marginBottom={2}>
          <Text>{t("deprecated")}</Text>
        </Flex>
      )}
      <Flex
        {...backgroundColor}
        width={isMobile ? "100%" : "auto"}
        maxWidth="600px"
        minWidth="60%"
        minHeight="250px"
        alignSelf="center"
        justifyContent="flex-start"
        borderRadius={15}
        direction="column"
        p={5}
        boxShadow="xl"
        position="relative"
      >
        {(step === PROTOCOL.ASK_URL ||
          step === PROTOCOL.ASK_OVER ||
          step === PROTOCOL.CONFIRM_OVER) && (
          <>
            <ModalReport
              onForfeit={handlers.Forfeit}
              nameOf={players[1].name}
            />
          </>
        )}
        <Hero />
        <Flex alignItems="center" justifyContent="center" flex="1">
          {step === PROTOCOL.UNREGISTER && (
            <Stack
              justifyContent="center"
              alignItems="center"
              direction="column"
              width="100%"
              spacing={2}
            >
              <Logo />
              {alreadyIn && (
                <AlreadyIn
                  onRetry={handlers.Socket}
                  onForfeit={handlers.Forfeit}
                  isAuth={!!user}
                />
              )}
              {!inQueue && !alreadyIn && (
                <Button
                  disabled={!user || alreadyIn}
                  onClick={handlers.Socket}
                  maxWidth="160px"
                  minWidth="80px"
                >
                  {t("module.register")}
                </Button>
              )}
              {inQueue && (
                <>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      aria-label="Quitter le lobby"
                      icon={<CloseIcon />}
                      onClick={handlers.QuitQueue}
                    />
                    <Button isLoading maxWidth="160px" minWidth="80px" />
                  </Stack>

                  <Text as="i">{t("module.looking_for")}</Text>
                </>
              )}
            </Stack>
          )}
          {step === PROTOCOL.ASK_CONFIRM && (
            <Confirm
              onConfirm={handlers.Confirm}
              {...refusalModal}
              hasAccepted={hasAccepted}
            />
          )}
          {step === PROTOCOL.ASK_URL && (
            <Stack width="100%">
              <PlayersDisplay players={players} />
              <DraftUrlLink
                draftURL={draftURL}
                onValidate={handlers.Validate}
              />
              {shouldSend ? (
                <>
                  <Flex alignItems={"center"}>
                    <Input
                      placeholder={t("module.send_link")}
                      onChange={handlers.DraftInput}
                    />
                    <Tooltip
                      label={t("module.link_tooltip")}
                      aria-label="Lien"
                      placement="right-end"
                      openDelay={500}
                      closeDelay={0}
                    >
                      <Link
                        isExternal
                        href="https://draft.ktarena.com/draft/create"
                      >
                        <IconButton
                          aria-label="Créer une draft"
                          icon={<LinkIcon />}
                        />
                      </Link>
                    </Tooltip>
                  </Flex>
                  {invalidURL && (
                    <Text
                      as="samp"
                      pl={3}
                      color="red.800"
                      fontSize="xs"
                      fontWeight={800}
                    >
                      {t("module.invalid_link")}
                    </Text>
                  )}
                </>
              ) : (
                <Center>
                  {!draftURL ? (
                    <Text>
                      {t("module.waiting_link", { username: players[1].name })}
                    </Text>
                  ) : (
                    <Text>
                      {t("module.start_link", { username: players[1].name })}
                    </Text>
                  )}
                </Center>
              )}
            </Stack>
          )}
          {(step === PROTOCOL.ASK_OVER || step === PROTOCOL.CONFIRM_OVER) && (
            <Stack width="100%">
              <PlayersDisplay players={players} />

              {draftURL && <DraftUrlLink draftURL={draftURL} />}
              <Stack direction="row" spacing={1} justifyContent="center">
                <Text>Résultat du match pour</Text>
                <Text fontWeight={800}>{players[0].name}</Text>
              </Stack>
              <ModalRankedRules />
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  disabled={step === PROTOCOL.CONFIRM_OVER}
                  size={
                    step === PROTOCOL.CONFIRM_OVER
                      ? hisResult === 1
                        ? "md"
                        : "xs"
                      : "md"
                  }
                  onClick={() => handlers.Over(1)}
                >
                  🏆 {t("module.won")}
                </Button>
                <Button
                  disabled={step === PROTOCOL.CONFIRM_OVER}
                  size={
                    step === PROTOCOL.CONFIRM_OVER
                      ? hisResult === 2
                        ? "md"
                        : "xs"
                      : "md"
                  }
                  onClick={() => handlers.Over(2)}
                >
                  ☠️ {t("module.lost")}
                </Button>
              </Stack>

              {step === PROTOCOL.CONFIRM_OVER && (
                <Text textAlign="center" fontSize="md" as="samp">
                  {t("module.waiting_result")}
                </Text>
              )}
            </Stack>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
