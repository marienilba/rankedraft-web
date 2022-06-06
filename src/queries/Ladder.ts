import { request } from "../lib/axios-utils";

export interface LadderPlayer {
  id: string;
  profile: {
    name: string;
    avatar: number;
    id: string;
  };
  elo: number;
  consecutives: number;
  visible: boolean;
}

export interface SpectatorLobby {
  id: string;
  url: string;
  created_at: Date;
  last_update: Date;
  players: {
    id: string;
    name: string;
    elo: number;
    avatar: number;
  }[];
}

interface Rank {
  id: string;
  elo: number;
  name: string;
  avatar: number;
  consecutives: number;
  visible: boolean;
  rank_position: number;
}

export const fetchRank = async (key: any): Promise<Rank> => {
  const { queryKey } = key;
  const [_, id] = queryKey;
  if (id === null || id === undefined) return;
  return request({
    url: `/ladder/rank/${id}`,
    method: "GET",
  }) as Promise<Rank>;
};

export const fetchLadder = async (key: any) => {
  const { pageParam } = key;
  return request({
    url: `/ladder/?page=${pageParam || 0}`,
    method: "GET",
  }) as Promise<{ lines: LadderPlayer[]; nextId: number; previousId: number }>;
};

export const fetchSpectator = () => {
  return request({
    url: "/ladder/spectator/",
    method: "GET",
  }) as Promise<SpectatorLobby[]>;
};
