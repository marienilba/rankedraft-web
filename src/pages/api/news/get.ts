import News from "./news/news.json";
import Devblogs from "./devblogs/devblogs.json";
import Changelogs from "./changelogs/changelogs.json";
export default async function handler(req, res) {
  try {
    const news = News.news;
    const devblogs = Devblogs.devblogs;
    const changelogs = Changelogs.changelogs;
    res.end(
      JSON.stringify({
        news: JSON.stringify(news),
        devblogs: JSON.stringify(devblogs),
        changelogs: JSON.stringify(changelogs),
      })
    );
  } catch (error) {
    res.json(error);
    res.status(405).end();
  }
}
