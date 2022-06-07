import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useUser } from "../hooks/useUser";
import { useWindowSize } from "../hooks/useWindowSize";
import { GlobalBackground } from "../components/navigation/GlobalBackground";
import { Loading } from "../components/Loading";
import { SettingsIcon } from "@chakra-ui/icons";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { CgMoreO } from "react-icons/cg";
import { FaThList, FaList } from "react-icons/fa";
import { MdOutlinePolicy, MdOutlinePrivacyTip, MdPolicy } from "react-icons/md";
import {
  RiGamepadFill,
  RiGamepadLine,
  RiGroupFill,
  RiGroupLine,
  RiUser3Fill,
  RiUser3Line,
  RiHeart3Fill,
} from "react-icons/ri";
import { AccountButton } from "../components/navigation/AccountButton";
import { LogoButton } from "../components/navigation/LogoButton";
import { NavIconWrapper } from "../components/navigation/NavIconWrapper";
import { NavigationMenuLink } from "../components/navigation/NavigationMenuLink";
import { zIndexPriority } from "../utils/Constants";
import { useTheme } from "../hooks/useTheme";
import NextLink from "next/link";
import { FiLogOut } from "react-icons/fi";
import { MobileBar } from "../components/navigation/MobileBar";

export const Navigation = () => {
  const { isFetchingUser } = useUser();
  const { isMobile } = useWindowSize();
  return (
    <Flex height="auto">
      <GlobalBackground />
      {isFetchingUser ? (
        <Loading />
      ) : isMobile ? (
        <MobileNavigation />
      ) : (
        <ScreenNavigation />
      )}
    </Flex>
  );
};

export const ScreenNavigation = () => {
  const { t } = useTranslation(["common"]);
  const { pathname } = useRouter();
  const { userRole } = useUser();
  const { backgroundColor, color, theme } = useTheme();
  const { code } = useTheme({ invert: true });
  const { isPad } = useWindowSize();
  return (
    <Flex
      sx={{ position: "sticky", top: "0", ...zIndexPriority.Navigation }}
      height="100vh"
      direction="column"
      maxW="260px"
    >
      <Box width={!isPad ? "17vw" : "auto"} maxW="260px"></Box>
      <Stack
        {...backgroundColor}
        height="100%"
        boxShadow={`2px 0px 33px -30px ${code[100]}`}
      >
        <Stack
          spacing={5}
          marginLeft={!isPad ? 10 : 4}
          p={2}
          pr={4}
          width="100%"
        >
          <LogoButton />
          <Stack>
            <NavigationMenuLink title={t("page.home")} link="/home">
              <NavIconWrapper pathname={pathname} match="/home">
                <AiFillHome size="24px" {...color} />
                <AiOutlineHome size="24px" {...color} />
              </NavIconWrapper>
            </NavigationMenuLink>

            <NavigationMenuLink title={t("page.ranked")} link="/ranked">
              <NavIconWrapper pathname={pathname} match="/ranked">
                <RiGamepadFill size="24px" {...color} />
                <RiGamepadLine size="24px" {...color} />
              </NavIconWrapper>
            </NavigationMenuLink>
            <NavigationMenuLink title={t("page.history")} link="/history">
              <NavIconWrapper pathname={pathname} match="/history">
                <FaThList size="24px" {...color} />
                <FaList size="24px" {...color} />
              </NavIconWrapper>
            </NavigationMenuLink>
            <NavigationMenuLink title={t("page.teams")} link="/teams">
              <NavIconWrapper pathname={pathname} match="/teams">
                <RiGroupFill size="24px" {...color} />
                <RiGroupLine size="24px" {...color} />
              </NavIconWrapper>
            </NavigationMenuLink>
            <NavigationMenuLink title={t("page.profile")} link="/profile">
              <NavIconWrapper pathname={pathname} match="/profile">
                <RiUser3Fill size="24px" {...color} />
                <RiUser3Line size="24px" {...color} />
              </NavIconWrapper>
            </NavigationMenuLink>

            <Flex>
              <Menu placement="top" offset={[20, 0]}>
                <MenuButton
                  borderRadius={50}
                  _hover={{
                    backgroundColor: theme[200],
                    cursor: "pointer",
                  }}
                >
                  <NavigationMenuLink title={t("page.more")}>
                    <CgMoreO size="24px" {...color} />
                  </NavigationMenuLink>
                </MenuButton>
                <MenuList boxShadow="xl">
                  <NextLink href="/contribute" passHref>
                    <Link style={{ textDecoration: "none" }} isExternal>
                      <MenuItem icon={<RiHeart3Fill />}>
                        {t("page.contribute")}
                      </MenuItem>
                    </Link>
                  </NextLink>
                  <NextLink href="/tos" passHref>
                    <Link style={{ textDecoration: "none" }} isExternal>
                      <MenuItem icon={<MdOutlinePrivacyTip />}>
                        {t("page.cgu_policy")}
                      </MenuItem>
                    </Link>
                  </NextLink>
                  <Divider marginY={2} />
                  {userRole === "moderator" && (
                    <NextLink href="/moderation" passHref>
                      <Link style={{ textDecoration: "none" }}>
                        <MenuItem icon={<MdPolicy />}>
                          {t("page.moderation")}
                        </MenuItem>
                      </Link>
                    </NextLink>
                  )}

                  <NextLink href="/settings" passHref>
                    <Link style={{ textDecoration: "none" }}>
                      <MenuItem icon={<SettingsIcon />}>
                        {t("page.settings")}
                      </MenuItem>
                    </Link>
                  </NextLink>
                </MenuList>
              </Menu>
            </Flex>
          </Stack>
        </Stack>
        <Spacer />
        <Divider />

        <Flex
          w="100%"
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <AccountButton />
        </Flex>
      </Stack>
    </Flex>
  );
};

export const MobileNavigation = () => {
  const { signOut, userRole } = useUser();
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
            <AccountButton />
          </DrawerHeader>
          <DrawerBody>
            <Stack>
              <NavigationMenuLink
                title={t("page.home")}
                link="/home"
                onClick={onClose}
              >
                <NavIconWrapper pathname={pathname} match="/home">
                  <AiFillHome size="24px" {...color} />
                  <AiOutlineHome size="24px" {...color} />
                </NavIconWrapper>
              </NavigationMenuLink>

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

              <Divider />
              <NavigationMenuLink
                title={t("page.contribute")}
                link="/contribute"
                isExternal
                onClick={onClose}
              >
                <NavIconWrapper pathname={pathname} match="/">
                  <RiHeart3Fill size="24px" {...color} />
                </NavIconWrapper>
              </NavigationMenuLink>
              <NavigationMenuLink
                title={t("page.cgu_policy")}
                link="/tos"
                isExternal
                onClick={onClose}
              >
                <NavIconWrapper pathname={pathname} match="/tos">
                  <MdOutlinePrivacyTip size="24px" {...color} />
                </NavIconWrapper>
              </NavigationMenuLink>
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={signOut} rightIcon={<FiLogOut />}>
              {t("logout")}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
