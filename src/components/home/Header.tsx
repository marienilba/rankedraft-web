import { Stack, Flex, Heading } from "@chakra-ui/react";
import { Hero } from "./Hero";

export const Header = () => {
  return (
    <Stack>
      <Flex direction="column">
        <Hero title="RankeDraft" />
        <Flex justifyContent="center" alignItems="center">
          <Heading as="sup" fontSize="xl" textAlign="left" width="50.5%">
            Beta
          </Heading>
        </Flex>
      </Flex>
    </Stack>
  );
};
