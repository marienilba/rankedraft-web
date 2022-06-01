import {
  Stack,
  Heading,
  Wrap,
  WrapItem,
  Avatar,
  Box,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import { GiPadlock } from "react-icons/gi";
import { useTheme } from "../../hooks/useTheme";
import {
  makeAvatarArray,
  Index as Avatars,
  useAvatarSrc,
} from "../../utils/AvatarIndex";

export const CardAvatars = ({ limit, title, onSelect, selected, avatars }) => {
  const { backgroundColor } = useTheme({ variant: "secondary" });
  const { code } = useTheme({ invert: true });

  const isLocked = (k) => {
    return Avatars[k].locked && !avatars.includes(k);
  };
  return (
    <Stack
      {...backgroundColor}
      borderRadius={25}
      p={3}
      height="100%"
      boxShadow="xs"
    >
      <Heading size="lg">{title}</Heading>
      <Wrap direction="row" padding={2}>
        {makeAvatarArray(limit).map((k, idx) => {
          return (
            <WrapItem position="relative" key={`avatar_${title}-${k}-${idx}`}>
              <Avatar
                onClick={(e) => {
                  e.preventDefault();
                  !isLocked(k) && onSelect(k);
                }}
                size="lg"
                src={useAvatarSrc(k)}
                borderColor={k === selected ? "yellow.400" : null}
                borderWidth={k === selected ? "3px" : null}
                _hover={{
                  cursor: "pointer",
                  boxShadow: `0px 0px 15px -5px ${code[100]}`,
                  backgroundColor: "transparent",
                }}
                bg="transparent"
                ignoreFallback
              />
              {isLocked(k) && (
                <>
                  <Box
                    position="absolute"
                    boxSize="100%"
                    bgColor="black"
                    borderRadius={50}
                    opacity={0.25}
                  ></Box>
                  <Flex
                    position="absolute"
                    boxSize="100%"
                    borderRadius={50}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <GiPadlock size="32px" color="white" />
                  </Flex>
                </>
              )}
              {isLocked(k) && (
                <Tooltip
                  label={Avatars[k].conditions}
                  aria-label="Unlock tooltip"
                  borderRadius={25}
                  backgroundColor="yellow.200"
                  color="blackAlpha.900"
                  closeOnClick
                  closeDelay={100}
                  openDelay={500}
                >
                  <Box
                    boxSize="100%"
                    position="absolute"
                    borderRadius={50}
                  ></Box>
                </Tooltip>
              )}
            </WrapItem>
          );
        })}
      </Wrap>
    </Stack>
  );
};
