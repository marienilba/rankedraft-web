import { Flex, Avatar, Heading } from "@chakra-ui/react";
import { Auth } from "../../../queries/Draft";
import { useTheme } from "../../../hooks/useTheme";
import { useTranslation } from "next-i18next";

export const Opponent = ({
  names,
  letter,
}: {
  names: Auth[];
  letter: "A" | "B";
}) => {
  const { backgroundColor } = useTheme();
  const { t } = useTranslation(["history", "common"]);

  return (
    <Flex alignItems="center" justifyContent="center" marginY={1}>
      {names.length > 0 && (
        <Avatar
          src={letter === "A" ? names[1].logo : names[0].logo}
          name={letter === "A" ? names[1].name : names[0].name}
          {...backgroundColor}
          mr="12px"
          ignoreFallback
        />
      )}
      <Heading size="sm" noOfLines={0} marginX={names.length > 1 ? 0 : 2}>
        {names.length > 1
          ? letter === "A"
            ? names[1]?.name
            : names[0]?.name
          : t("module.opponent")}
      </Heading>
    </Flex>
  );
};
