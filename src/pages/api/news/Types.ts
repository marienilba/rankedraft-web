export type Changelogs = Array<Changelog>;

export type Changelog = {
  version: string;
  created_at: string;
  logs: Log[];
};

export type Log = {
  type: "added" | "removed" | "fixed";
  locales: object;
};

export type News = Array<New>;

export type New = {
  title: { fr?: string; en?: string };
  imageUri?: string;
  created_at: string;
  creator: string;
  locales: object;
  content: string;
};

export type Devblogs = Array<Devblog>;

export type Devblog = {
  title: { fr?: string; en?: string };
  imageUri?: string;
  created_at: string;
  creator: string;
  locales: object;
  content: string;
};

export type ListItemLocales = {
  fr: string;
  en: string;
};
