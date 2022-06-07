import {
  Button,
  Flex,
  Avatar,
  Box,
  Text,
  Textarea,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { HistoryLine as Draft } from "../../queries/History";
import { useTheme } from "../../hooks/useTheme";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Composition } from "./Composition";

export const HistoryLine = ({
  draft,
  onOpen,
  isFullwidth,
}: {
  draft: Draft;
  onOpen?: (d: Draft) => void;
  isFullwidth?: boolean;
}) => {
  const {
    result,
    comments,
    opp_name,
    opp_logo,
    is_kta,
    letter,
    compoA,
    compoB,
  } = draft;

  const { backgroundColor, theme } = useTheme();
  const { isScreen, isPad, isMobile } = useWindowSize();

  const openDraft = () => {
    onOpen(draft);
  };

  const color = result ? (result === "W" ? "green.200" : "red.200") : null;

  return (
    <Button
      height="auto"
      borderWidth={is_kta ? "2px" : "0px"}
      borderColor={is_kta ? "green.400" : null}
      justifyContent="flex-start"
      onClick={openDraft}
    >
      <Wrap align="center" justify="center" padding={1}>
        {!isMobile && (
          <WrapItem
            width="60px"
            height="3.5rem"
            justifyContent="center"
            alignItems="center"
            borderRadius={5}
            bgColor={color ?? theme[100]}
          >
            <Text textAlign="center" fontSize="2xl">
              {result ? (result === "W" ? "👑" : "💀") : " "}
            </Text>
          </WrapItem>
        )}

        <WrapItem alignItems="center">
          {isScreen && (
            <Flex width="60px">
              <Avatar
                size="md"
                src={opp_logo ? opp_logo : "/profile/placeholder.png"}
                bg="transparent"
                ignoreFallback
              />
            </Flex>
          )}

          <Flex width="100px" justifyContent="center">
            <Text fontWeight={700} noOfLines={0}>
              {opp_name}
            </Text>
          </Flex>
        </WrapItem>
        <WrapItem>
          <Composition breeds={letter === "A" ? compoA : compoB} />
          {isScreen && (
            <Flex w="40px" h="40px" justifyContent="center">
              <Box w="4px" {...backgroundColor} borderRadius="full"></Box>
            </Flex>
          )}
          {isPad && (
            <Flex w="10px" h="40px" marginX="5px" justifyContent="center">
              <Box w="4px" {...backgroundColor} borderRadius="full"></Box>
            </Flex>
          )}
          {isMobile && (
            <Flex
              w="10px"
              h="40px"
              marginX="5px"
              justifyContent="center"
            ></Flex>
          )}
          <Composition breeds={letter === "A" ? compoB : compoA} />
        </WrapItem>

        {isScreen && (
          <Flex w="40px" h="40px" justifyContent="center">
            <Box w="4px" {...backgroundColor} borderRadius="full"></Box>
          </Flex>
        )}
        {isFullwidth && comments ? (
          <Flex w="27rem">
            <Textarea
              fontWeight={400}
              isDisabled
              variant="unstyled"
              width="100%"
            >
              {comments}
            </Textarea>
          </Flex>
        ) : (
          <Flex w="27rem">
            <Text fontWeight={400}>{comments}</Text>
          </Flex>
        )}
      </Wrap>
    </Button>
  );
};
