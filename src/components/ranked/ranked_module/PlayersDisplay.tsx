import { Flex, Heading } from "@chakra-ui/react";
import { PlayerInfos } from "./PlayerInfos";
import { Player } from "./Types";

export const PlayersDisplay = ({ players }: { players: Player[] }) => {
  return (
    <Flex alignItems="center" justifyContent="center" width="100%">
      <PlayerInfos player={players[0]} />
      <Flex width="20%" justifyContent="center">
        <Heading fontSize="5vw" textAlign="center">
          ⚡️
        </Heading>
      </Flex>
      <PlayerInfos player={players[1]} />
    </Flex>
  );
};
