import { Flex, Image } from "@chakra-ui/react";
import { useBreedAvatar } from "../../utils/BreedIndex";

export const BreedBan = ({ ban }: { ban: number }) => {
  return (
    <Flex>
      <Image
        boxSize="2.5rem"
        borderRadius="full"
        src={useBreedAvatar(ban)}
        alt={`breed-${ban}`}
        mr="12px"
      />
    </Flex>
  );
};
