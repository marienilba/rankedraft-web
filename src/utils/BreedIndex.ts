export const Breeds = [
  "default",
  "cra",
  "ecaflip",
  "eliotrope",
  "eniripsa",
  "enutrof",
  "feca",
  "huppermage",
  "iop",
  "osamodas",
  "pandawa",
  "roublard",
  "sacrieur",
  "sadida",
  "sram",
  "steamer",
  "xelor",
  "zobal",
  "ouginak",
];

export const useBreedAvatar = (breed: number) =>
  breed === 0 ? "/profile/placeholder.png" : `/profile/${Breeds[breed]}.png`;
