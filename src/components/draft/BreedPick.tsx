import {
  useControllableState,
  Flex,
  Stack,
  Text,
  Input,
  Image,
  Avatar,
} from "@chakra-ui/react";
import { ChangeEvent, useCallback, useState } from "react";
import { useBreeds } from "../../hooks/useBreeds";
import { useTheme } from "../../hooks/useTheme";
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
  const { backgroundColor, invert } = useTheme({ variant: "secondary" });
  const { isScreen, isPad } = useWindowSize();
  const { translate } = useBreeds();

  const handleEdit = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onEdit(letter, index, { ...pick, mode: e.target.value });
    },
    [letter, index, pick]
  );

  const capitalizeFirstLetter = useCallback((txt) => {
    return txt.charAt(0).toUpperCase() + txt.slice(1);
  }, []);

  const [value, setValue] = useState(pick.mode);

  const [internalValue, setInternalValue] = useControllableState({
    value,
    onChange: setValue,
  });

  const path = pick.breed === 0 ? "placeholder" : Breeds[pick.breed];
  return (
    <Flex>
      <Stack alignItems="center" spacing={2} direction="row">
        <Avatar
          boxSize="3.2rem"
          borderColor={invert[200]}
          borderWidth="1px"
          src={useBreedAvatar(pick.breed)}
          mr={1}
        />
        {(isScreen || isPad) && (
          <Flex
            w="16rem"
            justifyContent="center"
            {...backgroundColor}
            padding={2}
            borderRadius={5}
          >
            <Text fontWeight={600}>
              {path === "placeholder"
                ? ""
                : capitalizeFirstLetter(translate(pick.breed))}
            </Text>
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
