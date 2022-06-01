import React, { ChangeEvent } from "react";
import { useRouter } from "next/router";
import { Flex, Heading, Select, Stack } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

export const SwitchLocale = () => {
  const { t } = useTranslation(["settings"]);
  const router = useRouter();

  const handleLocaleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    router.push(router.route, router.asPath, {
      locale: value,
    });
  };

  return (
    <>
      <Heading fontSize="3xl">{t("language")}</Heading>
      <Stack pl={5}>
        <Flex maxWidth="10rem">
          <Select
            onChange={handleLocaleChange}
            value={router.locale}
            defaultValue={router.locale}
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
          </Select>
        </Flex>
      </Stack>
    </>
  );
};
