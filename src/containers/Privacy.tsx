import {
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  Box,
  Img,
  AspectRatio,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { LogoButton } from "../components/navigation/LogoButton";
import { useTheme } from "../hooks/useTheme";
import { useWindowSize } from "../hooks/useWindowSize";

export const Privacy = () => {
  const { t } = useTranslation(["tos"]);
  const { isMobile } = useWindowSize();
  const { backgroundColor } = useTheme();

  return (
    <Flex direction="column">
      <Flex direction="column">
        <Stack
          {...backgroundColor}
          direction="row"
          paddingX={14}
          paddingTop={10}
          paddingBottom={6}
          position="fixed"
          width="100%"
          top={0}
          sx={{ zIndex: 2 }}
          alignItems="center"
        >
          <LogoButton />
          <Heading fontSize="2xl">{t("policy")}</Heading>
        </Stack>
        <Box paddingTop={10} paddingBottom={6} visibility="hidden">
          <Box height="2rem"></Box>
        </Box>
        <Box position="relative">
          <Box>
            <AspectRatio maxW="100vw" ratio={400 / 93}>
              <Img
                src="/assets/policy.jpeg"
                alt="Policy banner"
                objectFit="cover"
              />
            </AspectRatio>
          </Box>
          <Box position="absolute" top="50%" left="2.5rem">
            <Heading
              color="brand.100"
              fontSize="6vw"
              textShadow="2px 0 12px rgba(0,0,0,0.1), -2px 0 12px rgba(0,0,0,0.1), 0 2px 12px rgba(0,0,0,0.1), 0 -2px 12px rgba(0,0,0,0.1), 1px 1px 12px rgba(0,0,0,0.1), -1px -1px 12px rgba(0,0,0,0.1), 1px -1px 12px rgba(0,0,0,0.1), -1px 1px 12px rgba(0,0,0,0.1)"
            >
              {t("policy")}
            </Heading>
          </Box>
        </Box>
      </Flex>
      <Flex direction="column" paddingX={isMobile ? 2 : 7} marginTop={10}>
        <Box marginBottom={8}>
          <Heading fontSize="5xl">{t("confidentialite.1")}</Heading>
          <Stack>
            <Text textAlign="justify">{t("confidentialite.1-1")}</Text>
          </Stack>
        </Box>
        <Box marginY={8}>
          <Heading fontSize="5xl">{t("confidentialite.2")}</Heading>
          <Stack>
            <Text textAlign="justify">{t("confidentialite.2-1")}</Text>
          </Stack>
        </Box>
        <Box marginY={8}>
          <Heading fontSize="5xl">{t("confidentialite.3")}</Heading>
          <Stack>
            <Text textAlign="justify">{t("confidentialite.3-1")}</Text>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
};
