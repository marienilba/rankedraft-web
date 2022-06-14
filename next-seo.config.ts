import { DefaultSeoProps } from "next-seo";

export default {
  canonical: "https://www.rankedraft.com/",
  description:
    "RankeDraft is a spreadsheet application and matchmaking module for the game Dofus.",
  additionalMetaTags: [
    {
      name: "keywords",
      content: "dofus, tournoi, kta, pvp",
    },
    {
      name: "application-name",
      content: "RankeDraft",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
  robotsProps: {
    noarchive: true,
    nosnippet: true,
    notranslate: true,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.rankedraft.com/",
    description:
      "RankeDraft is a spreadsheet application and matchmaking module for the game Dofus.",
    site_name: "RankeDraft",
    images: [
      {
        url: "https://www.rankedraft.com/icons/sword.png",
        width: 240,
        height: 240,
        alt: "Og Image Alt",
      },
    ],
  },
  twitter: {
    handle: "@nibounet",
    site: "@nibounet",
    cardType: "app",
  },
} as DefaultSeoProps;
