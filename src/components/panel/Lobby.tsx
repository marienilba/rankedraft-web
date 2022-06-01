import { Stack, Text, Link } from "@chakra-ui/react";
import { Player } from "./Player";

export const Lobby = ({
  players,
  step,
  created_at,
  last_update,
  draft_url,
}) => {
  return (
    <Stack direction="row">
      {players.map((player, idx: number) => {
        return <Player {...player} key={`player_lobby_line-${idx}`} />;
      })}
      <Text>{step}</Text>
      <Link href={draft_url} isExternal fontWeight={700}>
        {draft_url && draft_url.substring(43)}
      </Link>
      <Text>
        {new Date(created_at).getHours()}:{new Date(created_at).getMinutes()}
      </Text>
      {last_update && (
        <Text>
          {new Date(last_update).getHours()}:
          {new Date(last_update).getMinutes()}
        </Text>
      )}
    </Stack>
  );
};
