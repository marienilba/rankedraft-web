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
  auth_A: {
    id: string;
    logo: string;
    method: string;
    mode: string;
    name: string;
  };
  auth_B: {
    id: string;
    logo: string;
    method: string;
    mode: string;
    name: string;
  };
  id: string;
  mode: string;
  tournament_id: number;
  tournament_slug: string;
}

interface Data {
  match: Match;
  draft: Draft;
  error: string;
}

export type { Data, Draft, Match };
