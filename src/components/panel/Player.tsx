import { Stack, Tooltip, Text } from "@chakra-ui/react";
import {
  HiIdentification,
  HiOutlineStatusOnline,
  HiOutlineStatusOffline,
} from "react-icons/hi";
import { useTheme } from "../../hooks/useTheme";

export const Player = ({ id, name, elo, isDisconnected }) => {
  const { backgroundColor } = useTheme();

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      {...backgroundColor}
      borderRadius={10}
    >
      <Tooltip label={id} fontSize="md">
        <span>
          <HiIdentification />
        </span>
      </Tooltip>
      <Text fontWeight={800}>{name ?? "Someone"}</Text>
      <Text>🏆 {elo}</Text>
      {isDisconnected !== undefined &&
        (!isDisconnected ? (
          <HiOutlineStatusOnline />
        ) : (
          <HiOutlineStatusOffline />
        ))}
    </Stack>
  );
};
