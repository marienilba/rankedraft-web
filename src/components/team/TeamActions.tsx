import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Stack,
  Flex,
  Button,
  Input,
  Collapse,
  Wrap,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { AiOutlineTeam } from "react-icons/ai";
import { useQueryClient, useMutation } from "react-query";
import { joinTeam } from "../../queries/Team";
import useInput from "../../hooks/useInput";
import { CreateTeam } from "./CreateTeam";
import { useTranslation } from "next-i18next";

export const TeamActions = () => {
  const { t } = useTranslation(["teams", "common"]);
  const { isOpen: isCreateOpen, onToggle } = useDisclosure();
  const {
    getButtonProps,
    getDisclosureProps,
    isOpen: isJoinOpen,
  } = useDisclosure();

  const [invitation] = useInput();

  const queryClient = useQueryClient();

  const mutation = useMutation(joinTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries("team");
    },
  });

  const handleInvitation = () => {
    invitation.value && mutation.mutate(invitation.value);
  };

  useEffect(() => {
    if (!isJoinOpen) {
      handleInvitation();
      invitation.onChange("");
    }
  }, [isJoinOpen]);

  return (
    <Stack>
      <Wrap direction="row" padding={1}>
        <Flex>
          <Button onClick={onToggle} leftIcon={<PlusSquareIcon />}>
            {t("create_team")}
          </Button>
        </Flex>
        <Flex>
          <Button
            leftIcon={<AiOutlineTeam />}
            {...getButtonProps()}
            colorScheme={isJoinOpen ? "green" : null}
            mr={2}
          >
            {isJoinOpen ? t("join") : t("join_team")}
          </Button>
          <Stack direction="row">
            <motion.div
              {...getDisclosureProps()}
              initial={false}
              animate={{ width: !isJoinOpen ? 0 : "auto" }}
              transition={{ duration: 0.5 }}
              style={{
                overflow: "hidden",
                showborder: true,
              }}
            >
              <Input placeholder="Code d'invitation" {...invitation} />
            </motion.div>
          </Stack>
        </Flex>
      </Wrap>
      <Collapse in={isCreateOpen} animateOpacity>
        <Flex marginY="4" marginX="1">
          <CreateTeam onCreate={onToggle} />
        </Flex>
      </Collapse>
    </Stack>
  );
};
