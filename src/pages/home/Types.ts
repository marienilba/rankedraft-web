import { FC } from "react";

export type Changelogs = Array<Changelog>;

export type Changelog = {
  version: string;
  created_at: Date;
  logs: Log[];
};

export type Log = {
  type: "added" | "removed" | "fixed";
  content: FC;
};

export type News = Array<New>;

export type New = {
  title: string;
  imageUri?: string;
  created_at: Date;
  creator: string;
  content: FC;
};

export type Devblogs = Array<Devblog>;

export type Devblog = {
  title: string;
  imageUri?: string;
  created_at: Date;
  creator: string;
  content: FC;
  question?: string;
};

export type ListItemLocales = {
  fr: string;
  en: string;
};
