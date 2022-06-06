import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useRouter } from "next/router";
import { memo, useCallback } from "react";

export const Title = memo(() => {
  const { pathname } = useRouter();
  const { t } = useTranslation(["common"]);
  const getTitle = useCallback((pathname: string) => {
    switch (pathname) {
      case "/":
        return "Ranked Draft";
      case "/history":
        return t("page.history");
      case "/ranked":
        return t("page.ranked");
      case "/teams":
        return t("page.teams");
      case "/profile":
        return t("page.profile");
      case "/settings":
        return t("page.settings");
      case "/tos":
        return t("page.cgu_policy");
      case "/privacy":
        return t("page.cgu_policy");
      case "/moderation":
        return t("page.moderation");
      case "/contribute":
        return t("page.contribute");
      case "/stats":
        return t("page.stats");
      case "/panel":
        return "Panel";
      default:
        return "Ranked Draft";
    }
  }, []);
  return (
    <Head>
      <title>{getTitle(pathname)}</title>
    </Head>
  );
});
