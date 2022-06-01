import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Stack,
  Flex,
  Avatar,
  Divider,
  Heading,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { SpectatorLobby } from "../../queries/Ladder";
import { useTheme } from "../../hooks/useTheme";
import { useAvatarSrc } from "../../utils/AvatarIndex";
import { timeSince } from "../../utils/HelpersFunction";
import { useTranslation } from "next-i18next";

export const LobbyLine = ({
  lobby,
  position,
}: {
  lobby: SpectatorLobby;
  position: number;
}) => {
  const { t } = useTranslation(["ranked"]);
  const { theme } = useTheme();
  const { url, created_at, players } = lobby;

  const time = timeSince(new Date(created_at));

  if (players.length < 2) return <></>;
  return (
    <Stack
      direction="row"
      bgColor={position % 2 === 0 ? theme[200] : theme[300]}
      borderRadius={5}
      boxShadow="base"
    >
      <Flex w="4rem" justifyContent="center" alignItems="center">
        <Avatar
          src={useAvatarSrc(players[0].avatar)}
          bg="transparent"
          padding={1}
          ignoreFallback
        />
      </Flex>
      <Divider orientation="vertical" />
      <Flex w="5rem" justifyContent="flex-start" alignItems="center">
        <Heading fontSize="md" noOfLines={0}>
          {players[0].name}
        </Heading>
      </Flex>
      <Divider orientation="vertical" />
      <Flex w="4rem" justifyContent="center" alignItems="center">
        <Avatar
          src={useAvatarSrc(players[1].avatar)}
          bg="transparent"
          padding={1}
          ignoreFallback
        />
      </Flex>
      <Divider orientation="vertical" />
      <Flex w="5rem" justifyContent="flex-start" alignItems="center">
        <Heading fontSize="md" noOfLines={0}>
          {players[1].name}
        </Heading>
      </Flex>
      <Divider orientation="vertical" />
      <Flex justifyContent="flex-start" alignItems="center">
        <Link isExternal href={url}>
          <IconButton icon={<ExternalLinkIcon />} aria-label="draft link" />{" "}
        </Link>
      </Flex>
      <Flex justifyContent="flex-start" alignItems="center">
        <Heading fontSize="xs" noOfLines={0}>
          {t("lobbies.time_ago", { time })}
        </Heading>
      </Flex>
      <Flex marginX={4}></Flex>
    </Stack>
  );
};
