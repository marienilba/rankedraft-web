import { Stack, Flex, Heading } from "@chakra-ui/react";
import { Hero } from "./Hero";

export const Header = () => {
  return (
    <Stack>
      <Flex justifyContent="center" alignItems="center" direction="column">
        <Flex direction="column">
          <Hero title="RankeDraft" />
          <Heading as="sup" fontSize="xl" textAlign="left">
            Beta
          </Heading>
        </Flex>
      </Flex>
    </Stack>
  );
};
