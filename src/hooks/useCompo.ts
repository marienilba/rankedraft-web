import { useState, useEffect, useCallback } from "react";

export interface Draft {
  picks: {
    A: { breed: number; mode: string }[];
    B: { breed: number; mode: string }[];
  };
  bans: {
    A: number[];
    B: number[];
  };
}

export function useSimpleCompo(): [
  teams: number[][],
  onChange: (team: "A" | "B", index: number, breed: number) => void,
  onReset: () => void
] {
  const [teams, setTeams] = useState<Array<number>[]>([
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const onChange = useCallback(
    (team: "A" | "B", index: number, breed: number) => {
      if (index > 2 || breed > 18) return;
      let compo = [];
      if (team === "A") {
        compo = [...teams[0]];
      } else {
        compo = [...teams[1]];
      }
      compo[index] = breed;
      if (team === "A") {
        setTeams([compo, teams[1]]);
      } else {
        setTeams([teams[0], compo]);
      }
    },
    [teams]
  );

  const onReset = useCallback(() => {
    setTeams([
      [0, 0, 0],
      [0, 0, 0],
    ]);
  }, []);

  return [teams, onChange, onReset];
}

export default function useCompo(): [
  Draft,
  (
    letter: string,
    index: number,
    pick: { breed: number; mode: string }
  ) => void,
  (letter: string, index: number, ban: number) => void,
  () => void,
  (d: Draft) => void
] {
  const [draft, setDraft] = useState<Draft>({
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
  });

  const changePick = useCallback(
    (
      letter: string,
      index: number,
      pick: { breed: number; mode: string }
    ): void => {
      const { picks } = draft;
      picks[letter][index] = pick;

      setDraft({ ...draft, picks });
    },
    [draft]
  );

  const changeBan = useCallback(
    (letter: string, index: number, ban: number) => {
      const { bans } = draft;
      bans[letter][index] = ban;
      setDraft({ ...draft, bans });
    },
    [draft]
  );

  const reset = useCallback(() => {
    setDraft({
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
    });
  }, []);

  const load = useCallback((draft: Draft) => {
    setDraft(draft);
  }, []);

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return [draft, changePick, changeBan, reset, load];
}
