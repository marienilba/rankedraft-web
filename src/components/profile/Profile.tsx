import {
  Stack,
  Flex,
  Avatar,
  Text,
  Editable,
  EditablePreview,
  EditableInput,
  Input,
  Spacer,
  Heading,
  Button,
  useDimensions,
  useBoolean,
  Wrap,
  WrapItem,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useCallback, useRef } from "react";
import { ProfileResponse } from "../../queries/Profile";
import useInput from "../../hooks/useInput";
import { useTheme } from "../../hooks/useTheme";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useAvatarSrc } from "../../utils/AvatarIndex";
import { zIndexPriority } from "../../utils/Constants";
import { useTranslation } from "next-i18next";
import { HiDotsHorizontal } from "react-icons/hi";

export const Profile = ({
  data,
  onSubmit,
  avatar,
  isLoading,
}: {
  data: ProfileResponse;
  onSubmit: (u: string) => void;
  avatar: number;
  isLoading?: boolean;
}) => {
  const { t } = useTranslation(["profile", "common"]);
  const { isPad, isMobile } = useWindowSize();
  const { backgroundColor, theme, code } = useTheme({ variant: "info" });

  const handleSubmit = () => {
    onSubmit(username.value);
  };
  const [username] = useInput(data?.name);
  const handleInputSubmit = useCallback(() => {
    if (username.value.length > 12)
      username.onChange(username.value.trim().slice(0, 12));
    else if (username.value.trim().length < 3) username.onChange(data?.name);
    else username.onChange(username.value.trim());
  }, [username]);

  const handleInputCancel = () => {
    username.onChange(data?.name);
  };

  return (
    <Flex mt={isMobile ? 8 : 0} direction="column">
      <Wrap
        // spacing={5}
        alignItems="center"
        borderRadius={25}
        position="relative"
      >
        <Flex
          {...backgroundColor}
          width="100%"
          height={isMobile ? "30%" : "50%"}
          borderTopEndRadius={25}
          borderTopLeftRadius={25}
          position="absolute"
          {...zIndexPriority.ProfileBackground}
        />

        <WrapItem>
          <Wrap justify="center">
            <WrapItem>
              <Flex p="5">
                <Avatar
                  {...backgroundColor}
                  size="2xl"
                  src={
                    avatar ? useAvatarSrc(avatar) : useAvatarSrc(data.avatar)
                  }
                  borderColor={theme[100]}
                  borderWidth="4px"
                  ignoreFallback
                />
              </Flex>
            </WrapItem>
            <WrapItem padding={1} minWidth="260px">
              <Flex height="100%" direction="column">
                <Flex
                  paddingTop={2}
                  flex={1}
                  {...zIndexPriority.ProfileOverlap}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Editable
                    defaultValue={data.name}
                    onSubmit={handleInputSubmit}
                    onCancel={handleInputCancel}
                    value={username.value}
                    marginRight="2"
                  >
                    <EditablePreview
                      fontSize={isMobile ? "3xl" : isPad ? "2xl" : "3xl"}
                      fontFamily="Arial"
                      fontWeight={800}
                    />

                    <EditableInput
                      onChange={(e) => {
                        username.onChange(e);
                      }}
                      fontSize={isMobile ? "3xl" : isPad ? "2xl" : "3xl"}
                      fontFamily="Arial"
                      fontWeight={800}
                    />
                  </Editable>
                  <HiDotsHorizontal color={code[400]} />
                </Flex>
                <Flex flex={1}></Flex>
              </Flex>
            </WrapItem>
          </Wrap>
        </WrapItem>
        <Spacer />
        <Flex padding={5} height="100%" justifyContent="flex-end">
          <Button
            colorScheme="green"
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            {t("save", { ns: "common" })}
          </Button>
        </Flex>
      </Wrap>
    </Flex>
  );
};
