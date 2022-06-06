import {
  Wrap,
  Text,
  Flex,
  Heading,
  Link,
  Stack,
  Box,
  AspectRatio,
  Img,
  Divider,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useWindowSize } from "../hooks/useWindowSize";
import NextLink from "next/link";
import { useTheme } from "../hooks/useTheme";
import { useScroll } from "../hooks/useScroll";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { LogoButton } from "../components/navigation/LogoButton";
import { motion } from "framer-motion";

export const Tos = () => {
  const { t } = useTranslation(["tos"]);
  const { isMobile, isPad, isScreen } = useWindowSize();
  const { code } = useTheme();
  const [readPart, setReadPart] = useState<number>(1);
  const [ref1, scrollTo1] = useScroll({ offsetTop: 80 });
  const [ref2, scrollTo2] = useScroll({ offsetTop: 80 });
  const [ref3, scrollTo3] = useScroll({ offsetTop: 80 });
  const [ref4, scrollTo4] = useScroll({ offsetTop: 80 });
  const [ref5, scrollTo5] = useScroll({ offsetTop: 80 });
  const { ref: inViewRef1, inView: inView1 } = useInView({
    initialInView: true,
  });
  const { ref: inViewRef2, inView: inView2 } = useInView({
    initialInView: true,
  });
  const { ref: inViewRef3, inView: inView3 } = useInView();
  const { ref: inViewRef4, inView: inView4 } = useInView();
  const { ref: inViewRef5, inView: inView5 } = useInView();
  const { ref: ImageInViewRef, inView: ImageInView } = useInView({
    initialInView: true,
  });

  useEffect(() => {
    if (inView5) {
      setReadPart(5);
      return;
    }
    if (readPart === 1 && !inView1) {
      setReadPart(2);
    } else if (readPart === 2 && !inView2) {
      setReadPart(3);
    } else if (readPart === 3 && !inView3) {
      setReadPart(4);
    } else if (readPart === 4 && !inView4) {
      setReadPart(5);
    } else if (readPart === 5 && inView4) {
      setReadPart(4);
    } else if (readPart === 4 && inView3) {
      setReadPart(3);
    } else if (readPart === 3 && inView2) {
      setReadPart(2);
    } else if (readPart === 2 && inView1) {
      setReadPart(1);
    }
  }, [inView1, inView2, inView3, inView4, inView5]);

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
              {t("tos")}
            </Heading>
          </motion.div>
        </Box>

        <Box paddingTop={10} paddingBottom={6} visibility="hidden">
          <Box height="2rem"></Box>
        </Box>
        <Box position="relative" ref={ImageInViewRef}>
          <Box>
            <AspectRatio maxW="100vw" ratio={isMobile ? 400 / 279 : 400 / 93}>
              <Img src="/assets/tos.jpeg" alt="Tos banner" objectFit="cover" />
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
              {t("tos")}
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
                1. {t("1")}
              </Heading>
              <Heading
                fontSize="lg"
                cursor="pointer"
                onClick={scrollTo2}
                as={readPart === 2 ? "u" : null}
              >
                2. {t("2")}
              </Heading>
              <Heading
                fontSize="lg"
                cursor="pointer"
                onClick={scrollTo3}
                as={readPart === 3 ? "u" : null}
              >
                3. {t("3")}
              </Heading>
              <Heading
                fontSize="lg"
                cursor="pointer"
                onClick={scrollTo4}
                as={readPart === 4 ? "u" : null}
              >
                4. {t("4")}
              </Heading>{" "}
              <Heading
                fontSize="lg"
                cursor="pointer"
                onClick={scrollTo5}
                as={readPart === 5 ? "u" : null}
              >
                5. {t("5")}
              </Heading>
            </Stack>
            <Divider orientation="vertical" />
          </Flex>
        )}
        <Flex flex={1.5} justifyContent="center">
          <Flex paddingX={isMobile ? 4 : 7} width="100%" direction="column">
            <Box ref={inViewRef1} marginBottom={8}>
              <Heading fontSize="5xl" marginBottom={6}>
                {t("1")}
              </Heading>
              <Stack ref={ref1}>
                <Heading fontSize="xl">1.1</Heading>
                <Wrap>
                  <Text textAlign="justify">{t("1.1")}</Text>
                </Wrap>
                <Heading fontSize="xl">1.2</Heading>
                <Wrap>
                  <Text textAlign="justify">{t("1.2")} </Text>
                  <NextLink href="/privacy" passHref>
                    <Link color="twitter.700">{t("policy")}</Link>
                  </NextLink>
                </Wrap>
              </Stack>
            </Box>
            <Box ref={inViewRef2} marginY={8}>
              <Heading fontSize="5xl" marginBottom={6}>
                {t("2")}
              </Heading>
              <Stack ref={ref2}>
                <Heading fontSize="xl">2.1</Heading>
                <Wrap>
                  <Text textAlign="justify">{t("2.1")}</Text>
                </Wrap>
              </Stack>
            </Box>
            <Box ref={inViewRef3} marginY={8}>
              <Heading fontSize="5xl" marginBottom={6}>
                {t("3")}
              </Heading>
              <Stack ref={ref3}>
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
            </Box>
            <Box ref={inViewRef4} marginY={8}>
              <Heading fontSize="5xl" marginBottom={6}>
                {t("4")}
              </Heading>
              <Stack ref={ref4}>
                <Heading fontSize="xl">4.1</Heading>
                <Wrap>
                  <Text textAlign="justify">{t("4.1.1")}</Text>
                </Wrap>
                <Wrap>
                  <Text textAlign="justify">{t("4.1.2")}</Text>
                </Wrap>
              </Stack>
            </Box>
            <Box marginY={8}>
              <Heading fontSize="5xl" marginBottom={6}>
                {t("5")}
              </Heading>
              <Stack ref={ref5}>
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
            </Box>
            <Box marginTop={14}>
              <Box ref={inViewRef5}></Box>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
