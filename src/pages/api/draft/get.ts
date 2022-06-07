import { parse } from "node-html-parser";
import type { Data as DataDraft, Draft, Match } from "./Types";

export default async function handler(req, res) {
  const { query } = req;
  try {
    let link = query.link;
    let result = "";
    const req = await fetch(link, {
      method: "GET",
    });
    const txt = await req.text();
    if (txt) result = txt;
    else throw new Error(`Error in getting text from draft ${link}`);
    const data = ParseHTMLToDraft(result);
    if (!data) throw new Error(`Error in parsing draft ${link}`);
    res.end(JSON.stringify({ message: data }));
  } catch (error) {
    res.json(error);
    res.status(406).end();
  }
}

export const ParseHTMLToDraft = (code: string): DataDraft | null => {
  const root = parse(code);
  const arrScripts = root.getElementsByTagName("script");
  for (const script of arrScripts) {
    if (script.rawAttrs === 'type="text/javascript"') {
      let raw_data_draft = script.rawText
        .substring(
          script.rawText.indexOf("var draft =") + 12,
          script.rawText.lastIndexOf("var user =")
        )
        .trim()
        .slice(0, -1);

      let raw_data_match = script.rawText
        .substring(
          script.rawText.indexOf("var match =") + 12,
          script.rawText.lastIndexOf("var draft =")
        )
        .trim()
        .slice(0, -1);

      let data_match: Match;
      let data_draft: Draft;
      try {
        data_match = JSON.parse(raw_data_match);
        data_draft = JSON.parse(raw_data_draft);
      } catch (error) {
        data_match = null;
        data_draft = null;
      }

      if (data_draft.state !== "COMPLETED") return;
      return {
        match: data_match,
        draft: data_draft,
        error: null,
      };
    }
  }

  return null;
};
