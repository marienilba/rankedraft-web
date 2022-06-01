import {
  useControllableState,
  Flex,
  Stack,
  Button,
  Input,
  Image,
} from "@chakra-ui/react";
import { ChangeEvent, useCallback, useState } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Breeds, useBreedAvatar } from "../../utils/BreedIndex";

type BreedPickProps = {
  pick: { breed: number; mode: string };
  letter: "A" | "B";
  index: number;
  onEdit: (
    letter: string,
    index: number,
    pick: {
      breed: number;
      mode: string;
    }
  ) => void;
};

export const BreedPick = ({ pick, onEdit, letter, index }: BreedPickProps) => {
  const { isScreen, isPad } = useWindowSize();

  const handleEdit = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onEdit(letter, index, { ...pick, mode: e.target.value });
    },
    [letter, index, pick]
  );

  const [value, setValue] = useState(pick.mode);

  const [internalValue, setInternalValue] = useControllableState({
    value,
    onChange: setValue,
  });

  const path = pick.breed === 0 ? "placeholder" : Breeds[pick.breed];
  return (
    <Flex>
      <Stack alignItems="center" spacing={2} direction="row">
        <Image
          boxSize="2.5rem"
          borderRadius="full"
          src={useBreedAvatar(pick.breed)}
          alt={`breed-${pick.breed}`}
          mr="12px"
        />
        {(isScreen || isPad) && (
          <Flex as={Button}>
            {path === "placeholder"
              ? ""
              : path.charAt(0).toUpperCase() + path.slice(1)}
          </Flex>
        )}

        <Flex>
          <Input
            placeholder="Mode"
            value={internalValue as string}
            onChange={(e) => {
              handleEdit(e);
              setInternalValue(e.target.value);
            }}
          />
        </Flex>
      </Stack>
    </Flex>
  );
};
