import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonProps,
  Flex,
  forwardRef,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  useDimensions,
} from "@chakra-ui/react";
import { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { Team, useTeam } from "../../hooks/useTeam";
import { useTheme } from "../../hooks/useTheme";
import { useUser } from "../../hooks/useUser";
import { useWindowSize } from "../../hooks/useWindowSize";

export const TeamsList = ({
  onSelect,
  options,
  defaultValue,
  isPredraft,
}: {
  onSelect?: (t: any) => void;
  options?: { save?: boolean };
  defaultValue?: Team;
  isPredraft?: boolean;
}) => {
  const { user } = useUser();
  const { theme } = useTheme();
  const { isMobile } = useWindowSize();

  const [team, setTeam, teams] = useTeam(options);

  const defaultSet: any = useRef();
  useEffect(() => {
    if (defaultSet.current === true) return;
    if (defaultValue) {
      if (defaultValue.id !== user.id) {
        setTeam(defaultValue);
        defaultSet.current = true;
      }
    }
  }, [defaultValue]);

  const ref: any = useRef();
  const dimensions = useDimensions(ref);

  const handleSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      let value = parseInt(e.target.value);
      let t = teams.length > value ? teams[value] : teams[0];
      setTeam(t);
      onSelect(t);
    },
    [teams]
  );
  const _onSelect = useCallback(
    (t: Team): void => {
      setTeam(t);
      onSelect(t);
    },
    [onSelect]
  );

  const TeamButton = forwardRef<ButtonProps, "button">((props, ref) => (
    <Button
      disabled={defaultValue && defaultValue.id !== user.id && isPredraft}
      ref={ref}
      {...props}
    />
  ));

  if (isMobile) {
    return (
      <Flex>
        <Select onChange={handleSelect}>
          {teams.map((t, idx) => {
            return (
              <option value={idx} key={`team_list-${t.id}-${idx}`}>
                {t.team_name}
              </option>
            );
          })}
        </Select>
      </Flex>
    );
  }

  return (
    <Flex>
      <Menu matchWidth>
        <MenuButton
          as={TeamButton}
          rightIcon={<ChevronDownIcon />}
          noOfLines={0}
          textAlign="left"
          ref={ref}
        >
          {team.team_name.length < 10
            ? team.team_name
            : team.team_name.slice(0, 9) + ".."}
        </MenuButton>
        <MenuList
          p={0}
          width={(dimensions && dimensions.borderBox.width) || "100px"}
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
              background: theme[100],
              borderRadius: "24px",
            },
          }}
        >
          {teams.map((t, idx) => {
            return (
              <MenuItem
                key={`team_list-${t.id}-${idx}`}
                onClick={() => {
                  _onSelect(t);
                }}
                fontSize="lg"
                fontWeight={600}
                noOfLines={0}
              >
                {t.team_name}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </Flex>
  );
};
