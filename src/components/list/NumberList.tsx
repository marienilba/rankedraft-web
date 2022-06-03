import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Flex,
  useDimensions,
  Select,
  Heading,
} from "@chakra-ui/react";
import { ReactNode, useRef } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useWindowSize } from "../../hooks/useWindowSize";
import { makeAvatarArray } from "../../utils/AvatarIndex";

interface NumberListProps {
  children: ReactNode;
  number: number;
  onSelect: (t: any) => void;
  range: number[];
}

export const NumberList = ({
  children,
  number,
  onSelect,
  range,
}: NumberListProps) => {
  const { code } = useTheme({ invert: true });
  const { isMobile } = useWindowSize();

  const ref: any = useRef();
  const dimensions = useDimensions(ref);

  if (isMobile) {
    return (
      <Flex>
        <Select
          placeholder={children.toString()}
          value={number}
          onChange={(e) =>
            onSelect(e.target.value === children ? 0 : e.target.value)
          }
        >
          {makeAvatarArray(range).map((b, idx) => {
            return (
              <option key={`number_list-${idx}`} value={b}>
                {b}
              </option>
            );
          })}
        </Select>
      </Flex>
    );
  }
  return (
    <Flex direction="row" alignItems="center">
      <Heading fontSize="lg">{children}</Heading>
      <Box marginLeft={2}>
        <Menu matchWidth>
          <MenuButton
            as={Button}
            noOfLines={0}
            textAlign="left"
            rightIcon={<ChevronDownIcon />}
            ref={ref}
          >
            {number}
          </MenuButton>
          <MenuList
            minW="0"
            w={(dimensions && dimensions.borderBox.width) || "66.3px"}
            maxHeight="20vh"
            overflowY="auto"
            css={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: code[300],
                borderRadius: "24px",
              },
            }}
          >
            {makeAvatarArray(range).map((b, idx) => {
              return (
                <MenuItem
                  minH="32px"
                  key={`number_list-${idx}`}
                  onClick={() => onSelect(b)}
                >
                  <Text fontWeight={600}>{b}</Text>
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};
