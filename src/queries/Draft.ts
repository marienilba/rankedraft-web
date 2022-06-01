import { request } from "../utils/axios-utils";

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

interface AuthLight {
  name: string;
  logo: string;
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

export const fetchDraft = async (link: string): Promise<Data | null> => {
  let response;
  try {
    const req = await fetch(`http://localhost:4000/draft/${link}`);
    const data = await req.json();
    response = data.message;
  } catch (error) {
    console.log(error);
  }

  return response;
};
