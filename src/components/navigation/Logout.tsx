import { MenuItem } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { FiLogOut } from "react-icons/fi";

export const Logout = ({ signOut }) => {
  const { t } = useTranslation(["common"]);

  return (
    <MenuItem onClick={signOut} icon={<FiLogOut />}>
      {t("logout")}
    </MenuItem>
  );
};
