import { request } from "../lib/axios-utils";

export interface Team {
  team_id: string;
  team_name: string;
  slug: string;
  invitation: string;
  kta_link: string;
  created_at: Date;
  mates: { id: string; name: string; avatar: number }[];
}

type Teams = Team[];

export const joinTeam = async (invitation: string) => {
  return request({
    url: "/team/join",
    method: "PUT",
    data: { invitation },
  });
};

export const quitTeam = async (team_id: string) => {
  return request({
    url: "/team/quit",
    method: "PUT",
    data: { team_id },
  });
};

export const getTeams = async (): Promise<Teams> => {
  return request({
    url: "/team",
    method: "GET",
  }) as Promise<Teams>;
};

export const getTeamsNames = async (): Promise<any> => {
  return request({
    url: "/team/names",
    method: "GET",
  }) as Promise<Teams>;
};

export const postTeam = async (form: {
  team_name: string;
  kta_link: string;
}) => {
  return request({
    url: "/team",
    method: "POST",
    data: form,
  });
};
