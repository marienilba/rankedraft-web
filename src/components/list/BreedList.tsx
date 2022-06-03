import {
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Image,
  useBoolean,
  Input,
  InputGroup,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  useOutsideClick,
  Flex,
  Select,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef } from "react";
import { useBreeds } from "../../hooks/useBreeds";
import useInput from "../../hooks/useInput";
import { useTheme } from "../../hooks/useTheme";
import { useWindowSize } from "../../hooks/useWindowSize";
import { makeAvatarArray } from "../../utils/AvatarIndex";
import { Breeds } from "../../utils/BreedIndex";

interface NumberListProps {
  selected: number;
  onSelect: (t: any) => void;
  placeholder: string;
}

export const BreedList = ({
  selected,
  onSelect,
  placeholder,
}: NumberListProps) => {
  const { theme } = useTheme();

  const [_, setIsOpen] = useBoolean(false);
  const breed = Breeds[selected];
  const capitalizeFirstLetter = useCallback((txt) => {
    return txt.charAt(0).toUpperCase() + txt.slice(1);
  }, []);
  return (
    <Stack direction="row" alignItems="center">
      <Menu matchWidth onOpen={setIsOpen.on} onClose={setIsOpen.off}>
        <MenuButton as={Button}>
          <Stack direction="row" justifyContent="center" alignItems="center">
            {selected !== 0 ? (
              <>
                <Image
                  boxSize="2rem"
                  borderRadius="full"
                  src={`/profile/${breed}.png`}
                  alt={`/profile/${breed}.png`}
                />
                <Heading fontWeight={600} fontSize="md">
                  {capitalizeFirstLetter(breed)}
                </Heading>
              </>
            ) : (
              <>
                <Image
                  boxSize="2rem"
                  borderRadius="full"
                  src={`/profile/default.png`}
                  alt={`/profile/default.png`}
                />
                <Heading fontWeight={600} fontSize="md">
                  {placeholder}
                </Heading>
              </>
            )}
          </Stack>
        </MenuButton>
        <MenuList
          maxHeight="40vh"
          overflowY="auto"
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: theme[300],
              borderRadius: "24px",
            },
          }}
        >
          {makeAvatarArray([0, 18]).map((b, idx) => {
            const breed = Breeds[b];
            return (
              <MenuItem
                minH="32px"
                key={`breeds-${breed}-${idx}`}
                onClick={() => onSelect(b)}
              >
                <Image
                  boxSize="2rem"
                  borderRadius="full"
                  src={`/profile/${breed}.png`}
                  alt={`/profile/${breed}.png`}
                  mr="12px"
                />
                {b !== 0 ? (
                  <Text fontWeight={600}>{capitalizeFirstLetter(breed)}</Text>
                ) : (
                  <Text fontWeight={600}>{placeholder}</Text>
                )}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </Stack>
  );
};

export function AutoCompleteBreed({ placeholder, onSelect, selected }) {
  const { isScreen, isPad, isMobile } = useWindowSize();
  const { backgroundColor, theme } = useTheme();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { translate } = useBreeds();
  const ref: any = useRef();

  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  });

  const capitalizeFirstLetter = useCallback((txt) => {
    return txt.charAt(0).toUpperCase() + txt.slice(1);
  }, []);
  const breedsArr = makeAvatarArray([0, 18]);
  const [input] = useInput();

  const breed = Breeds[selected];

  useEffect(() => {
    if (isOpen) input.onChange("");
  }, [isOpen]);

  if (isMobile) {
    return (
      <Select onChange={(e) => onSelect(e.target.value)} value={selected}>
        {breedsArr.map((b, i) => {
          return (
            <option value={b} key={`select-breed-${placeholder}-${b}`}>
              {b === 0 ? placeholder : capitalizeFirstLetter(translate(b))}
            </option>
          );
        })}
      </Select>
    );
  }
  return (
    <Flex>
      <Popover
        offset={[75, 0]}
        isOpen={isOpen}
        initialFocusRef={ref}
        onOpen={onOpen}
        onClose={onClose}
      >
        <PopoverTrigger>
          {isOpen ? (
            <InputGroup
              alignItems="center"
              paddingX={2}
              borderRadius={5}
              {...backgroundColor}
            >
              <Image
                boxSize="2rem"
                borderRadius="full"
                src={`/profile/${breed}.png`}
                alt={`/profile/${breed}.png`}
                mr="4px"
              />
              <Input
                placeholder={placeholder}
                width="auto"
                ref={ref}
                {...input}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    let filter = breedsArr.filter((b) => {
                      let text = input.value.toLowerCase();
                      const breed = translate(b);
                      if (text.includes("é")) text = text.replaceAll("é", "e");

                      if (breed.startsWith(text)) return true;
                      return false;
                    });

                    if (filter.length > 0) {
                      onSelect(filter[0]);
                      onClose();
                    }
                  }
                }}
              />
            </InputGroup>
          ) : (
            <Button>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Image
                  boxSize="2rem"
                  borderRadius="full"
                  src={`/profile/${breed}.png`}
                  alt={`/profile/${breed}.png`}
                />
                {(isScreen || isPad) && (
                  <Heading fontWeight={600} fontSize="md">
                    {selected === 0
                      ? placeholder
                      : capitalizeFirstLetter(translate(selected))}
                  </Heading>
                )}
              </Stack>
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent maxW="60%">
          <PopoverCloseButton />
          <PopoverBody padding={0}>
            <Stack
              alignItems="center"
              maxHeight="40vh"
              overflowY="auto"
              css={{
                "&::-webkit-scrollbar": {
                  width: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: theme[700],
                  borderRadius: "24px",
                },
              }}
            >
              {breedsArr
                .filter((b) => {
                  let text = input.value.toLowerCase();
                  const breed = Breeds[b];
                  if (text.includes("é")) text = text.replaceAll("é", "e");

                  if (breed.startsWith(text)) return true;
                  return false;
                })
                .map((b, i) => {
                  const breed = Breeds[b];
                  return (
                    <Stack
                      paddingX={3}
                      paddingY={1}
                      key={`list-classe-${i}-${b}`}
                      width="100%"
                      direction="row"
                      alignItems="center"
                      onClick={() => {
                        onSelect(b);
                        onClose();
                      }}
                      _hover={{
                        backgroundColor: theme[200],
                      }}
                    >
                      <Image
                        boxSize="2.5rem"
                        borderRadius="full"
                        src={`/profile/${breed}.png`}
                        alt={`/profile/${breed}.png`}
                      />
                      <Heading fontWeight={600} fontSize="md">
                        {b === 0
                          ? placeholder
                          : capitalizeFirstLetter(translate(b))}
                      </Heading>
                    </Stack>
                  );
                })}
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}
