import { Flex } from "@chakra-ui/react";

export const Container = ({ children }) => {
  return (
    <Flex pt={10} direction="column" w="100%" paddingX={7} minHeight="100vh">
      {children}
    </Flex>
  );
};
