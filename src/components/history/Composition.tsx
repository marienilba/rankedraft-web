import { Stack, Image } from "@chakra-ui/react";
import { Breeds, useBreedAvatar } from "../../utils/BreedIndex";

export const Composition = ({ breeds }: { breeds: number[] }) => {
  const [breed_1, breed_2, breed_3] = breeds;
  return (
    <Stack direction="row">
      <Image
        boxSize="2.5rem"
        borderRadius="full"
        src={useBreedAvatar(breed_1)}
        alt={`Classe ${Breeds[breed_1]}`}
      />
      <Image
        boxSize="2.5rem"
        borderRadius="full"
        src={useBreedAvatar(breed_2)}
        alt={`Classe ${Breeds[breed_2]}`}
      />
      <Image
        boxSize="2.5rem"
        borderRadius="full"
        src={useBreedAvatar(breed_3)}
        alt={`Classe ${Breeds[breed_3]}`}
      />
    </Stack>
  );
};
