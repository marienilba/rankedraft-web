import { CopyIcon, ChevronDownIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Flex,
  Stack,
  Input,
  Button,
  Divider,
  Spacer,
  Box,
  Heading,
  Checkbox,
  Textarea,
} from "@chakra-ui/react";
import {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
  ChangeEvent,
  useCallback,
} from "react";
import { useMutation, useQueryClient } from "react-query";
import { Auth, fetchDraft } from "../../queries/Draft";
import {
  editHistory,
  Payload as payloadDraft,
  postHistory,
} from "../../queries/History";
import useCompo from "../../hooks/useCompo";
import useInput from "../../hooks/useInput";
import { Team } from "../../hooks/useTeam";
import { useTripleToggle } from "../../hooks/useTripleToggle";
import { Compositions } from "./Compositions";
import { NumberList } from "../list/NumberList";
import { TeamsList } from "../list/TeamsList";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Url } from "./modal_draft/Url";
import { Opponent } from "./modal_draft/Opponent";
import { MapPreview } from "./modal_draft/Map";
import { SwitchLetter } from "./modal_draft/SwitchLetter";
import { useWindowSize } from "../../hooks/useWindowSize";
import { RemainingBreeds } from "./RemainingBreeds";
import { KTADateToTimestamp } from "../../utils/HelpersFunction";
import { useTranslation } from "next-i18next";

export const ModalDraft = forwardRef(
  ({ predraft }: { predraft: any | null }, ref) => {
    const { t } = useTranslation(["history", "common"]);
    const { isScreen, isPad } = useWindowSize();

    const queryClient = useQueryClient();
    const mutationEdit = useMutation(
      () => {
        return editHistory(toPayload(), predraft.id);
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["history", predraft.id]);
          queryClient.invalidateQueries(["history"]);
        },
      }
    );
    const mutationAdd = useMutation(
      () => {
        return postHistory(toPayload());
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["history"]);
        },
      }
    );
    const [URL, setURL] = useState<string>("");
    const [myLetter, setMyLetter] = useState<"A" | "B">("A");
    const [mapId, setMapId] = useState<number>(0);
    const [draft, changePick, changeBan, resetCompo, loadCompo] = useCompo();
    const [names, setNames] = useState<Auth[]>([]);
    const [isKTAMatch, setIsKTAMatch] = useState<boolean>(false);
    const [initiative, toggleInitiative] = useTripleToggle(1);
    const [result, setResult] = useState<"" | "L" | "W">("");
    const [tags] = useInput("");
    const [comments] = useInput("", 500);
    const [date, setDate] = useState<number>();
    const [team, setTeam] = useState<Team>();
    const [Settings] = useLocalStorage("user-settings", null);

    const toPayload = useCallback(() => {
      return {
        url: URL,
        letter: myLetter,
        map_id: mapId,
        draft,
        names,
        is_kta: isKTAMatch,
        initiative,
        result,
        tags: tags.value,
        comments: comments.value,
        date,
        team_id: team ? (team.id ? team.id : null) : null,
      } as payloadDraft;
    }, [
      URL,
      myLetter,
      mapId,
      draft,
      names,
      isKTAMatch,
      initiative,
      result,
      tags,
      comments,
      date,
      team,
    ]);

    const isValid = useCallback(() => {
      if (!URL) return false;
      for (const letter in draft.picks) {
        for (const pick of draft.picks[letter]) {
          if (pick.breed === 0) return false;
        }
      }
      if (comments.value.length > 600) return false;
      return true;
    }, [URL, comments, tags, draft]);

    const onSave = useCallback(() => {
      isValid() && mutationAdd.mutate();
    }, [isValid]);

    const onEdit = useCallback(() => {
      predraft.id && isValid() && mutationEdit.mutate();
    }, [predraft, isValid]);

    useImperativeHandle(ref, () => ({
      save() {
        onSave();
      },
      edit() {
        onEdit();
      },
      reset() {
        handleReset();
      },
    }));

    const handleDraft = useCallback(
      async (e: ChangeEvent<HTMLInputElement> | string) => {
        let text = typeof e === "string" ? e : e.target.value;
        if (text.includes("draft.ktarena.com/draft/room/")) {
          const data = await fetchDraft(text);
          if (!data) return;
          if (data.error === "Invalid link.") return;

          const { draft, match } = data;
          if (Settings) {
            if (Settings.hasOwnProperty("autocplt")) {
              let pseudos = Settings["autocplt"];
              let pA = match.auth_A.name.toLowerCase();
              let pB = match.auth_B.name.toLowerCase();
              for (const pseudo of pseudos) {
                if (pA === pseudo.toLowerCase()) {
                  setMyLetter("A");
                  break;
                }

                if (pB === pseudo.toLowerCase()) {
                  setMyLetter("B");
                  break;
                }
              }
            }
          }

          if (match.mode === "TOURNAMENT") setIsKTAMatch(true);

          let piA = 0;
          let piB = 0;
          let biA = 0;
          let biB = 0;
          for (const rule of draft.data) {
            const [letter, isPick, breed] = rule;
            if (isPick) {
              changePick(letter as string, letter === "A" ? piA : piB, {
                breed: Number(breed),
                mode: "",
              });
              letter === "A" ? piA++ : piB++;
            } else {
              changeBan(
                letter as string,
                letter === "A" ? biA : biB,
                Number(breed)
              );
              letter === "A" ? biA++ : biB++;
            }
          }

          setDate(KTADateToTimestamp(data.draft.ended_at));
          const names = [match.auth_A, match.auth_B];

          setNames(names);
          setMapId(draft.map_id);
          setURL(text);
        }
      },
      [Settings]
    );

    const handlePaste = useCallback(async () => {
      if (navigator.clipboard) {
        let text = await navigator.clipboard.readText();
        handleDraft(text);
      }
    }, [navigator]);

    const handleReset = useCallback(async () => {
      setURL("");
      setMyLetter("A");
      setMapId(0);
      resetCompo();
      setNames([]);
      setIsKTAMatch(false);
      setResult("");
      tags.onChange("");
      comments.onChange("");
    }, []);

    useEffect(() => {
      if (!predraft) return;
      setURL(predraft.url);
      setIsKTAMatch(predraft.is_kta);
      setMyLetter(predraft.letter ?? "A");
      setResult(predraft.result);
      setDate(predraft.date);
      if (predraft.team) setTeam(predraft.team);
      if (predraft.tags && predraft.tags.length > 0) {
        let t = "";
        for (const tag of predraft.tags) {
          t += tag + ",";
        }
        t = t.slice(0, -1);
        tags.onChange(t);
      }
      predraft.comments && comments.onChange(predraft.comments);
      toggleInitiative(predraft.initiative);
      if (predraft.map_id && predraft.draft && predraft.names) {
        setMapId(predraft.map_id);
        loadCompo(predraft.draft);
        setNames(predraft.names as Auth[]);
      }
      // isSet.current = true;
    }, [predraft]);

    const handleSwitch = useCallback(() => {
      setMyLetter((l) => (l === "A" ? "B" : "A"));
    }, []);

    const handleIsKTA = useCallback(() => {
      setIsKTAMatch((k) => !k);
    }, []);

    const handleSelectTeam = useCallback((t: Team) => {
      setTeam(t);
    }, []);

    return (
      <Stack direction="column">
        <Flex
          direction={isScreen ? "row" : "column"}
          alignItems="center"
          justifyContent="center"
        >
          <Stack mr={3} width="100%">
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Url
                URL={URL}
                onDraft={handleDraft}
                onPaste={handlePaste}
                onReset={handleReset}
                isDisabled={!!predraft}
              />
              <Flex marginX={2}>
                <TeamsList
                  defaultValue={team}
                  onSelect={handleSelectTeam}
                  options={{ save: false }}
                  isPredraft={!!predraft}
                />
              </Flex>
              <Spacer />
            </Flex>
            <Divider />
            <Compositions
              draft={draft}
              myLetter={myLetter}
              onEdit={changePick}
            />
            {!!draft && <RemainingBreeds draft={draft} />}
          </Stack>
          <Spacer />
          {!isScreen && <Divider marginY={2} />}
          <Stack direction={isScreen ? "column" : isPad ? "row" : "column"}>
            <Flex direction="column">
              <Opponent names={names} letter={myLetter} />
              <MapPreview map={mapId} />
            </Flex>
            <Stack
              direction="column"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Stack direction={isScreen ? "row" : "column"}>
                <Stack alignItems="center" direction="row">
                  <SwitchLetter onSwitch={handleSwitch} letter={myLetter} />
                  <NumberList
                    number={mapId}
                    onSelect={setMapId}
                    range={[1, 29]}
                  >
                    {t("map")}
                  </NumberList>
                  <Box maxWidth="5rem">
                    <Input placeholder="Tags" {...tags} />
                  </Box>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Button
                  onClick={toggleInitiative}
                  colorScheme={
                    initiative === 0
                      ? "purple"
                      : initiative === 1
                      ? null
                      : "teal"
                  }
                >
                  {initiative === 0
                    ? t("yes", { ns: "common" })
                    : initiative === 1
                    ? "Ini?"
                    : t("no", { ns: "common" })}
                </Button>
                <Divider orientation="vertical" />
                <Checkbox onChange={handleIsKTA} isChecked={isKTAMatch}>
                  KTA
                </Checkbox>
              </Stack>
              <Stack direction="row" justifyContent="center">
                <Button
                  size="lg"
                  colorScheme={result === "W" ? "green" : "gray"}
                  onClick={() => setResult((r) => (r === "W" ? "" : "W"))}
                >
                  🏆 {t("win")}
                </Button>
                <Button
                  size="lg"
                  colorScheme={result === "L" ? "pink" : "gray"}
                  onClick={() => setResult((r) => (r === "L" ? "" : "L"))}
                >
                  💀 {t("lose")}
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Flex>
        <Stack>
          <Heading size="lg">{t("module.comments")}</Heading>
          <Textarea
            placeholder={t("module.your_comments")}
            {...comments}
            height="auto"
          />
        </Stack>
      </Stack>
    );
  }
);
