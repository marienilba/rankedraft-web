import { Flex, Heading, Divider } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { Ladder } from "../components/ranked/Ladder";
import { RankedModule } from "../components/ranked/RankedModule";
import { Spectator } from "../components/ranked/Spectator";
import { useDevice } from "../hooks/useDevice";
import { Container } from "./Container";

export const Ranked = () => {
  const { t } = useTranslation(["ranked", "common"]);
  const { isMobile } = useDevice();
  return (
    <Container>
      {isMobile ? (
        <Heading textAlign="center" fontSize="xl" mt={5}>
          {t("deprecated")}
        </Heading>
      ) : (
        <RankedModule />
      )}

      <Divider margin={5} />
      <Flex justifyContent="center" position="relative">
        <Ladder />
        <Flex position="absolute" right={0}>
          <Spectator />
        </Flex>
      </Flex>
    </Container>
  );
};
