import { Flex } from "@chakra-ui/react";

export const Container = ({ children }) => {
  return (
    <Flex mt={10} direction="column" w="100%" paddingX={7}>
      {children}
    </Flex>
  );
};
