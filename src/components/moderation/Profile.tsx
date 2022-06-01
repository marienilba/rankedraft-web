import { DeleteIcon } from "@chakra-ui/icons";
import {
  useBoolean,
  Stack,
  Avatar,
  Heading,
  IconButton,
  Flex,
  Select,
  Button,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useAvatarSrc } from "../../utils/AvatarIndex";
import { Index as AvatarsIndex } from "../../utils/AvatarIndex";

export const Profile = ({
  profile,
  onApply,
}: {
  profile: any;
  onApply: (
    avatar: number,
    resetElo: boolean,
    role: string,
    ban: number,
    id: string
  ) => void;
}) => {
  const { t } = useTranslation(["moderation"]);
  const [resetElo, setResetElo] = useBoolean(false);
  const [role, setRole] = useState<string>();
  const [avatar, setAvatar] = useState<number>();
  const [banTime, setBanTime] = useState<number>();
  const handleApply = () => {
    onApply(avatar, resetElo, role, banTime, profile.id);
  };

  if (!profile) return <></>;
  return (
    <Stack direction="row" alignItems="center">
      <Avatar
        src={useAvatarSrc(profile.avatar)}
        bg="transparent"
        padding={1}
        ignoreFallback
      />
      <Heading fontSize="md">{profile.name}</Heading>
      <Text>Elo: {profile.ladder[0].elo}</Text>
      <IconButton
        icon={<DeleteIcon />}
        onClick={setResetElo.toggle}
        colorScheme={resetElo ? "green" : "gray"}
        aria-label={""}
      />
      <Text>Role: {profile.data.app_metadata?.role ?? "authenticated"}</Text>
      <Flex>
        <Select
          placeholder={`${t("select")} ${t("role")}`}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="authenticated">authenticated</option>
          <option value="orga">orga</option>
          <option value="moderator">moderator</option>
        </Select>
      </Flex>
      <Flex>
        <Select
          placeholder={`${t("select")} ${t("avatar")}`}
          onChange={(e) => setAvatar(parseInt(e.target.value))}
        >
          {Object.entries(AvatarsIndex).map(([index, av], idx) => {
            if (av.locked)
              return (
                <option key={`avatars-option-${index}-${idx}`} value={index}>
                  {index} - {av.path}
                </option>
              );
          })}
        </Select>
      </Flex>
      <Flex>
        <Select
          placeholder={`${t("select")} ${t("bannissement")}`}
          onChange={(e) => setBanTime(parseInt(e.target.value))}
        >
          <option value={-1}>{t("unban")}</option>
          <option value={24 * 60}>
            {t("ban", { n: 24 })} {t("hours")}
          </option>
          <option value={7 * 24 * 60}>
            {" "}
            {t("ban", { n: 1 })} {t("weeks")}
          </option>
          <option value={2 * 7 * 24 * 60}>
            {" "}
            {t("ban", { n: 2 })} {t("weeks")}
          </option>
          <option value={28 * 7 * 24 * 60}>
            {" "}
            {t("ban", { n: 1 })} {t("months")}
          </option>
          <option value={3 * 28 * 7 * 24 * 60}>
            {" "}
            {t("ban", { n: 3 })} {t("months")}
          </option>
          <option value={6 * 12 * 28 * 7 * 24 * 60}>
            {t("ban", { n: 24 })} {t("perma")}
          </option>
        </Select>
      </Flex>
      <Button onClick={handleApply}>{t("apply")}</Button>
    </Stack>
  );
};
