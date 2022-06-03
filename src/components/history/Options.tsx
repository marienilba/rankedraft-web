import { Search2Icon, DeleteIcon, CalendarIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  useBoolean,
  Flex,
  Spacer,
  IconButton,
  Collapse,
  Stack,
  Heading,
  Box,
  Switch,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {
  useState,
  useEffect,
  useCallback,
  useTransition,
  useReducer,
} from "react";
import { IoFilterSharp } from "react-icons/io5";
import { useSimpleCompo } from "../../hooks/useCompo";
import useDateInput from "../../hooks/useDateInput";
import useInput from "../../hooks/useInput";
import { useTripleToggle } from "../../hooks/useTripleToggle";
import { AutoCompleteBreed } from "../list/AutoCompleteBreed";
import { NumberList } from "../list/NumberList";
import { Options as OptionsType } from "../../queries/History";
import { AddHistorique } from "./AddHistorique";
import { ViewStatistique } from "./ViewStatistique";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useTranslation } from "next-i18next";

const ResultReducer = (
  state: "" | "W" | "L",
  action: { type: "win" | "lose" | "reset" }
) => {
  switch (action.type) {
    case "win":
      return state === "W" ? "" : "W";
    case "lose":
      return state === "L" ? "" : "L";
    case "reset":
      return "";
    default:
      return "";
  }
};

export const Options = ({
  onSearch,
  isFetching,
}: {
  onSearch: (o: OptionsType, s: any, f?: boolean) => void;
  isFetching: boolean;
}) => {
  const { t } = useTranslation(["history", "common"]);
  const { isOpen: isOptionsOpen, onToggle: onToggleOptions } = useDisclosure();
  const { isOpen: isSearchOpen, onToggle: onToggleSearch } = useDisclosure();
  const { isMobile } = useWindowSize();
  const [pseudo] = useInput("");
  const [tags] = useInput("");
  const [mapId, setMapId] = useState(0);
  const [result, dispatchResult] = useReducer(ResultReducer, "");
  const [myLetter, toggleLetter] = useTripleToggle(0);
  const [isKTA, toggleIsKTA] = useTripleToggle(1);
  const [initiative, toggleInitiative] = useTripleToggle(1);
  const [startInputDate, startDate, setStartDate] = useDateInput("");
  const [endInputDate, endDate, setEndDate] = useDateInput("");
  const [compo, setCompo, resetCompo] = useSimpleCompo();
  const [respectOrder, setRespectOrder] = useBoolean(false);
  const [includeOptions, setIncludeOptions] = useBoolean(true);
  const [respectCompo, setRespectCompo] = useBoolean(false);
  const [team, setTeam] = useState({ id: "", name: "" });

  const [_, startTransition] = useTransition();

  const isDoublon = (comp: number[][]) => {
    let br = [];
    for (const t of comp) {
      for (const b of t) {
        if (b !== 0 && br.includes(b)) return false;
        br.push(b);
      }
    }
    return true;
  };

  const isCompValid = (comp: number[][]) => {
    let c = 2;
    for (const t of comp) {
      let count = 0;
      for (const b of t) {
        if (b !== 0) count++;
      }
      if (count < 1) c--;
    }
    if (c < 1) return false;
    return isDoublon(comp);
  };

  const _options = useCallback(() => {
    const start_date = startDate
      ? parseInt(
          (
            new Date(
              startInputDate.replace(/(\d+[/])(\d+[/])/, "$2$1")
            ).getTime() / 1000
          ).toFixed(0)
        )
      : null;
    const end_date = endDate
      ? parseInt(
          (
            new Date(
              endInputDate.replace(/(\d+[/])(\d+[/])/, "$2$1")
            ).getTime() / 1000
          ).toFixed(0)
        )
      : null;

    const opts: OptionsType = {
      team_id: team.id ? team.id : null,
      pseudo: !includeOptions
        ? null
        : pseudo.value === ""
        ? null
        : pseudo.value,
      tags: !includeOptions ? null : tags.value === "" ? null : tags.value,
      map_id: !includeOptions ? null : mapId === 0 ? null : mapId,
      result: !includeOptions ? null : result === "" ? null : result,
      letter: !includeOptions
        ? null
        : myLetter === 0
        ? null
        : myLetter === 1
        ? "A"
        : "B",
      is_kta: !includeOptions
        ? null
        : isKTA === 1
        ? null
        : isKTA === 0
        ? true
        : false,
      initiative: !includeOptions ? null : initiative === 1 ? null : initiative,
      start_date: !includeOptions ? null : start_date ? start_date : null,
      end_date: !includeOptions ? null : end_date ? end_date : null,
    };
    return opts;
  }, [
    includeOptions,
    startDate,
    endDate,
    team,
    pseudo,
    mapId,
    result,
    myLetter,
    isKTA,
    initiative,
  ]);

  const _search = useCallback(() => {
    const sch = {
      compo: !isSearchOpen ? null : isCompValid(compo) ? compo : null,
      respect_order: isCompValid(compo) ? respectOrder : null,
      respect_compo: isCompValid(compo) ? respectCompo : null,
    };
    return sch;
  }, [isSearchOpen, compo, respectOrder, respectCompo]);

  const handleSearch = () => {
    onSearch(_options(), _search());
  };

  useEffect(() => {
    onSearch(_options(), _search());
  }, [team]);

  const handleReset = useCallback(() => {
    pseudo.onChange("");
    tags.onChange("");
    setMapId(0);
    dispatchResult({ type: "reset" });
    toggleLetter(0);
    toggleIsKTA(1);
    toggleInitiative(1);
    setStartDate("");
    setEndDate("");
    resetCompo();
    setRespectOrder.off();
    setIncludeOptions.on();
    setRespectCompo.off();
    const opts = {
      team_id: team.id ? team.id : null,
      pseudo: null,
      map_id: null,
      result: null,
      letter: null,
      is_kta: null,
      initiative: null,
      start_date: null,
      end_date: null,
      tags: null,
    };
    const sch = {
      compo: null,
      respect_order: null,
      respect_compo: null,
    };
    onSearch(opts, sch, true);
  }, [team, onSearch]);

  const handleResult = (r: "" | "L" | "W") => {
    startTransition(() => {
      let type: "win" | "lose" | "reset" =
        r === "W" ? "win" : r === "L" ? "lose" : "reset";
      dispatchResult({ type });
    });
  };

  return (
    <>
      <Wrap padding={1}>
        <AddHistorique onSelect={(t) => setTeam(t)} />
        <Spacer />
        <ViewStatistique
          options={_options()}
          search={_search()}
          isFetching={isFetching}
        />
        {isMobile && <Spacer />}
        <IconButton
          aria-label="Search"
          icon={<Search2Icon />}
          marginRight={2}
          marginLeft={10}
          onClick={onToggleSearch}
        />
        <IconButton
          aria-label="Filter"
          icon={<IoFilterSharp />}
          onClick={onToggleOptions}
        />
      </Wrap>
      <Collapse in={isSearchOpen} animateOpacity>
        <Flex direction="column">
          <Wrap align="center" justify="center" spacingX={5}>
            <WrapItem padding={1}>
              <Stack>
                <Heading textAlign="center" fontSize="md">
                  {respectCompo
                    ? `${t("pronoun.my", { ns: "common" })} ${t("compo")}`
                    : `${t("composition")} 1`}
                </Heading>
                <Stack direction="row">
                  <AutoCompleteBreed
                    placeholder={t("breed", { b: 1 })}
                    selected={compo[0][0]}
                    onSelect={(b) => {
                      setCompo("A", 0, b);
                    }}
                  />

                  <AutoCompleteBreed
                    selected={compo[0][1]}
                    onSelect={(b) => {
                      setCompo("A", 1, b);
                    }}
                    placeholder={t("breed", { b: 2 })}
                  />
                  <AutoCompleteBreed
                    selected={compo[0][2]}
                    onSelect={(b) => {
                      setCompo("A", 2, b);
                    }}
                    placeholder={t("breed", { b: 3 })}
                  />
                </Stack>
              </Stack>
            </WrapItem>
            <WrapItem>
              <Stack>
                <Heading textAlign="center" fontSize="md">
                  {respectCompo
                    ? `${t("pronoun.their", { ns: "common" })} ${t("compo")}`
                    : `${t("composition")} 2`}
                </Heading>
                <Stack direction="row">
                  <AutoCompleteBreed
                    selected={compo[1][0]}
                    onSelect={(b) => {
                      setCompo("B", 0, b);
                    }}
                    placeholder={t("breed", { b: 1 })}
                  />
                  <AutoCompleteBreed
                    selected={compo[1][1]}
                    onSelect={(b) => {
                      setCompo("B", 1, b);
                    }}
                    placeholder={t("breed", { b: 2 })}
                  />
                  <AutoCompleteBreed
                    selected={compo[1][2]}
                    onSelect={(b) => {
                      setCompo("B", 2, b);
                    }}
                    placeholder={t("breed", { b: 3 })}
                  />
                </Stack>
              </Stack>
            </WrapItem>
          </Wrap>
          <Wrap spacing={2} padding={1} mt={5}>
            <Stack direction="row" alignItems="center">
              <Flex direction="row" justifyContent="flex-end">
                <Heading fontSize="md">{t("include_filters")}</Heading>
                <Switch
                  ml={1}
                  isChecked={includeOptions}
                  onChange={setIncludeOptions.toggle}
                  colorScheme="green"
                />
              </Flex>
              <Flex direction="row" justifyContent="flex-end">
                <Heading fontSize="md">{t("respect_order")}</Heading>
                <Switch
                  ml={1}
                  isChecked={respectOrder}
                  onChange={setRespectOrder.toggle}
                  colorScheme="green"
                />
              </Flex>
              <Flex direction="row" justifyContent="flex-end">
                <Heading fontSize="md">{t("respect_compo")}</Heading>
                <Switch
                  ml={1}
                  isChecked={respectCompo}
                  onChange={setRespectCompo.toggle}
                  colorScheme="green"
                />
              </Flex>
            </Stack>
            <Spacer />
            {!isOptionsOpen && (
              <>
                <Button onClick={handleSearch}>
                  {t("search", { ns: "common" })}
                </Button>
                <IconButton
                  icon={<DeleteIcon />}
                  aria-label="Delete search"
                  onClick={handleReset}
                />
              </>
            )}
          </Wrap>
        </Flex>
      </Collapse>
      <Collapse in={isOptionsOpen} animateOpacity>
        <Wrap direction="row" paddingY={1}>
          <Input
            placeholder={t("username", { ns: "common" })}
            maxWidth="14rem"
            {...pseudo}
          />
          <Box>
            <Menu>
              <MenuButton as={Button}>
                {result === ""
                  ? t("result")
                  : result === "W"
                  ? t("win")
                  : t("lose")}
              </MenuButton>
              <MenuList>
                {(result === "L" || result === "W") && (
                  <MenuItem
                    icon={<DeleteIcon />}
                    onClick={() => handleResult("")}
                  >
                    {t("erase")}
                  </MenuItem>
                )}
                <MenuItem onClick={() => handleResult("W")}>
                  👑 {t("win")}
                </MenuItem>
                <MenuItem onClick={() => handleResult("L")}>
                  💀 {t("lose")}
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <NumberList number={mapId} onSelect={setMapId} range={[0, 29]}>
            {t("map")}
          </NumberList>
          <Button onClick={toggleLetter}>
            {myLetter === 0 ? "A/B?" : myLetter === 1 ? "A" : "B"}
          </Button>
          <Button
            onClick={toggleIsKTA}
            colorScheme={isKTA === 0 ? "purple" : isKTA === 1 ? null : "green"}
          >
            {isKTA === 0 ? "KTA" : isKTA === 1 ? "KTA?" : "Train"}
          </Button>
          <Button
            onClick={toggleInitiative}
            colorScheme={
              initiative === 0 ? "purple" : initiative === 1 ? null : "red"
            }
          >
            {initiative === 0
              ? t("yes", { ns: "common" })
              : initiative === 1
              ? "Ini?"
              : t("no", { ns: "common" })}
          </Button>
          <Box maxWidth="5rem">
            <Input placeholder={t("tags")} {...tags} />
          </Box>
          <Box>
            <Popover>
              <PopoverTrigger>
                <Button rightIcon={<CalendarIcon />}>{t("date")}</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBody>
                  <Stack direction="row" alignItems="center">
                    <Input
                      placeholder={t("date_format")}
                      value={startInputDate}
                      onChange={setStartDate}
                    />
                    <Heading fontSize="md">
                      {t("linking.to", { ns: "common" })}
                    </Heading>
                    <Input
                      placeholder={t("date_format")}
                      value={endInputDate}
                      onChange={setEndDate}
                    />
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
          <Spacer />
          <WrapItem>
            <Button isLoading={isFetching} onClick={handleSearch} mr={2}>
              {t("search", { ns: "common" })}
            </Button>
            <IconButton
              icon={<DeleteIcon />}
              aria-label="Delete options"
              onClick={handleReset}
            />
          </WrapItem>
        </Wrap>
      </Collapse>
    </>
  );
};
