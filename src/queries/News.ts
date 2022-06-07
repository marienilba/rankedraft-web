import axios from "axios";
import { Changelogs, Devblogs, News } from "../pages/api/news/Types";

export const fetchNews = async (): Promise<{
  news: News;
  changelogs: Changelogs;
  devblogs: Devblogs;
}> => {
  try {
    const res = await axios.get("api/news/get");
    return {
      news: JSON.parse(res.data.news),
      changelogs: JSON.parse(res.data.changelogs),
      devblogs: JSON.parse(res.data.devblogs),
    };
  } catch (error) {
    return {
      news: [],
      changelogs: [],
      devblogs: [],
    };
  }
};
