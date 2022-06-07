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
