import "@fontsource/roboto/500.css";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { appWithTranslation } from "next-i18next";
import { ReactQueryDevtools } from "react-query/devtools";
import theme from "../theme/theme";
import App, { AppContext, AppProps } from "next/app";
import { useState } from "react";
import { UserContextProvider } from "../hooks/useUser";
import { Navigation } from "../components/navigation/Navigation";
import { Container } from "../components/Container";

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
          <Hydrate state={pageProps.dehydratedState}>
            <Container>
              <Flex>
                <Navigation />
                <Component {...pageProps} />
              </Flex>
            </Container>
          </Hydrate>
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
