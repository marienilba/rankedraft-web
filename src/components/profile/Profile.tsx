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
} from "@chakra-ui/react";
import { useCallback, useRef } from "react";
import { ProfileResponse } from "../../queries/Profile";
import useInput from "../../hooks/useInput";
import { useTheme } from "../../hooks/useTheme";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useAvatarSrc } from "../../utils/AvatarIndex";
import { zIndexPriority } from "../../utils/Constants";
import { useTranslation } from "next-i18next";

export const Profile = ({
  data,
  onSubmit,
  avatar,
  isLoading,
}: {
  data: ProfileResponse;
  onSubmit: (u: string, k: string) => void;
  avatar: number;
  isLoading?: boolean;
}) => {
  const { t } = useTranslation(["profile", "common"]);
  const { isPad, isMobile } = useWindowSize();
  const { backgroundColor, theme } = useTheme({ variant: "info" });
  const elementRef = useRef();
  const dimensions = useDimensions(elementRef);

  const handleSubmit = () => {
    onSubmit(username.value, kta_team.value);
  };
  const [username] = useInput(data?.name);
  const [kta_team] = useInput(data?.kta_team ?? undefined);
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
      <Stack
        spacing={5}
        direction={isMobile ? "column" : "row"}
        alignItems="center"
        borderRadius={25}
        position="relative"
      >
        <Flex
          {...backgroundColor}
          width="100%"
          height={isMobile ? "20%" : "50%"}
          borderTopEndRadius={25}
          borderTopLeftRadius={25}
          position="absolute"
          top={0}
          left={0}
          {...zIndexPriority.ProfileBackground}
        />
        <Flex p={isMobile ? 1 : 5}>
          <Avatar
            {...backgroundColor}
            size="2xl"
            src={avatar ? useAvatarSrc(avatar) : useAvatarSrc(data.avatar)}
            borderColor={theme[100]}
            borderWidth="4px"
            ignoreFallback
          />
        </Flex>

        <Flex ref={elementRef} height="100%">
          <Flex
            direction="column"
            flex="s"
            {...zIndexPriority.ProfileOverlap}
            justifyContent="space-around"
            maxWidth={
              isMobile ? "100%" : dimensions && dimensions.borderBox.width
            }
          >
            <Editable
              defaultValue={data.name}
              onSubmit={handleInputSubmit}
              onCancel={handleInputCancel}
              value={username.value}
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
                value=""
                fontSize={isMobile ? "3xl" : isPad ? "2xl" : "3xl"}
                fontFamily="Arial"
                fontWeight={800}
              />
            </Editable>
            <Input
              variant="flushed"
              margin={1}
              placeholder={t("your_kta_team")}
              size={isMobile ? "sm" : "md"}
              {...kta_team}
            />
          </Flex>
        </Flex>
        <Spacer />
        {!isPad && <Spacer />}
        {!isPad && (
          <Flex
            padding={isMobile ? 0 : 5}
            height="100%"
            width={isMobile ? "100%" : "auto"}
            justifyContent="flex-end"
          >
            <Button
              colorScheme="green"
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              {t("save", { ns: "common" })}
            </Button>
          </Flex>
        )}
      </Stack>
      {isPad && (
        <Flex>
          <Button
            colorScheme="green"
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            {t("save", { ns: "common" })}
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
