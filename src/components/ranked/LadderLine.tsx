import { Stack, Flex, Heading, Divider, Avatar } from "@chakra-ui/react";
import { LadderPlayer } from "../../queries/Ladder";
import { useTheme } from "../../hooks/useTheme";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useAvatarSrc } from "../../utils/AvatarIndex";

export const LadderLine = ({
  player,
  position,
}: {
  player: LadderPlayer;
  position: number;
}) => {
  const { theme } = useTheme({ variant: "secondary" });
  const { isMobile } = useWindowSize();
  const { consecutives, elo, profile } = player;
  const { avatar, name } = profile;
  const rank =
    position === 1
      ? `👑 ${position}`
      : position === 100
      ? `💩 ${position}`
      : position;
  return (
    <Stack
      direction="row"
      bgColor={position % 2 === 0 ? theme[100] : theme[200]}
      borderRadius={5}
      boxShadow="base"
      spacing={5}
    >
      <Flex justifyContent="flex-end" alignItems="center" minWidth="2.5rem">
        <Heading fontSize="lg">{rank}</Heading>
      </Flex>
      <Divider orientation="vertical" />
      {!isMobile && (
        <>
          <Flex justifyContent="center" alignItems="center">
            <Avatar
              src={useAvatarSrc(avatar)}
              bg="transparent"
              padding={1}
              ignoreFallback
            />
          </Flex>
          <Divider orientation="vertical" />
        </>
      )}

      <Flex justifyContent="flex-start" alignItems="center" width="5rem">
        <Heading fontSize="sm" noOfLines={0}>
          {name}
        </Heading>
      </Flex>
      <Divider orientation="vertical" />
      <Flex
        justifyContent="center"
        alignItems="center"
        width={isMobile ? "2rem" : "4rem"}
      >
        <Heading fontSize="md">{elo}</Heading>
      </Flex>
      <Divider orientation="vertical" />
      <Flex
        justifyContent="center"
        alignItems="center"
        width={isMobile ? "2rem" : "4rem"}
      >
        <Heading fontSize="lg" textAlign="center">
          {consecutives}
        </Heading>
      </Flex>
    </Stack>
  );
};
