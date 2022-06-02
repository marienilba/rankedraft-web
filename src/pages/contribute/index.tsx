import {
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PageHeading } from "../../components/PageHeading";
import { RiTwitterFill, RiDiscordFill } from "react-icons/ri";
import { useCopyClipboard } from "../../hooks/useCopyClipboard";
import { useWindowSize } from "../../hooks/useWindowSize";

const Index = () => {
  const { t } = useTranslation(["contribute", "common"]);
  const { isMobile } = useWindowSize();

  const [isCopied, copy] = useCopyClipboard({ successDuration: 1000 });
  return (
    <Flex marginY={10} direction="column" w="100%" paddingX={7}>
      <PageHeading>{t("page.contribute", { ns: "common" })}</PageHeading>
      <Divider margin={5} />
      <Stack paddingX={isMobile ? 2 : 7} spacing={8}>
        <Stack>
          <Heading fontSize="3xl">{t("suggests-bold")}</Heading>
          <Text textAlign="justify">{t("suggests-text")}</Text>
          <Text textAlign="justify">{t("suggests-stats-text")}</Text>
        </Stack>
        <Stack>
          <Heading fontSize="3xl">{t("translation-bold")}</Heading>
          <Text textAlign="justify">
            {t("translation-text")}{" "}
            <Link
              isExternal
              href="https://github.com/maelnilba/ranked-draft-web/tree/main/public/locales"
            >
              github
            </Link>
          </Text>
        </Stack>
        <Stack>
          <Heading fontSize="3xl">{t("monetization-bold")}</Heading>
          <Text textAlign="justify">{t("monetization-text")}</Text>
        </Stack>
        <Stack>
          <Heading fontSize="3xl">{t("contacts")}</Heading>
          <Stack direction="row">
            <Link
              href="https://twitter.com/nibounet"
              isExternal
              style={{ textDecoration: "none" }}
            >
              <Button leftIcon={<RiTwitterFill />}>Twitter</Button>
            </Link>
            <Box>
              <Popover
                isOpen={isCopied}
                closeOnBlur
                closeDelay={500}
                closeOnEsc
                matchWidth
              >
                <PopoverTrigger>
                  <Button
                    leftIcon={<RiDiscordFill />}
                    onClick={() => copy("Nib#5952")}
                    colorScheme={isCopied ? "green" : null}
                  >
                    Nib#5952
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  maxWidth="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                  <PopoverArrow />
                  <PopoverBody>{t("copied")}</PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "contribute"])),
    },
  };
}

export default Index;
