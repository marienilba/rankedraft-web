import {
  Stack,
  Heading,
  Divider,
  AvatarGroup,
  Avatar,
  Flex,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { Draft } from "../../hooks/useCompo";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useBreedAvatar } from "../../utils/BreedIndex";
import { BreedPick } from "./BreedPick";

type CompositionsProps = {
  draft: Draft;
  myLetter: "A" | "B";
  onEdit: (
    letter: string,
    index: number,
    pick: {
      breed: number;
      mode: string;
    }
  ) => void;
};

export const Compositions = ({
  draft,
  myLetter,
  onEdit,
}: CompositionsProps) => {
  const { isScreen } = useWindowSize();
  const { t } = useTranslation(["history", "common"]);
  const { picks, bans } = draft;
  const otherLetter = myLetter === "A" ? "B" : "A";
  return (
    <Stack direction="row" paddingRight={isScreen ? 10 : 0} paddingY={5}>
      <Stack minW="50%">
        <Heading textAlign="center" fontSize="md" mb={3}>
          {`${t("pronoun.my", { ns: "common" })} ${t("compo")}`}
        </Heading>
        {picks[myLetter].map((p, idx) => {
          return (
            <BreedPick
              pick={p}
              onEdit={onEdit}
              letter={myLetter}
              index={idx}
              key={`compo_breed_pick_${p.breed}-${idx}`}
            />
          );
        })}
        <Heading textAlign="center" fontSize="md" mb={3}>
          {t("module.bans")}
        </Heading>
        <Flex justifyContent="center">
          <AvatarGroup size="md" max={4}>
            {bans[myLetter].map((b: number, idx) => {
              return (
                <Avatar
                  borderRadius="full"
                  src={useBreedAvatar(b)}
                  key={`compo_breed_pick_${b}-${idx}`}
                />
              );
            })}
          </AvatarGroup>
        </Flex>
      </Stack>
      <Divider />
      <Stack minW="50%">
        <Heading textAlign="center" fontSize="md" mb={3}>
          {`${t("pronoun.their", { ns: "common" })} ${t("compo")}`}
        </Heading>
        {picks[otherLetter].map((p, idx) => {
          return (
            <BreedPick
              pick={p}
              onEdit={onEdit}
              letter={otherLetter}
              index={idx}
              key={`compo_breed_pick_${p.breed}-${idx}`}
            />
          );
        })}
        <Heading textAlign="center" fontSize="md" mb={3}>
          {t("module.bans")}
        </Heading>
        <Flex justifyContent="center">
          <AvatarGroup size="md" max={4}>
            {bans[otherLetter].map((b: number, idx) => {
              return (
                <Avatar
                  borderRadius="full"
                  src={useBreedAvatar(b)}
                  key={`compo_breed_pick_${b}-${idx}`}
                />
              );
            })}
          </AvatarGroup>
        </Flex>
      </Stack>
    </Stack>
  );
};
