import { Flex, Stack, Heading, Divider, Link } from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-query";
import { ChangelogCard } from "../components/news/ChangelogCard";
import { DevblogCard } from "../components/news/DevblogCard";
import { NewCard } from "../components/news/NewCard";
import { useWindowSize } from "../hooks/useWindowSize";
import { fetchNews } from "../queries/News";

export const News = () => {
  const { isMobile } = useWindowSize();
  const [tabIndex, setTabIndex] = useState(0);
  const { isLoading, isSuccess, data, isError } = useQuery(["news"], fetchNews);

  return (
    <Flex direction={isMobile ? "column" : "row"}>
      <Flex flex={0.5} justifyContent="flex-end">
        <Stack
          direction={isMobile ? "row" : "column"}
          spacing={2}
          marginRight={7}
          position="sticky"
          top="40px"
          height={isMobile ? "auto" : "200px"}
          marginTop={isMobile ? 4 : 12}
        >
          <Heading
            fontSize="2xl"
            as={Link}
            onClick={() => setTabIndex(0)}
            fontWeight={tabIndex === 0 ? 800 : 600}
            letterSpacing={tabIndex === 0 ? -0.9 : 0}
          >
            News
          </Heading>
          <Heading
            fontSize="2xl"
            as={Link}
            onClick={() => setTabIndex(1)}
            fontWeight={tabIndex === 1 ? 800 : 600}
            letterSpacing={tabIndex === 1 ? -0.9 : 0}
          >
            Changelogs
          </Heading>
          <Heading
            fontSize="2xl"
            as={Link}
            onClick={() => setTabIndex(2)}
            fontWeight={tabIndex === 2 ? 800 : 600}
            letterSpacing={tabIndex === 2 ? -0.9 : 0}
          >
            Devblogs
          </Heading>
        </Stack>

        <Divider orientation="vertical" />
      </Flex>
      <Flex flex={1.5} justifyContent="center">
        {isSuccess && (
          <Stack padding={7} width="100%">
            {tabIndex === 0 && (
              <>
                {data.news.map(
                  (
                    { content, locales, created_at, title, creator, imageUri },
                    index
                  ) => (
                    <NewCard
                      content={content}
                      created_at={created_at}
                      title={title}
                      creator={creator}
                      imageUri={imageUri}
                      locales={locales}
                      key={`new-card-${index}`}
                    />
                  )
                )}
              </>
            )}
            {tabIndex === 1 && (
              <>
                {data.changelogs.map(({ version, created_at, logs }, index) => (
                  <ChangelogCard
                    version={version}
                    created_at={created_at}
                    logs={logs}
                    key={`changelog-card-${index}`}
                  />
                ))}
              </>
            )}
            {tabIndex === 2 && (
              <>
                {data.devblogs.map(
                  (
                    { content, locales, created_at, title, creator, imageUri },
                    index
                  ) => (
                    <DevblogCard
                      content={content}
                      created_at={created_at}
                      title={title}
                      creator={creator}
                      imageUri={imageUri}
                      locales={locales}
                      key={`devblog-card-${index}`}
                    />
                  )
                )}
              </>
            )}
          </Stack>
        )}
      </Flex>
    </Flex>
  );
};
