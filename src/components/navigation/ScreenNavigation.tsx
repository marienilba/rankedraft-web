import { SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { CgMoreO } from "react-icons/cg";
import { FaThList, FaList } from "react-icons/fa";
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
import { useWindowSize } from "../../hooks/useWindowSize";
import { zIndexPriority } from "../../utils/Constants";
import { AccountButton } from "./AccountButton";
import { Login } from "./Login";
import { LogoButton } from "./LogoButton";
import { NavIconWrapper } from "./NavIconWrapper";
import { NavigationMenuLink } from "./NavigationMenuLink";
import NextLink from "next/link";
import { useUser } from "../../hooks/useUser";
import { MdOutlinePrivacyTip, MdPolicy } from "react-icons/md";
import { useTranslation } from "next-i18next";

export const ScreenNavigation = ({
  signIn,
  signOut,
}: {
  signIn: (p) => void;
  signOut: () => void;
}) => {
  const { t } = useTranslation(["common"]);
  const { pathname } = useRouter();
  const { user, userRole, userLoaded } = useUser();
  const { backgroundColor, color, theme } = useTheme();
  const { code } = useTheme({ invert: true });
  const { isPad } = useWindowSize();
  return (
    <Flex
      sx={{ position: "sticky", top: "0", ...zIndexPriority.Navigation }}
      height="100vh"
      direction="column"
    >
      <Box width={!isPad ? "17vw" : "auto"}></Box>
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
            <NavigationMenuLink title={t("page.home")} link="/">
              <NavIconWrapper pathname={pathname} match="/">
                <AiFillHome size="24px" {...color} />
                <AiOutlineHome size="24px" {...color} />
              </NavIconWrapper>
            </NavigationMenuLink>
            {user && (
              <>
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
              </>
            )}
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
                    <Link style={{ textDecoration: "none" }}>
                      <MenuItem icon={<RiHeart3Fill />}>
                        {t("page.contribute")}
                      </MenuItem>
                    </Link>
                  </NextLink>
                  <NextLink href="/cgu" passHref>
                    <Link style={{ textDecoration: "none" }}>
                      <MenuItem icon={<MdOutlinePrivacyTip />}>
                        {t("page.cgu_policy")}
                      </MenuItem>
                    </Link>
                  </NextLink>
                  {user && <Divider marginY={2} />}
                  {userRole === "moderator" && (
                    <NextLink href="/moderation" passHref>
                      <Link style={{ textDecoration: "none" }}>
                        <MenuItem icon={<MdPolicy />}>
                          {t("page.moderation")}
                        </MenuItem>
                      </Link>
                    </NextLink>
                  )}
                  {user && (
                    <NextLink href="/settings" passHref>
                      <Link style={{ textDecoration: "none" }}>
                        <MenuItem icon={<SettingsIcon />}>
                          {t("page.settings")}
                        </MenuItem>
                      </Link>
                    </NextLink>
                  )}
                </MenuList>
              </Menu>
            </Flex>
          </Stack>
        </Stack>
        <Spacer />
        <Divider />
        {userLoaded &&
          (user ? (
            <>
              <Flex
                w="100%"
                justifyContent="center"
                alignItems="center"
                direction="column"
              >
                <AccountButton user={user} signOut={signOut} />
              </Flex>
            </>
          ) : (
            <Flex
              w="100%"
              justifyContent="center"
              alignItems="center"
              direction="column"
            >
              <Login signIn={signIn} />
            </Flex>
          ))}
      </Stack>
    </Flex>
  );
};
