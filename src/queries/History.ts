import { request } from "../lib/axios-utils";
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
  tags: string;
  comments: string;
  date: number;
  team_id: string;
}

export interface Options {
  team_id: string;
  pseudo: string;
  tags: string;
  map_id: number;
  result: string;
  letter: string;
  is_kta: number | boolean;
  initiative: number;
  start_date: number;
  end_date: number;
}

export interface Search {
  compo: "string";
  respect_order: boolean;
}

export const deleteHistories = () => {
  return request({
    url: "/history/all",
    method: "DELETE",
  });
};

export const deleteHistory = (id: string) => {
  return request({
    url: "/history",
    method: "DELETE",
    data: { id },
  });
};

export const editHistory = (payload: Payload, id: string) => {
  return request({
    url: "/history",
    method: "PUT",
    data: { payload, id },
  });
};

export const fetchHistory = (id: string) => {
  return request({
    url: "/history/" + id,
    method: "GET",
  }) as Promise<Payload>;
};

export const fetchHistories = async (key: any) => {
  const { pageParam, queryKey } = key;
  const [
    _,
    team_id,
    pseudo,
    map_id,
    result,
    letter,
    is_kta,
    initiative,
    start_date,
    end_date,
    tags,
    compo,
    respect_order,
    respect_compo,
  ] = queryKey;

  return request({
    url: `/history/?page=${pageParam || 0}&pseudo=${pseudo ?? ""}&team_id=${
      team_id ?? ""
    }&map_id=${map_id ?? ""}&result=${result ?? ""}&letter=${
      letter ?? ""
    }&is_kta=${is_kta ?? ""}&initiative=${initiative ?? ""}&start_date=${
      start_date ?? ""
    }&end_date=${end_date ?? ""}&tags=${tags ?? ""}&compo=${
      compo ?? ""
    }&respect_order=${respect_order ?? ""}&respect_compo=${
      respect_compo ?? ""
    }`,
    method: "GET",
  }) as Promise<any>;
};

export const postHistory = async (payload: Payload): Promise<any> => {
  return request({
    url: "/history",
    method: "POST",
    data: payload,
  });
};
