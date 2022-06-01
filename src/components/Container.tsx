import { Flex, FlexProps } from "@chakra-ui/react";

export const Container = (props: FlexProps) => (
  <Flex
    direction="column"
    justifyContent="flex-start"
    bg="gray.50"
    color="black"
    _dark={{
      bg: "#000000",
      color: "#E8E9E9",
    }}
    transition="all 0.15s ease-out"
    {...props}
  />
);
