import { request } from "../utils/axios-utils";

export const fetchPanel = () => {
  return request({
    url: "/panel",
    method: "GET",
  }) as Promise<any>;
};
