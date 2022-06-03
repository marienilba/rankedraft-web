import {
  useToast,
  useBoolean,
  Flex,
  Link,
  Text,
  Stack,
  Avatar,
  Heading,
  AvatarGroup,
  Tooltip,
  Spacer,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsArrowLeftSquare, BsArrowLeftSquareFill } from "react-icons/bs";
import { useQueryClient, useMutation } from "react-query";
import { Team, quitTeam } from "../../queries/Team";
import { useCopyClipboard } from "../../hooks/useCopyClipboard";
import { useTheme } from "../../hooks/useTheme";
import { useAvatarSrc } from "../../utils/AvatarIndex";
import { useTripleToggle } from "../../hooks/useTripleToggle";
import { useTranslation } from "next-i18next";

export const TeamCard = ({ team }: { team: Team }) => {
  const { t } = useTranslation(["teams", "common"]);
  const { kta_link, invitation, team_name, mates, team_id } = team;
  const { backgroundColor, theme } = useTheme({ variant: "secondary" });
  const toast = useToast();
  const [isCopied, Copy] = useCopyClipboard({ successDuration: 2000 });
  const [ktaAvatar, setKtaAvatar] = useState("");
  const [extension, toggleExtension] = useTripleToggle(1);
  const handleAvatar = useCallback(
    (exts: any) => {
      if (!kta_link || typeof kta_link !== "string") return;
      if (kta_link.includes("ktarena.com/fr/equipe/")) {
        let teamId = kta_link;
        if (teamId) {
          let split = teamId.split("ktarena.com/fr/equipe/");
          if (split && split.length === 2) teamId = split[1];
        }
        const ext = exts === 1 ? "jpg" : exts === 0 ? "jpeg" : "png";
        setKtaAvatar(`https://ktarena.com/assets/img/teams/${teamId}.${ext}`);
      } else {
        setKtaAvatar((a) => a !== "" && a);
      }
    },
    [kta_link]
  );

  const [quitPressed, setQuitPressed] = useBoolean(false);
  const queryClient = useQueryClient();
  const mutation = useMutation(quitTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries("team");
      queryClient.invalidateQueries("history");
    },
  });

  useEffect(() => {
    handleAvatar(extension);
  }, [extension]);

  useEffect(() => {
    if (isCopied)
      toast({
        id: invitation,
        title: t("toast_title"),
        description: t("toast_message"),
        status: "success",
        duration: 4000,
        isClosable: true,
      });
  }, [isCopied]);

  return (
    <Flex>
      <Stack boxShadow="base" padding={3} borderRadius={5} {...backgroundColor}>
        <Stack direction="row">
          <Flex justifyContent="center" alignItems="center">
            <Avatar
              boxSize="4rem"
              src={kta_link ? ktaAvatar : "/profile/placeholder.png"}
              onError={() => toggleExtension(null)}
              bg="transparent"
              borderColor={theme[300]}
              borderWidth="4px"
            />
          </Flex>
          <Stack spacing={1.5}>
            <Heading fontSize="3xl">{team_name}</Heading>
            <Text fontSize="xs" as="sup">
              <Link href={kta_link} isExternal>
                {kta_link}
              </Link>
            </Text>
          </Stack>
        </Stack>
        <Divider />

        <Heading fontSize="lg" textAlign="center">
          {t("members")}
        </Heading>
        <Stack direction="row" alignItems="center">
          <AvatarGroup size="md" max={5}>
            {mates &&
              mates.length > 0 &&
              mates.map(({ id, name, avatar }, index) => {
                return (
                  <Tooltip key={`member-${index}-${team_name}`} label={name}>
                    <Avatar
                      name={name}
                      src={useAvatarSrc(avatar)}
                      bg="transparent"
                      ignoreFallback
                    />
                  </Tooltip>
                );
              })}
          </AvatarGroup>
          <Spacer />
          <IconButton
            icon={<AiOutlineUsergroupAdd />}
            aria-label="Get invitation"
            onClick={() => {
              if (toast.isActive(invitation)) return;
              Copy(invitation);
            }}
          />
          <Tooltip label={t("left_team")} openDelay={500}>
            <IconButton
              icon={
                !quitPressed ? <BsArrowLeftSquare /> : <BsArrowLeftSquareFill />
              }
              aria-label="Quit the team"
              isLoading={mutation.isLoading}
              onClick={() => {
                !quitPressed && team_id !== undefined
                  ? setQuitPressed.toggle()
                  : mutation.mutate(team_id);
              }}
            />
          </Tooltip>
        </Stack>
      </Stack>
    </Flex>
  );
};
