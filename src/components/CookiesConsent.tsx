import { Flex, Heading, Link, Stack, useBoolean } from "@chakra-ui/react";
import CookieConsent, {
  Cookies,
  getCookieConsentValue,
} from "react-cookie-consent";
import NextLink from "next/link";
import { useTheme } from "../hooks/useTheme";
import { createContext, useCallback, useContext, useEffect } from "react";

export const CookiesContext = createContext<any>(undefined);

export const CookiesContextProvider = (props) => {
  const [cookiesConsent, setCookiesConsent] = useBoolean(false);
  const AllowCookies = useCallback(() => setCookiesConsent.on(), []);
  useEffect(() => {
    if (getCookieConsentValue()) {
      setCookiesConsent.on();
    }
  }, []);

  const value = {
    cookiesConsent,
    AllowCookies,
  };

  return <CookiesContext.Provider value={value} {...props} />;
};
export const useCookiesConsent = () => {
  const context = useContext(CookiesContext);
  if (context === undefined) {
    throw new Error(
      `useCookiesConsent must be used within a CookiesContextProvider.`
    );
  }
  return context;
};

export const CookiesRequest = () => {
  const { code } = useTheme({ invert: true });
  const { cookiesConsent, AllowCookies } = useCookiesConsent();
  return (
    <CookieConsent
      onAccept={AllowCookies}
      location="bottom"
      buttonText="Allow cookies"
      style={{
        backgroundColor: code[200],
        color: code[700],
        borderRadius: 15,
        marginBottom: "20px",
        marginLeft: "20px",
        marginRight: "20px",
        maxWidth: "500px",
        width: "auto",
      }}
      buttonStyle={{
        color: code[700],
        fontSize: "13px",
        backgroundColor: code[200],
        border: `1px solid ${code[300]}`,
        borderRadius: 15,
        "&:hover": {
          backgroundColor: code[500],
        },
      }}
      expires={365}
    >
      <Stack direction="row">
        <Heading size="md">
          This website uses cookies to enhance the user experience.
        </Heading>
        <span style={{ fontSize: "12px" }}>
          For more information, read our{" "}
          <NextLink href="/privacy" passHref>
            <Link color="twitter.500">privacy policy</Link>
          </NextLink>
        </span>
      </Stack>
    </CookieConsent>
  );
};
