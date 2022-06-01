import { Flex, Heading, Switch } from "@chakra-ui/react";

export const SwitchLetter = ({
  onSwitch,
  letter,
}: {
  onSwitch: () => void;
  letter: "A" | "B";
}) => (
  <Flex alignItems="center">
    <Heading fontSize="lg"> A</Heading>
    <Switch
      isChecked={letter === "B"}
      size="lg"
      onChange={onSwitch}
      marginX={2}
      colorScheme="green"
    />
    <Heading fontSize="lg"> B</Heading>
  </Flex>
);
