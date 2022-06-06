import { useRouter } from "next/router";
import { Devblog } from "../Types";
import { Text } from "@chakra-ui/react";

export const Devblog1: Devblog = {
  title: "Devblog1",
  created_at: new Date(),
  imageUri:
    "http://staticns.ankama.com/comm/news/dofus/www/06_2011/news-goultarminator3.jpg",
  creator: "Nib",
  content: () => NewContentTemplate(),
};

const NewContentTemplate = () => {
  const { locale } = useRouter();
  const defaultLocale = "fr";
  const locales = {
    fr: {
      text: `Généralement, on utilise un texte en faux latin (le texte ne veut rien dire, il a été modifié), le Lorem ipsum ou Lipsum, qui permet donc de faire office de texte d'attente. L'avantage de le mettre en latin est que l'opérateur sait au premier coup d'oeil que la page contenant ces lignes n'est pas valide, et surtout l'attention du client n'est pas dérangée par le contenu, il demeure concentré seulement sur l'aspect graphique.
          Ce texte a pour autre avantage d'utiliser des mots de longueur variable, essayant de simuler une occupation normale. La méthode simpliste consistant à copier-coller un court texte plusieurs fois (« ceci est un faux-texte ceci est un faux-texte ceci est un faux-texte ceci est un faux-texte ceci est un faux-texte ») a l'inconvénient de ne pas permettre une juste appréciation typographique du résultat final.`,
    },
    en: {
      text: `Even though using "lorem ipsum" often arouses curiosity due to its resemblance to classical Latin, it is not intended to have meaning. Where text is visible in a document, people tend to focus on the textual content rather than upon overall presentation, so publishers use lorem ipsum when displaying a typeface or design in order to direct the focus to presentation. "Lorem ipsum" also approximates a typical distribution of spaces in English.
          The most common lorem ipsum text reads as follows: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    },
  };

  function t(key: string): string {
    const properties = key.split(".");
    const tLocale = locales[locale] === undefined ? defaultLocale : locale;
    let lastProperty = locales;
    for (let i = -1; i < properties.length; i++) {
      const property = i === -1 ? tLocale : properties[i];
      if (lastProperty[property] === undefined) return key;
      lastProperty = lastProperty[property];
    }
    if (typeof lastProperty === "object") return key;
    return lastProperty;
  }
  return <Text textAlign="justify">{t("text")}</Text>;
};
