import SEO from "../../next-seo.config";
import "@fontsource/roboto/500.css";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { appWithTranslation } from "next-i18next";
import { ReactQueryDevtools } from "react-query/devtools";
import theme from "../theme/theme";
import App, { AppContext, AppProps } from "next/app";
import { useState } from "react";
import { UserContextProvider } from "../hooks/useUser";
import { Container } from "../components/Container";
import { TitleContextProvider } from "../hooks/useTitle";
import { DefaultSeo } from "next-seo";
import { WindowContextProvider } from "../hooks/useWindowSize";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 10 * 60 * 1000,
          },
        },
      })
  );

  return (
    <ChakraProvider resetCSS theme={theme}>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <UserContextProvider>
          <TitleContextProvider>
            <WindowContextProvider>
              <Hydrate state={pageProps.dehydratedState}>
                <Container>
                  <DefaultSeo {...SEO} />
                  <Component {...pageProps} />
                </Container>
              </Hydrate>
            </WindowContextProvider>
          </TitleContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  if (appContext.ctx.res?.statusCode === 404) {
    appContext.ctx.res.writeHead(302, { Location: "/" });
    appContext.ctx.res.end();
    return;
  }

  return { ...appProps };
};

export default appWithTranslation(MyApp);
