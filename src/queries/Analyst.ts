import { request } from "../utils/axios-utils";

export const fetchHistories = async (key: any) => {
  const { queryKey } = key;
  const [
    _,
    ___,
    pseudo,
    map_id,
    result,
    letter,
    is_kta,
    __,
    start_date,
    end_date,
    compo,
    respect_order,
  ] = queryKey;

  return request({
    url: `/analyst/history/?pseudo=${pseudo ?? ""}&map_id=${
      map_id ?? ""
    }&result=${result ?? ""}&letter=${letter ?? ""}&is_kta=${
      is_kta ?? ""
    }&start_date=${start_date ?? ""}&end_date=${end_date ?? ""}&compo=${
      compo ?? ""
    }&respect_order=${respect_order ?? ""}`,
    method: "GET",
  }) as Promise<any>;
};
