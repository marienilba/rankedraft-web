import {
  Flex,
  Menu,
  MenuButton,
  Box,
  Stack,
  Avatar,
  Heading,
  Spacer,
  MenuList,
} from "@chakra-ui/react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useQuery } from "react-query";
import { fetchLightProfile } from "../../queries/Profile";
import { useTheme } from "../../hooks/useTheme";
import { Logout } from "./Logout";
import { useAvatarSrc } from "../../utils/AvatarIndex";
import { useWindowSize } from "../../hooks/useWindowSize";

export const AccountButton = ({ user, signOut }) => {
  const { theme } = useTheme();
  const { isScreen, isMobile } = useWindowSize();

  const { isLoading, data, isSuccess, isError } = useQuery(
    ["profile", user.id],
    fetchLightProfile
  );

  if (isError) return <></>;

  if (isMobile) {
    return (
      <>
        {isSuccess && data ? (
          <Stack direction="row" alignItems="center">
            <Avatar
              size="md"
              bg={theme[200]}
              icon={<span></span>}
              src={useAvatarSrc(data.avatar)}
            />

            <Heading
              fontSize={
                data.name.length < 9 ? 24 : data.name.length < 11 ? 20 : 16
              }
              noOfLines={0}
            >
              {data.name}
            </Heading>
          </Stack>
        ) : (
          <> </>
        )}
      </>
    );
  }

  return (
    <Flex
      marginY={4}
      alignItems="center"
      direction="column"
      width="100%"
      paddingX={2}
    >
      <Menu closeOnBlur closeOnSelect>
        <MenuButton
          borderRadius={50}
          _hover={{ backgroundColor: theme[200], cursor: "pointer" }}
          width="100%"
        >
          <Box p={2}>
            <Stack
              direction="row"
              spacing={3}
              alignItems="center"
              justifyContent="center"
              minH="7vh"
            >
              {isSuccess && data ? (
                <>
                  <Avatar
                    size="md"
                    bg={theme[200]}
                    icon={<span></span>}
                    src={useAvatarSrc(data.avatar)}
                  />
                  {isScreen && (
                    <Heading
                      fontSize={
                        data.name.length < 9
                          ? 24
                          : data.name.length < 11
                          ? 20
                          : 16
                      }
                      noOfLines={0}
                    >
                      {data.name}
                    </Heading>
                  )}
                </>
              ) : (
                <span></span>
              )}
              {isScreen && (
                <>
                  <Spacer />
                  <HiDotsHorizontal />
                </>
              )}
            </Stack>
          </Box>
        </MenuButton>
        <MenuList boxShadow="xl">
          <Logout signOut={signOut} />
        </MenuList>
      </Menu>
    </Flex>
  );
};
