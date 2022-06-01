export interface Data {
  id: string;
  team_id: string;
  result: "W" | "L" | "";
  date: number;
  opp_name: string;
  letter: "A" | "B";
  draft: {
    picks: {
      A: {
        breed: number;
        mode: string;
      }[];
      B: {
        breed: number;
        mode: string;
      }[];
    };
    bans: {
      A: number[];
      B: number[];
    };
  };
  map_id: number;
  initiative: number;
}

export type ResponseToFPBData = {
  name: string;
  color: string;
  children?: Array<ResponseToFPBData>;
  loc?: number;
};

export type BreedMapWinrateData = Array<{
  id: string;
  data: Array<{
    x: string;
    y: number;
  }>;
}>;

export type BreedsWinrateData = BreedMapWinrateData;
export type FPWinrateData = BreedMapWinrateData;

export type DateWinrateData = Array<{
  id: string;
  color: string;
  data: Array<{
    x: string;
    y: number;
  }>;
}>;

export type ActivitiesData = Array<{ day: string; value: number }>;

export interface BreedGlobaleWinrateData {
  id: string;
  label: string;
  value: number;
  color: string;
}

export interface PathPicksBansData {
  nodes: Array<{
    id: string;
    height: number;
    size: number;
    color: string;
  }>;
  links: Array<{
    source: string;
    target: string;
    distance: number;
  }>;
}

export type Stats = Data[];
