import isEmpty from "lodash.isempty";
export function romanToInt(s: string): number {
  const romanHash = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let accumulator = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "I" && s[i + 1] === "V") {
      accumulator += 4;
      i++;
    } else if (s[i] === "I" && s[i + 1] === "X") {
      accumulator += 9;
      i++;
    } else if (s[i] === "X" && s[i + 1] === "L") {
      accumulator += 40;
      i++;
    } else if (s[i] === "X" && s[i + 1] === "C") {
      accumulator += 90;
      i++;
    } else if (s[i] === "C" && s[i + 1] === "D") {
      accumulator += 400;
      i++;
    } else if (s[i] === "C" && s[i + 1] === "M") {
      accumulator += 900;
      i++;
    } else {
      accumulator += romanHash[s[i]];
    }
  }
  return accumulator;
}

export const DecodeMapId = (mapId: string): number => {
  const romans = ["I", "V", "X", "C", "L", "D", "M"];
  let id = mapId.trim().toUpperCase();
  if (id === "" || id.length < 1) return -1;
  if (id[0] === "A" || id[0] === "B" || id[0] === "C") {
    let nid: string | number = id.substring(1);
    try {
      nid = parseInt(nid);
    } catch (error) {
      return -1;
    }
    return nid;
  }

  if (
    romans.some(function (v) {
      return id.indexOf(v) >= 0;
    })
  ) {
    let nid: number = romanToInt(id);
    return nid;
  }
  let nid: number = -1;
  try {
    nid = parseInt(id);
  } catch (error) {
    return -1;
  }
  return nid;
};

export const DecodeIni = (initiative: string): 0 | 1 | -1 => {
  let ini = initiative.trim().toLowerCase();
  const matchs_had_ini = [
    "yes",
    "y",
    "ya",
    "oui",
    "o",
    "1",
    "si",
    "sí",
    "ini",
    "iniciativa",
  ];
  const matchs_hadnot_ini = [
    "no",
    "n",
    "na",
    "nah",
    "non",
    "0",
    "pas ini",
    "not",
    "not ini",
    "sin iniciativa",
    "sin",
  ];

  for (const match of matchs_had_ini) if (ini === match) return 0;
  for (const match of matchs_hadnot_ini) if (ini === match) return -1;
  return 1;
};

export const DecodeResult = (
  result: string,
  format?: { w: string; l: string }
): "" | "W" | "L" => {
  let res = result.trim().toLowerCase();
  const matchs_win = [
    "victoire",
    "vic",
    "victoria",
    "gano",
    "ganó",
    "victoires",
    "win",
    "wins",
    "won",
    "wons",
    "1",
    "succes",
    "success",
    "gagné",
    "gagne",
  ];
  const matchs_loses = [
    "defaite",
    "défaite",
    "defaites",
    "défaites",
    "fracaso",
    "fraca",
    "perdió",
    "perdio",
    "0",
    "lose",
    "loose",
    "looses",
    "loses",
    "loosse",
    "loosses",
    "lost",
    "losts",
    "perdu",
  ];
  if (format !== undefined) {
    if (res === format.w.toLowerCase()) return "W";
    if (res === format.l.toLowerCase()) return "L";
  }

  for (const match of matchs_win) if (res === match) return "W";
  for (const match of matchs_loses) if (res === match) return "L";

  return "";
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function timeSince(date: Date): string {
  let seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

export function ObjectToParams(entries: Object) {
  const result = {};
  for (const key in entries) {
    if (entries[key] === null) continue;
    result[key] = entries[key];
  }
  return new URLSearchParams(result);
}

export function paramsToObject(query: string): { [key: string]: any } {
  const entries = new URLSearchParams(query);
  const result = {};
  for (const [key, value] of entries) {
    result[key] = isEmpty(value) ? null : JSON.parse(JSON.stringify(value));
  }
  return result;
}

export function KTADateToTimestamp(date_string: string) {
  if (!date_string) return parseInt((new Date().getTime() / 1000).toFixed(0));

  try {
    const [h, d] = date_string.split(" ");
    const [dd, mm, yyyy] = d.split("/");
    const correct_date_string = `${h} ${mm}/${dd}/${yyyy}`;

    return parseInt(
      (new Date(correct_date_string).getTime() / 1000).toFixed(0)
    );
  } catch (error) {
    return parseInt((new Date().getTime() / 1000).toFixed(0));
  }
}
