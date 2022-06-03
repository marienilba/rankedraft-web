import { Data, fetchDraft } from "../../queries/Draft";
import { Payload as DraftPayload, postHistory } from "../../queries/History";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Draft } from "../../hooks/useCompo";
import { HistoryLine as HistoryLineProps } from "../../queries/History";
import {
  DecodeIni,
  DecodeMapId,
  DecodeResult,
  KTADateToTimestamp,
  sleep,
} from "../../utils/HelpersFunction";
import { HistoryLine } from "../../components/history/HistoryLine";
import { YisWhatPercentOfX } from "../../components/stats/Functions";
import {
  useBoolean,
  Stack,
  Button,
  Divider,
  Flex,
  Heading,
  Progress,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useTranslation } from "next-i18next";

export const Transfer = ({
  tsv,
  idxs,
  format,
}: {
  tsv: string[][];
  idxs: {
    url: string;
    initiative: string;
    result: string;
    map: string;
    comments: string;
  };
  format: { w: string; l: string };
}) => {
  const { t } = useTranslation(["settings", "common"]);
  const [Settings] = useLocalStorage("user-settings", null);
  const [previewDraft, setPrevienwDraft] = useState<DraftPayload[]>([]);
  const [progression, setProgression] = useState(0);
  const [indexAreGood, setIndexAreGood] = useBoolean(false);
  const [isRunning, setIsRunning] = useBoolean(false);

  const queryClient = useQueryClient();
  const mutation = useMutation(postHistory);
  useEffect(() => {
    return () => {
      if (indexAreGood && progression > 2 && progression < 100) {
        queryClient.invalidateQueries(["history"]);
      }
    };
  }, []);

  const extract = async (
    i: number,
    Iurl: number,
    Imap: number,
    Iresult: number,
    Iiniative: number,
    Icomments: number
  ) => {
    const _draft = tsv[i];
    if (!_draft[Iurl].includes("draft.ktarena.com/draft/r")) return;
    const emptyDraft = {
      picks: {
        A: [
          { breed: 0, mode: "" },
          { breed: 0, mode: "" },
          { breed: 0, mode: "" },
        ],
        B: [
          { breed: 0, mode: "" },
          { breed: 0, mode: "" },
          { breed: 0, mode: "" },
        ],
      },
      bans: {
        A: [0, 0, 0, 0],
        B: [0, 0, 0, 0],
      },
    };
    let payload: DraftPayload = {
      url: "",
      letter: "A",
      map_id: 0,
      draft: emptyDraft,
      names: [],
      is_kta: false,
      initiative: 1,
      result: "",
      tags: "",
      comments: "",
      date: 0,
      team_id: "",
    };
    const link = _draft[Iurl];
    let data: Data | undefined;
    try {
      data = await fetchDraft(link);
    } catch (error) {
      console.log(error);
      return;
    }
    if (!data) return;
    if (data.error === "Invalid link.") return;
    if (!data.draft) return;
    if (!data.match) return;

    payload.url = link;
    const { draft, match } = data;
    if (Settings) {
      if (Settings.hasOwnProperty("autocplt")) {
        let pseudos = Settings["autocplt"];
        let pA = match.auth_A.name.toLowerCase();
        let pB = match.auth_B.name.toLowerCase();
        for (const pseudo of pseudos) {
          if (pA === pseudo.toLowerCase()) {
            payload.letter = "A";
            break;
          }

          if (pB === pseudo.toLowerCase()) {
            payload.letter = "B";
            break;
          }
        }
      } else {
        payload.letter === "A";
      }
    } else {
      payload.letter === "A";
    }
    if (match.mode === "TOURNAMENT") payload.is_kta = true;
    else payload.is_kta = false;

    let FDraft: Draft = emptyDraft;

    let piA = 0;
    let piB = 0;
    let biA = 0;
    let biB = 0;
    for (const rule of draft.data) {
      const [letter, isPick, breed] = rule;
      if (isPick) {
        let { picks } = FDraft;
        picks[letter][letter === "A" ? piA : piB] = {
          breed: Number(breed),
          mode: "",
        };
        letter === "A" ? piA++ : piB++;
        FDraft = { ...FDraft, picks };
      } else {
        let { bans } = FDraft;
        bans[letter][letter === "A" ? biA : biB] = Number(breed);
        letter === "A" ? biA++ : biB++;
        FDraft = { ...FDraft, bans };
      }

      payload.draft = FDraft;
    }

    payload.names = [match.auth_A, match.auth_B];
    payload.initiative = 1;
    if (Iiniative !== -1) {
      if (_draft.length >= Iiniative) {
        let ini = DecodeIni(_draft[Imap]);
        if (ini !== -1) payload.initiative = ini;
      }
    }
    payload.map_id = draft.map_id;
    if (Imap !== -1) {
      if (_draft.length >= Imap) {
        let mapId: string | number = _draft[Imap];

        mapId = DecodeMapId(mapId);
        if (mapId !== -1) payload.map_id = mapId;
      }
    }
    payload.result = "";
    if (Iresult !== -1) {
      if (_draft.length >= Iresult) {
        let result = _draft[Iresult];

        if (format.l !== "" && format.w !== "") {
          payload.result = DecodeResult(result, format);
        } else {
          payload.result = DecodeResult(result);
        }
      }
    }

    if (Icomments !== -1) {
      if (_draft.length >= Icomments) {
        const cm = _draft[Icomments];
        if (cm.replace(/(\r\n|\n|\r)/gm, "") === "") payload.comments = "";
        else payload.comments = _draft[Icomments];
      }
    }

    payload.tags = "";
    payload.date = KTADateToTimestamp(data.draft.ended_at);

    payload.team_id = null;

    return payload;
  };

  const regex = useCallback(
    (
      Iurl: number,
      Iresult: number,
      Imap: number,
      Icomments: number,
      Iinitiative: number
    ) => {
      const reg = new RegExp("^[0-9]*$");
      const arr = [Iurl, Iresult, Imap, Icomments, Iinitiative];
      for (const v of arr) {
        if (("" + v).includes("e")) return false;
        if (v !== -1 && ("" + v).includes("-")) return false;
        if (!reg.test("" + v) && v !== -1) return false;
      }

      return true;
    },
    []
  );

  const onTransfer = async () => {
    setIndexAreGood.on();
    const { url, result, map, comments, initiative } = idxs;
    const Iurl = parseInt(url);
    if (Iurl < 0) return;
    const Iresult = parseInt(result);
    const Imap = parseInt(map);
    const Icomments = parseInt(comments);
    const Iiniatitive = parseInt(initiative);

    if (!regex(Iurl, Iresult, Imap, Icomments, Iiniatitive)) return;

    for (let i = 0; i < tsv.length; i++) {
      const data = await extract(
        i,
        Iurl,
        Imap,
        Iresult,
        Iiniatitive,
        Icomments
      );
      if (data) mutation.mutate(data);
      setProgression(Math.floor(YisWhatPercentOfX(i, tsv.length - 1)));
      await sleep(1000);
    }
    queryClient.invalidateQueries(["history"]);
  };

  const onPreview = async () => {
    let preview = [];
    const { url, result, map, comments, initiative } = idxs;
    const Iurl = parseInt(url);
    if (Iurl < 0) return;
    const Iresult = parseInt(result);
    const Imap = parseInt(map);
    const Icomments = parseInt(comments);
    const Iiniatitive = parseInt(initiative);

    if (!regex(Iurl, Iresult, Imap, Icomments, Iiniatitive)) return;

    for (let i = 0; i < 2; i++) {
      const data = await extract(
        i,
        Iurl,
        Imap,
        Iresult,
        Iiniatitive,
        Icomments
      );
      if (data) preview = [data, ...preview];
    }

    if (preview.length > 0) setIndexAreGood.on();
    else setIndexAreGood.off();
    setPrevienwDraft(preview);
  };

  const getHistoryLineMissProps = useCallback(
    (payload: DraftPayload, idx: number): HistoryLineProps => {
      const opp_logo =
        payload.letter === "A" ? payload.names[1].logo : payload.names[0].logo;
      const opp_name =
        payload.letter === "A" ? payload.names[1].name : payload.names[0].name;
      return {
        ...payload,
        id: "line-" + idx,
        opp_name,
        opp_logo,
        compoA: [
          payload.draft.picks.A[0].breed,
          payload.draft.picks.A[1].breed,
          payload.draft.picks.A[2].breed,
        ],
        compoB: [
          payload.draft.picks.B[0].breed,
          payload.draft.picks.B[1].breed,
          payload.draft.picks.B[2].breed,
        ],
      };
    },
    []
  );

  useEffect(() => {
    indexAreGood && setIndexAreGood.off();
  }, [idxs]);

  return (
    <Stack>
      <Stack direction="row">
        <Button
          isDisabled={!indexAreGood || isRunning}
          onClick={() => {
            setIsRunning.on();
            onTransfer();
          }}
        >
          {t("transfer")}
        </Button>
        <Button
          disabled={isRunning}
          onClick={() => {
            onPreview();
          }}
        >
          {t("test_to_confirm")}
        </Button>
      </Stack>
      <Divider margin={5} />
      <Stack>
        {previewDraft.map((payload, idx) => {
          const props = getHistoryLineMissProps(payload, idx);
          return <HistoryLine key={`line-histo-${idx}`} draft={props} />;
        })}
        {previewDraft.length === 0 && tsv.length > 0 && (
          <Flex justifyContent="center">
            <Heading textAlign="center" fontSize="lg">
              {t("index_bads")}
            </Heading>
          </Flex>
        )}
        <Stack direction="column">
          <Heading fontSize="md">Progression</Heading>
          <Progress
            value={progression}
            size="xs"
            colorScheme={progression >= 100 ? "green" : "pink"}
            hasStripe={progression >= 100 ? true : false}
          />
          <Heading fontSize="md">{progression}%</Heading>
        </Stack>
      </Stack>
    </Stack>
  );
};
