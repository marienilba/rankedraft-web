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
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { LogoButton } from "../components/navigation/LogoButton";
import { useScroll } from "../hooks/useScroll";
import { useTheme } from "../hooks/useTheme";
import { useWindowSize } from "../hooks/useWindowSize";

export const Privacy = () => {
  const { t } = useTranslation(["tos"]);
  const { isMobile, isScreen, isPad } = useWindowSize();
  const { code } = useTheme();

  const [readPart, setReadPart] = useState<number>(1);
  const [ref1, scrollTo1] = useScroll({ offsetTop: 80 });
  const [ref2, scrollTo2] = useScroll({ offsetTop: 80 });
  const [ref3, scrollTo3] = useScroll({ offsetTop: 80 });
  const { ref: inViewRef1, inView: inView1 } = useInView({
    initialInView: true,
  });
  const { ref: inViewRef2, inView: inView2 } = useInView({
    initialInView: true,
  });
  const { ref: inViewRef3, inView: inView3 } = useInView();
  const { ref: ImageInViewRef, inView: ImageInView } = useInView({
    initialInView: true,
  });

  useEffect(() => {
    if (inView3) {
      setReadPart(3);
      return;
    }
    if (readPart === 1 && !inView1) {
      setReadPart(2);
    } else if (readPart === 2 && !inView2) {
      setReadPart(3);
    } else if (readPart === 3 && inView2) {
      setReadPart(2);
    } else if (readPart === 2 && inView1) {
      setReadPart(1);
    }
  }, [inView1, inView2, inView3]);

  return (
    <Flex direction="column" width="100% marginBottom={6}">
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
              {t("policy")}
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
                src="/assets/policy.jpeg"
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
              {t("policy")}
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
                1. {t("confidentialite.1")}
              </Heading>
              <Heading
                fontSize="lg"
                cursor="pointer"
                onClick={scrollTo2}
                as={readPart === 2 ? "u" : null}
              >
                2. {t("confidentialite.2")}
              </Heading>
              <Heading
                fontSize="lg"
                cursor="pointer"
                onClick={scrollTo3}
                as={readPart === 3 ? "u" : null}
              >
                3. {t("confidentialite.3")}
              </Heading>
            </Stack>
            <Divider orientation="vertical" />
          </Flex>
        )}

        <Flex flex={1.5} justifyContent="center">
          <Flex paddingX={isMobile ? 4 : 7} width="100%" direction="column">
            <Box marginBottom={8} ref={inViewRef1}>
              <Heading fontSize="5xl" marginBottom={6}>
                {t("confidentialite.1")}
              </Heading>
              <Stack ref={ref1}>
                <Text textAlign="justify">{t("confidentialite.1-1")}</Text>
              </Stack>
            </Box>
            <Box marginY={8} ref={inViewRef2}>
              <Heading fontSize="5xl" marginBottom={6}>
                {t("confidentialite.2")}
              </Heading>
              <Stack ref={ref2}>
                <Text textAlign="justify">{t("confidentialite.2-1")}</Text>
              </Stack>
            </Box>
            <Box marginY={8}>
              <Heading fontSize="5xl" marginBottom={6}>
                {t("confidentialite.3")}
              </Heading>
              <Stack ref={ref3}>
                <Text textAlign="justify">{t("confidentialite.3-1")}</Text>
              </Stack>
            </Box>
            <Box marginTop={14}>
              <Box ref={inViewRef3}></Box>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
