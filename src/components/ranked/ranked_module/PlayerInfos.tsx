import { Flex, Avatar, Heading, Text } from "@chakra-ui/react";
import { useAvatarSrc } from "../../../utils/AvatarIndex";
import { Player } from "./Types";

export const PlayerInfos = ({ player }: { player: Player }) => {
  const { avatar, elo, name } = player;
  return (
    <Flex width="40%" justifyContent="space-around" alignItems="center">
      <Flex direction="column">
        <Avatar
          size="lg"
          src={useAvatarSrc(avatar)}
          bg="transparent"
          borderRadius={5}
          ignoreFallback
        />
        <Text as="samp" fontSize="xs" fontWeight={600} textAlign="center">
          🏆 {elo}
        </Text>
      </Flex>
      <Heading fontSize="lg" textAlign="center">
        {name}
      </Heading>
    </Flex>
  );
};
