import { request } from "../utils/axios-utils";
import { Auth } from "./Draft";

export interface HistoryResponse {
  histories: HistoryLine[];
  nextId: number | null;
  previousId: number | null;
}
interface DraftLight {
  picks: {
    A: { breed: number; mode: string }[];
    B: { breed: number; mode: string }[];
  };
  bans: {
    A: number[];
    B: number[];
  };
}
interface AuthLight {
  name: string;
  logo: string;
}

export interface HistoryLine extends Payload {
  id: string;
  opp_name: string;
  opp_logo: string;
  compoA: [number, number, number];
  compoB: [number, number, number];
}

export interface Payload {
  url: string;
  letter: "A" | "B";
  map_id: number;
  draft: DraftLight;
  names: AuthLight[] | Auth[];
  is_kta: boolean;
  initiative: 0 | 1 | -1;
  result: "W" | "L" | "";
  meta: string;
  comments: string;
  date: number;
}

export interface Options {
  pseudo: string;
  map_id: number;
  result: string;
  letter: string;
  is_kta: boolean;
  initiative: number;
  start_date: number;
  end_date: number;
}

export interface Search {
  compo: "string";
  respect_order: boolean;
}

export const fetchRawStats = async ({ options, search }) => {
  const {
    pseudo,
    team_id,
    map_id,
    result,
    letter,
    is_kta,
    initiative,
    start_date,
    end_date,
  } = options;
  const { compo, respect_order } = search;
  return request({
    url: `/stats/raw/?pseudo=${pseudo ?? ""}&team_id=${team_id ?? ""}&map_id=${
      map_id ?? ""
    }&result=${result ?? ""}&letter=${letter ?? ""}&is_kta=${
      is_kta ?? ""
    }&initiative=${initiative ?? ""}&start_date=${start_date ?? ""}&end_date=${
      end_date ?? ""
    }&compo=${compo !== null ? JSON.stringify(compo) : ""}&respect_order=${
      respect_order ?? ""
    }`,
    method: "GET",
  }) as Promise<any>;
};

export const fetchStats = async ({ options, search }) => {
  const {
    pseudo,
    team_id,
    map_id,
    result,
    letter,
    is_kta,
    initiative,
    start_date,
    end_date,
  } = options;
  const { compo, respect_order } = search;
  return request({
    url: `/stats/?pseudo=${pseudo ?? ""}&team_id=${team_id ?? ""}&map_id=${
      map_id ?? ""
    }&result=${result ?? ""}&letter=${letter ?? ""}&is_kta=${
      is_kta ?? ""
    }&initiative=${initiative ?? ""}&start_date=${start_date ?? ""}&end_date=${
      end_date ?? ""
    }&compo=${compo !== null ? JSON.stringify(compo) : ""}&respect_order=${
      respect_order ?? ""
    }`,
    method: "GET",
  }) as Promise<any>;
};
