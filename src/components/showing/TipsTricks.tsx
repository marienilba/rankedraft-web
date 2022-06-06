import { Heading, Stack, Flex, Text, Kbd, Link } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

export const TipsTricks = () => {
  const { t } = useTranslation(["home"]);

  return (
    <Stack marginBottom="10rem">
      <Flex direction="column">
        <Heading textAlign="center" mb={6}>
          {t("tips.title")}
        </Heading>
        <Text>
          <span style={{ fontWeight: "bold" }}>
            {t("tips.auto-detect-bold")}
          </span>
          {": "}
          {t("tips.auto-detect-text")}
        </Text>
        <Text>
          <span style={{ fontWeight: "bold" }}>{t("tips.import-bold")}</span>
          {": "}
          {t("tips.import-text")} -{" "}
          <Link isExternal href="https://youtu.be/lBlzKmqN0f4">
            [Tutoriel]
          </Link>
        </Text>

        <Text>
          <span style={{ fontWeight: "bold" }}>{t("tips.share-bold")}</span>
          {": "}
          {t("tips.share-text")}
        </Text>
        <Text>
          <span style={{ fontWeight: "bold" }}>{t("tips.seizure-bold")}</span>
          {": "}
          {t("tips.seizure-text")}
        </Text>
        <Text>
          <span style={{ fontWeight: "bold" }}>
            {" "}
            {t("tips.show-comments-bold")}
          </span>
          {": "}
          <span>
            <Kbd>shift</Kbd> + <Kbd>f</Kbd>
          </span>{" "}
          {t("tips.show-comments-text")}
        </Text>
      </Flex>
    </Stack>
  );
};
