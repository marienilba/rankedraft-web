import axios from "axios";
import { supabase } from "./supabaseClient";

const client = axios.create({ baseURL: "http://localhost:4000" });

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer ${
    supabase.auth.session()?.access_token
  }`;
  const onSucces = (response) => {
    const {
      data: { message },
    } = response;
    return message;
  };
  const onError = (error) => {
    return Promise.reject(error.message);
  };

  return client(options).then(onSucces).catch(onError);
};
