import { ArrowBackIcon } from "@chakra-ui/icons";
import { Flex, Spacer, Box, Img, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { zIndexPriority } from "../../utils/Constants";

export const MobileBar = ({ onOpen }) => {
  const { pathname, back } = useRouter();
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Flex position="absolute" h="100%">
      <Flex
        sx={{
          position: "sticky",
          top: "0",
          ...zIndexPriority.MobileBarBackground,
        }}
        h="53.5px"
        alignItems="center"
      >
        <Flex
          w="100vw"
          sx={{ ...zIndexPriority.MobileBarLogo }}
          paddingX="12px"
        >
          <>
            {pathname === "/" && (
              <>
                <Box
                  boxSize="36px"
                  onClick={onOpen}
                  borderRadius={50}
                  _hover={{
                    cursor: "pointer",
                  }}
                >
                  <Img src={"/icons/sword.png"} />
                </Box>
                <Spacer />
              </>
            )}
          </>
          {pathname !== "/" && (
            <>
              <ArrowBackIcon onClick={back} fontSize="32px" />
              <Spacer />
              <Box
                boxSize="36px"
                onClick={onOpen}
                borderRadius={50}
                _hover={{
                  cursor: "pointer",
                }}
              >
                <Img src={"/icons/sword.png"} />
              </Box>
            </>
          )}
        </Flex>
        <Flex
          w="100vw"
          h="53.5px"
          position="absolute"
          sx={{
            backgroundColor: isDark ? "#14171A7d" : "#F5F8FA7d",
            opacity: "0.99",
            border: "0 solid black",
            backdropFilter: "blur(20px)",
            backgroundBlendMode: "overlay",
          }}
        ></Flex>
      </Flex>
    </Flex>
  );
};
