import { useTranslation } from "next-i18next";

export function useBreeds() {
  const { t } = useTranslation(["common"]);

  return {
    translate: (b: number): string => t(`breeds.${b}`),
  };
}
