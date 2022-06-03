import {
  Stack,
  Image,
  Heading,
  Wrap,
  Flex,
  AvatarGroup,
  Avatar,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { memo } from "react";
import { Draft } from "../../hooks/useCompo";
import { useBreedAvatar } from "../../utils/BreedIndex";
import { makeArrayOfRange } from "../stats/Functions";

export const RemainingBreeds = memo(({ draft }: { draft: Draft }) => {
  const { t } = useTranslation(["history", "common"]);
  const breeds = makeArrayOfRange<number>([1, 18]).map((v, i) => i + 1);
  const { picks, bans } = draft;
  let draft_breeds = [
    ...picks.A.map(({ breed }) => breed),
    ...picks.B.map(({ breed }) => breed),
    ...bans.A,
    ...bans.B,
  ];
  const remaining = breeds.filter((value, index) => {
    if (draft_breeds.includes(value)) return false;
    return true;
  });
  return (
    <Wrap spacing={2} padding={1} align="center" justify="center">
      {remaining.length === 4 && (
        <>
          <Heading fontSize="md">{t("module.remaining_breeds")}</Heading>
          <Flex justifyContent="center">
            <AvatarGroup size="md" max={4}>
              {remaining.map((b: number, idx) => {
                return (
                  <Avatar
                    borderRadius="full"
                    src={useBreedAvatar(b)}
                    key={`remaining-${b}-${idx}`}
                  />
                );
              })}
            </AvatarGroup>
          </Flex>
        </>
      )}
    </Wrap>
  );
});
