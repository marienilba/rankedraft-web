import { request } from "../lib/axios-utils";

interface Payload {
  name: string;
  avatar: number;
}

export interface ProfileResponse extends LightProfileResponse {
  avatars: number[];
  visible: boolean;
  consecutives: number;
}

interface LightProfileResponse {
  id: string;
  name: string;
  role: number;
  avatar: number;
  elo: number;
}

export const fetchLightProfile = (key: any) => {
  const { queryKey } = key;
  const [_, id] = queryKey;
  if (!id) return null;
  return request({
    url: "/profile/" + id,
    method: "GET",
  }) as Promise<LightProfileResponse>;
};

export const fetchProfile = () => {
  return request({
    url: "/profile",
    method: "GET",
  }) as Promise<ProfileResponse>;
};

export const updateProfile = (payload: Payload) => {
  return request({ url: "/profile", method: "POST", data: payload });
};

export const fetchProfileVisibility = (): Promise<{ visible: boolean }> => {
  return request({
    url: "/profile/ladder/visibility",
    method: "GET",
  }) as Promise<{ visible: boolean }>;
};

export const updateProfileVisibility = (visible: boolean): Promise<boolean> => {
  return request({
    url: "/profile/ladder/visibility",
    method: "POST",
    data: { visible },
  });
};
