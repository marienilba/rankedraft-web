export type Data = Array<{
  id: string;
  result: "W" | "L" | "";
  date: number; // in timestamp
  opp_name: string;
  letter: "A" | "B";
  draft: {
    picks: {
      A: { breed: number; mode: string }[];
      B: { breed: number; mode: string }[];
    };
    bans: {
      A: number[];
      B: number[];
    };
  };
  names: Array<{
    id: string;
    logo: string;
    method: string; // ARENA is it's an KTA match
    mode: string;
    name: string;
  }>;
  map_id: number;
  initiative: 0 | 1 | -1; // 1 is for uncheck, 0 for checked and -1 for unchecked
  team: {
    // all players as their own alone team where id is the same as user id, so it means it's in "All" team list
    id: string;
    name: string;
  };
}>;

export type Classes = {
  1: "cra";
  2: "ecaflip";
  3: "eliotrope";
  4: "eniripsa";
  5: "enutrof";
  6: "feca";
  7: "huppermage";
  8: "iop";
  9: "osamodas";
  10: "pandawa";
  11: "roublard";
  12: "sacrieur";
  13: "sadida";
  14: "sram";
  15: "steamer";
  16: "xelor";
  17: "zobal";
  18: "ouginak";
};
