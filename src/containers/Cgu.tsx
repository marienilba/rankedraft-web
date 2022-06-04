import {
  Wrap,
  Text,
  Divider,
  Flex,
  Heading,
  Link,
  Stack,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { PageHeading } from "../components/PageHeading";
import { useWindowSize } from "../hooks/useWindowSize";
import NextLink from "next/link";
import { Container } from "./Container";

export const Cgu = () => {
  const { t } = useTranslation(["cgu"]);
  const { isMobile } = useWindowSize();

  return (
    <Container>
      <PageHeading>{t("cgu")}</PageHeading>
      <Divider margin={5} />
      <Stack paddingX={isMobile ? 2 : 7}>
        <Heading fontSize="3xl">{t("1")}</Heading>
        <Stack>
          <Heading fontSize="xl">1.1</Heading>
          <Wrap>
            <Text textAlign="justify">{t("1.1")}</Text>
          </Wrap>
          <Heading fontSize="xl">1.2</Heading>
          <Wrap>
            <Text textAlign="justify">{t("1.2")} </Text>
            <NextLink href="/confidentialite" passHref>
              <Link>{t("policy")}</Link>
            </NextLink>
          </Wrap>
        </Stack>
        <Heading fontSize="3xl">{t("2")}</Heading>
        <Stack>
          <Heading fontSize="xl">2.1</Heading>
          <Wrap>
            <Text textAlign="justify">{t("2.1")}</Text>
          </Wrap>
        </Stack>
        <Heading fontSize="3xl">{t("3")}</Heading>
        <Stack>
          <Heading fontSize="xl">3.1</Heading>
          <Wrap>
            <Text textAlign="justify">{t("3.1")}</Text>
          </Wrap>
          <Heading fontSize="xl">3.2</Heading>
          <Wrap>
            <Text textAlign="justify">{t("3.2")}</Text>
          </Wrap>
          <Heading fontSize="xl">3.3</Heading>
          <Wrap>
            <Text textAlign="justify">{t("3.3")}</Text>
          </Wrap>
          <Heading fontSize="xl">3.4</Heading>
          <Wrap>
            <Text textAlign="justify">{t("3.4")}</Text>
          </Wrap>
          <Heading fontSize="xl">3.5</Heading>
          <Wrap>
            <Text textAlign="justify">{t("3.4")}</Text>
          </Wrap>
        </Stack>
        <Heading fontSize="3xl">{t("4")}</Heading>
        <Stack>
          <Heading fontSize="xl">4.1</Heading>
          <Wrap>
            <Text textAlign="justify">{t("4.1")}</Text>
          </Wrap>
          <Wrap>
            <Text textAlign="justify">{t("4.2")}</Text>
          </Wrap>
        </Stack>
        <Heading fontSize="3xl">{t("5")}</Heading>
        <Stack>
          <Heading fontSize="xl">5.1</Heading>
          <Wrap>
            <Text textAlign="justify">{t("5.1")}</Text>
          </Wrap>
          <Heading fontSize="xl">5.2</Heading>
          <Wrap>
            <Text textAlign="justify">{t("5.2")}</Text>
          </Wrap>
          <Heading fontSize="xl">5.3</Heading>
          <Wrap>
            <Text textAlign="justify">{t("5.3")}</Text>
          </Wrap>
          <Heading fontSize="xl">5.4</Heading>
          <Wrap>
            <Text textAlign="justify">{t("5.4")}</Text>
          </Wrap>
        </Stack>
      </Stack>
    </Container>
  );
};
