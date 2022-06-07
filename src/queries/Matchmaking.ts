import { request } from "../lib/axios-utils";

export interface Lobby {
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

export const fetchLobbies = () => {
  return request({
    url: "/matchmaking/lobbies/",
    method: "GET",
  }) as Promise<Lobby[]>;
};

export const fetchQueueCount = () => {
  return request({
    url: "/matchmaking/queue/?type=count",
    method: "GET",
  }) as Promise<{ count: number }>;
};
