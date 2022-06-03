import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

// in case of serverless function for getting ip is too slow
export function useIp() {
  const [ip, setIp] = useState(null);
  const { isSuccess, isError, data } = useQuery(["ip"], fetchMyIp);

  useEffect(() => {
    if (isSuccess && !isError && data) setIp(data);
  }, [data]);

  return ip;
}

const fetchMyIp = async (): Promise<string> => {
  try {
    const res = await axios.get("api/ip"); // "https://geolocation-db.com/json/"
    return res.data.IPv4 as string;
  } catch (error) {
    return;
  }
};
