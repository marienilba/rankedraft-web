export const FakeDataProfileAvatarsUnlocked = [20, 23, 24, 25, 28, 29, 35, 38];

export const Categories = {
  default: [0, 0],
  breed: [2, 19],
  KTA_league: [20, 22],
  Koli_league: [23, 27],
  standard: [38, 43],
  alignement: [28, 37],
};

interface Avatar {
  path: string;
  locked: boolean;
  conditions: string;
}

interface Avatars {
  [key: number]: Avatar;
}

export const useAvatarSrc = (avId: number): string => {
  const fallback = "/profile/placeholder.png";
  if (avId === undefined) return fallback;
  const av = Index[avId];
  if (av === undefined) return fallback;
  return `/profile/${av.path}.png`;
};

export const Index: Avatars = {
  0: { path: "placeholder", locked: false, conditions: "" },
  2: { path: "cra", locked: false, conditions: "" },
  3: { path: "ecaflip", locked: false, conditions: "" },
  4: { path: "eliotrope", locked: false, conditions: "" },
  5: { path: "eniripsa", locked: false, conditions: "" },
  6: { path: "enutrof", locked: false, conditions: "" },
  7: { path: "feca", locked: false, conditions: "" },
  8: { path: "huppermage", locked: false, conditions: "" },
  9: { path: "iop", locked: false, conditions: "" },
  10: { path: "osamodas", locked: false, conditions: "" },
  11: { path: "pandawa", locked: false, conditions: "" },
  12: { path: "roublard", locked: false, conditions: "" },
  13: { path: "sacrieur", locked: false, conditions: "" },
  14: { path: "sadida", locked: false, conditions: "" },
  15: { path: "sram", locked: false, conditions: "" },
  16: { path: "steamer", locked: false, conditions: "" },
  17: { path: "xelor", locked: false, conditions: "" },
  18: { path: "zobal", locked: false, conditions: "" },
  19: { path: "ouginak", locked: false, conditions: "" },
  //
  20: { path: "bronze", locked: true, conditions: "Être en bronze ligue 1" },
  21: { path: "silver", locked: true, conditions: "Être en silver ligue." },
  22: { path: "gold", locked: true, conditions: "Être en gold ligue." },
  //
  27: { path: "legend", locked: true, conditions: "Avoir plus de 2500 elo." },
  26: { path: "diamant", locked: true, conditions: "Avoir plus de 2000 elo." },
  25: { path: "cristal", locked: true, conditions: "Avoir plus de 1600 elo." },
  24: { path: "or", locked: true, conditions: "Avoir plus de 1200 elo." },
  23: { path: "fer", locked: false, conditions: "Avoir plus de 1000 elo." },
  //
  28: {
    path: "Ange02",
    locked: true,
    conditions: "Réaliser 3 victoires consécutives.",
  },
  29: {
    path: "Ange04",
    locked: true,
    conditions: "Réaliser 5 victoires consécutives.",
  },
  30: {
    path: "Ange06",
    locked: true,
    conditions: "Réaliser 10 victoires consécutives.",
  },
  31: {
    path: "Ange08",
    locked: true,
    conditions: "Réaliser 15 victoires consécutives.",
  },
  32: {
    path: "Ange10",
    locked: true,
    conditions: "Réaliser 30 victoires consécutives.",
  },
  //
  33: {
    path: "Demon02",
    locked: true,
    conditions: "Réaliser 3 victoires consécutives.",
  },
  34: {
    path: "Demon04",
    locked: true,
    conditions: "Réaliser 5 victoires consécutives.",
  },
  35: {
    path: "Demon06",
    locked: true,
    conditions: "Réaliser 10 victoires consécutives.",
  },
  36: {
    path: "Demon08",
    locked: true,
    conditions: "Réaliser 15 victoires consécutives.",
  },
  37: {
    path: "Demon10",
    locked: true,
    conditions: "Réaliser 30 victoires consécutives.",
  },
  //
  40: { path: "coiffebouftou", locked: false, conditions: "" },
  39: { path: "lapino", locked: false, conditions: "" },
  43: { path: "emeraude", locked: false, conditions: "" },
  41: { path: "tofu", locked: false, conditions: "" },
  42: { path: "chacha", locked: false, conditions: "" },
  38: { path: "placeholder", locked: false, conditions: "" },
  //
  44: { path: "eliomeme", locked: true, conditions: "" },
};

export const makeAvatarArray = (limit: number[]): number[] => {
  return Array.apply(null, Array(Math.abs(limit[1] - limit[0] + 1))).map(
    (_: any, i: number) => {
      return limit[0] + i;
    }
  );
};
