import axios from "axios";
import isEmpty from "lodash.isempty";
import { request } from "../lib/axios-utils";

interface Draft {
  data: Array<number | string>[];
  ended_at: string;
  forfeit_at: string;
  map_id: number;
  next: boolean;
  number: number;
  previous: boolean;
  started_at: string;
  state: string;
  step: number;
  timer: number;
}

export interface Auth {
  id: string;
  logo: string;
  method: string;
  mode: string;
  name: string;
}

interface Match {
  auth_A: Auth;
  auth_B: Auth;
  id: string;
  mode: string;
  tournament_id: number;
  tournament_slug: string;
}

export interface Data {
  match: Match;
  draft: Draft;
  error: string;
}

export const fetchDraft = async (link: string): Promise<Data | null> => {
  try {
    const res = await axios.get("api/draft/get/?link=" + link);
    if (res.status === 405)
      throw new Error(`fetchDraft ended with ${res.status} statusCode`);
    if (isEmpty(res.data)) throw new Error(`fetchDraft object is empty`);

    return res.data.message;
  } catch (error) {
    return {
      match: null,
      draft: null,
      error: "Invalid Link.",
    };
  }
};
