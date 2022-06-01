import { request } from "../utils/axios-utils";

export const fetchProfiles = async (key: any): Promise<any[]> => {
  const { queryKey } = key;
  const [_, names] = queryKey;
  if (!names) return [];
  return request({
    url: `/moderation/profile/${names}`,
    method: "GET",
  }) as Promise<any[]>;
};

export const editProfile = async (payload: {
  avatar: number;
  elo: number;
  role: string;
  ban: number;
  user_id: string;
}) => {
  return request({
    url: "/moderation/profile",
    method: "PUT",
    data: payload,
  });
};
