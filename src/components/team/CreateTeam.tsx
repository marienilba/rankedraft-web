import {
  Stack,
  Flex,
  Avatar,
  Heading,
  Input,
  Button,
  Wrap,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { useQueryClient, useMutation } from "react-query";
import { postTeam } from "../../queries/Team";
import useInput from "../../hooks/useInput";
import { useSpam } from "../../hooks/useSpam";
import { useTripleToggle } from "../../hooks/useTripleToggle";
import { useTranslation } from "next-i18next";

export const CreateTeam = ({ onCreate }) => {
  const { t } = useTranslation(["teams", "common"]);
  const [teamName] = useInput();
  const [ktaLink] = useInput();
  const [ktaAvatar, setKtaAvatar] = useState("");
  const [extension, toggleExtension] = useTripleToggle(1);
  const [isSpam, handleSpam] = useSpam({
    limit: 5,
    duration: 60,
    waiting: 120,
  });
  const queryClient = useQueryClient();

  const mutation = useMutation(postTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries("team");
    },
  });

  const verifyUrl = useCallback((url: string) => {
    if (url.includes("ktarena.com/fr/equipe/")) return true;
    if (url.includes("ktarena.com/en/team/")) return true;
    if (url.includes("ktarena.com/es/equipo/")) return true;
    return false;
  }, []);

  const handleCreate = useCallback(() => {
    if (
      !teamName.value ||
      teamName.value.length > 30 ||
      ktaLink.value.length > 70 ||
      (ktaLink.value && !verifyUrl(ktaLink.value))
    )
      return;
    handleSpam();
    !isSpam &&
      mutation.mutate({ team_name: teamName.value, kta_link: ktaLink.value });
  }, [teamName, ktaLink, isSpam]);

  const handleAvatar = useCallback(
    (exts: any) => {
      if (verifyUrl(ktaLink.value)) {
        let teamId = ktaLink.value;
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
    [ktaLink]
  );
  useEffect(() => {
    mutation.status === "success" && onCreate();
  }, [mutation.status]);
  useEffect(() => {
    handleAvatar(extension);
  }, [ktaLink, extension]);

  return (
    <Stack direction="row">
      <Flex justifyContent="center" alignItems="center">
        <Avatar
          boxSize="4rem"
          src={ktaLink.value ? ktaAvatar : "/profile/placeholder.png"}
          onError={() => toggleExtension(null)}
          bg="transparent"
        />
      </Flex>
      <Wrap spacing={2}>
        <Stack>
          <Heading fontSize="md">{t("team_name")}*</Heading>
          <Input placeholder={t("team_name")} {...teamName} />
        </Stack>
        <Stack>
          <Heading fontSize="md">{t("kta_link")}</Heading>
          <Input placeholder="ktarena.com/fr/equipe/" {...ktaLink} />
        </Stack>
      </Wrap>

      <Flex alignItems="flex-end">
        <Button
          onClick={handleCreate}
          isDisabled={!teamName.value || isSpam}
          isLoading={mutation.isLoading}
        >
          {t("create")}
        </Button>
      </Flex>
    </Stack>
  );
};
