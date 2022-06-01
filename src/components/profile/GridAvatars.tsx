import { Wrap, WrapItem } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Categories } from "../../utils/AvatarIndex";
import { CardAvatars } from "./CardAvatars";

export const GridAvatars = ({ av }) => {
  const { t } = useTranslation(["profile", "common"]);
  const { isMobile } = useWindowSize();

  return (
    <Wrap spacing={10}>
      <Wrap direction="column">
        <WrapItem padding={1}>
          <CardAvatars
            limit={Categories.standard}
            title={t("standard")}
            {...av}
          />
        </WrapItem>
        <WrapItem>
          <CardAvatars
            limit={Categories.Koli_league}
            title={t("ranked")}
            {...av}
          />
        </WrapItem>
      </Wrap>
      <WrapItem maxWidth={!isMobile ? "50%" : "auto"}>
        <CardAvatars limit={Categories.breed} title={t("breeds")} {...av} />
      </WrapItem>
      <WrapItem>
        <CardAvatars
          limit={Categories.KTA_league}
          title={t("kta_leagues")}
          {...av}
        />
      </WrapItem>
      <WrapItem>
        <CardAvatars
          limit={Categories.alignement}
          title={t("alignement")}
          {...av}
        />
      </WrapItem>
    </Wrap>
  );
};
