import { ListItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Changelog, ListItemLocales } from "../Types";

export const Changelog01: Changelog = {
  version: "0.1",
  created_at: new Date(),
  logs: [
    {
      type: "added",
      content: () => (
        <NewContentTemplate
          locales={{ fr: "Nouveau changement", en: "New change" }}
        />
      ),
    },
    {
      type: "added",
      content: () => (
        <NewContentTemplate
          locales={{ fr: "Nouveau changement", en: "New change" }}
        />
      ),
    },
    {
      type: "fixed",
      content: () => (
        <NewContentTemplate
          locales={{ fr: "Nouveau changement", en: "New change" }}
        />
      ),
    },
    {
      type: "removed",
      content: () => (
        <NewContentTemplate
          locales={{ fr: "Nouveau changement", en: "New change" }}
        />
      ),
    },
  ],
};

const NewContentTemplate = ({ locales }: { locales: ListItemLocales }) => {
  const { locale } = useRouter();
  return <ListItem>{locales[locale]}</ListItem>;
};
