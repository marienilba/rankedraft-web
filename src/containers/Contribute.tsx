import {
  Box,
  Text,
  Divider,
  Flex,
  Heading,
  Stack,
  AspectRatio,
  Img,
  Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { LogoButton } from "../components/navigation/LogoButton";
import { useScroll } from "../hooks/useScroll";
import { useTheme } from "../hooks/useTheme";
import { useWindowSize } from "../hooks/useWindowSize";

export const Contribute = () => {
  const { t } = useTranslation(["contribute", "common"]);
  const { isMobile, isScreen, isPad } = useWindowSize();
  const { code } = useTheme();
  const [readPart, setReadPart] = useState<number>(1);
  const [ref1, scrollTo1] = useScroll({ offsetTop: 80 });
  const [ref2, scrollTo2] = useScroll({ offsetTop: 80 });
  const [ref3, scrollTo3] = useScroll({ offsetTop: 80 });
  const [ref4, scrollTo4] = useScroll({ offsetTop: 80 });
  const { ref: inViewRef1, inView: inView1 } = useInView({
    initialInView: true,
  });
  const { ref: inViewRef2, inView: inView2 } = useInView({
    initialInView: true,
  });
  const { ref: inViewRef3, inView: inView3 } = useInView();
  const { ref: inViewRef4, inView: inView4 } = useInView();
  const { ref: ImageInViewRef, inView: ImageInView } = useInView({
    initialInView: true,
  });
  useEffect(() => {
    if (inView4) {
      setReadPart(4);
      return;
    }
    if (readPart === 1 && !inView1) {
      setReadPart(2);
    } else if (readPart === 2 && !inView2) {
      setReadPart(3);
    } else if (readPart === 3 && !inView3) {
      setReadPart(4);
    } else if (readPart === 4 && inView3) {
      setReadPart(3);
    } else if (readPart === 3 && inView2) {
      setReadPart(2);
    } else if (readPart === 2 && inView1) {
      setReadPart(1);
    }
  }, [inView1, inView2, inView3, inView4]);

  return (
    <Flex direction="column" width="100%">
      <Flex direction="column">
        <Box
          style={{
            display: "flex",
            top: 0,
            position: "fixed",
            width: "100%",
            backgroundColor: code[100],
            paddingLeft: "4vw",
            paddingTop: "0.8rem",
            paddingBottom: "1rem",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <motion.div
            initial={false}
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "1.8rem",
            }}
            animate={
              isScreen
                ? {
                    marginTop: "1.8rem",
                  }
                : {
                    marginTop: !ImageInView ? "0rem" : "1.8rem",
                  }
            }
            transition={{ type: "tween", duration: 0.4 }}
          >
            <LogoButton />
            <Heading ml="1" fontSize={isMobile ? "1rem" : "2xl"}>
              {t("page.contribute", { ns: "common" })}
            </Heading>
          </motion.div>
        </Box>
        <Box paddingTop={10} paddingBottom={6} visibility="hidden">
          <Box height="2rem"></Box>
        </Box>
        <Box position="relative" ref={ImageInViewRef}>
          <Box>
            <AspectRatio maxW="100vw" ratio={isMobile ? 400 / 279 : 400 / 93}>
              <Img
                src="/assets/contribute.jpeg"
                alt="Policy banner"
                objectFit="cover"
              />
            </AspectRatio>
          </Box>
          <Box
            position="absolute"
            top="50%"
            left={isMobile ? "0.5rem" : "2.5rem"}
          >
            <Heading
              color="brand.100"
              size="3xl"
              textShadow="2px 0 12px rgba(0,0,0,0.1), -2px 0 12px rgba(0,0,0,0.1), 0 2px 12px rgba(0,0,0,0.1), 0 -2px 12px rgba(0,0,0,0.1), 1px 1px 12px rgba(0,0,0,0.1), -1px -1px 12px rgba(0,0,0,0.1), 1px -1px 12px rgba(0,0,0,0.1), -1px 1px 12px rgba(0,0,0,0.1)"
            >
              {t("contribute")}
            </Heading>
          </Box>
        </Box>
      </Flex>
      <Flex marginTop={10}>
        {!isMobile && (
          <Flex flex={isPad ? 1 : 0.5} justifyContent="flex-end">
            <Stack
              spacing={2}
              marginRight={7}
              position="sticky"
              top="140px"
              height="200px"
            >
              <Heading
                fontSize="lg"
                cursor="pointer"
                onClick={scrollTo1}
                as={readPart === 1 ? "u" : null}
              >
                1. {t("suggests")}
              </Heading>
              <Heading
                fontSize="lg"
                cursor="pointer"
                onClick={scrollTo2}
                as={readPart === 2 ? "u" : null}
              >
                2. {t("translation")}
              </Heading>
              <Heading
                fontSize="lg"
                cursor="pointer"
                onClick={scrollTo3}
                as={readPart === 3 ? "u" : null}
              >
                3. {t("monetization")}
              </Heading>
              <Heading
                fontSize="lg"
                cursor="pointer"
                onClick={scrollTo4}
                as={readPart === 3 ? "u" : null}
              >
                4. {t("contacts")}
              </Heading>
            </Stack>
            <Divider orientation="vertical" />
          </Flex>
        )}
        <Flex flex={1.5} justifyContent="center">
          <Flex paddingX={isMobile ? 4 : 7} width="100%" direction="column">
            <Box marginBottom={8} ref={inViewRef1}>
              <Heading fontSize="5xl" marginBottom={6}>
                {t("suggests")}
              </Heading>
              <Stack ref={ref1}>
                <Text textAlign="justify">{t("suggests-text")}</Text>
                <Text textAlign="justify">{t("suggests-stats-text")}</Text>
              </Stack>
            </Box>
            <Box marginY={8} ref={inViewRef2}>
              <Heading fontSize="5xl" marginBottom={6}>
                {t("translation")}
              </Heading>{" "}
              <Stack ref={ref2}>
                <Text textAlign="justify">
                  {t("translation-text")}{" "}
                  <Link
                    color="twitter.700"
                    isExternal
                    href="https://github.com/maelnilba/rankedraft-web"
                  >
                    Github
                  </Link>
                </Text>
              </Stack>
            </Box>
            <Box marginY={8} ref={inViewRef3}>
              <Heading fontSize="5xl" marginBottom={6}>
                {t("monetization")}
              </Heading>
              <Stack ref={ref3}>
                <Text textAlign="justify">{t("monetization-text")}</Text>
                <Text textAlign="justify">
                  {t("monetization-donation")}{" "}
                  <Link
                    color="twitter.700"
                    isExternal
                    href="https://www.peachpay.me/nib"
                  >
                    Peachpay
                  </Link>{" "}
                  (U ᵕ U❁)
                </Text>
              </Stack>
            </Box>
            <Box marginY={8}>
              <Heading fontSize="5xl" marginBottom={6}>
                {t("contacts")}
              </Heading>
              <Stack ref={ref4}>
                <Text textAlign="justify">{t("contacts-text")} </Text>
              </Stack>
              <Stack ref={ref4}>
                <Text textAlign="justify">
                  {t("contacts-social-text")}{" "}
                  <Link
                    color="twitter.700"
                    isExternal
                    href="https://twitter.com/nibounet"
                  >
                    Twitter
                  </Link>{" "}
                  {t("linking.or", { ns: "common" })}{" "}
                  <Link
                    color="twitter.700"
                    isExternal
                    href="https://discordapp.com/users/254731999346950144"
                  >
                    Discord
                  </Link>
                </Text>
              </Stack>
            </Box>
            <Box marginTop={14}>
              <Box ref={inViewRef4}></Box>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
