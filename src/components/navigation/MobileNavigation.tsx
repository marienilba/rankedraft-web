import { SettingsIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  DrawerFooter,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { FaThList, FaList } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdOutlinePolicy, MdOutlinePrivacyTip, MdPolicy } from "react-icons/md";
import {
  RiGamepadFill,
  RiGamepadLine,
  RiGroupFill,
  RiGroupLine,
  RiHeart3Fill,
  RiUser3Fill,
  RiUser3Line,
} from "react-icons/ri";
import { useTheme } from "../../hooks/useTheme";
import { useUser } from "../../hooks/useUser";
import { AccountButton } from "./AccountButton";
import { Login } from "./Login";
import { MobileBar } from "./MobileBar";
import { NavIconWrapper } from "./NavIconWrapper";
import { NavigationMenuLink } from "./NavigationMenuLink";

export const MobileNavigation = ({ signIn, signOut }) => {
  const { user, userRole } = useUser();
  const { t } = useTranslation(["common"]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useRouter();
  const { color } = useTheme();
  return (
    <>
      <MobileBar onOpen={onOpen} />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {user ? (
              <>
                <AccountButton user={user} signOut={signOut} />
              </>
            ) : (
              <Login signIn={signIn} />
            )}
          </DrawerHeader>
          <DrawerBody>
            <Stack>
              <NavigationMenuLink
                title={t("page.home")}
                link="/"
                onClick={onClose}
              >
                <NavIconWrapper pathname={pathname} match="/">
                  <AiFillHome size="24px" {...color} />
                  <AiOutlineHome size="24px" {...color} />
                </NavIconWrapper>
              </NavigationMenuLink>
              {user && (
                <>
                  <NavigationMenuLink
                    title={t("page.ranked")}
                    link="/ranked"
                    onClick={onClose}
                  >
                    <NavIconWrapper pathname={pathname} match="/ranked">
                      <RiGamepadFill size="24px" {...color} />
                      <RiGamepadLine size="24px" {...color} />
                    </NavIconWrapper>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    title={t("page.history")}
                    link="/history"
                    onClick={onClose}
                  >
                    <NavIconWrapper pathname={pathname} match="/history">
                      <FaThList size="24px" {...color} />
                      <FaList size="24px" {...color} />
                    </NavIconWrapper>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    title={t("page.teams")}
                    link="/teams"
                    onClick={onClose}
                  >
                    <NavIconWrapper pathname={pathname} match="/teams">
                      <RiGroupFill size="24px" {...color} />
                      <RiGroupLine size="24px" {...color} />
                    </NavIconWrapper>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    title={t("page.profile")}
                    link="/profile"
                    onClick={onClose}
                  >
                    <NavIconWrapper pathname={pathname} match="/profile">
                      <RiUser3Fill size="24px" {...color} />
                      <RiUser3Line size="24px" {...color} />
                    </NavIconWrapper>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    title={t("page.settings")}
                    link="/settings"
                    onClick={onClose}
                  >
                    <NavIconWrapper pathname={pathname} match="/settings">
                      <SettingsIcon fontSize="24px" />
                    </NavIconWrapper>
                  </NavigationMenuLink>
                  {userRole === "moderator" && (
                    <NavigationMenuLink
                      title={t("page.moderation")}
                      link="/moderation"
                      onClick={onClose}
                    >
                      <NavIconWrapper pathname={pathname} match="/moderation">
                        <MdPolicy size="24px" {...color} />
                        <MdOutlinePolicy size="24px" {...color} />
                      </NavIconWrapper>
                    </NavigationMenuLink>
                  )}
                </>
              )}
              <Divider />
              <NavigationMenuLink
                title={t("page.contribute")}
                link="/contribute"
                onClick={onClose}
              >
                <NavIconWrapper pathname={pathname} match="/">
                  <RiHeart3Fill size="24px" {...color} />
                </NavIconWrapper>
              </NavigationMenuLink>
              <NavigationMenuLink
                title={t("page.cgu_policy")}
                link="/cgu"
                onClick={onClose}
              >
                <NavIconWrapper pathname={pathname} match="/">
                  <MdOutlinePrivacyTip size="24px" {...color} />
                </NavIconWrapper>
              </NavigationMenuLink>
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            {user && (
              <Button onClick={signOut} rightIcon={<FiLogOut />}>
                {t("logout")}
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
